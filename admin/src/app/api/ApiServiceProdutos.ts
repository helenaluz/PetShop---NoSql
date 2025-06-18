import { doc, updateDoc, deleteDoc, getDocs, addDoc, getDoc, collection, query, where  } from "firebase/firestore";
import { db } from "./firebase";

export interface ResponseApi {
    data?: any;
    mensagem?: string;
    status: number;
    errorCode?: string;
  }

export async function buscarProdutoPorId(id: string): Promise<ResponseApi> {
    try {
      const docSnap = await getDoc(doc(db, "produtos", id));
  
      if (docSnap.exists()) {
        const Produto = { id: docSnap.id, ...docSnap.data() };
        return {
          status: 200,
          mensagem: "Produto encontrado com sucesso!",
          data: Produto
        };
      } else {
        return {
          status: 404,
          mensagem: "Produto não encontrado!"
        };
      }
    } catch (error) {
      console.error("Erro ao buscar Produto:", error);
      return {
        status: 500,
        mensagem: "Erro ao buscar Produto!",
        data: error
      };
    }
  }

  export async function buscarProdutoPorNomeEDescricao(nome: string, desc: string) {
  try {
    const nomeNormalizado = nome.toLowerCase();
    const descNormalizado = desc.toLowerCase();

    const produtosRef = collection(db, "produtos");
    const q = query(produtosRef);
    const querySnapshot = await getDocs(q);

    const produtos = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
        descricao: doc.data().descricao,
        nome: doc.data().nome,
        preco: doc.data().preco,
        quantidade: doc.data().quantidade,
      }))
      .filter(produto => {
        const produtoNome = produto.nome.toLowerCase();
        const produtoDesc = produto.descricao.toLowerCase();

        const nomeMatch = produtoNome.includes(nomeNormalizado) ||
                          removerAcentos(produtoNome).includes(removerAcentos(nomeNormalizado));

        const descMatch = produtoDesc.includes(descNormalizado) ||
                          removerAcentos(produtoDesc).includes(removerAcentos(descNormalizado));

        return nomeMatch && descMatch;
      });

    return {
      status: produtos.length > 0 ? 200 : 404,
      data: produtos,
      mensagem: produtos.length > 0 ? "Produtos encontrados" : "Nenhum produto encontrado",
    };
  } catch (error) {
    console.error("Erro ao buscar produto por nome e descrição:", error);
    return { status: 500, mensagem: "Erro ao buscar produto" };
  }
}

  
 
  function removerAcentos(texto: string) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  export async function excluirProdutoPorId(id: string): Promise<ResponseApi> {
    try {
      await deleteDoc(doc(db, "produtos", id));
      return {
        status: 204,
        mensagem: "Produto excluído com sucesso!"
      };
    } catch (error) {
      console.error("Erro ao excluir Produto:", error);
      return {
        status: 500,
        mensagem: "Erro ao excluir Produto",
        data: error
      };
    }
  }

  export async function excluirProdutoPorNome(nome : string): Promise<ResponseApi> {
    try {
      await deleteDoc(doc(db, "produtos", nome));
      return {
        status: 204,
        mensagem: "Produto excluído com sucesso!"
      };
    } catch (error) {
      console.error("Erro ao excluir Produto:", error);
      return {
        status: 500,
        mensagem: "Erro ao excluir Produto",
        data: error
      };
    }
  }
  
export async function alterarProdutoPorId(id: string, body: any): Promise<ResponseApi> {
    try {
      const docRef = doc(db, "produtos", id);
      await updateDoc(docRef, body);
  
      return {
        status: 200,
        mensagem: "Produto alterado com sucesso!"
      };
    } catch (error) {
      console.error("Erro ao alterar Produto:", error);
      return {
        status: 500,
        mensagem: "Erro ao alterar Produto",
        data: error
      };
    }
  }


  export async function adicionarProduto(body: any): Promise<ResponseApi> {
    try {
      const docRef = await addDoc(collection(db, "produtos"), body);

      return {
        status: 201,
        mensagem: "Produto adicionado com sucesso!",
        data: { id: docRef.id }
      };
    } catch (error) {
      console.error("Erro ao adicionar Produto:", error);
      return {
        status: 500,
        mensagem: "Erro ao adicionar Produto",
        data: error
      };
    }
  }

  export async function buscarTodosProdutos(): Promise<ResponseApi> {
    try {
      const produtosRef = collection(db, "produtos");
      const querySnapshot = await getDocs(produtosRef);
      const produtos: any[] = [];

      querySnapshot.forEach((doc) => {
        produtos.push({ id: doc.id, ...doc.data() });
      });

      return {
        status: 200,
        mensagem: "Produtos encontrados com sucesso!",
        data: produtos
      };
    } catch (error) {
      console.error("Erro ao buscar Produtos:", error);
      return {
        status: 500,
        mensagem: "Erro ao buscar Produtos",
        data: error
      };
    }
  }





