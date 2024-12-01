import { createStudentController } from "../../controllers/students/createStudentController";
import { createStudentService } from "../../services/students/createStudentService";
import { encryptPassword } from "../../lib/encryptPassword";
import { FastifyReply, FastifyRequest } from "fastify";

jest.mock("../../services/students/createStudentService");
jest.mock("../../lib/encryptPassword");

describe("createStudentController", () => {
  it("deve criar um estudante com sucesso e retornar status 201", async () => {
    const mockEncryptPassword = encryptPassword as jest.Mock;
    const mockCreateStudentService = createStudentService as jest.Mock;

    mockEncryptPassword.mockResolvedValue("encryptedPassword123");
    mockCreateStudentService.mockResolvedValue({
      id: "456",
      name: "Maria Silva",
      userName: "mariasilva",
      password: "encryptedPassword123",
      phone: "987654321",
      email: "maria.silva@example.com",
    });

    const mockRequest = {
      body: {
        name: "Maria Silva",
        userName: "mariasilva",
        password: "mySecurePassword",
        phone: "987654321",
        email: "maria.silva@example.com",
      },
    } as FastifyRequest;

    const mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    await createStudentController(mockRequest, mockReply);

    expect(mockEncryptPassword).toHaveBeenCalledWith("mySecurePassword");
    expect(mockCreateStudentService).toHaveBeenCalledWith({
      name: "Maria Silva",
      userName: "mariasilva",
      password: "encryptedPassword123",
      phone: "987654321",
      email: "maria.silva@example.com",
    });
    expect(mockReply.code).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith({
      id: "456",
      name: "Maria Silva",
      userName: "mariasilva",
      password: "encryptedPassword123",
      phone: "987654321",
      email: "maria.silva@example.com",
    });
  });

  it("deve retornar status 500 se ocorrer um erro ao criar o estudante", async () => {
    const mockEncryptPassword = encryptPassword as jest.Mock;
    const mockCreateStudentService = createStudentService as jest.Mock;

    mockEncryptPassword.mockResolvedValue("encryptedPassword123");
    mockCreateStudentService.mockRejectedValue(
      new Error("Erro ao salvar no banco de dados")
    );

    const mockRequest = {
      body: {
        name: "Lucas Pereira",
        userName: "lucaspereira",
        password: "anotherPassword",
        phone: "1122334455",
        email: "lucas.pereira@example.com",
      },
    } as FastifyRequest;

    const mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    await createStudentController(mockRequest, mockReply);

    expect(mockEncryptPassword).toHaveBeenCalledWith("anotherPassword");
    expect(mockCreateStudentService).toHaveBeenCalledWith({
      name: "Lucas Pereira",
      userName: "lucaspereira",
      password: "encryptedPassword123",
      phone: "1122334455",
      email: "lucas.pereira@example.com",
    });
    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: "Erro ao criar o aluno",
    });
  });
});
