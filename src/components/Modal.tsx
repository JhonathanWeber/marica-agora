
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const overlayRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const onDismiss = () => {
        router.back();
    };

    const onClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current || e.target === wrapperRef.current) {
            onDismiss();
        }
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onDismiss();
    };

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div
            ref={overlayRef}
            onClick={onClick}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm overflow-hidden animate-in fade-in duration-300"
        >
            <div
                ref={wrapperRef}
                className="relative w-full max-w-4xl max-h-full overflow-y-auto rounded-xl bg-transparent scrollbar-hide shadow-2xl"
                onClick={onClick}
            >
                <div className="relative bg-white rounded-xl overflow-hidden" onClick={e => e.stopPropagation()}>
                    <button
                        onClick={onDismiss}
                        className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-sm"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
}
