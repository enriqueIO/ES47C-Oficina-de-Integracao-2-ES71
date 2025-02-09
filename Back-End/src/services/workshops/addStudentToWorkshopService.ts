import { prisma } from '../../lib/prisma';
import { addStudentToWorkshopRepository } from '../../repository/workshops/addStudentToWorkshopRepository';

export const addStudentToWorkshopService = async (studentId: number, workshopId: number) => {
  // Verificar se o aluno existe
  const student = await prisma.student.findUnique({
    where: { id: studentId }
  });
  if (!student) {
    throw new Error('Aluno não encontrado');
  }

  // Verificar se o workshop existe
  const workshop = await prisma.workshop.findUnique({
    where: { id: workshopId }
  });
  if (!workshop) {
    throw new Error('Workshop não encontrado');
  }

  // Verificar se o aluno já está no workshop
  const existingEntry = await prisma.studentWorkshop.findUnique({
    where: {
      studentId_workshopId: {
        studentId,
        workshopId
      }
    }
  });
  if (existingEntry) {
    throw new Error('Aluno já está inscrito neste workshop');
  }

  // Adicionar o aluno ao workshop
  return await addStudentToWorkshopRepository(studentId, workshopId);
};