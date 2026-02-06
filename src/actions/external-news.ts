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

    const fetchSitemap = async (url: string, sourceName: string) => {
        try {
            const response = await fetch(url, { next: { revalidate: 300 }, headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' } });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const text = await response.text();

            const items: ExternalNewsItem[] = [];
            const urlBlocks = text.match(/<url>[\s\S]*?<\/url>/g) || [];

            for (const block of urlBlocks.slice(0, 5)) {
                const locMatch = block.match(/<loc>(.*?)<\/loc>/);
                const titleMatch = block.match(/<news:title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/news:title>/);
                const dateMatch = block.match(/<news:publication_date>(.*?)<\/news:publication_date>/);

                if (locMatch && titleMatch) {
                    items.push({
                        title: titleMatch[1],
                        link: locMatch[1],
                        pubDate: dateMatch ? dateMatch[1] : '',
                        source: sourceName
                    });
                }
            }
            return items;
        } catch (error) {
            console.error(`Erro ao buscar sitemap de ${sourceName}:`, error);
            return [];
        }
    };

    const [leiSeca, maricaInfo] = await Promise.all([
        fetchSitemap('https://leisecamarica.com.br/sitemap_gn.php', 'Lei Seca Maricá'),
        fetchFeed('https://maricainfo.com/feed/', 'Maricá Info')
    ]);

    return { leiSeca, maricaInfo };
}
