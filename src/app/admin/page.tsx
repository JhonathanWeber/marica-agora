'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { fetchCompetitorNews } from '@/actions/external-news';
import {
    X, Plus, Save, RotateCcw, Image as ImageIcon, Type,
    Palette, Pencil, Eye, BookOpen, MessageSquare, Send, Trash2,
    Radio, ExternalLink
} from 'lucide-react';

// Mock Data List (Simulating Database)
const INITIAL_NEWS = [
    {
        id: 1,
        title: 'Câmara aprova orçamento para reforma da Orla',
        category: 'Política',
        summary: 'Investimento de R$ 15 milhões aprovado por unanimidade.',
        content: 'Conteúdo completo da matéria...',
        views: 3420,
        reads: 2100, // Lida até o final
        comments: [
            { id: 101, author: 'Carlos Silva', text: 'Excelente iniciativa para a cidade!', date: 'Há 2 horas' },
            { id: 102, author: 'Ana Souza', text: 'Espero que as obras comecem logo.', date: 'Há 5 horas' }
        ]
    },
    {
        id: 2,
        title: 'Festival de Jazz começa nesta sexta-feira',
        category: 'Agenda Cultural',
        summary: 'Evento gratuito na orla de Araçatiba.',
        content: 'Conteúdo completo da matéria...',
        views: 1250,
        reads: 980,
        comments: [
            { id: 103, author: 'Marcos Dias', text: 'Vou levar a família toda!', date: 'Há 30 min' }
        ]
    },
    {
        id: 3,
        title: 'Novos horários de ônibus para o Centro',
        category: 'Cidade',
        summary: 'Mudanças valem a partir de segunda.',
        content: 'Conteúdo completo da matéria...',
        views: 5600,
        reads: 4200,
        comments: []
    },
];

