
export function BrandLogo({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Fundo  */}
            <rect width="100" height="100" rx="20" className="fill-theme-primary" />

            {/* Letra M estilizada como Ondas/Montanhas */}
            <path
                d="M20 70V30L50 60L80 30V70"
                stroke="white"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
