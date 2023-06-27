import { AbstractEntity } from './abstract-entity'

export class Configuracao extends AbstractEntity {
  qntdVan!: number
  qntdCarro!: number
  qntdMoto!: number
  horasParaDesconto!: number
  valorHora!: number
  valorMulta!: number
  horaAbertura!: Date
  horaFechamento!: Date
}
