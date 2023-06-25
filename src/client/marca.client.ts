import { Marca } from '@/model/marca'
import axios, { AxiosInstance } from 'axios'

export class MarcaClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/api',
      headers: { 'Content-Type': 'application/json' }
    })
  }

  public async findById(id: number): Promise<Marca> {
    try {
      const resposta = await this.axiosClient.get<Marca>(`/marca?id=${id}`)
      return resposta.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async listarAll(): Promise<Marca[]> {
    try {
      const resposta = await this.axiosClient.get<Marca[]>('/marca/lista')
      return resposta.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async listarAtivos(): Promise<Marca[]> {
    try {
      const resposta = await this.axiosClient.get<Marca[]>('/marca/lista/ativos')
      return resposta.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async cadastrarMarca(marca: Marca): Promise<string> {
    try {
      const resposta = await this.axiosClient.post<string>('/marca', marca)
      return resposta.data
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  public async atualizarMarca(id: number, marca: Marca): Promise<string> {
    try {
      const resposta = await this.axiosClient.put<string>(`/marca?id=${id}`, marca)
      return resposta.data
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  public async desativar(id: number): Promise<string> {
    try {
      const resposta = await this.axiosClient.delete<string>(`/marca?id=${id}`)
      return resposta.data
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
}
