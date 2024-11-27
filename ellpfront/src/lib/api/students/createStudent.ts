import axios from "axios";

export const createStudent = async (studentData: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/createStudent`,
      studentData
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
    throw new Error("Falha ao cadastrar aluno");
  }
};
