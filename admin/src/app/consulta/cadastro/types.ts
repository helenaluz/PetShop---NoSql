export interface Consulta {
  id: string;
  veterinario: string;
  pet: string;
  data: Date;
}

export type Pet = {
  id: string;
  nome: string;
};


export type Vet = {
  id: string;
  nome: string;
};