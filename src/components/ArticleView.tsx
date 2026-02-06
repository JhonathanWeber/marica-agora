
import { NewsItem } from "@/lib/news-service";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";

interface ArticleViewProps {
    news: NewsItem;
    isModal?: boolean;
}

export function ArticleView({ news, isModal = false }: ArticleViewProps) {
    return (
        <article className="bg-white min-h-screen lg:min-h-0 lg:h-auto pb-12 w-full">
            {/* Header / Hero */}
            <div className={`relative w-full bg-gray-900 ${isModal ? 'h-[300px] rounded-t-xl overflow-hidden' : 'h-[400px]'}`}>
                <Image
                    src={news.imageUrl}
                    alt={news.title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 text-white">
                    {!isModal && (
                        <Link href="/" className="inline-flex items-center text-sm mb-4 hover:text-marica-red transition-colors font-medium backdrop-blur-sm bg-black/20 py-1 px-3 rounded-full">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Voltar para Home
                        </Link>
                    )}
                    <span className="block text-marica-red font-bold tracking-wider mb-2 uppercase text-sm">
                        {news.category}
                    </span>
                    <h1 className={`font-bold leading-tight mb-4 max-w-4xl text-shadow-sm ${isModal ? 'text-2xl md:text-3xl' : 'text-3xl md:text-5xl'}`}>
                        {news.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-200">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-marica-red" />
                            {news.author || "Redação Maricá Agora"}
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-marica-red" />
                            {news.date || "05 Fev 2026"}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 ${isModal ? 'mt-6 container mx-auto max-w-5xl' : 'container mx-auto -mt-8'}`}>
                {/* Main Content */}
                <div className={`${isModal ? 'col-span-1 border-none shadow-none p-0' : 'lg:col-span-8 bg-white rounded-xl shadow-sm p-6 md:p-10 border border-gray-100/50'} ${isModal ? 'lg:col-span-12' : ''}`}>
                    {/* Hardcoded content rendering for safety since it is mock html */}
                    <div className={`prose prose-lg ${isModal ? 'mx-auto' : 'max-w-none'} prose-headings:text-marica-primary prose-a:text-marica-red prose-p:text-gray-700`}>
                        {news.content ? (
                            <div dangerouslySetInnerHTML={{ __html: news.content }} />
                        ) : (
                            // Fallback if content was not populated in mock
                            <div className="space-y-4">
                                <p className="lead">
                                    {news.summary ? news.summary[0] : "Confira os detalhes desta notícia importante para a região."}
                                </p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non nisl ut eros vehicula aliquet. Donec eget velit sed nibh rhoncus dictum. Curabitur egestas, arcu a placerat tempus, libero sapien facilisis nunc, non blandit dolor tortor sed erat.</p>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                            </div>
                        )}
                    </div>

                    {/* Share Section */}
                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
                            <Share2 className="w-5 h-5 text-marica-red" />
                            Compartilhar notícia
                        </h3>
                        <div className="flex gap-3">
                            <button className="px-5 py-2.5 bg-[#1877F2] text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium text-sm flex items-center gap-2">
                                Facebook
                            </button>
                            <button className="px-5 py-2.5 bg-[#25D366] text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium text-sm flex items-center gap-2">
                                WhatsApp
                            </button>
                            <button className="px-5 py-2.5 bg-black text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium text-sm flex items-center gap-2">
                                X
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Only shown if not in modal mode for better reading focus */}
                {!isModal && (
                    <div className="lg:col-span-4 space-y-6">
                        {/* Summary Card */}
                        {news.summary && news.summary.length > 0 && (
                            <div className="bg-white rounded-xl p-6 border-l-4 border-marica-red shadow-sm">
                                <h3 className="font-bold text-lg text-marica-primary mb-4 flex items-center">
                                    Pontos Principais
                                </h3>
                                <ul className="space-y-4">
                                    {news.summary.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                                            <div className="min-w-[8px] h-[8px] rounded-full bg-marica-red mt-1.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Read more Card */}
                        <div className="bg-gradient-to-br from-marica-primary to-marica-secondary text-white rounded-xl p-6 shadow-lg">
                            <h3 className="font-bold text-xl mb-3">Receba notícias de Maricá</h3>
                            <p className="text-white/80 text-sm mb-4">Inscreva-se para receber as atualizações diárias sobre sua cidade.</p>
                            <input type="email" placeholder="Seu melhor e-mail" className="w-full px-4 py-2 rounded mb-3 text-gray-900 focus:outline-none" />
                            <button className="w-full bg-marica-red hover:bg-red-600 text-white font-bold py-2 rounded transition-colors">
                                Inscrever-se
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}