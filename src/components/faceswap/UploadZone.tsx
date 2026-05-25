import React, { useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface UploadZoneProps {
  label: string;
  onImageSelected: (base64Str: string) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ label, onImageSelected }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onImageSelected(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">{label}</label>
      <div className="relative h-32 rounded-xl border border-dashed border-slate-700 bg-slate-900/50 hover:bg-slate-900 transition flex flex-col items-center justify-center p-4 cursor-pointer overflow-hidden group">
        {preview ? (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-950">
            <img src={preview} alt="Upload Target Preview" className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs font-medium">Ganti Gambar</div>
          </div>
        ) : (
          <>
            <Upload className="w-6 h-6 text-slate-500 mb-1" />
            <span className="text-xs text-slate-400">Klik / Seret file foto</span>
          </>
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
      </div>
    </div>
  );
};