export default function AdminDashboard() {
    const { primaryColor, setPrimaryColor, detailsColor, setDetailsColor, resetTheme } = useTheme();

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);

    // Selection States
    const [editingId, setEditingId] = useState<number | null>(null);
    const [viewingCommentsId, setViewingCommentsId] = useState<number | null>(null);

    // Data States
    const [newsList, setNewsList] = useState(INITIAL_NEWS);
    const [newCommentText, setNewCommentText] = useState('');

    // Form State
    const [newsForm, setNewsForm] = useState({
        title: '',
        category: 'Cidade',
        summary: '',
        content: ''
    });

    // External News State
    const [externalNews, setExternalNews] = useState<{ leiSeca: any[], maricaInfo: any[] }>({ leiSeca: [], maricaInfo: [] });
    const [loadingExternal, setLoadingExternal] = useState(true);
    const [activeRadarTab, setActiveRadarTab] = useState<'leiSeca' | 'maricaInfo'>('leiSeca');

    const refreshRadar = () => {
        setLoadingExternal(true);
        fetchCompetitorNews().then(data => {
            setExternalNews(data);
            setLoadingExternal(false);
        });
    };

    useEffect(() => {
        refreshRadar();
    }, []);

    // --- CRUD News Logic ---

    const openNewModal = () => {
        setEditingId(null);
        setNewsForm({ title: '', category: 'Cidade', summary: '', content: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (item: typeof INITIAL_NEWS[0]) => {
        setEditingId(item.id);
        setNewsForm({
            title: item.title,
            category: item.category,
            summary: item.summary,
            content: item.content
        });
        setIsModalOpen(true);
    };

    const handleSaveNews = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            // Update existing
            setNewsList(prev => prev.map(item =>
                item.id === editingId ? { ...item, ...newsForm } : item
            ));
            alert('Matéria atualizada com sucesso!');
        } else {
            // Create new
            const newId = Math.max(...newsList.map(n => n.id), 0) + 1;
            const newNews = {
                id: newId,
                ...newsForm,
                views: 0,
                reads: 0,
                comments: []
            };
            setNewsList(prev => [newNews, ...prev]);
            alert('Nova matéria publicada com sucesso!');
        }

        setIsModalOpen(false);
    };

    // --- Comments Logic ---

    const openComments = (id: number) => {
        setViewingCommentsId(id);
        setNewCommentText('');
        setIsCommentsModalOpen(true);
    };

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCommentText.trim() || !viewingCommentsId) return;

        const newComment = {
            id: Date.now(),
            author: 'Admin (Você)',
            text: newCommentText,
            date: 'Agora mesmo'
        };

        setNewsList(prev => prev.map(item => {
            if (item.id === viewingCommentsId) {
                return { ...item, comments: [newComment, ...item.comments] };
            }
            return item;
        }));

        setNewCommentText('');
    };

    const activeNewsForComments = newsList.find(n => n.id === viewingCommentsId);

    return (
        <div className="min-h-screen bg-gray-100 pb-20">

            {/* Admin Header */}
            <header className="bg-white shadow sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-theme-primary text-white p-2 rounded-lg">
                            <Palette className="w-5 h-5" />
                        </div>
                        <h1 className="text-xl md:text-2xl font-serif font-bold text-gray-900">
                            Painel Administrativo
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 hidden md:inline">Olá, Admin</span>
                        <Link href="/" className="text-sm text-red-600 font-bold hover:bg-red-50 px-3 py-1 rounded transition-colors">
                            Sair
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8 space-y-8">

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white shadow rounded-xl p-6 border-l-4 border-theme-primary flex items-center justify-between">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Total de Visualizações</dt>
                            <dd className="mt-1 text-3xl font-black text-gray-900">
                                {newsList.reduce((acc, curr) => acc + curr.views, 0).toLocaleString()}
                            </dd>
                        </div>
                        <Eye className="w-8 h-8 text-theme-primary/20" />
                    </div>
                    <div className="bg-white shadow rounded-xl p-6 border-l-4 border-theme-details">
                        <dt className="text-sm font-medium text-gray-500">Matérias Publicadas</dt>
                        <dd className="mt-1 text-3xl font-black text-gray-900">{newsList.length}</dd>
                    </div>
                    <div className="bg-white shadow rounded-xl p-6 border-l-4 border-green-500">
                        <dt className="text-sm font-medium text-gray-500">Total de Comentários</dt>
                        <dd className="mt-1 text-3xl font-black text-gray-900">
                            {newsList.reduce((acc, curr) => acc + curr.comments.length, 0)}
                        </dd>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Col: News Management */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white shadow rounded-xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Type className="w-5 h-5 text-gray-400" />
                                    Gestão de Notícias
                                </h2>
                                <button
                                    onClick={openNewModal}
                                    className="flex items-center gap-2 px-4 py-2 bg-theme-primary text-white rounded-lg text-sm font-bold hover:brightness-90 transition-all shadow-sm"
                                >
                                    <Plus className="w-4 h-4" />
                                    Nova Matéria
                                </button>
                            </div>

                            {/* List */}
                            <div className="space-y-4">
                                {newsList.map((item) => (
                                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors group">
                                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 shrink-0">
                                            <ImageIcon className="w-6 h-6" />
                                        </div>

                                        <div className="flex-1 w-full">
                                            <h3 className="font-bold text-gray-800 text-sm mb-1">{item.title}</h3>
                                            <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-2">
                                                <span className="bg-gray-100 px-2 py-0.5 rounded">{item.category}</span>
                                                <span className="flex items-center gap-1" title="Visualizações">
                                                    <Eye className="w-3 h-3" /> {item.views}
                                                </span>
                                                <span className="flex items-center gap-1" title="Lidas até o final">
                                                    <BookOpen className="w-3 h-3" /> {item.reads} ({Math.round((item.reads / (item.views || 1)) * 100)}%)
                                                </span>
                                                <span className="flex items-center gap-1" title="Comentários">
                                                    <MessageSquare className="w-3 h-3" /> {item.comments.length}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                                            <button
                                                onClick={() => openComments(item.id)}
                                                className="flex items-center justify-center gap-1 text-gray-500 hover:text-green-600 font-medium text-xs px-3 py-2 border border-gray-200 rounded hover:bg-green-50 transition-colors flex-1 sm:flex-none"
                                            >
                                                <MessageSquare className="w-3 h-3" />
                                                Comentários
                                            </button>
                                            <button
                                                onClick={() => openEditModal(item)}
                                                className="flex items-center justify-center gap-1 text-gray-500 hover:text-blue-600 font-medium text-xs px-3 py-2 border border-gray-200 rounded hover:bg-blue-50 transition-colors flex-1 sm:flex-none"
                                            >
                                                <Pencil className="w-3 h-3" />
                                                Editar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Theme Customizer & Radar */}
                    <div className="space-y-6">

                        {/* Radar Concorrência Widget */}
                        <div className="bg-white shadow rounded-xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Radio className="w-5 h-5 text-gray-400" />
                                    Radar Concorrência
                                </h2>
                                <button
                                    onClick={refreshRadar}
                                    disabled={loadingExternal}
                                    className="text-gray-400 hover:text-theme-primary transition-colors disabled:animate-spin"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b border-gray-100 mb-4">
                                <button
                                    onClick={() => setActiveRadarTab('leiSeca')}
                                    className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors ${activeRadarTab === 'leiSeca'
                                            ? 'border-red-500 text-red-600'
                                            : 'border-transparent text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    Lei Seca Maricá
                                </button>
                                <button
                                    onClick={() => setActiveRadarTab('maricaInfo')}
                                    className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors ${activeRadarTab === 'maricaInfo'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    Maricá Info
                                </button>
                            </div>

                            {/* Content */}
                            <div className="min-h-[200px]">
                                {loadingExternal ? (
                                    <div className="space-y-4 animate-pulse py-2">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className="flex flex-col gap-2">
                                                <div className="h-4 bg-gray-100 rounded w-full"></div>
                                                <div className="h-2 bg-gray-100 rounded w-1/3"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <ul className="space-y-4">
                                        {externalNews[activeRadarTab]?.length > 0 ? (
                                            externalNews[activeRadarTab].map((item: any, i: number) => (
                                                <li key={i} className="group">
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`font-serif font-medium leading-snug hover:underline block text-sm transition-colors ${activeRadarTab === 'leiSeca' ? 'group-hover:text-red-600' : 'group-hover:text-blue-600'
                                                            }`}
                                                    >
                                                        {item.title}
                                                    </a>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[10px] text-gray-400 font-bold uppercase">
                                                            {new Date(item.pubDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                        <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-gray-500" />
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-sm text-gray-400 text-center py-8 italic">
                                                Nenhuma notícia encontrada.
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="bg-white shadow rounded-xl p-6 sticky top-24">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Palette className="w-5 h-5 text-gray-400" />
                                Personalização Visual
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Cor Primária (Marca)</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={primaryColor}
                                            onChange={(e) => setPrimaryColor(e.target.value)}
                                            className="h-10 w-20 rounded cursor-pointer border-0 p-0"
                                        />
                                        <span className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">{primaryColor}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">Usado em botões, destaques e logo.</p>
                                </div>

                                <hr className="border-gray-100" />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Cor Secundária (Detalhes)</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={detailsColor}
                                            onChange={(e) => setDetailsColor(e.target.value)}
                                            className="h-10 w-20 rounded cursor-pointer border-0 p-0"
                                        />
                                        <span className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">{detailsColor}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">Usado em tags, widgets e links.</p>
                                </div>

                                <button
                                    onClick={resetTheme}
                                    className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Restaurar Padrão
                                </button>
                            </div>

                            <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Preview ao Vivo</h4>
                                <div className="space-y-3">
                                    <button className="w-full bg-theme-primary text-white py-2 rounded text-sm font-bold">Botão Primário</button>
                                    <div className="text-center font-serif font-bold text-theme-primary text-xl">Manchete de Teste</div>
                                    <span className="inline-block bg-theme-details text-white text-xs px-2 py-1 rounded">Tag Secundária</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal: Nova/Editar Matéria */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all animate-in fade-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-gray-900">
                                {editingId ? 'Editar Publicação' : 'Nova Publicação'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveNews} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Título da Matéria</label>
                                    <input
                                        required
                                        value={newsForm.title}
                                        onChange={e => setNewsForm({ ...newsForm, title: e.target.value })}
                                        type="text"
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-theme-primary focus:ring-theme-primary p-2 border"
                                        placeholder="Manchete impactante..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                                    <select
                                        value={newsForm.category}
                                        onChange={e => setNewsForm({ ...newsForm, category: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-theme-primary focus:ring-theme-primary p-2 border"
                                    >
                                        <option>Política</option>
                                        <option>Cidade</option>
                                        <option>Segurança</option>
                                        <option>Esportes</option>
                                        <option>Agenda Cultural</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagem de Capa (URL)</label>
                                    <input type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-theme-primary focus:ring-theme-primary p-2 border" placeholder="https://..." />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Resumo (Subtítulo)</label>
                                    <textarea
                                        rows={2}
                                        value={newsForm.summary}
                                        onChange={e => setNewsForm({ ...newsForm, summary: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-theme-primary focus:ring-theme-primary p-2 border"
                                    ></textarea>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
                                    <textarea
                                        rows={6}
                                        value={newsForm.content}
                                        onChange={e => setNewsForm({ ...newsForm, content: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-theme-primary focus:ring-theme-primary p-2 border"
                                        placeholder="Escreva o conteúdo da notícia aqui..."
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-6 py-2 bg-theme-primary text-white rounded-lg font-bold hover:brightness-90 shadow-md"
                                >
                                    <Save className="w-4 h-4" />
                                    {editingId ? 'Atualizar Matéria' : 'Publicar Matéria'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Comentários */}
            {isCommentsModalOpen && activeNewsForComments && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Comentários</h3>
                                <p className="text-xs text-gray-500 truncate max-w-[300px]">{activeNewsForComments.title}</p>
                            </div>
                            <button onClick={() => setIsCommentsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                            {activeNewsForComments.comments.length === 0 ? (
                                <div className="text-center py-8 text-gray-400 text-sm">
                                    Nenhum comentário ainda. Seja o primeiro!
                                </div>
                            ) : (
                                activeNewsForComments.comments.map((comment) => (
                                    <div key={comment.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-sm text-gray-800">{comment.author}</span>
                                            <span className="text-[10px] text-gray-400">{comment.date}</span>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">{comment.text}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-white rounded-b-xl">
                            <form onSubmit={handleAddComment} className="flex gap-2">
                                <input
                                    type="text"
                                    value={newCommentText}
                                    onChange={(e) => setNewCommentText(e.target.value)}
                                    placeholder="Adicionar um comentário..."
                                    className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-theme-primary focus:ring-theme-primary text-sm p-2 border"
                                />
                                <button
                                    type="submit"
                                    disabled={!newCommentText.trim()}
                                    className="bg-theme-primary text-white p-2 rounded-lg hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
