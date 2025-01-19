"use client";

import { useState } from "react";
import styles from "./RegisterTeacherPage.module.css";
import { Layout } from "../homepage/Layout";
import { createTeacher } from "../../lib/api/teachers/createTeacher";

export function RegisterTeacherPage() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const teacher = await createTeacher({
        name,
        userName,
        password,
        email,
        phone,
      });

      setColor("green");
      setMessage("Cadastro efetuado com sucesso!");

      setName("");
      setUserName("");
      setPassword("");
      setEmail("");
      setPhone("");
    } catch (error: any) {
      console.error("Ocorreu um erro ao cadastrar o professor", error);
      setColor("red");
      setMessage("Erro ao cadastrar o professor.");
    }
  };

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Cadastro de Professores</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="userName">Usuário</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="phone">Telefone</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
