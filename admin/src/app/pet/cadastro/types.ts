export interface Pet {
  id: number;
  nome: string;
  raca: string;
  dono: string;
  idade: string;
  foto: string;
  peso: number
}

export type Raca = {
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
