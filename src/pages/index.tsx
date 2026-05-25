import { useState, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const [cameraActive, setCameraActive] = useState(false);
  const [mode, setMode] = useState<'face_swap' | 'body_changer'>('face_swap');
  const [uploadImg, setUploadImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mengaktifkan Kamera Browser (Tanpa Download)
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      alert("Gagal mengakses kamera. Pastikan izin diberikan.");
    }
  };

  // Simulasi Handle Upload Gambar Target (Wajah/Baju)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerSwap = async () => {
    if (!uploadImg) return alert("Silakan upload foto target terlebih dahulu!");
    setLoading(true);

    // Pada implementasi produksi, Anda mengambil snapshot dari videoRef 
    // lalu mengirimkannya bersama uploadImg ke /api/swap/process-image
    try {
      const response = await fetch('/api/swap/process-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceImage: uploadImg, 
          targetImage: uploadImg, // Placeholder snapshot kamera
          mode: mode
        })
      });
      const data = await response.json();
      if (data.success) setResultImage(data.resultUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-6">
      <Head>
        <title>Live Face & Body Swap Admin</title>
      </Head>

      <header className="w-full max-w-6xl flex justify-between items-center mb-10 py-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          AI-SWAPPER LIVE
        </h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setMode('face_swap')} 
            className={`px-4 py-2 rounded-lg transition ${mode === 'face_swap' ? 'bg-blue-600' : 'bg-slate-800'}`}>
            Face Swap
          </button>
          <button 
            onClick={() => setMode('body_changer')} 
            className={`px-4 py-2 rounded-lg transition ${mode === 'body_changer' ? 'bg-blue-600' : 'bg-slate-800'}`}>
            Body Changer
          </button>
        </div>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Panel Kiri: Live Camera & Kontrol */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-slate-300">Live Camera Feed</h2>
          <div className="w-full aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800 relative">
            {cameraActive ? (
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            ) : (
              <button onClick={startCamera} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium transition">
                Aktifkan Kamera Browser
              </button>
            )}
          </div>

          {/* Upload Target Zone */}
          <div className="w-full mt-6">
            <label className="block text-sm text-slate-400 mb-2">
              {mode === 'face_swap' ? 'Upload Foto Wajah Target:' : 'Upload Foto Pakaian Baru:'}
            </label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"/>
          </div>

          <button 
            onClick={triggerSwap}
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 rounded-xl font-bold transition disabled:opacity-50">
            {loading ? 'Sedang Memproses AI...' : 'Terapkan Perubahan Instan'}
          </button>
        </div>

        {/* Panel Kanan: Hasil Instan */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-between">
          <h2 className="text-xl font-semibold mb-4 text-slate-300">Hasil Real-Time</h2>
          <div className="w-full h-full min-h-[300px] bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 overflow-hidden">
            {resultImage ? (
              <img src={resultImage} alt="AI Result" className="w-full h-full object-contain" />
            ) : (
              <p className="text-slate-500 text-sm">Belum ada pemrosesan.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
          }
