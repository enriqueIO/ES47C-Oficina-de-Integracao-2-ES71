import axios from "axios";

export const createWorkshop = async (workshopData: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/createWorkshop`,
      workshopData
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar workshop:", error);
    throw new Error("Falha ao cadastrar workshop");
  }
};
