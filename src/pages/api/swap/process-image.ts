import type { NextApiRequest, NextApiResponse } from 'next';
import Replicate from 'replicate';
import dbConnect from '@/lib/mongodb';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
});

export const config = {
  api: { configFile: true, bodyParser: { sizeLimit: '10mb' } },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await dbConnect();
    const { sourceImage, targetImage, mode, intensity } = req.body;

    if (!sourceImage || !targetImage) {
      return res.status(400).json({ error: 'Missing required image parameters' });
    }

    let predictionOutput;

    if (mode === 'face_swap') {
      // Menggunakan arsitektur model InsightFace/Roop di Replicate
      predictionOutput = await replicate.run(
        "lucataco/faceswap:9a4234604e9af9c33101693fb747c956e9ee01d96099521cc3414abfc2b24622",
        {
          input: {
            target_image: targetImage, // Feed dasar (dari webcam/base)
            source_image: sourceImage, // Wajah yang ingin ditempel
          }
        }
      );
    } else {
      // Mode Body/Clothes Changer (Virtual Try-On menggunakan IDM-VTON)
      predictionOutput = await replicate.run(
        "cuuupid/idm-vton:c871002798e34a2945d4350a1fe5002ec80672883f3fcc32f628c68b8e0da292",
        {
          input: {
            garm_img: sourceImage,   // Aset pakaian/tubuh baru
            human_img: targetImage,   // Foto badan dasar pengguna
            garment_des: "Pakaian kustom admin modis"
          }
        }
      );
    }

    return res.status(200).json({ success: true, resultUrl: predictionOutput });

  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
