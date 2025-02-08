import axios from "axios";

export const getCertificatesByStudentId = async (studentId: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/certificates/${studentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar certificados:", error);
    throw new Error("Falha ao buscar certificados");
  }
};