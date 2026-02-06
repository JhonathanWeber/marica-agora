import { CloudSun } from 'lucide-react';

export function Sidebar() {
    return (
        <aside className="col-span-12 lg:col-span-4 px-4 md:px-0 pb-8 h-full">
            <div className="space-y-8 sticky top-24">

                {/* Widget: Mais Lidas (Ranking) */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-5 bg-theme-primary block rounded-full"></span>
                        Mais Lidas
                    </h3>
                    <ol className="space-y-4">
                        <li className="flex gap-3 items-start cursor-pointer group">
                            <span className="text-2xl font-black italic text-gray-200 -mt-1 group-hover:text-theme-primary transition-colors">1</span>
                            <p className="text-sm font-medium text-gray-700 leading-snug group-hover:text-theme-details">Calendário escolar 2026 é divulgado pela Secretaria de Educação</p>
                        </li>
                        <li className="flex gap-3 items-start cursor-pointer group">
                            <span className="text-2xl font-black italic text-gray-200 -mt-1 group-hover:text-theme-primary transition-colors">2</span>
                            <p className="text-sm font-medium text-gray-700 leading-snug group-hover:text-theme-details">Show de Alok confirmado para o aniversário da cidade</p>
                        </li>
                        <li className="flex gap-3 items-start cursor-pointer group">
                            <span className="text-2xl font-black italic text-gray-200 -mt-1 group-hover:text-theme-primary transition-colors">3</span>
                            <p className="text-sm font-medium text-gray-700 leading-snug group-hover:text-theme-details">Acidente na Serra do Lagarto deixa trânsito lento</p>
                        </li>
                        <li className="flex gap-3 items-start cursor-pointer group">
                            <span className="text-2xl font-black italic text-gray-200 -mt-1 group-hover:text-theme-primary transition-colors">4</span>
                            <p className="text-sm font-medium text-gray-700 leading-snug group-hover:text-theme-details">Vagas de estágio no setor de Petróleo; confira</p>
                        </li>
                        <li className="flex gap-3 items-start cursor-pointer group">
                            <span className="text-2xl font-black italic text-gray-200 -mt-1 group-hover:text-theme-primary transition-colors">5</span>
                            <p className="text-sm font-medium text-gray-700 leading-snug group-hover:text-theme-details">Previsão do tempo: Chuvas fortes esperadas para o fim de semana</p>
                        </li>
                    </ol>
                </div>

                {/* Widget: Últimas Notícias (Lista Cronológica) */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-5 bg-theme-details block rounded-full"></span>
                        Plantão
                    </h3>
                    <ul className="space-y-4 divide-y divide-gray-50 text-sm">
                        <li className="pt-3 first:pt-0">
                            <span className="text-[10px] text-gray-400 font-bold block mb-0.5">14:30</span>
                            <a href="#" className="font-medium text-gray-700 hover:text-theme-primary leading-snug block">
                                Defesa Civil emite alerta de ressaca para o litoral
                            </a>
                        </li>
                        <li className="pt-3">
                            <span className="text-[10px] text-gray-400 font-bold block mb-0.5">13:45</span>
                            <a href="#" className="font-medium text-gray-700 hover:text-theme-primary leading-snug block">
                                Inscrições para oficinas de teatro começam amanhã
                            </a>
                        </li>
                        <li className="pt-3">
                            <span className="text-[10px] text-gray-400 font-bold block mb-0.5">13:10</span>
                            <a href="#" className="font-medium text-gray-700 hover:text-theme-primary leading-snug block">
                                Moradores de Itaipuaçu relatam falta de luz; Enel responde
                            </a>
                        </li>
                        <li className="pt-3">
                            <span className="text-[10px] text-gray-400 font-bold block mb-0.5">12:30</span>
                            <a href="#" className="font-medium text-gray-700 hover:text-theme-primary leading-snug block">
                                Feira da Agricultura Familiar acontece neste sábado
                            </a>
                        </li>
                        <li className="pt-3">
                            <span className="text-[10px] text-gray-400 font-bold block mb-0.5">11:55</span>
                            <a href="#" className="font-medium text-gray-700 hover:text-theme-primary leading-snug block">
                                Time de Maricá vence etapa do campeonato estadual de Futsal
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Widget: Clima e Serviços */}
                <div className="bg-gradient-to-br from-theme-details to-blue-900 text-white p-5 rounded-xl shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="text-blue-200 text-xs font-medium uppercase">Agora em Maricá</span>
                            <div className="text-3xl font-bold">28°C</div>
                            <div className="text-sm text-blue-100">Parcialmente nublado</div>
                        </div>
                        <CloudSun className="w-12 h-12 text-yellow-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <button className="bg-white/20 hover:bg-white/30 p-2 rounded flex items-center justify-center gap-1 cursor-pointer">
                            Horários Onibus
                        </button>
                        <button className="bg-white/20 hover:bg-white/30 p-2 rounded flex items-center justify-center gap-1 cursor-pointer">
                            Farmácias
                        </button>
                    </div>
                </div>

            </div>
        </aside>
    );
}
