import { Configuracao } from '@/model/configuracao'
import { Movimentacao } from '@/model/movimentacao'
import axios, { AxiosInstance } from 'axios'

export class MovimentacaoClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/api/movimentacao',
      headers: { 'Content-type': 'application/json' }
    })
  }

  public async findById(id: number): Promise<Movimentacao> {
    try {
      const response = await this.axiosClient.get<Movimentacao>(`?id=${id}`)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async listarAll(): Promise<Movimentacao[]> {
    try {
      const response = await this.axiosClient.get<Movimentacao[]>('/lista')
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public async listarAbertas(): Promise<Movimentacao[]> {
    try {
      const response = await this.axiosClient.get<Movimentacao[]>('/lista/abertas')
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public async novaMovimentacao(movimentacao: Movimentacao): Promise<Movimentacao> {
    try {
      const response = await this.axiosClient.post<Movimentacao>('/nova', movimentacao)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async editarMovimentacao(movimentacao: Movimentacao): Promise<Movimentacao> {
    try {
      const response = await this.axiosClient.put<Movimentacao>(
        `?/editar?id=${movimentacao.id}`,
        movimentacao
      )
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async deletar(movimentacao: Movimentacao): Promise<Movimentacao> {
    try {Movimentacao
      const response = await this.axiosClient.delete<Movimentacao>(
        `?id=${movimentacao.id}`
      )
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
