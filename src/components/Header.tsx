'use client';

import { Menu, Search, X } from 'lucide-react';
import { WeatherWidget } from './widgets/WeatherWidget';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchOverlay } from './SearchOverlay';
import { BrandLogo } from './BrandLogo';

function HeaderContent() {
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category') || 'Capa';
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const categories = [
        { name: "Capa", slug: "Capa" },
        { name: "Política", slug: "Política" },
        { name: "Cidade", slug: "Cidade" },
        { name: "Segurança", slug: "Segurança" },
        { name: "Esportes", slug: "Esportes" },
        { name: "Agenda Cultural", slug: "Agenda Cultural" },
    ];

    return (
        <header className="bg-white sticky top-0 z-50 shadow-sm border-b-2 border-theme-primary">
            {/* Top Utility Bar (Data e Info Rápida) */}
            <div className="bg-gray-50 border-b border-gray-100 py-1 hidden md:block">
                <div className="container mx-auto px-4 flex justify-between items-center text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                    <span>Quarta-feira, 05 de Fevereiro de 2026</span>
                    <div className="flex gap-3">
                        <Link href="/anuncie" className="hover:text-theme-primary">Anuncie</Link>
                        <Link href="/fale-conosco" className="hover:text-theme-primary">Fale Conosco</Link>
                        <Link href="/login" className="hover:text-theme-primary">Login</Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 h-16 flex items-center justify-between relative bg-white z-20">
                {/* Left: Menu & Mobile Date */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    {/* Desktop "Simple Logo" */}
                    <Link href="/" className="hidden md:flex items-center text-theme-primary gap-2 group">
                        <BrandLogo className="w-8 h-8 group-hover:scale-105 transition-transform duration-300" />
                    </Link>
                </div>

                {/* Center: Main Logo (Always Visible) */}
                <div className="text-2xl md:text-3xl font-black tracking-tighter text-theme-primary font-serif italic absolute left-1/2 -translate-x-1/2">
                    MARICÁ<span className="text-gray-800 font-light not-italic">AGORA</span>
                </div>

                {/* Right: Weather & Search */}
                <div className="flex items-center gap-2">

                    <div className="hidden md:block">
                        <WeatherWidget />
                    </div>

                    <div className="w-px h-6 bg-gray-200 mx-1"></div>

                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="p-2 text-gray-600 hover:text-theme-primary transition-colors"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            {/* Mobile Date & Weather (Stacked below logo) */}
            <div className="md:hidden flex flex-col items-center justify-center pb-3 bg-white relative z-20 gap-1 border-b border-gray-50">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    05 FEV • Quarta-feira
                </span>
                <WeatherWidget />
            </div>

            {/* SUB-HEADER / NAV (Tabs) */}
            <div className={clsx(
                "md:block border-t border-gray-100 bg-white overflow-hidden transition-all duration-300 ease-in-out origin-top",
                isMenuOpen ? "max-h-[400px] border-b shadow-lg" : "max-h-0 md:max-h-full"
            )}>
                {/* Mobile Extra Links */}
                <div className="md:hidden flex flex-col p-4 bg-gray-50 border-b border-gray-100 gap-3 text-sm font-bold text-gray-600">
                    <Link href="/anuncie" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 hover:text-theme-primary">
                        <span>📢</span> Anuncie
                    </Link>
                    <Link href="/fale-conosco" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 hover:text-theme-primary">
                        <span>💬</span> Fale Conosco
                    </Link>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 hover:text-theme-primary">
                        <span>🔒</span> Login
                    </Link>
                </div>

                <div className="container mx-auto flex flex-col md:flex-row overflow-x-auto hide-scrollbar text-xs md:text-sm font-bold text-gray-600 tracking-wide uppercase justify-start md:justify-center p-2 md:p-0">
                    {categories.map((cat) => {
                        const isActive = currentCategory === cat.slug || (currentCategory === '' && cat.slug === 'Capa');
                        return (
                            <Link
                                key={cat.slug}
                                href={cat.slug === 'Capa' ? '/' : `/?category=${cat.slug}`}
                                onClick={() => setIsMenuOpen(false)} // Close menu on click
                                className={clsx(
                                    "px-4 py-3 whitespace-nowrap border-l-4 md:border-l-0 md:border-b-2 transition-all text-left md:text-center",
                                    isActive
                                        ? "text-theme-primary border-theme-primary bg-gray-50/50"
                                        : "hover:text-theme-primary border-transparent hover:border-gray-200"
                                )}
                            >
                                {cat.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </header>
    );
}

export function Header() {
    return (
        <Suspense fallback={<div className="h-32 bg-white"></div>}>
            <HeaderContent />
        </Suspense>
    );
}
