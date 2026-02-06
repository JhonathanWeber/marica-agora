
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { NewsItem, searchNews } from '@/lib/news-service';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            // Focus after animation starts
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery(''); // Reset query on close
            setResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleSearch = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const data = await searchNews(query);
                setResults(data);
            } catch (error) {
                console.error("Erro na busca:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(handleSearch, 500);
        return () => clearTimeout(timeoutId);
    }, [query]);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
            <div className="container mx-auto px-4 pt-8 md:pt-16 pb-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                    <Search className="w-6 h-6 text-gray-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="O que você procura?"
                        className="w-full text-2xl md:text-4xl font-serif font-bold bg-transparent border-none outline-none placeholder:text-gray-300 text-gray-900"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        onClick={onClose}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-theme-primary" />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {results.length > 0 ? (
                                <>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                        Encontrados {results.length} resultados
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {results.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/noticia/${item.id}`}
                                                onClick={onClose}
                                                className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group group-hover:shadow-sm border border-transparent hover:border-gray-100"
                                            >
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.title}
                                                    className="w-24 h-24 object-cover rounded-lg bg-gray-200"
                                                />
                                                <div>
                                                    <span className="text-[10px] font-bold text-theme-primary uppercase mb-1 block">
                                                        {item.category}
                                                    </span>
                                                    <h4 className="font-serif font-bold text-lg leading-tight group-hover:text-theme-primary transition-colors">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                query.length >= 2 && (
                                    <div className="text-center py-20 text-gray-400">
                                        <p>Nenhuma notícia encontrada para "{query}"</p>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
