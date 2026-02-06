
import { getNewsById } from "@/lib/news-service";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { Modal } from "@/components/Modal";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function InterceptedNewsPage({ params }: PageProps) {
    const { id } = await params;
    const news = await getNewsById(Number(id));

    if (!news) {
        notFound();
    }

    return (
        <Modal>
            <ArticleView news={news} isModal />
        </Modal>
    );
}