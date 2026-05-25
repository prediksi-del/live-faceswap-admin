import React, { useEffect, useRef } from 'react';
import { Camera, CameraOff } from 'lucide-react';

interface CameraPreviewProps {
  isActive: boolean;
  onToggle: (active: boolean) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export const CameraPreview: React.FC<CameraPreviewProps> = ({ isActive, onToggle, videoRef }) => {
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        onToggle(true);
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert("Izin kamera ditolak atau perangkat tidak mendukung.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      streamRef.current = null;
      onToggle(false);
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden glass-card relative flex flex-col items-center justify-center border border-slate-800">
      {isActive ? (
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100" />
      ) : (
        <div className="text-center p-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 mb-4">
            <CameraOff className="w-8 h-8 text-slate-500" />
          </div>
          <p className="text-slate-400 text-sm mb-4">Kamera belum aktif</p>
          <button onClick={startCamera} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 transition rounded-xl font-medium text-sm flex items-center gap-2">
            <Camera className="w-4 h-4" /> Aktifkan Kamera Live
          </button>
        </div>
      )}

      {isActive && (
        <button onClick={stopCamera} className="absolute bottom-4 right-4 bg-red-600/80 hover:bg-red-600 text-white p-2.5 rounded-xl text-xs font-semibold backdrop-blur transition">
          Matikan Kamera
        </button>
      )}
    </div>
  );
};
