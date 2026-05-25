import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

// Definisi skema inline sederhana ramah serverless
const UserSchema = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  plan: String,
  status: String,
}));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const users = await UserSchema.find({}).limit(10);
      return res.status(200).json({ success: true, data: users });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}
