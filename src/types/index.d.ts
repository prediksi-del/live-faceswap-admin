export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface SwapRequestPayload {
  sourceImage: string;
  targetImage: string;
  mode: 'face_swap' | 'body_changer';
  intensity: number;
}
