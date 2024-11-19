"use client";

import { useState } from "react";
import styles from "./login.module.css";
import { loginUser } from "@/lib/api/users/validateLogin";

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const result = await loginUser(userName, password);

      setColor("green");
      setErrorMessage("Login efetuado!");

      window.location.replace("/portal");
    } catch (error: any) {
      console.error("Ocorreu um erro ao fazer o login", error);
      setColor("red");
      setErrorMessage("Login inválido.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="userName">Usuário</label>
          <input
            type="userName"
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
        {errorMessage && (
          <p style={{ color: color, marginTop: "10px", marginBottom: "10px" }}>
            {errorMessage}
          </p>
        )}
        <button type="submit" className={styles.submitButton}>
          Entrar
        </button>
      </form>
    </div>
  );
}
