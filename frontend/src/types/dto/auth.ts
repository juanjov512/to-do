interface IRegistroDTO {
    nombre: string;
    email: string;
    password: string;
}
  
interface ILoginDTO {
    email: string;
    password: string;
}
  
interface IUsuario {
    id: string;
    nombre: string;
    email: string;
}

export type { IRegistroDTO, ILoginDTO, IUsuario }