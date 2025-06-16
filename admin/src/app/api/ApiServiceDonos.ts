import { doc, updateDoc, deleteDoc, getDocs, addDoc, getDoc, collection, query, where  } from "firebase/firestore";
import { db } from "./firebase";


export interface ResponseApi {
  data?: any;
  mensagem?: string;
  status: number;
}

export async function buscarDonoPorId(id: string): Promise<ResponseApi> {
    try {
      const docSnap = await getDoc(doc(db, "Donos", id));
  
      if (docSnap.exists()) {
        const Dono = { id: docSnap.id, ...docSnap.data() };
        return {
          status: 200,
          mensagem: "Dono encontrado com sucesso!",
          data: Dono
        };
      } else {
        return {
          status: 404,
          mensagem: "Dono não encontrado!"
        };
      }
    } catch (error) {
      console.error("Erro ao buscar Dono:", error);
      return {
        status: 500,
        mensagem: "Erro ao buscar Dono",
        data: error
      };
    }
  }

  export async function buscarDonoPorNome(nome: string): Promise<ResponseApi> {
    try {
      const DonosRef = collection(db, "Donos");
      const q = query(DonosRef, where("nome", "==", nome));
      const querySnapshot = await getDocs(q);
      console.log(nome);
      if (!querySnapshot.empty) {
        const Donos: any[] = [];
        querySnapshot.forEach((doc) => {
          Donos.push({ id: doc.id, ...doc.data() });
        });
  
        return {
          status: 200,
          mensagem: "Dono(s) encontrado(s) com sucesso!",
          data: Donos,
        };
      } else {
        return {
          status: 404,
          mensagem: "Nenhum Dono encontrado com esse nome.",
        };
      }
    } catch (error) {
      console.error("Erro ao buscar Dono:", error);
      return {
        status: 500,
        mensagem: "Erro ao buscar Dono",
        data: error,
      };
    }
  }

  export async function buscarDonoPorDono(dono: string): Promise<ResponseApi> {
    try {
      const DonosRef = collection(db, "Donos");
      const q = query(DonosRef, where("dono", "==", dono));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const Donos: any[] = [];
        querySnapshot.forEach((doc) => {
          Donos.push({ id: doc.id, ...doc.data() });
        });
  
        return {
          status: 200,
          mensagem: "Dono(s) encontrado(s) com sucesso!",
          data: Donos,
        };
      } else {
        return {
          status: 404,
          mensagem: "Nenhum Dono encontrado com esse nome.",
        };
      }
    } catch (error) {
      console.error("Erro ao buscar Dono:", error);
      return {
        status: 500,
        mensagem: "Erro ao buscar Dono",
        data: error,
      };
    }
  }
  
  

export async function excluirDonoPorId(id: string): Promise<ResponseApi> {
  try {
    await deleteDoc(doc(db, "Donos", id));
    return {
      status: 204,
      mensagem: "Dono excluído com sucesso!"
    };
  } catch (error) {
    console.error("Erro ao excluir Dono:", error);
    return {
      status: 500,
      mensagem: "Erro ao excluir Dono",
      data: error
    };
  }
}


export async function alterarDonoPorId(id: string, body: any): Promise<ResponseApi> {
  try {
    const docRef = doc(db, "Donos", id);
    await updateDoc(docRef, body);

    return {
      status: 200,
      mensagem: "Dono alterado com sucesso!"
    };
  } catch (error) {
    console.error("Erro ao alterar Dono:", error);
    return {
      status: 500,
      mensagem: "Erro ao alterar Dono",
      data: error
    };
  }
}

export async function adicionarDono(body: any): Promise<ResponseApi> {
  try {
    const docRef = await addDoc(collection(db, "Donos"), body);

    return {
      status: 201,
      mensagem: "Dono adicionado com sucesso!",
      data: { id: docRef.id }
    };
  } catch (error) {
    console.error("Erro ao adicionar Dono:", error);
    return {
      status: 500,
      mensagem: "Erro ao adicionar Dono",
      data: error
    };
  }
}


export async function buscarTodosDonos() {
  try {
    const DonosRef = collection(db, "Donos");
    const snapshot = await getDocs(DonosRef);

    const Donos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return Donos;
  } catch (error) {
    console.error("Erro ao buscar todos Donos:", error);
    return [];
  }
}

export async function buscarTodosDonosParaPet() {
    try {
      const DonosRef = collection(db, "Donos");
      const snapshot = await getDocs(DonosRef);
  
      const Donos = snapshot.docs.map(doc => ({
        id: doc.id,
        nome: doc.data().nome,
      }));
  
      return Donos;
    } catch (error) {
      console.error("Erro ao buscar todos Donos:", error);
      return [];
    }
  }