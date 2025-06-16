export interface Funcionario {
  id: string;
  nome: string;
  endereco: string;
  email: string;
  profissao: string;
  foto: string;
}

export type Cargo = {
  id: string;
  nome: string;
};

/*
  "id": 1,
  "nome":"Alonzo Birden",
  "foto":"https://robohash.org/praesentiumomnisdolore.png?size=50x50&set=set1",
  "email":"abirden0@mac.com",
  "subobjeto": {
    "propriedade1": "Valor 1",
    "propriedade2": "Valor 2"
  */
