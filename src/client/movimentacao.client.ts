import { Configuracao } from '@/model/configuracao'
import { Movimentacao } from '@/model/movimentacao'
import axios, { AxiosInstance } from 'axios'

export class MovimentacaoClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/api',
      headers: { 'Content-type': 'application/json' }
    })
  }

  public async findById(id: number): Promise<Movimentacao> {
    try {
      const response = await this.axiosClient.get<Movimentacao>(`/movimentacao?id=${id}`)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async listarAll(): Promise<Movimentacao[]> {
    try {
      const response = await this.axiosClient.get<Movimentacao[]>('/movimentacao/lista')
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public async listarAbertas(): Promise<Movimentacao[]> {
    try {
      const response = await this.axiosClient.get<Movimentacao[]>('/movimentacao/lista/abertas')
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public async novaMovimentacao(movimentacao: Movimentacao): Promise<string> {
    try {
      const response = await this.axiosClient.post<string>('/movimentacao/nova', movimentacao)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async editarMovimentacao(movimentacao: Movimentacao): Promise<string> {
    try {
      const response = await this.axiosClient.put<string>(
        `/movimentacao/editar?id=${movimentacao.id}`,
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
        `/movimentacao?id=${movimentacao.id}`
      )
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
