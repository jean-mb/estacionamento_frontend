import { Condutor } from '@/model/condutor'
import axios, { AxiosInstance } from 'axios'
export class CondutorClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = axios.create({
      baseURL: `http://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api`,
      headers: { 'Content-type': 'application/json' }
    })
  }

  public async findById(id: number): Promise<Condutor> {
    try {
      const response = await this.axiosClient.get<Condutor>(`/condutor?id=${id}`)
      return response.data
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  public async lista(): Promise<Condutor[]> {
    try {
      console.log(this.axiosClient.defaults.baseURL)
      const response = await this.axiosClient.get<Condutor[]>('/condutor/lista')
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }
  public async findByNome(nome: string): Promise<Condutor[]> {
    try {
      const response = await this.axiosClient.get<Condutor[]>(`/condutor/nome?nome=${nome}`)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  public async findByCpf(cpf: string): Promise<Condutor[]> {
    try {
      const response = await this.axiosClient.get<Condutor[]>(`/condutor/cpf?cpf=${cpf}`)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async listaAtivos(): Promise<Condutor[]> {
    try {
      const response = await this.axiosClient.get<Condutor[]>('/condutor/lista/ativos')
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public async cadastrarCondutor(condutor: Condutor): Promise<Condutor> {
    try {
      const response = await this.axiosClient.post<Condutor>('/condutor', condutor)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async editarCondutor(condutor: Condutor): Promise<Condutor> {
    try {
      const response = await this.axiosClient.put<Condutor>(
        `/condutor?id=${condutor.id}`,
        condutor
      )
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async desativarCondutor(id: number): Promise<Condutor> {
    try {
      const response = await this.axiosClient.delete<Condutor>(
        `/condutor?id=${id}`
      )
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
