import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://swim-expert-app.vercel.app',
    process.env.FRONTEND_URL || ''
  ],
  credentials: true
}));

const PORT = process.env.PORT || 3000;

// --- SUPABASE ADMIN CLIENT ---
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// --- AUTH MIDDLEWARE ---
async function requireAuth(req: any, res: any, next: any) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) { res.status(401).json({ error: 'No token' }); return; }
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) { res.status(401).json({ error: 'Invalid token' }); return; }
  req.user = user;
  next();
}

// ✅ Health check
app.get('/health', (_, res) => {
  res.json({ status: '🏊 Swim Expert Backend Running!' });
});

// ✅ Create profile after signup
app.post('/profile', async (req: any, res: any) => {
  const { id, name, role } = req.body;
  const { data, error } = await supabase
    .from('profiles')
    .insert({ id, name, role });
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// ✅ Get own profile
app.get('/profile/me', requireAuth, async (req: any, res: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', req.user.id)
    .single();
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// ✅ Update XP
app.patch('/profile/xp', requireAuth, async (req: any, res: any) => {
  const { xp } = req.body;
  const { data, error } = await supabase
    .from('profiles')
    .update({ xp })
    .eq('id', req.user.id);
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// ✅ Get all athletes
app.get('/athletes', requireAuth, async (req: any, res: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'athlete');
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// ✅ Log nutrition
app.post('/nutrition', requireAuth, async (req: any, res: any) => {
  const { burned, consumed, hydration } = req.body;
  const { data, error } = await supabase
    .from('nutrition_logs')
    .insert({ user_id: req.user.id, burned, consumed, hydration });
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// ✅ Get latest nutrition log
app.get('/nutrition', requireAuth, async (req: any, res: any) => {
  const { data, error } = await supabase
    .from('nutrition_logs')
    .select('*')
    .eq('user_id', req.user.id)
    .order('logged_at', { ascending: false })
    .limit(1)
    .single();
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// ✅ Get all workouts
app.get('/workouts', requireAuth, async (req: any, res: any) => {
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// ✅ Create workout
app.post('/workouts', requireAuth, async (req: any, res: any) => {
  const { title, content } = req.body;
  const { data, error } = await supabase
    .from('workouts')
    .insert({ created_by: req.user.id, title, content });
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});