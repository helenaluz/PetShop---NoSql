"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./page.module.css";
import { buscarTodospets, buscarPetPorConsulta } from "../../api/ApiServicePets";

export default function Consultar() {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroRaca, setFiltroRaca] = useState<string>("");
  const [racas, setRacas] = useState<string[]>([]);

  // Carregar todos os pets inicialmente
  useEffect(() => {
    async function fetchPets() {
      try {
        const listaPets = await buscarTodospets();
        setPets(listaPets);
        setLoading(false);

        // Extrair raças únicas para o filtro
        const racasUnicas = Array.from(new Set(listaPets.map((pet) => pet.raca).filter(Boolean)));
        setRacas(racasUnicas);
      } catch (error) {
        toast.error("Erro ao carregar pets.");
        setLoading(false);
      }
    }
    fetchPets();
  }, []);

  // Filtrar pets por raça
  const handleFiltroConsulta = async () => {
    if (filtroRaca.trim() === "") {
      toast.error("Selecione uma raça para buscar.");
      return;
    }

    try {
      const petsFiltrados = await buscarPetPorConsulta(filtroRaca);
      if (petsFiltrados.length > 0) {
        setPets(petsFiltrados);
        toast.success("Pets filtrados por raça!");
      } else {
        toast.info("Nenhum pet encontrado para essa raça.");
        setPets([]);
      }
    } catch (error) {
      toast.error("Erro ao buscar pets por raça.");
    }
  };

  // Cancelar filtro e mostrar todos os pets
  const handleCancelarFiltro = async () => {
    try {
      const todosPets = await buscarTodospets();
      setPets(todosPets);
      setFiltroRaca("");
      toast.info("Filtro cancelado. Mostrando todos os pets.");
    } catch (error) {
      toast.error("Erro ao buscar todos os pets.");
    }
  };

  if (loading) {
    return <p>Carregando pets...</p>;
  }

  return (
    <main className={styles.container}>
      <h1>Lista de Pets</h1>

      <Form className="mb-3">
        <Form.Group className="mb-3">
          <Form.Label>Filtrar por Raça:</Form.Label>
          <Form.Select value={filtroRaca} onChange={(e) => setFiltroRaca(e.target.value)}>
            <option value="">Selecione uma raça</option>
            {racas.map((raca) => (
              <option key={raca} value={raca}>
                {raca}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={handleFiltroConsulta} className="me-3">
          Buscar
        </Button>
        <Button variant="secondary" onClick={handleCancelarFiltro}>
          Cancelar
        </Button>
      </Form>

      <div className={styles.grid}>
        {pets.map((pet) => (
          <div key={pet.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src={
                  pet.foto
                    ? pet.foto
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGcv25gPu69uUIwPHWhqsQauv4E9FVhk7bCw&s"
                }
                alt={pet.nome}
                className="img-fluid"
              />
            </div>
            <h2 className={styles.nome}>{pet.nome}</h2>
            <p className={styles.text}>Raça: {pet.raca || "Indefinida"}</p>
            <p className={styles.text}>Dono: {pet.dono || "Indefinido"}</p>
          </div>
        ))}
      </div>

      <ToastContainer theme="colored" />
    </main>
  );
}
