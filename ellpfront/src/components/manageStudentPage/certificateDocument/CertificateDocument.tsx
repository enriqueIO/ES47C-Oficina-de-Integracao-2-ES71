import React, { FC } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Student } from "@/entities/Student";

// Definindo estilos com uma paleta de cores mais suave e um layout centralizado
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 40,
    backgroundColor: "#f0f8ff", // Cor suave de fundo
  },
  section: {
    margin: "auto",
    width: "90%",
    padding: 40,
    border: "2px solid #00796b", // Bordas com uma cor verde suave
    borderRadius: 10,
    backgroundColor: "#ffffff",
    textAlign: "center", // Centraliza todo o conteúdo dentro da seção
    display: "flex",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00796b", // Cor verde
    marginBottom: 20,
  },
  logo: {
    width: 230, // Tamanho da logo
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333333", // Cor para o texto
    lineHeight: 1.5,
  },
  boldText: {
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    color: "#00796b", // Cor para o rodapé
    fontStyle: "italic",
  },
  signatureSection: {
    marginTop: 40,
    borderTop: "1px solid #00796b", // Linha superior para a seção de assinatura
    paddingTop: 10,
    textAlign: "center",
  },
  signatureText: {
    fontSize: 16,
    color: "#333333",
  },
  signatureLine: {
    marginTop: 30,
    width: "60%",
    borderBottom: "1px solid #333333", // Linha de assinatura
    marginLeft: "auto",
    marginRight: "auto",
  },
  coordinatorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00796b",
    marginBottom: 10,
  },
});

interface Props {
  studentData: Student;
  cycle: string;
  hours: string;
  logoUrl: string; // URL da logo
}

const CertificateDocument: FC<Props> = ({
  studentData,
  cycle,
  hours,
  logoUrl,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* Logo centralizada */}
          <Image src={logoUrl} style={styles.logo} />
          <Text style={styles.header}>Certificado de Participação</Text>
          <Text style={styles.text}>
            Este certificado é concedido a{" "}
            <Text style={styles.boldText}>{studentData.name}</Text>,
            reconhecendo sua dedicação, paixão e compromisso em levar
            conhecimentos de lógica e programação, através do grupo Ellp, para
            jovens do ensino público da região.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Nome:</Text> {studentData.name}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Ciclo:</Text> {cycle}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Horas Completadas:</Text> {hours}
          </Text>
        </View>

        {/* Seção de Assinatura do Coordenador */}
        <View style={styles.signatureSection}>
          <Text style={styles.coordinatorTitle}>Assinatura do Coordenador</Text>
        </View>
      </Page>
    </Document>
  );
};

export { CertificateDocument };
