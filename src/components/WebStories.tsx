export function WebStories() {
    return (
        <section className="pl-4 md:pl-0 overflow-x-auto hide-scrollbar flex gap-4 py-4 bg-white border-y md:border-none md:bg-transparent">
            <div className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-16 h-16 rounded-full p-[3px] border-2 border-theme-primary">
                    <img
                        src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=100&h=100&fit=crop"
                        className="w-full h-full rounded-full object-cover"
                        alt="Carnaval"
                    />
                </div>
                <span className="text-[10px] font-bold uppercase text-gray-500 group-hover:text-theme-primary">Carnaval</span>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-16 h-16 rounded-full p-[3px] border-2 border-gray-200 group-hover:border-theme-primary">
                    <img
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop"
                        className="w-full h-full rounded-full object-cover"
                        alt="Saúde"
                    />
                </div>
                <span className="text-[10px] font-bold uppercase text-gray-500">Saúde</span>
            </div>
        </section>
    );
}
