import { Router } from 'express';
import auth from "../middleware/auth";
import isAdmin from "../middleware/IsAdmin";

const router = Router();

router.get('/', auth, isAdmin, (req, res) => {
  // אפשר להחזיר HTML או JSON; פה דוגמה פשוטה ב‑HTML
  res.send(`<h1>Admin panel</h1><p>Welcome, ${(req as any).user?.name ?? 'admin'}</p>`);
});

export default router;