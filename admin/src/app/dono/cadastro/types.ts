export interface Dono {
  id: string;
  nome: string;
  endereco: string;
  email: string;
  telefone:string;
}

export interface Cargo {
  id: string; 
  nome: string;
  descricao: string;  
  salario: number;
  cargaHoraria: number;  
}
