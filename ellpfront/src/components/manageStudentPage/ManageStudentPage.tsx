"use client";

import { useState, useEffect } from "react";
import styles from "@/components/manageStudentPage/ManageStudentPage.module.css";
import { Layout } from "../homepage/Layout";
import { Student } from "@/entities/Student";
import { getAllStudents } from "@/lib/api/students/getAllStudents";
import { FaEdit } from "react-icons/fa";
import { FaFile } from "react-icons/fa";

export function ManageStudentPage() {
  const [students, setStudents] = useState<Student[]>([]);

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
                  <button
                    className={styles.iconButton}
                    onClick={() => alert(`Editar aluno: ${student.name}`)}
                  >
                    <FaFile size={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
