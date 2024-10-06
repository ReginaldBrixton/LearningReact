import { auth } from '../../app/firebaseConfig';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { idToken } = req.body;
    
    try {
      const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
      const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
      
      res.setHeader(
        'Set-Cookie',
        serialize('session', sessionCookie, {
          maxAge: expiresIn,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
        })
      );
      
      res.status(200).json({ status: 'success' });
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}