export interface Pet {
  id: string;
  nome: string;
  raca: string;
  dono: string;
  idade: number;
  foto: string;
  peso: number
}

export type Raca = {
  id: string;
  nome: string;
};


export type Dono = {
  id: string;
  nome: string;
};