"use client";

import { useState, useEffect } from "react";
import { Button, Form, Image, Row, Col, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  adicionarProduto,
  buscarProdutoPorNome,
  excluirProdutoPorId,
  alterarProdutoPorId,
  buscarTodosProdutos, 
  excluirProdutoPorNome  
} from "../../api/ApiServiceProdutos";
import styles from "./page.module.css";
import { Produto} from "./types";

const formatarPreco = (valor: number) => {
  return valor.toLocaleString('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  });
};

export default function Cadastro() {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [produtoAlteracao, setProdutoAlteracao] = useState<Produto | null>(null);
  const [nomeBusca, setNomeBusca] = useState<string>("");

  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    descricao: "",
    preco: 0,
    quantidade: 0,
  });

function converterProduto(data: any): Produto {
    return {
      id: data.id,
      nome: data.nome,
      descricao: data.descricao, 
      preco: data.preco || 0,
      quantidade: data.quantidade || 0,
    };
  }

  const handleBuscaProdutoPorNome = async () => {
    if (nomeBusca.trim() === "") {
      toast.error("Informe um nome para buscar.");
      return;
    }

    const response = await buscarProdutoPorNome(nomeBusca);

    if (response.status === 200 && response.data && response.data.length > 0) {
      const f = converterProduto(response.data[0]);
      setProduto(f);
      setProdutoAlteracao(f);
      toast.success("Produto encontrado!");
    } else {
      toast.error(response.mensagem || "Produto não encontrado.");
      setProduto(null);
      setProdutoAlteracao(null);
    }
  };            
  const handleAlterarProduto= async () => {
    if (!produtoAlteracao || !produtoAlteracao.id) {
      toast.error("Nenhum Produto selecionado para alterar.");
      return;
    }
    const response = await alterarProdutoPorId(produtoAlteracao.id, produtoAlteracao);
    if (response.status === 200) {
      toast.success("Produto alterado com sucesso!");
      setProduto(produtoAlteracao);
    } else {
      toast.error(response.mensagem || "Erro ao alterar Produto.");
    }
  };

  const handleExcluirProduto = async () => {
    if (!produto || !produto.id) {
      toast.error("Nenhum Produto selecionado para exclus�o.");
      return;
    }
    const response = await excluirProdutoPorId(produto.id);
    if (response.status === 200) {
      toast.success("Produto exclu�do com sucesso!");
      setProduto(null);
      setProdutoAlteracao(null);
      setNomeBusca("");
    } else {
      toast.error(response.mensagem || "Erro ao excluir Pet.");
    }
  };

  const handleChangeAlteracao = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!produtoAlteracao) return;

    const { name, value } = e.target;

    setProdutoAlteracao({
      ...produtoAlteracao,
      [name]: name === "idade" || name === "peso" ? Number(value) : value,
    });
  };

  return (
    <main className={styles.container}>
      <div className="container">
        <Row>
          {/* Busca e edi��o */}
          <Col md={6} className="mb-4">
            <h2>Buscar Produto por Nome</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Produto:</Form.Label>
                <Form.Control
                  type="text"
                  value={nomeBusca}
                  onChange={(e) => setNomeBusca(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleBuscaProdutoPorNome}>
                Buscar
              </Button>
            </Form>

            {produtoAlteracao && (
              <div className="mt-4">
                <h5>Editar Produto:</h5>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                      type="text"
                      name="nome"
                      value={produtoAlteracao.nome}
                      onChange={handleChangeAlteracao}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Descrição:</Form.Label>
                    <Form.Control
                      type="text"
                      name="descricao"
                      value={produtoAlteracao.descricao}  
                      onChange={handleChangeAlteracao}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Preço:</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>R$</InputGroup.Text>
                      <Form.Control
                        type="number"
                        step="0.01"
                        min="0"
                        name="preco"
                        value={produtoAlteracao.preco}
                        onChange={handleChangeAlteracao}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Quantidade:</Form.Label>
                    <Form.Control
                      type="number"
                      name="quantidade"
                      value={produtoAlteracao.quantidade}  
                      onChange={handleChangeAlteracao}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <Button variant="success" onClick={handleAlterarProduto}>
                      Salvar Alterações
                    </Button>
                    <Button variant="danger" onClick={handleExcluirProduto}>
                      Excluir Produto
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Col>

          <Col md={6} className="mb-4">
            <h2 className="text-center mb-4">Cadastrar novo Produto</h2>
            <Form
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await adicionarProduto(novoProduto);
                if (response.status === 201) {
                  toast.success("Produto cadastrado com sucesso!");
                  setNovoProduto({
                    nome: "",
                    descricao: "", 
                    preco: 0,
                    quantidade: 0,
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
                  value={novoProduto.nome}
                  onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
                  required
                />
                <Form.Label>Descrição:</Form.Label>
                <Form.Control
                  type="text"
                  value={novoProduto.descricao}
                  onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
                  required
                />
               <Form.Label>Preço:</Form.Label>
                <InputGroup className="mb-1">
                  <InputGroup.Text>R$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    value={novoProduto.preco}
                    onChange={(e) => setNovoProduto({ ...novoProduto, preco: Number(e.target.value) })}
                    required
                  />
                </InputGroup>
                <Form.Label>Quantidade:</Form.Label>
                <Form.Control
                  type="number"
                  value={novoProduto.quantidade}
                  onChange={(e) => setNovoProduto({ ...novoProduto, quantidade : Number(e.target.value) })}
                  required
                />   
            </Form.Group>             
              <div className="text-center">
                <Button variant="success" type="submit">
                  Cadastrar Produto
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
