"use client";

import { useState, useEffect } from "react";
import styles from "@/components/manageWorkshopPage/ManageWorkshops.module.css";
import { Layout } from "../homepage/Layout";
import { Button, Typography, Modal, Box, Snackbar, Alert } from "@mui/material";

interface Workshop {
  id: number;
  title: string;
  description: string;
  professor: string;
  workshopDate: string;
  hour: string;
}

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function AddStudentToWorkshopPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [enrolledStudents, setEnrolledStudents] = useState<Student[]>([]);

  // Estado para controle dos alertas
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");

  // Buscar workshops ao carregar a página
  useEffect(() => {
    fetch("http://localhost:3333/workshops")
      .then((res) => res.json())
      .then((data) => setWorkshops(data))
      .catch((err) => console.error("Erro ao buscar workshops:", err));
  }, []);

  // Buscar alunos ao carregar a página
  useEffect(() => {
    fetch("http://localhost:3333/getAllStudents")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Erro ao buscar alunos:", err));
  }, []);

  // Função para adicionar um aluno ao workshop
  const handleAddStudent = async () => {
    if (!selectedWorkshop || !selectedStudent) {
      setAlertMessage("Por favor, selecione um workshop e um aluno.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    const response = await fetch("http://localhost:3333/workshops/add-student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workshopId: selectedWorkshop,
        studentId: selectedStudent,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setAlertMessage("Aluno adicionado com sucesso!");
      setAlertSeverity("success");
      setAlertOpen(true);
    } else {
      setAlertMessage(`Erro: ${data.error || "Erro desconhecido"}`);
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  // Função para abrir a modal e buscar alunos inscritos no workshop
  const handleViewEnrolledStudents = async (workshopId: number) => {
    try {
      const response = await fetch(`http://localhost:3333/workshops/${workshopId}/students`);
      const data = await response.json();
      setEnrolledStudents(data);
      setOpenModal(true);
    } catch (error) {
      console.error("Erro ao buscar alunos inscritos:", error);
    }
  };

  const handleCloseModal = () => setOpenModal(false);
  const handleCloseAlert = () => setAlertOpen(false);

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Adicionar Alunos aos Workshops</h1>

        {/* Lista de Workshops */}
        <Typography variant="h6" className="mb-2">Workshops Disponíveis</Typography>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {workshops.length > 0 ? (
              workshops.map((workshop) => (
                <tr
                  key={workshop.id}
                  style={{
                    backgroundColor: selectedWorkshop === workshop.id ? "#e6f7ff" : "inherit",
                    border: selectedWorkshop === workshop.id ? "2px solid #007bff" : "1px solid #ddd",
                    transition: "all 0.3s ease-in-out"
                  }}
                >
                  <td>{workshop.title}</td>
                  <td>{workshop.description}</td>
                  <td>{workshop.workshopDate}</td>
                  <td>{workshop.hour}</td>
                  <td>
                    <Button
                      variant={selectedWorkshop === workshop.id ? "outlined" : "contained"}
                      color="primary"
                      className={styles.button}
                      onClick={() => setSelectedWorkshop(workshop.id)}
                    >
                      {selectedWorkshop === workshop.id ? "Selecionado" : "Selecionar"}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={styles.button}
                      onClick={() => handleViewEnrolledStudents(workshop.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Visualizar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Nenhum workshop cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Seleção de Aluno */}
        {selectedWorkshop && (
          <div className={styles.selectedWorkshopCard}>
            <h2>Adicionar Aluno ao Workshop Selecionado</h2>

            <select
              className={styles.selectInput}
              onChange={(e) => setSelectedStudent(Number(e.target.value))}
              value={selectedStudent || ""}
            >
              <option value="">Selecione um aluno</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} - {student.email}
                </option>
              ))}
            </select>

            <button
              className={styles.addButton}
              onClick={handleAddStudent}
            >
              Adicionar Aluno
            </button>
          </div>
        )}

        {/* Modal para visualizar alunos inscritos */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box className={styles.modalBox}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography className={styles.modalTitle}>Alunos Inscritos no Workshop</Typography>
              <button className={styles.closeButton} onClick={handleCloseModal}>Fechar</button>
            </div>

            {enrolledStudents.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Typography variant="body1" style={{ marginTop: "20px" }}>
                Nenhum aluno inscrito neste workshop.
              </Typography>
            )}
          </Box>
        </Modal>

        {/* Snackbar para exibir alertas de sucesso ou erro */}
        <Snackbar
          open={alertOpen}
          autoHideDuration={4000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: "100%" }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </Layout>
  );
}
