import { NextApiRequest, NextApiResponse } from 'next';
import { handleCallback, Session } from '@auth0/nextjs-auth0';

export default async function callback(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    await handleCallback(req, res, {
      afterCallback: async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
        if (session && session.user) {
          const accessToken = session.accessToken || session.idToken;

          if (!accessToken) throw new Error('No access token retrieved');

          const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                email: session.user.name,
                name: session.user.nickname,
            }),
          });
          
          const backendData = await backendResponse.json();

          if (!backendResponse.ok) throw new Error('Failed to fetch JWT from the backend');

          res.setHeader('Set-Cookie', `token=${backendData.access_token}; HttpOnly; Secure; Path=/; SameSite=Strict;`);

          session.returnTo = req.query.returnTo || '/';
          return session;
        } else {
          console.warn('No session or user information found');
        }
      },
    });
  } catch (error: any) {
    console.error('Error in callback:', error);
    res.status(error.status || 500).end(error.message);
  }
}
