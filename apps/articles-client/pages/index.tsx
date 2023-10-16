import Link from 'next/link';

export function Home() {
  return (
    <div className="container" style={{ 
      padding: '10px', 
      fontSize: '20px' 
    }}>
      <Link href="/resources" passHref style={{
          display: 'inline-block',
          color: 'black',
          textDecoration: 'none',
          cursor: 'pointer'
      }}>
          Resources
      </Link>
    </div>
  );
}

export default Home;
