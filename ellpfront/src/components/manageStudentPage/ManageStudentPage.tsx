"use client";

import { useState, useEffect } from "react";
import styles from "@/components/manageStudentPage/ManageStudentPage.module.css";
import { Layout } from "../homepage/Layout";
import { Student } from "@/entities/Student";
import { getAllStudents } from "@/lib/api/students/getAllStudents";
import { getCertificatesByStudentId } from "@/lib/api/certificates/getCertificatesByStudentId";
import { FileDownload, InsertDriveFile } from "@mui/icons-material";
import { CertificateModal } from "./generateCertificateModal/GenerateCertificateModal";
import { Button, Modal, Box, Typography } from "@mui/material";

export function ManageStudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentToGenerateCertificate, setSudentToGenerateCertificate] =
    useState<Student | null>(null);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [openCertificates, setOpenCertificates] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenCertificates = async (studentId: number) => {
    try {
      const fetchedCertificates = await getCertificatesByStudentId(studentId);
      setCertificates(fetchedCertificates);
      setOpenCertificates(true);
    } catch (error: any) {
      console.error("Erro ao buscar certificados:", error);
    }
  };

  const handleCloseCertificates = () => setOpenCertificates(false);

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDownloadCertificate = (pdfLink: string, certificateId: number) => {
    const link = document.createElement("a");
    link.href = pdfLink;
    link.download = `Certificado_${certificateId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Gerenciar Alunos</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setSudentToGenerateCertificate({
                        name: student.name,
                        email: student.email,
                        phone: student.phone,
                        userName: "",
                        id: student.id,
                      });

                      handleOpen();
                    }}
                    startIcon={<InsertDriveFile sx={{ fontSize: 25 }} />}
                  >
                    Gerar certificado
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleOpenCertificates(student.id)}
                    startIcon={<FileDownload sx={{ fontSize: 25 }} />}
                    sx={{ marginLeft: 1 }}
                  >
                    Buscar certificados
                  </Button>
                  <CertificateModal
                    open={open}
                    onClose={handleClose}
                    title="Gerar Certificado"
                    studentData={studentToGenerateCertificate!}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={openCertificates} onClose={handleCloseCertificates}>
        <Box className={styles.modalBox}>
          <Typography variant="h6" component="h2" mb={2}>
            Certificados
          </Typography>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Link</th>
                <th>Data de Criação</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((certificate) => (
                <tr key={certificate.id}>
                  <td>{certificate.id}</td>
                  <td>
                    <Button
                      variant="outlined"
                      onClick={() => handleDownloadCertificate(certificate.pdfLink, certificate.id)}
                    >
                      Baixar Certificado
                    </Button>
                  </td>
                  <td>
                    {new Date(certificate.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Modal>
    </Layout>
  );
}