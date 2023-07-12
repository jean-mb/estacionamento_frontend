import { Configuracao } from '@/model/configuracao'
import axios, { AxiosInstance } from 'axios'

export class ConfiguracaoClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = axios.create({
      baseURL: `${process.env.VUE_APP_BACKEND_URL}`,
      headers: { 'Content-type': 'application/json' }
    })
  }

  public async getConfiguracao(): Promise<Configuracao> {
    try {
      const response = await this.axiosClient.get<Configuracao>('/configuracao')
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async primeiraConfiguracao(configuracao: Configuracao): Promise<Configuracao> {
    try {
      const response = await this.axiosClient.post<Configuracao>('/configuracao', configuracao)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async editar(configuracao: Configuracao): Promise<Configuracao> {
    try {
      const response = await this.axiosClient.put<Configuracao>(
        '/configuracao/editar',
        configuracao
      )
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
