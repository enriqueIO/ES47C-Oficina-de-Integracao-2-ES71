import { FastifyRequest, FastifyReply } from "fastify";
import { createWorkshopService } from "../../services/workshops/createTeacherService";
import { createWorkshopController } from "../../controllers/workshops/createWorkshopController";

jest.mock("../../services/workshops/createTeacherService");

const mockCreateWorkshopService = createWorkshopService as jest.Mock;

describe("createWorkshopController", () => {
  let request: Partial<FastifyRequest>;
  let reply: Partial<FastifyReply>;

  beforeEach(() => {
    request = {
      body: {
        title: "Introdução à Programação",
        description: "Workshop sobre fundamentos de programação.",
        professor: "Prof. Henrique",
        workshopDate: "2024-12-05",
        hour: "14:00",
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

  test("Deve criar um workshop e retornar status 201", async () => {
    const mockWorkshop = {
      id: 1,
      title: "Introdução à Programação",
      description: "Workshop sobre fundamentos de programação.",
      professor: "Prof. Henrique",
      workshopDate: "2024-12-05",
      hour: "14:00",
    };

    mockCreateWorkshopService.mockResolvedValue(mockWorkshop);

    await createWorkshopController(
      request as FastifyRequest,
      reply as FastifyReply
    );

    expect(mockCreateWorkshopService).toHaveBeenCalledWith({
      title: "Introdução à Programação",
      description: "Workshop sobre fundamentos de programação.",
      professor: "Prof. Henrique",
      workshopDate: "2024-12-05",
      hour: "14:00",
    });

    expect(reply.code).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith(mockWorkshop);
  });

  test("Deve retornar erro 500 em caso de falha", async () => {
    mockCreateWorkshopService.mockRejectedValue(new Error("Erro no serviço"));

    await createWorkshopController(
      request as FastifyRequest,
      reply as FastifyReply
    );

    expect(reply.code).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith({ error: "Erro ao criar o workshop" });
  });
});
