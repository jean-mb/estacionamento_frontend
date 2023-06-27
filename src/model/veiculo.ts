import { AbstractEntity } from './abstract-entity'
import { Cor } from './cor'
import { Modelo } from './modelo'
import { Tipo } from './tipo'

export class Veiculo extends AbstractEntity {
  placa!: string
  ano!: number
  cor!: Cor
  tipo!: Tipo
  modelo!: Modelo
}
