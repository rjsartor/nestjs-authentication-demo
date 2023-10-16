import React, { FC } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const buttonStyle = {
  padding: '10px 20px',
  color: 'black',
  textDecoration: 'none',
  borderRadius: '5px',
  marginLeft: '10px',
  border: '1px solid black',
};

const navContainerStyle = {
  padding: '20px',
  backgroundColor: '#E0E0E0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const linkStyle = {
  textDecoration: 'none',
  color: 'black',
  marginRight: '10px'
};

const NavBar: FC = () => {
  const { user, isLoading } = useUser();

  const loginButton = (
    <Link href="/api/auth/login" style={{ ...buttonStyle, ...linkStyle }}>Log in
    </Link>
  );

  const logoutButton = (
    <Link href="/api/auth/logout" style={{ ...buttonStyle, ...linkStyle }}>Log out
    </Link>
  );

  return (
    <div className="nav-container" data-testid="navbar" style={navContainerStyle}>
      <Link href="/" style={linkStyle}>Home</Link>
      {!isLoading && !user && loginButton}
      {user && logoutButton}
    </div>
  );
};

export default NavBar;
