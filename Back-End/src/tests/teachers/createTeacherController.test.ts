import { createTeacherController } from "../../controllers/teachers/createTeacherController";
import { createTeacherService } from "../../services/teachers/createTeacherService";
import { encryptPassword } from "../../lib/encryptPassword";
import { FastifyRequest, FastifyReply } from "fastify";

jest.mock("../../services/teachers/createTeacherService");
jest.mock("../../lib/encryptPassword");

const mockCreateTeacherService = createTeacherService as unknown as jest.Mock;
const mockEncryptPassword = encryptPassword as unknown as jest.Mock;

describe("createTeacherController", () => {
  let request: Partial<FastifyRequest>;
  let reply: Partial<FastifyReply>;

  beforeEach(() => {
    request = {
      body: {
        name: "John Doe",
        userName: "johndoe",
        password: "123456",
        phone: "1234567890",
        email: "johndoe@example.com",
      },
    };

    reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Deve criar um professor e retornar status 201", async () => {
    mockEncryptPassword.mockResolvedValue("hashed_password");
    mockCreateTeacherService.mockResolvedValue({
      id: 1,
      name: "John Doe",
      userName: "johndoe",
      phone: "1234567890",
      email: "johndoe@example.com",
    });

    await createTeacherController(
      request as FastifyRequest,
      reply as FastifyReply
    );

    expect(mockEncryptPassword).toHaveBeenCalledWith("123456");

    expect(mockCreateTeacherService).toHaveBeenCalledWith({
      name: "John Doe",
      userName: "johndoe",
      password: "hashed_password",
      phone: "1234567890",
      email: "johndoe@example.com",
    });

    expect(reply.code).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith({
      id: 1,
      name: "John Doe",
      userName: "johndoe",
      phone: "1234567890",
      email: "johndoe@example.com",
    });
  });

  test("Deve retornar erro 500 em caso de falha", async () => {
    mockEncryptPassword.mockRejectedValue(new Error("Erro na encriptação"));

    await createTeacherController(
      request as FastifyRequest,
      reply as FastifyReply
    );

    expect(reply.code).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith({
      error: "Erro ao criar o professor",
    });
  });
});
