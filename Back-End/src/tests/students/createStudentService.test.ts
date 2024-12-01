import { createStudentService } from "../../services/students/createStudentService";
import { createStudentRepository } from "../../repository/students/createStudentRepository";

jest.mock("../../repository/students/createStudentRepository");

describe("createStudentService", () => {
  it("deve chamar o repositório com os dados corretos e retornar o resultado", async () => {
    const mockCreateStudentRepository = createStudentRepository as jest.Mock;

    mockCreateStudentRepository.mockResolvedValue({
      id: "123",
      name: "Maria Silva",
      userName: "mariasilva",
      password: "hashedPassword123",
      phone: "987654321",
      email: "maria.silva@example.com",
    });

    const inputData = {
      name: "Maria Silva",
      userName: "mariasilva",
      password: "hashedPassword123",
      phone: "987654321",
      email: "maria.silva@example.com",
    };

    const result = await createStudentService(inputData);

    expect(mockCreateStudentRepository).toHaveBeenCalledWith(inputData);

    expect(result).toEqual({
      id: "123",
      name: "Maria Silva",
      userName: "mariasilva",
      password: "hashedPassword123",
      phone: "987654321",
      email: "maria.silva@example.com",
    });
  });

  it("deve lançar um erro se o repositório falhar", async () => {
    const mockCreateStudentRepository = createStudentRepository as jest.Mock;

    mockCreateStudentRepository.mockRejectedValue(
      new Error("Erro ao salvar no banco de dados")
    );

    const inputData = {
      name: "Lucas Pereira",
      userName: "lucaspereira",
      password: "hashedPassword456",
      phone: "1122334455",
      email: "lucas.pereira@example.com",
    };

    await expect(createStudentService(inputData)).rejects.toThrow(
      "Erro ao salvar no banco de dados"
    );
  });
});
