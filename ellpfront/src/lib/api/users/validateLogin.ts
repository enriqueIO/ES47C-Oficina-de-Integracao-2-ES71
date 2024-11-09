import axios from "axios";

export const loginUser = async (userName: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/validateLogin`,
      {
        userName,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw new Error("Falha ao fazer login");
  }
};
