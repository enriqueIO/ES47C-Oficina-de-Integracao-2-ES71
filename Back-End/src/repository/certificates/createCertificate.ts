import { prisma } from "../../lib/prisma";

export async function createCertificate(studentId: number, pdfLink: string) {
  return await prisma.certificate.create({
    data: {
      studentId,
      pdfLink,
    },
  });
}
