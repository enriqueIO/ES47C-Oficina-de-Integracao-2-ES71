import axios from "axios";

export const getAllStudents = async () => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      throw new Error("A variável NEXT_PUBLIC_BACKEND_URL não está definida.");
    }

    const response = await axios.get(`${backendUrl}/getAllStudents`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar os alunos:", error);
    throw new Error(
      error.response?.data?.message || "Falha ao buscar os alunos"
    );
  }
};
