import { Request, Response, NextFunction } from 'express';

export default function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  if (user?.role === 'admin') return next();
  return res.status(403).json({ error: 'Forbidden: admin only' });
}