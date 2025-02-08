import styles from "./GenerateCertificateModal.module.css";
import React, { FC, useState } from "react";
import { Modal, Typography, Button, Box, TextField } from "@mui/material";
import { Student } from "@/entities/Student";
import { CertificateDocument } from "../certificateDocument/CertificateDocument";
import { pdf } from "@react-pdf/renderer";
import { createCertificate } from "../../../lib/api/certificates/createCertificate";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  studentData: Student;
}

const CertificateModal: FC<Props> = ({ open, onClose, title, studentData }) => {
  const [cycle, setCycle] = useState<string>("");
  const [totalHours, setTotalHours] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(true);

  const handleGeneratePDF = async () => {
    // Validando os campos
    if (!cycle || !totalHours) {
      setFormValid(false);
      return;
    }
    setFormValid(true);

    // Gerar o PDF
    const doc = (
      <CertificateDocument
        studentData={studentData}
        hours={totalHours}
        cycle={cycle}
        logoUrl="https://grupoellp.com.br/assets/imagens/logo-navbar.png"
      />
    );

    // Gerar o PDF como Blob
    const blob = await pdf(doc).toBlob();
    const pdfUrl = URL.createObjectURL(blob);

    // Salvar o link no backend
    const savedCertificate = await createCertificate({
      studentId: studentData.id,
      pdfLink: pdfUrl,
    });

    // Fazer o download do PDF
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${studentData?.name}.pdf`;
    link.click();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box className={styles.modalBox}>
        {title && (
          <Typography id="modal-title" variant="h6" component="h2" mb={2}>
            {title} - {studentData?.name}
          </Typography>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          <TextField
            label="Ciclo (Período)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cycle}
            onChange={(e) => setCycle(e.target.value)}
            required
            error={!formValid && !cycle}
            helperText={!formValid && !cycle ? "Este campo é obrigatório" : ""}
          />

          <TextField
            label="Carga Horária Total"
            variant="outlined"
            fullWidth
            margin="normal"
            value={totalHours}
            onChange={(e) => setTotalHours(e.target.value)}
            required
            error={!formValid && !totalHours}
            helperText={
              !formValid && !totalHours ? "Este campo é obrigatório" : ""
            }
          />

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGeneratePDF}
              sx={{
                fontSize: 16,
                padding: "8px 20px",
                borderRadius: "8px",
                marginRight: "0.5rem",
                boxShadow: 3,
                "&:hover": {
                  boxShadow: 6,
                  backgroundColor: "#1976d2",
                },
              }}
            >
              Gerar
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Fechar
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export { CertificateModal };