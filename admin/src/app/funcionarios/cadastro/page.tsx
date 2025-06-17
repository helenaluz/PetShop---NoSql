"use client";

import { useState, useEffect } from "react";
import { Button, Form, Image, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  adicionarFuncionario,
  buscarFuncionarioPorNome,
  alterarFuncionarioPorId,
  excluirFuncionarioPorId,
} from "../../api/ApiServiceFuncionarios";
import { buscarTodosCargos } from "../../api/ApiServiceCargos";
import styles from "./page.module.css";
import { Funcionario, Cargo } from "./types";

export default function Cadastro() {
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [funcionarioAlteracao, setFuncionarioAlteracao] = useState<Funcionario | null>(null);
  const [nomeBusca, setNomeBusca] = useState<string>("");

  const [novoFuncionario, setNovoFuncionario] = useState({
    nome: "",
    endereco: "",
    email: "",
    profissao: "",
    foto: "",
  });

  const [cargos, setCargos] = useState<Cargo[]>([]);

  useEffect(() => {
    async function carregarCargos() {
      const listaCargos = await buscarTodosCargos();
      setCargos(listaCargos);
    }
    carregarCargos();
  }, []);

  function converterFuncionario(data: any): Funcionario {
    return {
      id: data.id,
      nome: data.nome,
      endereco: data.endereco,
      email: data.email,
      profissao: data.profissao,
      foto: data.foto || "",
    };
  }

  const handleBuscaFuncionarioPorNome = async () => {
    if (nomeBusca.trim() === "") {
      toast.error("Informe um nome para buscar.");
      return;
    }

    const response = await buscarFuncionarioPorNome(nomeBusca);

    if (response.status === 200 && response.data && response.data.length > 0) {
      const f = converterFuncionario(response.data[0]);
      setFuncionario(f);
      setFuncionarioAlteracao(f);
      toast.success("Funcionário encontrado!");
    } else {
      toast.error(response.mensagem || "Funcionário não encontrado.");
      setFuncionario(null);
      setFuncionarioAlteracao(null);
    }
  };

  const handleAlterarFuncionario = async () => {
    if (!funcionarioAlteracao || !funcionarioAlteracao.id) {
      toast.error("Nenhum funcionário selecionado para alterar.");
      return;
    }
    const response = await alterarFuncionarioPorId(funcionarioAlteracao.id, funcionarioAlteracao);
    if (response.status === 200) {
      toast.success("Funcionário alterado com sucesso!");
      setFuncionario(funcionarioAlteracao); // Atualiza a exibição
    } else {
      toast.error(response.mensagem || "Erro ao alterar funcionário.");
    }
  };

  const handleExcluirFuncionario = async () => {
    if (!funcionario || !funcionario.id) {
      toast.error("Nenhum funcionário selecionado para exclusão.");
      return;
    }
    const response = await excluirFuncionarioPorId(funcionario.id);
    if (response.status === 200) {
      toast.success("Funcionário excluído com sucesso!");
      setFuncionario(null);
      setFuncionarioAlteracao(null);
      setNomeBusca("");
    } else {
      toast.error(response.mensagem || "Erro ao excluir funcionário.");
    }
  };

  const handleChangeAlteracao = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!funcionarioAlteracao) return;
    setFuncionarioAlteracao({
      ...funcionarioAlteracao,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className={styles.container}>
      <div className="container">
        <Row>
          <Col md={6} className="mb-4">
            <h2>Buscar Funcionário por Nome</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Funcionário:</Form.Label>
                <Form.Control
                  type="text"
                  value={nomeBusca}
                  onChange={(e) => setNomeBusca(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleBuscaFuncionarioPorNome}>
                Buscar
              </Button>
            </Form>

            {funcionarioAlteracao && (
              <div className="mt-4">
                <h5>Editar Funcionário:</h5>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                      type="text"
                      name="nome"
                      value={funcionarioAlteracao.nome}
                      onChange={handleChangeAlteracao}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Endereço:</Form.Label>
                    <Form.Control
                      type="text"
                      name="endereco"
                      value={funcionarioAlteracao.endereco}
                      onChange={handleChangeAlteracao}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={funcionarioAlteracao.email}
                      onChange={handleChangeAlteracao}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Profissão:</Form.Label>
                    <Form.Select
                      name="profissao"
                      value={funcionarioAlteracao.profissao}
                      onChange={handleChangeAlteracao}
                    >
                      <option value="">Selecione uma profissão</option>
                      {cargos.map((cargo) => (
                        <option key={cargo.id} value={cargo.nome}>
                          {cargo.nome}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Foto (URL):</Form.Label>
                    <Form.Control
                      type="text"
                      name="foto"
                      value={funcionarioAlteracao.foto}
                      onChange={handleChangeAlteracao}
                    />
                  </Form.Group>
                  {funcionarioAlteracao.foto && (
                    <div className="mb-3">
                      <Image src={funcionarioAlteracao.foto} alt="Foto do funcionário" fluid />
                    </div>
                  )}
                  <div className="d-flex justify-content-between">
                    <Button variant="success" onClick={handleAlterarFuncionario}>
                      Salvar Alterações
                    </Button>
                    <Button variant="danger" onClick={handleExcluirFuncionario}>
                      Excluir Funcionário
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Col>

          <Col md={6} className="mb-4">
            <h2 className="text-center mb-4">Cadastrar novo funcionário</h2>
            <Form
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await adicionarFuncionario(novoFuncionario);
                if (response.status === 201) {
                  toast.success("Funcionário cadastrado com sucesso!");
                  setNovoFuncionario({
                    nome: "",
                    endereco: "",
                    email: "",
                    profissao: "",
                    foto: "",
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
                  value={novoFuncionario.nome}
                  onChange={(e) => setNovoFuncionario({ ...novoFuncionario, nome: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Endereço:</Form.Label>
                <Form.Control
                  type="text"
                  value={novoFuncionario.endereco}
                  onChange={(e) => setNovoFuncionario({ ...novoFuncionario, endereco: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={novoFuncionario.email}
                  onChange={(e) => setNovoFuncionario({ ...novoFuncionario, email: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Profissão:</Form.Label>
                <Form.Select
                  value={novoFuncionario.profissao}
                  onChange={(e) =>
                    setNovoFuncionario({ ...novoFuncionario, profissao: e.target.value })
                  }
                  required
                >
                  <option value="">Selecione uma profissão</option>
                  {cargos.map((cargo) => (
                    <option key={cargo.id} value={cargo.nome}>
                      {cargo.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Foto (URL):</Form.Label>
                <Form.Control
                  type="text"
                  value={novoFuncionario.foto}
                  onChange={(e) => setNovoFuncionario({ ...novoFuncionario, foto: e.target.value })}
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="success" type="submit">
                  Cadastrar Funcionário
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
