import { CloudSun } from 'lucide-react';

export function WeatherWidget() {
    return (
        <div className="flex flex-col items-end mr-1 cursor-pointer group">
            <div className="flex items-center gap-1 text-gray-700 leading-none">
                <span className="text-sm font-bold group-hover:text-theme-primary transition-colors">28°</span>
                <CloudSun className="w-4 h-4 text-yellow-500" />
            </div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide hidden md:block">
                Nublado
            </span>
        </div>
    );
}
