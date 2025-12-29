export interface userI{
  idusuario?: number
  name: string,
  password: string,
  correo: string,
  celular: string,
  direccion:string,
  sesion: string
}

export class user implements userI{
  idusuario?: number
  name: string
  password: string
  correo: string
  celular: string
  direccion:string
  sesion: string

  constructor(user:userI) {
    this.idusuario = user?.idusuario;
    this.name = user.name;
    this.password = user.password;
    this.correo = user.correo;
    this.celular = user.celular;
    this.direccion = user.direccion;
    this.sesion = user.sesion
  }
  
}
