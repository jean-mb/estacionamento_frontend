import { Modelo } from "@/model/modelo";
import axios, { AxiosInstance } from "axios";

export class ModeloClient{
    private axiosClient: AxiosInstance

    constructor(){
        this.axiosClient = axios.create({
            baseURL: "http://localhost:8080/api"
        })
    }

    public async findById(id: number): Promise<Modelo> {
        try {
          const response = await this.axiosClient.get<Modelo>(`/modelo?id=${id}`)
          return response.data
        } catch (error) {
          return Promise.reject(error)
        }
      }
    
      public async listaCompleta(): Promise<Modelo[]> {
        try {
          const response = await this.axiosClient.get<Modelo[]>('/modelo/lista')
          return response.data
        } catch (error) {
          console.error(error)
          return []
        }
      }
    
      public async listarAtivos(): Promise<Modelo[]> {
        try {
          const response = await this.axiosClient.get<Modelo[]>('/modelo/lista/ativos')
          return response.data
        } catch (error) {
          console.error(error)
          return []
        }
      }
    
      public async cadastrar(modelo: Modelo): Promise<Modelo> {
        try {
          const response = await this.axiosClient.post<Modelo>('/modelo', modelo)
          return response.data
        } catch (error) {
          return Promise.reject(error)
        }
      }
    
      public async editar(modelo: Modelo): Promise<Modelo> {
        try {
          const response = await this.axiosClient.put<Modelo>(
            `/modelo?id=${modelo.id}`,
            modelo
          )
          return response.data
        } catch (error) {
          return Promise.reject(error)
        }
      }
    
      public async desativar(modelo: Modelo): Promise<Modelo> {
        try {
          const response = await this.axiosClient.delete<Modelo>(
            `/modelo?id=${modelo.id}`
          )
          return response.data
        } catch (error) {
          return Promise.reject(error)
        }
      }
}