'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { NewsItem, fetchNews } from '@/lib/news-service';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function NewsListContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || 'Capa';

    const [items, setItems] = useState<NewsItem[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);

    // Reset list when category changes
    useEffect(() => {
        setItems([]);
        setPage(1);
        setHasMore(true);
    }, [category]);

    const loadNews = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const newItems = await fetchNews(page, category);
            if (newItems.length === 0) {
                setHasMore(false);
            } else {
                setItems(prev => [...prev, ...newItems]);
            }
        } catch (error) {
            console.error("Erro ao carregar notícias:", error);
        } finally {
            setLoading(false);
        }
    }, [page, category, hasMore]); // depend on category

    useEffect(() => {
        loadNews();
    }, [page, category]); // trigger when page OR category changes

    const lastNewsElementRef = useCallback((node: HTMLElement | null) => {
        if (loading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return (
        <section className="bg-white md:bg-transparent px-4 py-2 space-y-6 divide-y md:divide-y-0">

            {/* Category Heading (Optional, good for feedback) */}
            <div className="md:hidden py-2 border-b border-gray-100 mb-4">
                <h3 className="font-serif font-bold text-lg text-theme-primary">
                    {category === 'Capa' ? 'Últimas Notícias' : category}
                </h3>
            </div>

            {items.map((news, index) => {
                const isLastElement = items.length === index + 1;

                return (
                    <motion.article
                        key={`${news.id}-${index}`}
                        ref={isLastElement ? lastNewsElementRef : null}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="pt-6 md:pt-0"
                    >
                        <Link href={`/noticia/${news.id}`} className="flex gap-4 group cursor-pointer w-full">
                            <div className="flex-1">
                                {news.isExclusive ? (
                                    <span className="bg-theme-details text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase mb-2 inline-block">
                                        Exclusivo
                                    </span>
                                ) : (
                                    <span className="text-theme-details text-xs font-bold uppercase mb-1 block">
                                        {news.category}
                                    </span>
                                )}

                                <h2 className="text-xl font-serif font-bold leading-tight mb-2 group-hover:text-theme-primary transition-colors">
                                    {news.title}
                                </h2>

                                {news.isExclusive ? (
                                    <div className="md:hidden mt-2 text-xs text-theme-details font-bold uppercase">
                                        Ler matéria completa
                                    </div>
                                ) : (
                                    <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside mt-2">
                                        {news.summary.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <img
                                src={news.imageUrl}
                                className="w-32 h-24 object-cover shrink-0 transition-all duration-300 rounded-md bg-gray-100"
                                alt={news.title}
                            />
                        </Link>
                    </motion.article>
                );
            })}

            {loading && (
                <div className="space-y-6 pt-6">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex gap-4 animate-pulse">
                            <div className="flex-1 space-y-3">
                                <div className="h-3 w-20 bg-gray-200 rounded"></div>
                                <div className="h-6 w-full bg-gray-200 rounded"></div>
                                <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
                                <div className="space-y-2 pt-2">
                                    <div className="h-2 w-full bg-gray-100 rounded"></div>
                                    <div className="h-2 w-4/5 bg-gray-100 rounded"></div>
                                </div>
                            </div>
                            <div className="w-32 h-24 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            )}

            {!hasMore && (
                <div className="text-center py-8 text-gray-400 text-sm italic font-serif">
                    Sem mais notícias nesta categoria.
                </div>
            )}

        </section>
    );
}

export function NewsList() {
    return (
        <Suspense fallback={<div className="p-4">Carregando feed...</div>}>
            <NewsListContent />
        </Suspense>
    );
}
