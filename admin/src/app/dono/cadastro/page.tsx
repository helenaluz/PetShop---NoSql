"use client";

import { useState, useEffect } from "react";
import { Button, Form, Image, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  adicionarDono,
  buscarDonoPorNome,
  alterarDonoPorId,
  excluirDonoPorId,
} from "../../api/ApiServiceDonos";
import { buscarTodosCargos } from "../../api/ApiServiceCargos";
import styles from "./page.module.css";
import { Dono, Cargo } from "./types";

export default function Cadastro() {
  const [Dono, setDono] = useState<Dono | null>(null);
  const [DonoAlteracao, setDonoAlteracao] = useState<Dono | null>(null);
  const [nomeBusca, setNomeBusca] = useState<string>("");

  const [novoDono, setNovoDono] = useState({
    nome: "",
    endereco: "",
    email: "",
    telefone: "",
  });



  function converterDono(data: any): Dono {
    return {
      id: data.id,
      nome: data.nome,
      endereco: data.endereco,
      email: data.email,
      telefone: data.telefone,
    };
  }

  const handleBuscaDonoPorNome = async () => {
    if (nomeBusca.trim() === "") {
      toast.error("Informe um nome para buscar.");
      return;
    }

    const response = await buscarDonoPorNome(nomeBusca);

    if (response.status === 200 && response.data && response.data.length > 0) {
      const f = converterDono(response.data[0]);
      setDono(f);
      setDonoAlteracao(f);
      toast.success("Dono encontrado!");
    } else {
      toast.error(response.mensagem || "Dono não encontrado.");
      setDono(null);
      setDonoAlteracao(null);
    }
  };

  const handleAlterarDono = async () => {
    if (!DonoAlteracao || !DonoAlteracao.id) {
      toast.error("Nenhum Dono selecionado para alterar.");
      return;
    }
    const response = await alterarDonoPorId(DonoAlteracao.id, DonoAlteracao);
    if (response.status === 200) {
      toast.success("Dono alterado com sucesso!");
      setDono(DonoAlteracao); 
    } else {
      toast.error(response.mensagem || "Erro ao alterar Dono.");
    }
  };

  const handleExcluirDono = async () => {
    if (!Dono || !Dono.id) {
      toast.error("Nenhum Dono selecionado para exclusão.");
      return;
    }
    const response = await excluirDonoPorId(Dono.id);
    if (response.status === 200) {
      toast.success("Dono excluído com sucesso!");
      setDono(null);
      setDonoAlteracao(null);
      setNomeBusca("");
    } else {
      toast.error(response.mensagem || "Erro ao excluir Dono.");
    }
  };

  const handleChangeAlteracao = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!DonoAlteracao) return;
    setDonoAlteracao({
      ...DonoAlteracao,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className={styles.container}>
      <div className="container">
        <Row>
          <Col md={6} className="mb-4">
            <h2>Buscar Dono por Nome</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Dono:</Form.Label>
                <Form.Control
                  type="text"
                  value={nomeBusca}
                  onChange={(e) => setNomeBusca(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleBuscaDonoPorNome}>
                Buscar
              </Button>
            </Form>

            {DonoAlteracao && (
              <div className="mt-4">
                <h5>Editar Dono:</h5>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                      type="text"
                      name="nome"
                      value={DonoAlteracao.nome}
                      onChange={handleChangeAlteracao}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Endereço:</Form.Label>
                    <Form.Control
                      type="text"
                      name="endereco"
                      value={DonoAlteracao.endereco}
                      onChange={handleChangeAlteracao}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={DonoAlteracao.email}
                      onChange={handleChangeAlteracao}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="text "
                      name="telefone"
                      value={DonoAlteracao.telefone}
                      onChange={handleChangeAlteracao}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <Button variant="success" onClick={handleAlterarDono}>
                      Salvar Alterações
                    </Button>
                    <Button variant="danger" onClick={handleExcluirDono}>
                      Excluir Dono
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Col>

          <Col md={6} className="mb-4">
            <h2 className="text-center mb-4">Cadastrar novo Dono</h2>
            <Form
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await adicionarDono(novoDono);
                if (response.status === 201) {
                  toast.success("Dono cadastrado com sucesso!");
                  setNovoDono({
                    nome: "",
                    endereco: "",
                    email: "",
                    telefone: ""
                  });
                } else {
                  toast.error("Erro ao cadastrar: " + response.mensagem);
                }
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  type="text"
                  value={novoDono.nome}
                  onChange={(e) => setNovoDono({ ...novoDono, nome: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Endereço:</Form.Label>
                <Form.Control
                  type="text"
                  value={novoDono.endereco}
                  onChange={(e) => setNovoDono({ ...novoDono, endereco: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={novoDono.email}
                  onChange={(e) => setNovoDono({ ...novoDono, email: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Telefone:</Form.Label>
                <Form.Control
                  type="text"
                  value={novoDono.telefone}
                  onChange={(e) => setNovoDono({ ...novoDono, telefone: e.target.value })}
                  required
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="success" type="submit">
                  Cadastrar Dono
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
      <ToastContainer theme="colored" />
    </main>
  );
}
