import { useUser } from '@auth0/nextjs-auth0/client';

function useIsAuthenticated(): boolean {
  const { user, isLoading } = useUser();
  return !isLoading && !!user;
}

export default useIsAuthenticated;
