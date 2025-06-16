import { doc, updateDoc, deleteDoc, getDocs, addDoc, getDoc, collection, query, where  } from "firebase/firestore";
import { db } from "./firebase";


export interface ResponseApi {
  data?: any;
  mensagem?: string;
  status: number;
}

export async function buscarPetPorId(id: string): Promise<ResponseApi> {
    try {
      const docSnap = await getDoc(doc(db, "pets", id));
  
      if (docSnap.exists()) {
        const Pet = { id: docSnap.id, ...docSnap.data() };
        return {
          status: 200,
          mensagem: "Pet encontrado com sucesso!",
          data: Pet
        };
      } else {
        return {
          status: 404,
          mensagem: "Pet não encontrado!"
        };
      }
    } catch (error) {
      console.error("Erro ao buscar Pet:", error);
      return {
        status: 500,
        mensagem: "Erro ao buscar Pet",
        data: error
      };
    }
  }

  export async function buscarPetPorNome(nome: string): Promise<ResponseApi> {
    try {
      const petsRef = collection(db, "pets");
      const q = query(petsRef, where("nome", "==", nome));
      const querySnapshot = await getDocs(q);
      console.log(nome);
      if (!querySnapshot.empty) {
        const pets: any[] = [];
        querySnapshot.forEach((doc) => {
          pets.push({ id: doc.id, ...doc.data() });
        });
  
        return {
          status: 200,
          mensagem: "Pet(s) encontrado(s) com sucesso!",
          data: pets,
        };
      } else {
        return {
          status: 404,
          mensagem: "Nenhum Pet encontrado com esse nome.",
        };
      }
    } catch (error) {
      console.error("Erro ao buscar Pet:", error);
      return {
        status: 500,
        mensagem: "Erro ao buscar Pet",
        data: error,
      };
    }
  }

  export async function buscarPetPorDono(dono: string): Promise<ResponseApi> {
    try {
      const petsRef = collection(db, "pets");
      const q = query(petsRef, where("dono", "==", dono));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const pets: any[] = [];
        querySnapshot.forEach((doc) => {
          pets.push({ id: doc.id, ...doc.data() });
        });
  
        return {
          status: 200,
          mensagem: "Pet(s) encontrado(s) com sucesso!",
          data: pets,
        };
      } else {
        return {
          status: 404,
          mensagem: "Nenhum Pet encontrado com esse nome.",
        };
      }
    } catch (error) {
      console.error("Erro ao buscar Pet:", error);
      return {
        status: 500,
        mensagem: "Erro ao buscar Pet",
        data: error,
      };
    }
  }
  
  

export async function excluirPetPorId(id: string): Promise<ResponseApi> {
  try {
    await deleteDoc(doc(db, "pets", id));
    return {
      status: 204,
      mensagem: "Pet excluído com sucesso!"
    };
  } catch (error) {
    console.error("Erro ao excluir Pet:", error);
    return {
      status: 500,
      mensagem: "Erro ao excluir Pet",
      data: error
    };
  }
}


export async function alterarPetPorId(id: string, body: any): Promise<ResponseApi> {
  try {
    const docRef = doc(db, "pets", id);
    await updateDoc(docRef, body);

    return {
      status: 200,
      mensagem: "Pet alterado com sucesso!"
    };
  } catch (error) {
    console.error("Erro ao alterar Pet:", error);
    return {
      status: 500,
      mensagem: "Erro ao alterar Pet",
      data: error
    };
  }
}

export async function adicionarPet(body: any): Promise<ResponseApi> {
  try {
    const docRef = await addDoc(collection(db, "pets"), body);

    return {
      status: 201,
      mensagem: "Pet adicionado com sucesso!",
      data: { id: docRef.id }
    };
  } catch (error) {
    console.error("Erro ao adicionar Pet:", error);
    return {
      status: 500,
      mensagem: "Erro ao adicionar Pet",
      data: error
    };
  }
}


export async function buscarTodospets() {
  try {
    const petsRef = collection(db, "pets");
    const snapshot = await getDocs(petsRef);

    const pets = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return pets;
  } catch (error) {
    console.error("Erro ao buscar todos pets:", error);
    return [];
  }
}

export async function buscarPetPorRaca(raca: string) {
  try {
    const petsRef = collection(db, "pets");
    const q = query(petsRef, where("raca", "==", raca));
    const querySnapshot = await getDocs(q);

    const pets = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

      return pets
  } catch (error) {
    console.error("Erro ao buscar todos pets:", error);
    return [];
  }
}