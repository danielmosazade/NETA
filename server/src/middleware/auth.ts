import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export default function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || (req.query.token as string) || '';
  const token = header.startsWith('Bearer ') ? header.split(' ')[1] : header;

  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: string; role?: string };

    // עכשיו TS מכיר ב־req.user בזכות ההרחבה של הטיפוס
    req.user = {
      id: payload.id,
      role: payload.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
