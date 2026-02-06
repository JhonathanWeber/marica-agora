import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative bg-white md:bg-transparent shadow-sm md:shadow-none pb-4 md:pb-0">
            <Link href="/noticia/101" className="group block">
                <div className="aspect-video w-full overflow-hidden relative">
                    <img
                        src="https://www.marica.rj.gov.br/wp-content/uploads/2021/11/Vermelhinhos.png"
                        className="object-cover w-full h-full"
                        alt="Transporte Público"
                    />
                </div>

                <div className="px-4 pt-4 md:px-0">
                    <span className="text-theme-primary font-bold text-xs uppercase tracking-widest mb-1 block">Transporte Público</span>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-gray-900 mb-2 group-hover:text-theme-primary transition-colors">
                        Prefeitura anuncia ampliação da frota de 'Vermelhinhos' para o verão 2026
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed hidden md:block">
                        Novos veículos com ar-condicionado começam a circular nesta segunda-feira. Expectativa é atender 50 mil passageiros extras por dia.
                    </p>
                </div>
            </Link>
        </section>
    );
}
