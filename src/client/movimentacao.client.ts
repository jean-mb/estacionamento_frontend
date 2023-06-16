import { Configuracao } from '@/model/configuracao'
import axios, { AxiosInstance } from 'axios'

export class MovimentacaoClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/api/movimentacao',
      headers: { 'Content-type': 'application/json' }
    })
  }

  public async findById(id: number): Promise<Configuracao> {
    try {
      const response = await this.axiosClient.get<Configuracao>(`?id=${id}`)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async listarAll(): Promise<Configuracao[]> {
    try {
      const response = await this.axiosClient.get<Configuracao[]>('/lista')
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public async listarAbertas(): Promise<Configuracao[]> {
    try {
      const response = await this.axiosClient.get<Configuracao[]>('/lista/abertas')
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public async novaMovimentacao(movimentacao: Configuracao): Promise<Configuracao> {
    try {
      const response = await this.axiosClient.post<Configuracao>('/nova', movimentacao)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async editarMovimentacao(movimentacao: Configuracao): Promise<Configuracao> {
    try {
      const response = await this.axiosClient.put<Configuracao>(
        `?/editar?id=${movimentacao.id}`,
        movimentacao
      )
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async deletar(movimentacao: Configuracao): Promise<Configuracao> {
    try {
      const response = await this.axiosClient.delete<Configuracao>(
        `?id=${movimentacao.id}`
      )
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
