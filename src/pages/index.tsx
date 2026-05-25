import { useState, useRef } from 'react';
import Head from 'next/head';
import { CameraPreview } from '@/components/faceswap/CameraPreview';
import { UploadZone } from '@/components/faceswap/UploadZone';
import { ControlPanel } from '@/components/faceswap/ControlPanel';
import { Eye, ShieldAlert } from 'lucide-react';

export default function Home() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [mode, setMode] = useState<'face_swap' | 'body_changer'>('face_swap');
  const [targetAsset, setTargetAsset] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<number>(85);
  const [isLoading, setIsLoading] = useState(false);
  const [outputResult, setOutputResult] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Fungsi utilitas menangkap screenshot frame kamera statis untuk dikirim ke API
  const captureFrame = (): string | null => {
    if (!videoRef.current || !isCameraActive) return null;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Balik horizontal (mirroring) agar sesuai tampilan kamera normal
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg');
    }
    return null;
  };

  const handleProcessTransformation = async () => {
    if (!targetAsset) {
      alert("Silakan unggah aset target (foto wajah atau pakaian) terlebih dahulu!");
      return;
    }

    let baseFrame = captureFrame();
    // Fallback jika kamera mati, gunakan placeholder internal untuk demo admin
    if (!baseFrame) {
      alert("Kamera tidak aktif. Menggunakan mode simulasi gambar statis.");
      baseFrame = targetAsset; 
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/swap/process-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceImage: targetAsset, // Gambar unggahan user
          targetImage: baseFrame,   // Snapshot kamera langsung
          mode: mode,
          intensity: intensity
        })
      });

      const data = await response.json();
      if (data.success) {
        setOutputResult(data.resultUrl);
      } else {
        alert("Gagal memproses AI: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kegagalan komunikasi dengan Vercel Serverless.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center px-4 md:px-8 pb-12">
      <Head>
        <title>Live Swap Suite - Web Admin Server</title>
      </Head>

      {/* Header Panel */}
      <header className="w-full max-w-7xl flex flex-col sm:flex-row justify-between items-center py-6 border-b border-slate-900 gap-4 mb-8">
        <div>
          <h1 className="text-xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
            LIVE SWAP SUITE PRO
          </h1>
          <p className="text-xs text-slate-500 font-medium">Real-Time Instant Face & Body Customization Suite</p>
        </div>

        {/* Mode Selector Router */}
        <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-800/80">
          <button 
            onClick={() => { setMode('face_swap'); setOutputResult(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'face_swap' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Face Swap Engine
          </button>
          <button 
            onClick={() => { setMode('body_changer'); setOutputResult(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'body_changer' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Body & Outfits Changer
          </button>
        </div>
      </header>

      {/* Workspace Grid */}
      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kontrol Input (Kolom Kiri) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <CameraPreview isActive={isCameraActive} onToggle={setIsCameraActive} videoRef={videoRef} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UploadZone 
              label={mode === 'face_swap' ? "1. Foto Wajah Target Baru" : "1. Foto Pakaian Baru"} 
              onImageSelected={setTargetAsset} 
            />
            <ControlPanel intensity={intensity} setIntensity={setIntensity} isLoading={isLoading} onExecute={handleProcessTransformation} />
          </div>
        </div>

        {/* Kontrol Output Monitor (Kolom Kanan) */}
        <div className="lg:col-span-5 flex flex-col gap-4 h-full">
          <div className="flex items-center gap-2 px-1">
            <Eye className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time Preview Screen</h2>
          </div>

          <div className="w-full flex-1 min-h-[400px] glass-panel rounded-2xl border border-slate-800 overflow-hidden flex flex-col items-center justify-center relative bg-slate-950">
            {outputResult ? (
              <img src={outputResult} alt="AI Instant Output" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center p-8 text-slate-600 max-w-sm flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-3">
                  <ShieldAlert className="w-5 h-5 text-slate-700" />
                </div>
                <p className="text-xs font-medium">Menunggu instruksi pemrosesan dari modul kontrol...</p>
              </div>
            )}

            {isLoading && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs text-purple-400 font-semibold tracking-wider">Menghubungkan ke Node GPU...</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
