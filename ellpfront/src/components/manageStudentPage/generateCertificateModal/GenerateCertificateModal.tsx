import React, { FC, useState } from "react";
import { Modal, Typography, Button, Box, TextField } from "@mui/material";
import styles from "./GenerateCertificateModal.module.css";
import { Student } from "@/entities/Student";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  studentData: Student;
}

const CertificateModal: FC<Props> = ({ open, onClose, title, studentData }) => {
  const [cycle, setCycle] = useState<string>("");
  const [totalHours, setTotalHours] = useState<string>("");

  const handleGenerateCertificate = () => {
    console.log("Ciclo:", cycle);
    console.log("Carga horária total:", totalHours);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box className={styles.modalBox}>
        {title && (
          <Typography id="modal-title" variant="h6" component="h2" mb={2}>
            {title} - {studentData?.name}
          </Typography>
        )}

        <TextField
          label="Ciclo (Período)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={cycle}
          onChange={(e) => setCycle(e.target.value)}
        />

        <TextField
          label="Carga Horária Total"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={totalHours}
          onChange={(e) => setTotalHours(e.target.value)}
        />

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            onClick={handleGenerateCertificate}
            sx={{ mr: 2 }}
          >
            Gerar Certificado
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Fechar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export { CertificateModal };
