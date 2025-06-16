export interface DataItem {
  id: string;
  nome: string;
  email: string;
  foto: string;
  subobjeto: subobjeto;
}

interface subobjeto {
  propriedade1: string;
  propriedade2: string;
}

/*
  "id": 1,
  "nome":"Alonzo Birden",
  "foto":"https://robohash.org/praesentiumomnisdolore.png?size=50x50&set=set1",
  "email":"abirden0@mac.com",
  "subobjeto": {
    "propriedade1": "Valor 1",
    "propriedade2": "Valor 2"
  */
