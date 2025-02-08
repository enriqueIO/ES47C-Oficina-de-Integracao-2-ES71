import { prisma } from "../../lib/prisma";

export async function getCertificatesByStudentId(studentId: number) {
  return await prisma.certificate.findMany({
    where: { studentId },
  });
}
