"use client";

import React, { useEffect, useState } from "react";
import { Layout } from "./Layout";
import { Calendar, momentLocalizer, ToolbarProps } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Workshop {
  id: number;
  title: string;
  description: string;
  professor: string;
  start: Date;
  end: Date;
}

const localizer = momentLocalizer(moment);

const CustomToolbar: React.FC<ToolbarProps<Workshop, object>> = ({
  label,
  onNavigate,
}) => (
  <div className="rbc-toolbar d-flex justify-content-between align-items-center mb-3">
    <Button variant="primary" onClick={() => onNavigate("PREV")}>
      Back
    </Button>
    <h4>{label}</h4>
    <Button variant="primary" onClick={() => onNavigate("NEXT")}>
      Next
    </Button>
  </div>
);

const HomePage = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetch("http://localhost:3333/getAllWorkshops")
      .then((response) => response.json())
      .then((data) => {
        const formattedWorkshops = data.map((workshop: any) => {
          const dateString = workshop.workshopDate;
          const day = dateString.substring(0, 2);
          const month = dateString.substring(2, 4) - 1;
          const year = dateString.substring(4, 8);

          const workshopDate = new Date(year, month, day);

          return {
            id: workshop.id,
            title: workshop.title,
            description: workshop.description,
            professor: workshop.professor,
            start: workshopDate,
            end: workshopDate,
          };
        });
        setWorkshops(formattedWorkshops);
      })
      .catch((error) => console.error("Erro ao buscar workshops:", error));
  }, []);

  const handleSelectEvent = (event: Workshop) => {
    setSelectedWorkshop(event);
    setShowModal(true);
  };

  const handleNavigate = (action: Date | "NEXT" | "PREV" | "TODAY") => {
    if (typeof action === "string") {
      const newDate = new Date(currentDate);

      if (action === "NEXT") {
        newDate.setMonth(newDate.getMonth() + 1); // Avança um mês
      } else if (action === "PREV") {
        newDate.setMonth(newDate.getMonth() - 1); // Volta um mês
      } else if (action === "TODAY") {
        newDate.setTime(new Date().getTime()); // Volta para a data atual
      }

      setCurrentDate(newDate);
    } else {
      setCurrentDate(action); // Se for uma data, apenas atualiza normalmente
    }
  };

  return (
    <Layout>
      <Container fluid className="mt-4">
        <Row className="justify-content-center mb-3">
          <Col xs={12} md={10} lg={8}>
            <div className="text-center p-3 bg-light rounded shadow-sm">
              <h3 className="mb-0">Calendário de Workshops</h3>
              <p className="text-muted">
                Aqui você pode visualizar todos os workshops programados. Clique
                em um evento para ver mais detalhes.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12}>
            <div
              className="shadow p-4 rounded bg-white"
              style={{ width: "100%", height: "70vh" }}
            >
              <Calendar
                localizer={localizer}
                events={workshops}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%", width: "100%" }}
                onSelectEvent={handleSelectEvent}
                onNavigate={handleNavigate}
                date={currentDate}
                defaultView="month"
                components={{ toolbar: CustomToolbar }}
                popup={true}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedWorkshop?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Descrição:</strong> {selectedWorkshop?.description}
          </p>
          <p>
            <strong>Professor:</strong> {selectedWorkshop?.professor}
          </p>
          <p>
            <strong>Data:</strong>{" "}
            {moment(selectedWorkshop?.start).format("DD/MM/YYYY")}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export { HomePage };
