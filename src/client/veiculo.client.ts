import { Veiculo } from '@/model/veiculo'
import axios, { AxiosInstance } from 'axios'

export class veiculoClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/api/veiculo',
      headers: { 'Content-type': 'application/json' }
    })
  }

  public async findById(id: number): Promise<Veiculo> {
    try {
      const response = await this.axiosClient.get<Veiculo>(`?id=${id}`)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async listarAll(): Promise<Veiculo[]> {
    try {
      const response = await this.axiosClient.get<Veiculo[]>('/lista')
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public async listarAllAtivos(): Promise<Veiculo[]> {
    try {
      const response = await this.axiosClient.get<Veiculo[]>('/lista/ativos')
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public async cadastrar(veiculo: Veiculo): Promise<Veiculo> {
    try {
      const response = await this.axiosClient.post<Veiculo>('', veiculo)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async atualizar(veiculo: Veiculo): Promise<Veiculo> {
    try {
      const response = await this.axiosClient.put<Veiculo>(
        `?id=${veiculo.id}`,
        veiculo
      )
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async desativar(veiculo: Veiculo): Promise<Veiculo> {
    try {
      const response = await this.axiosClient.delete<Veiculo>(
        `?id=${veiculo.id}`
      )
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
