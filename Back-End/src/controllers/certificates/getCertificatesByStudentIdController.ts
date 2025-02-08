import { FastifyReply, FastifyRequest } from "fastify";
import { getCertificatesByStudentIdService } from "../../services/certificates/getCertificatesByStudentIdService";

export async function getCertificatesByStudentIdController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { studentId } = request.params as any;
    const certificates = await getCertificatesByStudentIdService(Number(studentId));
    reply.code(200).send(certificates);
  } catch (error: any) {
    console.error("Erro ao buscar os certificados: ", error);
    reply.code(500).send({ error: "Erro ao buscar os certificados" });
  }
}