import { Veiculo } from '@/model/veiculo'
import axios, { AxiosInstance } from 'axios'

export class VeiculoClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = axios.create({
      baseURL: `http://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api`,
      headers: { 'Content-type': 'application/json' }
    })
  }

  public async findById(id: number): Promise<Veiculo> {
    try {
      const response = await this.axiosClient.get<Veiculo>(`/veiculo?id=${id}`)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async listarAll(): Promise<Veiculo[]> {
    try {
      const response = await this.axiosClient.get<Veiculo[]>('/veiculo/lista')
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }
  public async findByPlaca(placa: string): Promise<Veiculo[]> {
    try {
      const response = await this.axiosClient.get<Veiculo[]>(`/veiculo/placa?placa=${placa}`)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async listarAllAtivos(): Promise<Veiculo[]> {
    try {
      const response = await this.axiosClient.get<Veiculo[]>('/veiculo/lista/ativos')
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public async cadastrar(veiculo: Veiculo): Promise<Veiculo> {
    try {
      const response = await this.axiosClient.post<Veiculo>('/veiculo', veiculo)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async atualizar(veiculo: Veiculo): Promise<Veiculo> {
    try {
      const response = await this.axiosClient.put<Veiculo>(
        `/veiculo?id=${veiculo.id}`,
        veiculo
      )
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async desativar(id: number): Promise<Veiculo> {
    try {
      const response = await this.axiosClient.delete<Veiculo>(
        `/veiculo?id=${id}`
      )
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
