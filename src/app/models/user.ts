export interface UserModel {
  id?: number,
  email: string,
  password: string,
  nomeCompleto: string,
  dataDeNascimento: string,
  tipo: string,
  telefone: string,
  menor: string,
  responsavel?: string,
  telefoneResponsavel?: string
}
