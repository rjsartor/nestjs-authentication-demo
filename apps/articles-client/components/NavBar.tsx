import React, { FC } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const NavBar: FC = () => {
  const { user, isLoading } = useUser();

  const loginButton = (
    <Link href="/api/auth/login" className="btn btn-primary btn-margin" tabIndex={0}>
        Log in
    </Link>
  )

  const logoutButton = (
    <Link href="/api/auth/logout" className="btn btn-primary btn-margin" tabIndex={0}>
        Log out
    </Link>
  )

  return (
    <div className="nav-container" data-testid="navbar" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Link href="/">Home</Link>
      {!isLoading && !user && loginButton}
      {user && logoutButton}
    </div>
  );
};

export default NavBar;
