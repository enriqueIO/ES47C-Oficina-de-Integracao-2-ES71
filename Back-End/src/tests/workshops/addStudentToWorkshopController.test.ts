import { addStudentToWorkshopController } from '../../controllers/workshops/addStudentToWorkshopController';
import { addStudentToWorkshopService } from '../../services/workshops/addStudentToWorkshopService';
import { FastifyRequest, FastifyReply } from 'fastify';

jest.mock('../../services/workshops/addStudentToWorkshopService');

describe('addStudentToWorkshopController', () => {
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    mockRequest = {
      body: {
        studentId: 1,
        workshopId: 101,
      },
    };

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it('should add student to workshop successfully and return a success message', async () => {
    const mockResult = { studentId: 1, workshopId: 101 };

    // Simulando o comportamento do serviço de adição do aluno ao workshop
    (addStudentToWorkshopService as jest.Mock).mockResolvedValue(mockResult);

    await addStudentToWorkshopController(mockRequest as FastifyRequest, mockReply as FastifyReply);

    expect(addStudentToWorkshopService).toHaveBeenCalledWith(1, 101);
    expect(mockReply.status).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Aluno adicionado ao workshop com sucesso!',
      data: mockResult,
    });
  });

  it('should return an error if there is an issue adding the student to the workshop', async () => {
    const errorMessage = 'Erro ao adicionar aluno ao workshop';

    // Simulando um erro no serviço
    (addStudentToWorkshopService as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await addStudentToWorkshopController(mockRequest as FastifyRequest, mockReply as FastifyReply);

    expect(addStudentToWorkshopService).toHaveBeenCalledWith(1, 101);
    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: errorMessage,
    });
  });
});
