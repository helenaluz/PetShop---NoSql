import { doc, updateDoc, deleteDoc, getDocs, addDoc, getDoc, collection, query, where  } from "firebase/firestore";
import { db } from "./firebase";


export interface ResponseApi {
  data?: any;
  mensagem?: string;
  status: number;
}

export async function buscarFuncionarioPorId(id: string): Promise<ResponseApi> {
    try {
      const docSnap = await getDoc(doc(db, "funcionarios", id));
  
      if (docSnap.exists()) {
        const funcionario = { id: docSnap.id, ...docSnap.data() };
        return {
          status: 200,
          mensagem: "Funcionário encontrado com sucesso!",
          data: funcionario
        };
      } else {
        return {
          status: 404,
          mensagem: "Funcionário não encontrado!"
        };
      }
    } catch (error) {
      console.error("Erro ao buscar funcionário:", error);
      return {
        status: 500,
        mensagem: "Erro ao buscar funcionário",
        data: error
      };
    }
  }

  export async function buscarFuncionarioPorNome(nome: string): Promise<ResponseApi> {
    try {
      const funcionariosRef = collection(db, "funcionarios");
      const q = query(funcionariosRef, where("nome", "==", nome));
      const querySnapshot = await getDocs(q);
      console.log(nome);
      if (!querySnapshot.empty) {
        const funcionarios: any[] = [];
        querySnapshot.forEach((doc) => {
          funcionarios.push({ id: doc.id, ...doc.data() });
        });
  
        return {
          status: 200,
          mensagem: "Funcionário(s) encontrado(s) com sucesso!",
          data: funcionarios,
        };
      } else {
        return {
          status: 404,
          mensagem: "Nenhum funcionário encontrado com esse nome.",
        };
      }
    } catch (error) {
      console.error("Erro ao buscar funcionário:", error);
      return {
        status: 500,
        mensagem: "Erro ao buscar funcionário",
        data: error,
      };
    }
  }
  
  

export async function excluirFuncionarioPorId(id: string): Promise<ResponseApi> {
  try {
    await deleteDoc(doc(db, "funcionarios", id));
    return {
      status: 204,
      mensagem: "Funcionário excluído com sucesso!"
    };
  } catch (error) {
    console.error("Erro ao excluir funcionário:", error);
    return {
      status: 500,
      mensagem: "Erro ao excluir funcionário",
      data: error
    };
  }
}


export async function alterarFuncionarioPorId(id: string, body: any): Promise<ResponseApi> {
  try {
    const docRef = doc(db, "funcionarios", id);
    await updateDoc(docRef, body);

    return {
      status: 200,
      mensagem: "Funcionário alterado com sucesso!"
    };
  } catch (error) {
    console.error("Erro ao alterar funcionário:", error);
    return {
      status: 500,
      mensagem: "Erro ao alterar funcionário",
      data: error
    };
  }
}

export async function adicionarFuncionario(body: any): Promise<ResponseApi> {
  try {
    const docRef = await addDoc(collection(db, "funcionarios"), body);

    return {
      status: 201,
      mensagem: "Funcionário adicionado com sucesso!",
      data: { id: docRef.id }
    };
  } catch (error) {
    console.error("Erro ao adicionar funcionário:", error);
    return {
      status: 500,
      mensagem: "Erro ao adicionar funcionário",
      data: error
    };
  }
}


export async function buscarTodosFuncionarios() {
  try {
    const funcionariosRef = collection(db, "funcionarios");
    const snapshot = await getDocs(funcionariosRef);

    const funcionarios = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return funcionarios;
  } catch (error) {
    console.error("Erro ao buscar todos funcionários:", error);
    return [];
  }
}

export async function buscarTodosVets() {
  try {
    const funcionariosRef = collection(db, "funcionarios");
    const q = query(funcionariosRef, where("profissao", "==", "Veterinário"));
    const querySnapshot = await getDocs(q);

    const funcionarios = querySnapshot.docs.map(doc => ({
      id: doc.id,
      nome: doc.data().nome,
    }));

      return funcionarios
  } catch (error) {
    console.error("Erro ao buscar todos funcionários:", error);
    return [];
  }
}

export async function buscarFuncionarioPorCargo(cargo: string) {
  try {
    const funcionariosRef = collection(db, "funcionarios");
    const q = query(funcionariosRef, where("profissao", "==", cargo));
    const querySnapshot = await getDocs(q);

    const funcionarios = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

      return funcionarios
  } catch (error) {
    console.error("Erro ao buscar todos funcionários:", error);
    return [];
  }
}