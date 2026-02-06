import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function FaleConoscoPage() {
    return (
        <main className="container mx-auto px-4 py-8 md:py-12">

            <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                {/* Left Column: Info */}
                <div>
                    <span className="text-theme-details font-bold uppercase tracking-wider text-sm mb-2 block">
                        Contato
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-theme-primary mb-6">
                        Fale Conosco
                    </h1>
                    <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                        Tem alguma sugestão de pauta, dúvida, crítica ou elogio? Queremos ouvir você. Utilize o formulário ou nossos canais diretos para entrar em contato.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-gray-100 p-3 rounded-full text-theme-details">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-theme-primary">E-mail</h3>
                                <p className="text-gray-600">Para pautas e redação:</p>
                                <a href="mailto:redacao@maricanews.com.br" className="text-theme-details hover:underline font-medium">redacao@maricanews.com.br</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-gray-100 p-3 rounded-full text-theme-details">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-theme-primary">Telefone / WhatsApp</h3>
                                <p className="text-gray-600">Atendimento de Seg. a Sex. das 9h às 18h</p>
                                <a href="tel:+5521999999999" className="text-theme-details hover:underline font-medium">(21) 99999-9999</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-gray-100 p-3 rounded-full text-theme-details">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-theme-primary">Redação</h3>
                                <p className="text-gray-600">
                                    Rua Ribeiro de Almeida, 123 - Centro<br />
                                    Maricá - RJ, 24900-000
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-theme-primary mb-6">Envie uma mensagem</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-details focus:border-transparent outline-none transition-all"
                                    placeholder="Seu nome completo"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-details focus:border-transparent outline-none transition-all"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-details focus:border-transparent outline-none transition-all bg-white">
                                <option>Sugestão de Pauta</option>
                                <option>Comercial / Anuncie</option>
                                <option>Erro no site</option>
                                <option>Outros</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                            <textarea
                                rows={5}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-details focus:border-transparent outline-none transition-all resize-none"
                                placeholder="Digite sua mensagem aqui..."
                            ></textarea>
                        </div>

                        <button
                            type="button"
                            className="w-full bg-theme-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-theme-details transition-colors flex items-center justify-center gap-2"
                        >
                            <Send className="w-5 h-5" />
                            Enviar Mensagem
                        </button>
                    </form>
                </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-20 w-full h-80 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <span>Mapa de Localização (Google Maps Integrado)</span>
                </div>
            </div>

        </main>
    );
}
