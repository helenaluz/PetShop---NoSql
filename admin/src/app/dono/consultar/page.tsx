"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./page.module.css";
import { buscarTodosDonos } from "../../api/ApiServiceDonos";
import { buscarTodosCargos } from "admin/app/api/ApiServiceCargos";

export default function Consultar() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDonos() {
      const Donos = await buscarTodosDonos();
      setData(Donos);
      setLoading(false);
    }
    fetchDonos();
  }, []);

  useEffect(() => {
    async function carregarCargos() {
      const listaCargos = await buscarTodosCargos();
      setCargos(listaCargos);
    }
    carregarCargos();
  }, []);


  const handleCancelarFiltro = async () => {
    try {
      const DonosFiltrados = await buscarTodosDonos();
      setData(DonosFiltrados);
    } catch (error) {
      toast.error("Erro ao buscar Donos.");
    }
  };

  if (loading) {
    return <p>Carregando Donos...</p>;
  }

  return (
    <main className={styles.container}>
      <h1>Donos</h1>

      <div className={styles.grid}>
        {data.map((item) => (
          <div key={item.id} className={styles.card}>
            <h2 className={styles.nome}>{item.nome}</h2>
            <p className={styles.text}>Telefone: {item.telefone}</p>
            <p className={styles.text}>Email: {item.email}</p>
          </div>
        ))}
      </div>

      <ToastContainer theme="colored" />
    </main>
  );
}
