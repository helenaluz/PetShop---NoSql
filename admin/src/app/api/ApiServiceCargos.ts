import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function buscarTodosCargos() {
  try {
    const cargosRef = collection(db, "cargo");
    const snapshot = await getDocs(cargosRef);

    const cargos = snapshot.docs.map(doc => ({
      id: doc.id,
      nome: doc.data().nome,
    }));

    return cargos;
  } catch (error) {
    console.error("Erro ao buscar cargos:", error);
    return [];
  }
}
