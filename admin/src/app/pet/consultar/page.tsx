"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./page.module.css";
import { buscarTodosFuncionarios, buscarFuncionarioPorCargo } from "../../api/ApiServiceFuncionarios";
import { buscarTodosCargos } from "admin/app/api/ApiServiceCargos";

export default function Consultar() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [profissao, setProfissao] = useState<string>("");const [cargos, setCargos] = useState<{ id: string; nome: string }[]>([]);

  useEffect(() => {
    async function fetchFuncionarios() {
      const funcionarios = await buscarTodosFuncionarios();
      setData(funcionarios);
      setLoading(false);
    }
    fetchFuncionarios();
  }, []);

  useEffect(() => {
    async function carregarCargos() {
      const listaCargos = await buscarTodosCargos();
      setCargos(listaCargos);
    }
    carregarCargos();
  }, []);

  const handleFiltroProfissao = async () => {
    if (profissao.trim() === "") {
      toast.error("Informe uma profissão para buscar.");
      return;
    }

    try {
      const funcionariosFiltrados = await buscarFuncionarioPorCargo(profissao);

      if (funcionariosFiltrados.length > 0) {
        setData(funcionariosFiltrados);
        toast.success("Funcionários filtrados por profissão!");
      } else {
        toast.info("Nenhum funcionário encontrado com essa profissão.");
        setData([]);
      }
    } catch (error) {
      toast.error("Erro ao buscar funcionários por profissão.");
    }
  };

  const handleCancelarFiltro = async () => {
    try {
      const funcionariosFiltrados = await buscarTodosFuncionarios();
      setData(funcionariosFiltrados);
    } catch (error) {
      toast.error("Erro ao buscar funcionários.");
    }
  };

  if (loading) {
    return <p>Carregando funcionários...</p>;
  }

  return (
    <main className={styles.container}>
      <h1>Funcionários</h1>

      <Form className="mb-3">
        <Form.Group className="mb-3">
          <Form.Label>Filtrar por Profissão:</Form.Label>
          <Form.Select
            value={profissao}
            onChange={(e) => setProfissao(e.target.value)}
          >
            <option value="">Selecione uma profissão</option>
            {cargos.map((cargo) => (
              <option key={cargo.id} value={cargo.nome}>
                {cargo.nome}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" onClick={handleFiltroProfissao} className="me-3">
          Buscar
        </Button>
        <Button variant="secondary" onClick={handleCancelarFiltro}>
          Cancelar
        </Button>
      </Form>

      <div className={styles.grid}>
        {data.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src={
                  item.foto
                    ? item.foto
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGcv25gPu69uUIwPHWhqsQauv4E9FVhk7bCw&s"
                }
                alt={item.nome}
                className="img-fluid"
              />
            </div>
            <h2 className={styles.nome}>{item.nome}</h2>
            <p className={styles.text}>Profissão: {item.profissao}</p>
            <p className={styles.text}>Email: {item.email}</p>
          </div>
        ))}
      </div>

      <ToastContainer theme="colored" />
    </main>
  );
}
