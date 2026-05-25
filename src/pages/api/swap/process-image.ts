import type { NextApiRequest, NextApiResponse } from 'next';
import Replicate from 'replicate';
import dbConnect from '@/lib/mongodb';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method tidak diizinkan' });
  }

  try {
    await dbConnect();
    const { sourceImage, targetImage, mode } = req.body; 
    // mode: 'face_swap' atau 'body_changer'

    if (!sourceImage || !targetImage) {
      return res.status(400).json({ error: 'Data gambar tidak lengkap' });
    }

    let prediction;

    if (mode === 'face_swap') {
      // Menggunakan model Roop / Face Swap populer di Replicate
      prediction = await replicate.run(
        "lucataco/faceswap:9a4234604e9af9c33101693fb747c956e9ee01d96099521cc3414abfc2b24622",
        {
          input: {
            target_image: targetImage, // Foto asli / background
            source_image: sourceImage, // Wajah yang ingin ditempel
          }
        }
      );
    } else {
      // Mode Body Changer / Virtual Try-On (Contoh menggunakan model IDM-VTON)
      prediction = await replicate.run(
        "cuuupid/idm-vton:c871002798e34a2945d4350a1fe5002ec80672883f3fcc32f628c68b8e0da292",
        {
          input: {
            garm_img: sourceImage, // Foto baju baru
            human_img: targetImage, // Foto seluruh badan orang
            garment_des: "Pakaian modis baru"
          }
        }
      );
    }

    return res.status(200).json({ success: true, resultUrl: prediction });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
              }
