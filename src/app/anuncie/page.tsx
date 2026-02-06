import { Megaphone, TrendingUp, Users, Target } from 'lucide-react';

export default function AnunciePage() {
    return (
        <main className="container mx-auto px-4 py-8 md:py-12">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-theme-details font-bold uppercase tracking-wider text-sm mb-2 block">
                    Mídia Kit
                </span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-theme-primary mb-6">
                    Anuncie no Maricá Agora
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Conecte sua marca ao maior portal de notícias da região. Alcance milhares de leitores diários e fortaleça sua presença digital com quem entende de Maricá.
                </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-y border-gray-100 py-12">
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-theme-dark mb-2">150k+</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Leitores Mensais</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-theme-dark mb-2">500k</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Visualizações</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-theme-dark mb-2">45k</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Seguidores</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-theme-dark mb-2">10+</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Anos de História</div>
                </div>
            </div>

            {/* Why Advertise Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
                <div className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
                    <TrendingUp className="w-10 h-10 text-theme-details mb-4" />
                    <h3 className="text-xl font-bold text-theme-primary mb-3">Alta Visibilidade</h3>
                    <p className="text-gray-600">
                        Sua marca em destaque nas principais notícias da cidade, garantindo máxima exposição para o público local.
                    </p>
                </div>
                <div className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
                    <Target className="w-10 h-10 text-theme-details mb-4" />
                    <h3 className="text-xl font-bold text-theme-primary mb-3">Público Qualificado</h3>
                    <p className="text-gray-600">
                        Fale diretamente com quem toma decisões de compra em Maricá e região. Segmentação precisa para seu negócio.
                    </p>
                </div>
                <div className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
                    <Users className="w-10 h-10 text-theme-details mb-4" />
                    <h3 className="text-xl font-bold text-theme-primary mb-3">Credibilidade</h3>
                    <p className="text-gray-600">
                        Associe sua empresa a um veículo de comunicação sério, isento e respeitado pela comunidade.
                    </p>
                </div>
            </div>

            {/* Formats Section */}
            <div className="mb-20">
                <h2 className="text-3xl font-serif font-bold text-theme-primary mb-10 text-center">Formatos Disponíveis</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="border border-gray-200 rounded-xl p-6 flex gap-4 items-start">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                        <div>
                            <h4 className="font-bold text-lg mb-2">Banners Display</h4>
                            <p className="text-sm text-gray-600">Espaços estratégicos na home, topo e lateral das matérias. Diversos tamanhos (300x250, 728x90, etc).</p>
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-6 flex gap-4 items-start">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                        <div>
                            <h4 className="font-bold text-lg mb-2">Publieditorial</h4>
                            <p className="text-sm text-gray-600">Conteúdo patrocinado escrito por nossa equipe de jornalismo, contando a história da sua marca de forma envolvente.</p>
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-6 flex gap-4 items-start">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                        <div>
                            <h4 className="font-bold text-lg mb-2">Redes Sociais</h4>
                            <p className="text-sm text-gray-600">Posts colaborativos e stories no Instagram e Facebook do Maricá Agora.</p>
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-6 flex gap-4 items-start">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                        <div>
                            <h4 className="font-bold text-lg mb-2">Projetos Especiais</h4>
                            <p className="text-sm text-gray-600">Coberturas de eventos, lives e séries de reportagens patrocinadas sob medida.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-theme-primary text-white rounded-2xl p-8 md:p-16 text-center">
                <Megaphone className="w-12 h-12 mx-auto mb-6 text-theme-details" />
                <h2 className="text-3xl font-bold mb-4">Pronto para destacar sua marca?</h2>
                <p className="text-white/80 max-w-2xl mx-auto mb-8">
                    Entre em contato com nossa equipe comercial e solicite nosso Mídia Kit atualizado com tabela de preços.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <a href="mailto:comercial@maricanews.com.br" className="bg-white text-theme-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                        comercial@maricanews.com.br
                    </a>
                    <a href="tel:+5521999999999" className="bg-theme-details text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors">
                        (21) 99999-9999
                    </a>
                </div>
            </div>
        </main>
    );
}
