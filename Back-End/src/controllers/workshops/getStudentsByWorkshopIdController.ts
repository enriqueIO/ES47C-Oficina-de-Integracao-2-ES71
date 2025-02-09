import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../lib/prisma";

export async function getStudentsByWorkshopIdController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { workshopId } = request.params as { workshopId: string };

    const students = await prisma.studentWorkshop.findMany({
      where: { workshopId: Number(workshopId) },
      include: { student: true }, // Inclui informações detalhadas dos alunos
    });

    const enrolledStudents = students.map((entry) => entry.student);

    reply.send(enrolledStudents);
  } catch (error) {
    console.error("Erro ao buscar alunos inscritos:", error);
    reply.status(500).send({ error: "Erro ao buscar alunos inscritos no workshop." });
  }
}