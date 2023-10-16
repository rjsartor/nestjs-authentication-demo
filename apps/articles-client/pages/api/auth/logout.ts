import { handleLogout } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function logout(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
  await handleLogout(req, res);
}