import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export interface Article {
  id: string;
  title: string;
  author: string;
  content: string;
}

const ArticleDetails: React.FC = () => {
  const [article, setArticle] = useState<Partial<Article>>({});
  const [error, setError] = useState<string | null>();
  const router = useRouter();
  const { id } = router.query;

  const goBack = () => router.push('/resources');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${id}`, { withCredentials: true });
        if (res.status === 200) setArticle(res.data);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          const currentPath = router.asPath;
          router.push(`/api/auth/login?returnTo=${currentPath}`); 
          setError(`${error.response.statusText} - ${error.response.data.message}`);
        }
      }
    }

    fetchArticle();
  }, [id, router])

  if (error) {
    return (
      <div>
        <p> {error}</p>
        <button onClick={() => router.push('/resources')}>Back</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <h3>{article.author}</h3>
      <p>{article.content}</p>
      <button onClick={goBack}>Back</button>
    </div>
  );
}

export default ArticleDetails;
