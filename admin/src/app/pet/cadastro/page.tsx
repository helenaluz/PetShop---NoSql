"use client";

import { useState, useEffect } from "react";
import { Button, Form, Image, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  adicionarPet,
  buscarPetPorNome,
  alterarPetPorId,
  excluirPetPorId,
} from "../../api/ApiServicePets";
import { buscarTodasRacas } from "../../api/ApiServiceRaca";
import { buscarTodosDonosParaPet } from "admin/app/api/ApiServiceDonos";
import styles from "./page.module.css";
import { Pet, Raca, Dono } from "./types";

export default function Cadastro() {
  const [pet, setPet] = useState<Pet | null>(null);
  const [petAlteracao, setPetAlteracao] = useState<Pet | null>(null);
  const [nomeBusca, setNomeBusca] = useState<string>("");
  const [racas, setRacas] = useState<Raca[]>([]);
  const [donos, setDonos] = useState<Dono[]>([]);

  const [novoPet, setNovoPet] = useState({
    nome: "",
    raca: "",
    dono: "",
    idade: 0,
    peso: 0,
    foto: "",
  });

  useEffect(() => {
    async function carregarRacas() {
      const listaRacas = await buscarTodasRacas();
      setRacas(listaRacas);
    }
    carregarRacas();
  }, []);

  useEffect(() => {
    async function carregarDonos() {
      const listaDonos = await buscarTodosDonosParaPet();
      setDonos(listaDonos);
    }
    carregarDonos();
  }, []);

  function converterPet(data: any): Pet {
    return {
      id: data.id,
      nome: data.nome,
      raca: data.raca,
      dono: data.dono,
      idade: data.idade,
      peso: data.peso,
      foto: data.foto || "",
    };
  }

  const handleBuscaPetPorNome = async () => {
    if (nomeBusca.trim() === "") {
      toast.error("Informe um nome para buscar.");
      return;
    }

    const response = await buscarPetPorNome(nomeBusca);

    if (response.status === 200 && response.data && response.data.length > 0) {
      const f = converterPet(response.data[0]);
      setPet(f);
      setPetAlteracao(f);
      toast.success("Pet encontrado!");
    } else {
      toast.error(response.mensagem || "Pet não encontrado.");
      setPet(null);
      setPetAlteracao(null);
    }
  };

  const handleAlterarPet = async () => {
    if (!petAlteracao || !petAlteracao.id) {
      toast.error("Nenhum Pet selecionado para alterar.");
      return;
    }
    const response = await alterarPetPorId(petAlteracao.id, petAlteracao);
    if (response.status === 200) {
      toast.success("Pet alterado com sucesso!");
      setPet(petAlteracao);
    } else {
      toast.error(response.mensagem || "Erro ao alterar Pet.");
    }
  };

  const handleExcluirPet = async () => {
    if (!pet || !pet.id) {
      toast.error("Nenhum Pet selecionado para exclusão.");
      return;
    }
    const response = await excluirPetPorId(pet.id);
    if (response.status === 200) {
      toast.success("Pet excluído com sucesso!");
      setPet(null);
      setPetAlteracao(null);
      setNomeBusca("");
    } else {
      toast.error(response.mensagem || "Erro ao excluir Pet.");
    }
  };

  const handleChangeAlteracao = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!petAlteracao) return;

    const { name, value } = e.target;

    setPetAlteracao({
      ...petAlteracao,
      [name]: name === "idade" || name === "peso" ? Number(value) : value,
    });
  };

  return (
    <main className={styles.container}>
      <div className="container">
        <Row>
          {/* Busca e edição */}
          <Col md={6} className="mb-4">
            <h2>Buscar Pet por Nome</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Pet:</Form.Label>
                <Form.Control
                  type="text"
                  value={nomeBusca}
                  onChange={(e) => setNomeBusca(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleBuscaPetPorNome}>
                Buscar
              </Button>
            </Form>

            {petAlteracao && (
              <div className="mt-4">
                <h5>Editar Pet:</h5>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                      type="text"
                      name="nome"
                      value={petAlteracao.nome}
                      onChange={handleChangeAlteracao}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Idade:</Form.Label>
                    <Form.Control
                      type="number"
                      name="idade"
                      value={petAlteracao.idade}
                      onChange={handleChangeAlteracao}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Peso:</Form.Label>
                    <Form.Control
                      type="number"
                      name="peso"
                      value={petAlteracao.peso}
                      onChange={handleChangeAlteracao}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Dono:</Form.Label>
                    <Form.Select
                      name="dono"
                      value={petAlteracao.dono}
                      onChange={handleChangeAlteracao}
                    >
                      <option value="">Selecione um dono</option>
                      {donos.map((dono) => (
                        <option key={dono.id} value={dono.nome}>
                          {dono.nome}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Raça:</Form.Label>
                    <Form.Select
                      name="raca"
                      value={petAlteracao.raca}
                      onChange={handleChangeAlteracao}
                    >
                      <option value="">Selecione uma raça</option>
                      {racas.map((raca) => (
                        <option key={raca.id} value={raca.nome}>
                          {raca.nome}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Foto (URL):</Form.Label>
                    <Form.Control
                      type="text"
                      name="foto"
                      value={petAlteracao.foto}
                      onChange={handleChangeAlteracao}
                    />
                  </Form.Group>
                  {petAlteracao.foto && (
                    <div className="mb-3">
                      <Image src={petAlteracao.foto} alt="Foto do Pet" fluid />
                    </div>
                  )}
                  <div className="d-flex justify-content-between">
                    <Button variant="success" onClick={handleAlterarPet}>
                      Salvar Alterações
                    </Button>
                    <Button variant="danger" onClick={handleExcluirPet}>
                      Excluir Pet
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Col>

          <Col md={6} className="mb-4">
            <h2 className="text-center mb-4">Cadastrar novo Pet</h2>
            <Form
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await adicionarPet(novoPet);
                if (response.status === 201) {
                  toast.success("Pet cadastrado com sucesso!");
                  setNovoPet({
                    nome: "",
                    raca: "",
                    dono: "",
                    idade: 0,
                    peso: 0,
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
                  value={novoPet.nome}
                  onChange={(e) => setNovoPet({ ...novoPet, nome: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Dono:</Form.Label>
                <Form.Select
                  value={novoPet.dono}
                  onChange={(e) =>
                    setNovoPet({ ...novoPet, dono: e.target.value })
                  }
                  required
                >
                  <option value="">Selecione um dono</option>
                  {donos.map((dono) => (
                    <option key={dono.id} value={dono.nome}>
                      {dono.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Idade:</Form.Label>
                <Form.Control
                  type="number"
                  value={novoPet.idade}
                  onChange={(e) =>
                    setNovoPet({ ...novoPet, idade: Number(e.target.value) })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Peso:</Form.Label>
                <Form.Control
                  type="number"
                  value={novoPet.peso}
                  onChange={(e) =>
                    setNovoPet({ ...novoPet, peso: Number(e.target.value) })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Raça:</Form.Label>
                <Form.Select
                  value={novoPet.raca}
                  onChange={(e) =>
                    setNovoPet({ ...novoPet, raca: e.target.value })
                  }
                  required
                >
                  <option value="">Selecione uma raça</option>
                  {racas.map((raca) => (
                    <option key={raca.id} value={raca.nome}>
                      {raca.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Foto (URL):</Form.Label>
                <Form.Control
                  type="text"
                  value={novoPet.foto}
                  onChange={(e) => setNovoPet({ ...novoPet, foto: e.target.value })}
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="success" type="submit">
                  Cadastrar Pet
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
