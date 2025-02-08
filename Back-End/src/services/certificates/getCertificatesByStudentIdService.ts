import { getCertificatesByStudentId } from "../../repository/certificates/getCertificatesByStudentId";

export async function getCertificatesByStudentIdService(studentId: number) {
  return await getCertificatesByStudentId(studentId);
}
