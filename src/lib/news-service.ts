// Definição do Tipo de Notícia
export interface NewsItem {
    id: number;
    category: string;
    title: string;
    summary: string[];
    imageUrl: string;
    isExclusive?: boolean;
    content?: string;
    date?: string;
    author?: string;
}

// Banco de Dados Simulado (Mock)
const MOCK_NEWS_DATABASE: NewsItem[] = [
    // POLITICA
    {
        id: 101,
        category: "Cidade",
        title: "Vermelhinhos: Frota recorde garante Tarifa Zero em toda a cidade",
        summary: ["Transporte gratuito para todos", "Novas linhas para Itaipuaçu"],
        imageUrl: "https://www.marica.rj.gov.br/wp-content/uploads/2021/11/Vermelhinhos.png",
        isExclusive: true,
        date: "05 Fev 2026",
        author: "Redação Maricá Agora",
        content: `
            <p>A Prefeitura de Maricá anunciou nesta semana a ampliação histórica da frota de ônibus "Vermelhinhos", consolidando o programa de Tarifa Zero como referência nacional em mobilidade urbana. Com a chegada de 20 novos veículos articulados, a capacidade de transporte diário aumentará em cerca de 30%, beneficiando principalmente os moradores dos distritos de Itaipuaçu e Ponta Negra.</p>
            
            <p>"O transporte público gratuito não é apenas um benefício, é um direito do cidadão maricaense que garante acesso à saúde, educação e lazer", afirmou o prefeito em coletiva de imprensa. Os novos ônibus contam com ar-condicionado, wi-fi gratuito e portas USB para carregamento de celulares, elevando o padrão de qualidade do serviço.</p>

            <h3>Novas Linhas e Horários</h3>
            <p>Além do reforço nas rotas existentes, foram criadas duas novas linhas expressas que ligam o Terminal de Itaipuaçu diretamente ao Centro, reduzindo o tempo de viagem em até 20 minutos nos horários de pico. A grade completa de horários atualizada já está disponível no aplicativo oficial "Maricá App".</p>

            <p>A iniciativa faz parte do plano "Maricá 2030", que prevê a total integração dos modais de transporte da cidade, incluindo as bicicletas vermelhinhas, que também receberão novas estações até o final do semestre.</p>
        `
    },
    {
        id: 102,
        category: "Política",
        title: "Câmara aprova nova lei de zoneamento urbano",
        summary: ["Mudanças no plano diretor", "Áreas de expansão comercial"],
        imageUrl: "https://picsum.photos/seed/102/200/150"
    },
    {
        id: 103,
        category: "Política",
        title: "Prefeito anuncia pacote de obras para o próximo semestre",
        summary: ["Pavimentação de 50 ruas", "Construção de 2 PSFs"],
        imageUrl: "https://picsum.photos/seed/103/200/150"
    },

    // CIDADE
    {
        id: 201,
        category: "Cidade",
        title: "Prefeitura inaugura nova escola em tempo integral em Inoã",
        summary: ["Capacidade para 500 alunos", "Laboratórios de robótica"],
        imageUrl: "https://picsum.photos/seed/201/200/150"
    },
    {
        id: 202,
        category: "Cidade",
        title: "Reforma da Orla de Ponta Negra avança para segunda etapa",
        summary: ["Novo calçadão", "Ciclovia integrada"],
        imageUrl: "https://picsum.photos/seed/202/200/150"
    },
    {
        id: 203,
        category: "Cidade",
        title: "Mutirão de limpeza recolhe 10 toneladas de lixo em Itaipuaçu",
        summary: ["Participação de voluntários", "Ação da Somar"],
        imageUrl: "https://picsum.photos/seed/203/200/150"
    },

    // SEGURANÇA
    {
        id: 301,
        category: "Segurança",
        title: "Novos radares começam a operar na RJ-106 na segunda-feira",
        summary: ["Limite de 60km/h", "Fiscalização 24h"],
        imageUrl: "https://picsum.photos/seed/301/200/150"
    },
    {
        id: 302,
        category: "Segurança",
        title: "PROEIS apreende motos irregulares em blitz no Centro",
        summary: ["Operação Lei Seca", "Fiscalização de documentação"],
        imageUrl: "https://picsum.photos/seed/302/200/150"
    },
    {
        id: 303,
        category: "Segurança",
        title: "Guarda Municipal recebe novos veículos para patrulhamento",
        summary: ["10 novas viaturas", "Investimento de R$ 1 milhão"],
        imageUrl: "https://picsum.photos/seed/303/200/150"
    },

    // ESPORTES
    {
        id: 401,
        category: "Esportes",
        title: "Maricá FC anuncia novos reforços para a temporada",
        summary: ["Três jogadores da série A", "Estreia prevista para Março"],
        imageUrl: "https://picsum.photos/seed/401/200/150"
    },
    {
        id: 402,
        category: "Esportes",
        title: "Etapa do campeonato de Surf acontece neste domingo",
        summary: ["Praia de Ponta Negra", "Atletas internacionais"],
        imageUrl: "https://picsum.photos/seed/402/200/150"
    },

    // AGENDA CULTURAL
    {
        id: 501,
        category: "Agenda Cultural",
        title: "Festival de Jazz deve atrair 20 mil pessoas neste fim de semana",
        summary: ["Palcos em Araçatiba e Itaipuaçu", "Entrada franca"],
        imageUrl: "https://picsum.photos/seed/501/200/150"
    },
    {
        id: 502,
        category: "Agenda Cultural",
        title: "Exposição de arte popular abre no Cine Henfil",
        summary: ["Artistas locais", "Até 30 de Março"],
        imageUrl: "https://picsum.photos/seed/502/200/150"
    },

    // GERAIS / OUTROS
    {
        id: 601,
        category: "Turismo",
        title: "Maricá recebe selo de destino turístico sustentável",
        summary: ["Reconhecimento internacional", "Foco em áreas de preservação"],
        imageUrl: "https://picsum.photos/seed/601/200/150"
    },
    {
        id: 602,
        category: "Meio Ambiente",
        title: "Projeto de reflorestamento planta 2 mil mudas na Restinga",
        summary: ["Parceria com escolas municipais", "Espécies nativas"],
        imageUrl: "https://picsum.photos/seed/602/200/150"
    }
];

