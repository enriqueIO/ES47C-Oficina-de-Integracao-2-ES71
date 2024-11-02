import axios from "axios";

interface LoginResponse {
  token: string;
}

export const loginService = async (
  userName: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/validateLogin`,
      {
        userName,
        password,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.error || "Erro ao fazer login");
  }
};
