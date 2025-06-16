import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function buscarTodasRacas() {
  try {
    const racasRef = collection(db, "raca");
    const snapshot = await getDocs(racasRef);

    const racas = snapshot.docs.map(doc => ({
      id: doc.id,
      nome: doc.data().nome,
    }));

    return racas;
  } catch (error) {
    console.error("Erro ao buscar racas:", error);
    return [];
  }
}
