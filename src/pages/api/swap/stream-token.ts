import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  
  // Menghasilkan token acak bertenggat waktu untuk otentikasi live websocket / WebRTC
  const mockStreamToken = `stream_tk_${Math.random().toString(36).substring(2, 15)}`;
  
  return res.status(200).json({
    success: true,
    token: mockStreamToken,
    endpoint: "wss://live-node.rayanxweb.io/rtc",
    expiresIn: 3600 // Validitas 1 jam
  });
}
