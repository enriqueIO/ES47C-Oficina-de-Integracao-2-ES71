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

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 40,
    backgroundColor: "#f0f8ff",
  },
  section: {
    margin: "auto",
    width: "90%",
    padding: 40,
    border: "2px solid #00796b",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00796b",
    marginBottom: 20,
  },
  logo: {
    width: 230,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333333",
    lineHeight: 1.5,
  },
  boldText: {
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    color: "#00796b",
    fontStyle: "italic",
  },
  signatureSection: {
    marginTop: 40,
    borderTop: "1px solid #00796b",
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
    borderBottom: "1px solid #333333",
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
  logoUrl: string;
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

        <View style={styles.signatureSection}>
          <Text style={styles.coordinatorTitle}>Assinatura do Coordenador</Text>
        </View>
      </Page>
    </Document>
  );
};

export { CertificateDocument };
