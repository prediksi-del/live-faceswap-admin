export const formatAiPayload = (imageRawBase64: string) => {
  // Membersihkan header base64 standar dataURI jika dibutuhkan oleh AI Node tertentu
  return imageRawBase64.replace(/^data:image\/[a-z]+;base64,/, "");
};

export const checkModelStatus = async (predictionId: string, token: string) => {
  // Utilitas pooling status antrean pengerjaan model AI jika tidak menggunakan asinkronus default
  const res = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
    headers: { Authorization: `Token ${token}` }
  });
  return await res.json();
};
