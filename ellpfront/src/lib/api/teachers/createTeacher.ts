import axios from "axios";

export const createTeacher = async (teacherData: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/createTeacher`,
      teacherData
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar professor:", error);
    throw new Error("Falha ao cadastrar professor");
  }
};
