"use client";

import { useState } from "react";
import styles from "./RegisterWorkshopPage.module.css";
import { Layout } from "../homepage/Layout";
import { createWorkshop } from "@/lib/api/workshops/createWorkshop";

export function RegisterWorkshopPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [professor, setProfessor] = useState("");
  const [workshopDate, setWorkshopDate] = useState("");
  const [hour, setHour] = useState("");
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const workshop = await createWorkshop({
        title,
        description,
        professor,
        workshopDate,
        hour,
      });

      setColor("green");
      setMessage("Cadastro efetuado com sucesso!");
    } catch (error: any) {
      console.error("Ocorreu um erro ao cadastrar o workshop", error);
      setColor("red");
      setMessage("Erro ao cadastrar o workshop.");
    }
  };

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Cadastro de Workshops</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="description">Descrição</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="professor">Professor</label>
            <input
              type="text"
              id="professor"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="workshopDate">Data</label>
            <input
              type="text"
              id="workshopDate"
              value={workshopDate}
              onChange={(e) => setWorkshopDate(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="hour">Horário</label>
            <input
              type="text"
              id="hour"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          {message && (
            <p
              style={{ color: color, marginTop: "10px", marginBottom: "10px" }}
            >
              {message}
            </p>
          )}
          <button type="submit" className={styles.submitButton}>
            Cadastrar
          </button>
        </form>
      </div>
    </Layout>
  );
}
