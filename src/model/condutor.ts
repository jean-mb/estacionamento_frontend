import { AbstractEntity } from './abstract-entity'

export class Condutor extends AbstractEntity {
  nome!: string
  cpf!: string
  telefone!: string
  tempoPagoSegundos!: number
  tempoDescontoSegundos!: number
  tempoDescontoUsadoSegundos!: number
}
