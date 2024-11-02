"use client";

import styles from "@/components/login/login.module.scss";
import { loginService } from "@/lib/api/login/validateLogin";
import { useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await loginService(userName, password);
      alert("Login efetuado com sucesso!");
    } catch (error: any) {
      console.error("Ocorreu um erro ao fazer o login");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        <label className={styles.label} htmlFor="username">
          Usuário
        </label>
        <input
          type="text"
          id="username"
          className={styles.input}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label className={styles.label} htmlFor="password">
          Senha
        </label>
        <input
          type="password"
          id="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}
