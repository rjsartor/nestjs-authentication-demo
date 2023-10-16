import styles from './index.module.css';
import Link from 'next/link';

export function Home() {
  return (
    <div className={styles.page}>
      <div className="container">
        <Link href={`/resources`} passHref>
            Resources
        </Link>
      </div>
    </div>
  );
}

export default Home;
