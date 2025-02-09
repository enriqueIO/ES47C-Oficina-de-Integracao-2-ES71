import { prisma } from '../../lib/prisma';

export const addStudentToWorkshopRepository = async (studentId: number, workshopId: number) => {
  try {
    const studentWorkshop = await prisma.studentWorkshop.create({
      data: {
        studentId,
        workshopId
      }
    });
    return studentWorkshop;
  } catch (error) {
    throw new Error('Erro ao adicionar o aluno ao workshop');
  }
};