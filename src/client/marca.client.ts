import { Marca } from '@/model/marca'
import axios, { AxiosInstance } from 'axios'

export class MarcaClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/api/marca',
      headers: { 'Content-Type': 'application/json' }
    })
  }

  public async findById(id: number): Promise<Marca> {
    try {
      const resposta = await this.axiosClient.get<Marca>(`?id=${id}`)
      return resposta.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async listarAll(): Promise<Marca[]> {
    try {
      const resposta = await this.axiosClient.get<Marca[]>('/lista')
      return resposta.data
    } catch (error) {
      console.log(error)
      return []
    }
  }

  public async listarAtivos(): Promise<Marca[]> {
    try {
      const resposta = await this.axiosClient.get<Marca[]>('lista/ativos')
      return resposta.data
    } catch (error) {
      console.log(error)
      return []
    }
  }

  public async cadastrarMarca(marca: Marca): Promise<Marca> {
    try {
      const resposta = await this.axiosClient.post<Marca>('/', marca)
      return resposta.data
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  public async atualizarMarca(id: number, marca: Marca): Promise<Marca> {
    try {
      const resposta = await this.axiosClient.put(`?id=${id}`, marca)
      return resposta.data
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  public async desativar(id: number): Promise<Marca> {
    try {
      const resposta = await this.axiosClient.delete(`?id=${id}`)
      return resposta.data
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
}