export async function getNewsById(id: number): Promise<NewsItem | null> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 300));

    const news = MOCK_NEWS_DATABASE.find(item => item.id === id);

    if (news && !news.content) {
        // Fallback content if missing
        return {
            ...news,
            date: "01 Fev 2026",
            author: "Redação Maricá Agora",
            content: `
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h3>Impacto na Região</h3>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
             `
        };
    }

    return news || null;
}

export async function searchNews(query: string): Promise<NewsItem[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const term = query.toLowerCase();

    return MOCK_NEWS_DATABASE.filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.summary.some(s => s.toLowerCase().includes(term))
    );
}

// Simulador de API com Paginação e Filtro
export async function fetchNews(page: number, category: string = 'Capa', limit: number = 4): Promise<NewsItem[]> {
    // Simula delay de rede (1.5s)
    await new Promise(resolve => setTimeout(resolve, 800)); // Reduzi um pouco o delay

    // Filtra por categoria
    let filteredItems = MOCK_NEWS_DATABASE;

    if (category !== 'Capa') {
        // Normaliza para comparação (case insensitive e remove acentos se precisar, mas aqui o mock tá fixo)
        filteredItems = MOCK_NEWS_DATABASE.filter(item =>
            item.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Se não tiver itens suficientes para a categoria, repetimos para simular infinito
    // Apenas para efeito de demonstração de scroll infinito mesmo com poucos dados
    if (filteredItems.length < 10 && filteredItems.length > 0) {
        // Repete os itens x4
        filteredItems = [...filteredItems, ...filteredItems, ...filteredItems, ...filteredItems];
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    return filteredItems.slice(start, end);
}
