"use client";

import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Image from "next/image";
import styles from "./page.module.css";
import { buscarConsultasPorFiltro } from "../../api/ApiServiceConsulta";
import { buscarTodospets } from "admin/app/api/ApiServicePets";
import { buscarTodosVets } from "admin/app/api/ApiServiceFuncionarios";

export default function Consultar() {
  const [veterinarios, setVeterinarios] = useState<{ id: string; nome: string }[]>([]);
  const [pets, setPets] = useState<{ id: string; nome: string }[]>([]);

  const [veterinario, setVeterinario] = useState("");
  const [pet, setPet] = useState("");
  const [data, setData] = useState("");
  const [consultas, setConsultas] = useState<any[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const vets = await buscarTodosVets();
        setVeterinarios(vets);

        const petsList = await buscarTodospets();
        setPets(petsList);
      } catch (error) {
        console.error("Erro ao carregar veterinários ou pets", error);
      }
    }
    carregarDados();
  }, []);

  const handleBuscar = async () => {
    const filtro: any = {};
    if (veterinario) filtro.veterinario = veterinario;
    if (pet) filtro.pet = pet;
    if (data) filtro.data = new Date(data);

    const resultados = await buscarConsultasPorFiltro(filtro);
    setConsultas(resultados);
  };

  const handleCancelarFiltro = () => {
    setVeterinario("");
    setPet("");
    setData("");
    setConsultas([]);
  };

  return (
    <main className={styles.container}>
      <h1>Lista de Consultas</h1>

      <Form className="mb-4">
        <Form.Group className="mb-3" controlId="selectVeterinario">
          <Form.Label>Veterinário</Form.Label>
          <Form.Select value={veterinario} onChange={(e) => setVeterinario(e.target.value)}>
            <option value="">Selecione um veterinário</option>
            {veterinarios.map((vet) => (
              <option key={vet.id} value={vet.nome}>
                {vet.nome}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="selectPet">
          <Form.Label>Pet</Form.Label>
          <Form.Select value={pet} onChange={(e) => setPet(e.target.value)}>
            <option value="">Selecione um pet</option>
            {pets.map((p) => (
              <option key={p.id} value={p.nome}>
                {p.nome}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="inputData">
          <Form.Label>Data</Form.Label>
          <Form.Control type="date" value={data} onChange={(e) => setData(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={handleBuscar} className="me-3">
          Buscar
        </Button>
        <Button variant="secondary" onClick={handleCancelarFiltro}>
          Cancelar
        </Button>
      </Form>

      <div className={styles.grid}>
        {consultas.length === 0 && <p>Nenhuma consulta encontrada.</p>}

        {consultas.map((consulta) => (
          <div key={consulta.id} className={styles.card}>
            <h2 className={styles.nome}>{consulta.veterinario}</h2>
            <p className={styles.text}>Pet: {consulta.pet || "Indefinido"}</p>
            <p className={styles.text}>
              Data:{" "}
              {consulta.data?.toDate
                ? consulta.data.toDate().toLocaleString()
                : consulta.data
                ? new Date(consulta.data).toLocaleString()
                : "Indefinida"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
