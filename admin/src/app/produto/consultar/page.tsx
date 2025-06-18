"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./page.module.css";
import {  buscarTodosProdutos} from "../../api/ApiServiceProdutos";

export default function Consultar() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDonos() {
      const Produtos = await buscarTodosProdutos();
      setData(Produtos.data);
      setLoading(false);
    }
    fetchDonos();
  }, []);


  const handleCancelarFiltro = async () => {
    try {
      const ProdutosFiltrados = await buscarTodosProdutos();
      setData(ProdutosFiltrados.data);
    } catch (error) {
      toast.error("Erro ao buscar Donos.");
    }
  };

  if (loading) {
    return <p>Carregando Produtos...</p>;
  }

  return (
    <main className={styles.container}>
      <h1>Produtos</h1>

      <div className={styles.grid}>
        {data.map((item) => (
          <div key={item.id} className={styles.card}>
            <h2 className={styles.nome}>{item.nome}</h2>
            <p className={styles.text}>Descrição:{item.descricao}</p>
            <p className={styles.text}>Preço: R$ {item.preco}</p>
            <p className={styles.text}>Quantidade: {item.quantidade}</p>
          </div>
        ))}
      </div>

      <ToastContainer theme="colored" />
    </main>
  );
}
