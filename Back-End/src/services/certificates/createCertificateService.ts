import { createCertificate } from "../../repository/certificates/createCertificate"

export async function createCertificateService(
  studentId: number,
  pdfLink: string
) {
  return await createCertificate(studentId, pdfLink);
}
