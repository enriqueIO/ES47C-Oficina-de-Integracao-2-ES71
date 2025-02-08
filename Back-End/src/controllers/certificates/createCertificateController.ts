import { FastifyReply, FastifyRequest } from "fastify";
import { createCertificateService } from "../../services/certificates/createCertificateService";

export async function createCertificateController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { studentId, pdfLink } = request.body as any;
    const certificate = await createCertificateService(studentId, pdfLink);
    reply.code(201).send(certificate);
  } catch (error: any) {
    console.error("Erro ao criar o certificado: ", error);
    reply.code(500).send({ error: "Erro ao criar o certificado" });
  }
}