export interface EventModel {
  id: number;
  titulo: string;
  sistema: string;
  horario: string;
  numeroDeVagas: number;
  narrador: string;
  data: string;
  local: string;
  tags: string[];
  descricao: string;
  jogadores: number[]
}
