import { useEffect, useState } from 'react';
import styles from './index.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import useIsAuthenticated from '../hooks/useIsAuthenticated.hook';
import { Article } from './article/[id]';

export function Resources() {
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();

  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/titles`);
      if (res.status === 200) setArticles(res.data);
    }

    fetchArticles();
  }, [])

  const handleArticleClick = (articleId: string) => {
    if (!isAuthenticated) {
      const currentPath = router.asPath;
      router.push(`/api/auth/login?returnTo=${currentPath}`);    
      return;
    }
  
    router.push(`/article/${articleId}`);
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <div id="commands" className="rounded shadow">
          <h2>Articles</h2>
          <p>Click on an article to view</p>
          <ul>
            {articles.length && articles.map((a: Article) => (
              <li key={a?.id}>
                  <button onClick={() => handleArticleClick(a.id)}>
                  {a?.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Resources;