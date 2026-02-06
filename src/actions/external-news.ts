'use server';

import Parser from 'rss-parser';

type ExternalNewsItem = {
    title: string;
    link: string;
    pubDate: string;
    source: string;
};

export async function fetchCompetitorNews(): Promise<{ leiSeca: ExternalNewsItem[], maricaInfo: ExternalNewsItem[] }> {
    const parser = new Parser();

    // Configura um timeout para não travar se um site estiver lento
    const fetchFeed = async (url: string, sourceName: string) => {
        try {
            const feed = await parser.parseURL(url);
            return feed.items.slice(0, 5).map(item => ({
                title: item.title || 'Sem título',
                link: item.link || '#',
                pubDate: item.pubDate || '',
                source: sourceName
            }));
        } catch (error) {
            console.error(`Erro ao buscar feed de ${sourceName}:`, error);
            return [];
        }
    };

    const [leiSeca, maricaInfo] = await Promise.all([
        fetchFeed('https://leisecamarica.com.br/feed/', 'Lei Seca Maricá'),
        fetchFeed('https://maricainfo.com/feed/', 'Maricá Info')
    ]);

    return { leiSeca, maricaInfo };
}
