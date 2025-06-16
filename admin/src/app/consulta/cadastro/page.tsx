"use client";

import { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  adicionarConsulta,
  buscarConsultaPorVetEData,
  alterarConsultaPorId,
  excluirConsultaPorId,
} from "../../api/ApiServiceConsulta";
import { buscarTodosVets } from "../../api/ApiServiceFuncionarios";
import { buscarTodosPetsParaConsulta } from "../../api/ApiServicePets";
import styles from "./page.module.css";
import { Consulta, Vet, Pet } from "./types";

export default function CadastroConsulta() {
  const [Vets, setVets] = useState<Vet[]>([]);
  const [Pets, setPets] = useState<Pet[]>([]);
  const [filtroVet, setFiltroVet] = useState<string>("");
  const [filtroData, setFiltroData] = useState<string>("");

  const [consultaAlvo, setConsultaAlvo] = useState<Consulta | null>(null);
  const [novaConsulta, setNovaConsulta] = useState({
    veterinario: "",
    pet: "",
    data: "",
  });

  useEffect(() => {
    async function carregarDados() {
      const listaVets = await buscarTodosVets();
      const listaPets = await buscarTodosPetsParaConsulta();
      setVets(listaVets);
      setPets(listaPets);
    }
    carregarDados();
  }, []);

  const handleBuscaConsulta = async () => {
    if (!filtroVet || !filtroData) {
      toast.error("Preencha Veterinário e Data para buscar.");
      return;
    }

    const response = await buscarConsultaPorVetEData(filtroVet, filtroData);
    if (response.status === 200 && response.data) {
      setConsultaAlvo(response.data);
      toast.success("Consulta encontrada!");
    } else {
      toast.error(response.mensagem || "Consulta não encontrada.");
      setConsultaAlvo(null);
    }
  };

  const handleAlterarConsulta = async () => {
    if (!consultaAlvo || !consultaAlvo.id) {
      toast.error("Nenhuma consulta selecionada.");
      return;
    }
    const response = await alterarConsultaPorId(consultaAlvo.id, consultaAlvo);
    if (response.status === 200) {
      toast.success("Consulta alterada com sucesso!");
    } else {
      toast.error(response.mensagem || "Erro ao alterar.");
    }
  };

  const handleExcluirConsulta = async () => {
    if (!consultaAlvo || !consultaAlvo.id) {
      toast.error("Nenhuma consulta selecionada.");
      return;
    }
    const response = await excluirConsultaPorId(consultaAlvo.id);
    if (response.status === 200) {
      toast.success("Consulta excluída com sucesso!");
      setConsultaAlvo(null);
    } else {
      toast.error(response.mensagem || "Erro ao excluir.");
    }
  };

  const handleChangeAlvo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!consultaAlvo) return;

    const { name, value } = e.target;
    setConsultaAlvo({
      ...consultaAlvo,
      [name]: value,
    });
  };

  return (
    <main className={styles.container}>
      <div className="container">
        <Row>
          {/* Busca e Edição */}
          <Col md={6} className="mb-4">
            <h2>Buscar Consulta</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Veterinário:</Form.Label>
                <Form.Select
                  value={filtroVet}
                  onChange={(e) => setFiltroVet(e.target.value)}
                >
                  <option value="">Selecione o Veterinário</option>
                  {Vets.map((vet) => (
                    <option key={vet.id} value={vet.nome}>
                      {vet.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Data:</Form.Label>
                <Form.Control
                  type="date"
                  value={filtroData}
                  onChange={(e) => setFiltroData(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleBuscaConsulta}>
                Buscar
              </Button>
            </Form>

            {consultaAlvo && (
              <div className="mt-4">
                <h5>Editar Consulta</h5>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Veterinário:</Form.Label>
                    <Form.Select
                      name="veterinario"
                      value={consultaAlvo.veterinario}
                      onChange={handleChangeAlvo}
                    >
                      <option value="">Selecione o Veterinário</option>
                      {Vets.map((vet) => (
                        <option key={vet.id} value={vet.nome}>
                          {vet.nome}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Pet:</Form.Label>
                    <Form.Select
                      name="pet"
                      value={consultaAlvo.pet}
                      onChange={handleChangeAlvo}
                    >
                      <option value="">Selecione o Pet</option>
                      {Pets.map((pet) => (
                        <option key={pet.id} value={pet.nome}>
                          {pet.nome}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Data:</Form.Label>
                    <Form.Control
                      type="date"
                      name="data"
                      value={consultaAlvo.data.split("T")[0]} // Caso venha com hora
                      onChange={handleChangeAlvo}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between">
                    <Button variant="success" onClick={handleAlterarConsulta}>
                      Salvar Alterações
                    </Button>
                    <Button variant="danger" onClick={handleExcluirConsulta}>
                      Excluir Consulta
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Col>

          {/* Cadastro Nova Consulta */}
          <Col md={6} className="mb-4">
            <h2 className="text-center mb-4">Cadastrar Nova Consulta</h2>
            <Form
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await adicionarConsulta({
                  ...novaConsulta,
                  data: new Date(novaConsulta.data),
                });
                if (response.status === 201) {
                  toast.success("Consulta cadastrada com sucesso!");
                  setNovaConsulta({ veterinario: "", pet: "", data: "" });
                } else {
                  toast.error(response.mensagem || "Erro ao cadastrar.");
                }
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Veterinário:</Form.Label>
                <Form.Select
                  value={novaConsulta.veterinario}
                  onChange={(e) =>
                    setNovaConsulta({ ...novaConsulta, veterinario: e.target.value })
                  }
                  required
                >
                  <option value="">Selecione o Veterinário</option>
                  {Vets.map((vet) => (
                    <option key={vet.id} value={vet.nome}>
                      {vet.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Pet:</Form.Label>
                <Form.Select
                  value={novaConsulta.pet}
                  onChange={(e) =>
                    setNovaConsulta({ ...novaConsulta, pet: e.target.value })
                  }
                  required
                >
                  <option value="">Selecione o Pet</option>
                  {Pets.map((pet) => (
                    <option key={pet.id} value={pet.nome}>
                      {pet.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Data:</Form.Label>
                <Form.Control
                  type="date"
                  value={novaConsulta.data}
                  onChange={(e) =>
                    setNovaConsulta({ ...novaConsulta, data: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="success" type="submit">
                  Cadastrar Consulta
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
