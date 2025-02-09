import { FastifyRequest, FastifyReply } from 'fastify';
import { addStudentToWorkshopService } from '../../services/workshops/addStudentToWorkshopService';

export const addStudentToWorkshopController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { studentId, workshopId } = request.body as { studentId: number; workshopId: number };

    const result = await addStudentToWorkshopService(studentId, workshopId);

    return reply.status(201).send({
      message: 'Aluno adicionado ao workshop com sucesso!',
      data: result
    });
  } catch (error: any) {
    return reply.status(400).send({ error: error.message });
  }
};