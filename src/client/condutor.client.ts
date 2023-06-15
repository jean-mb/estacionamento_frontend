import { Condutor } from '@/model/condutor'
import axios, { AxiosInstance } from 'axios'

export class CondutorClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/api/condutor',
      headers: { 'Content-type': 'application/json' }
    })
  }

  public async findById(id: number): Promise<Condutor> {
    try {
      const response = await this.axiosClient.get<Condutor>(`?id=${id}`)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async lista(): Promise<Condutor[]> {
    try {
      const response = await this.axiosClient.get<Condutor[]>('/lista')
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public async listaAtivos(): Promise<Condutor[]> {
    try {
      const response = await this.axiosClient.get<Condutor[]>('/lista/ativos')
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public async cadastrarCondutor(condutor: Condutor): Promise<Condutor> {
    try {
      const response = await this.axiosClient.post<Condutor>('', condutor)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async editarCondutor(condutor: Condutor): Promise<Condutor> {
    try {
      const response = await this.axiosClient.put<Condutor>(
        `?id=${condutor.id}`,
        condutor
      )
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async desativarCondutor(condutor: Condutor): Promise<Condutor> {
    try {
      const response = await this.axiosClient.delete<Condutor>(
        `?id=${condutor.id}`
      )
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
