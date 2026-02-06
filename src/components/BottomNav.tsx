import { Home, Newspaper, PlayCircle, Calendar, Menu } from 'lucide-react';

export function BottomNav() {
    return (
        <nav className="md:hidden fixed bottom-0 w-full bg-white border-t flex justify-around py-3 z-50 text-gray-500 text-[10px] font-medium safe-area-bottom">
            <a href="#" className="flex flex-col items-center text-blue-600">
                <Home className="w-6 h-6 mb-1" />
                Home
            </a>
            <a href="#" className="flex flex-col items-center hover:text-blue-600">
                <Newspaper className="w-6 h-6 mb-1" />
                Notícias
            </a>
            <a href="#" className="flex flex-col items-center hover:text-blue-600">
                <div className="bg-blue-600 text-white rounded-full p-2 -mt-6 border-4 border-gray-50">
                    <PlayCircle className="w-6 h-6" />
                </div>
                <span className="mt-1">Vídeos</span>
            </a>
            <a href="#" className="flex flex-col items-center hover:text-blue-600">
                <Calendar className="w-6 h-6 mb-1" />
                Eventos
            </a>
            <a href="#" className="flex flex-col items-center hover:text-blue-600">
                <Menu className="w-6 h-6 mb-1" />
                Menu
            </a>
        </nav>
    );
}
