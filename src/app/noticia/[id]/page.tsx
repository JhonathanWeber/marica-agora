import { getNewsById } from "@/lib/news-service";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
    const { id } = await params;
    const news = await getNewsById(Number(id));

    if (!news) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-12">
            <ArticleView news={news} />
        </main>
    );
}
