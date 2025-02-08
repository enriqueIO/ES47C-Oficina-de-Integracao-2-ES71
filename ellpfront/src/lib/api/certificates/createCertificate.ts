import axios from "axios";

export const createCertificate = async (certificateData: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/certificates`,
      certificateData
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao criar certificado:", error);
    throw new Error("Falha ao criar certificado");
  }
};