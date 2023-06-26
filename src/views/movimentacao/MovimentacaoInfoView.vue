<template>
  <div class="container w-50">
    <div class="row mt-5">
      <div class="col-md-12 text-start">
        <p class="fs-5">Detalhes da Movimentação</p>
      </div>
      <div class="col-md-2"></div>
    </div>

    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="mt-3 w-100 text-start">
        <p class="fs-6">Condutor: <span class="dado">{{ movimentacao.condutor.nome }} - {{ movimentacao.condutor.cpf }}</span></p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6">Veiculo: <span class="dado">{{ movimentacao.veiculo.tipo }} - {{ movimentacao.veiculo.placa }}</span></p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6">Entrada: <span class="dado">{{ formatDate(movimentacao.dataEntrada) }}</span></p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6">Saída: <span class="dado">{{ formatDate(movimentacao.dataSaida) }}</span></p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6">Criação: <span class="dado">{{ formatDate(movimentacao.criacao) }}</span></p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6">Criação: <span class="dado">{{ formatDate(movimentacao.edicao) }}</span></p>
      </div>
    </div>

    <div class="row d-flex justify-content-center mt-3">
      <div class="col-md-3">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-secondary" to="/marcas">Voltar
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MovimentacaoClient } from '@/client/movimentacao.client'
import { Movimentacao } from '@/model/movimentacao'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MovimentacaoInfo',
  data(): any {
    return {
      movimentacao: new Movimentacao(),
    }
  },
  computed: {
    id(): any {
      return this.$route.query.id
    }
  },
  mounted() {
    if (this.id !== undefined) {
      this.findById(Number(this.id))
    }
  },
  methods: {
    formatDate(dateString: string | number | Date) {
      if (dateString != null) {
        const dateTime = new Date(dateString)
        const formattedDate = dateTime.toLocaleDateString()
        const formattedTime = dateTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
        return `${formattedDate} ${formattedTime}`
      } else {
        return '---'
      }
    },
    findById(id: number) {
      const movimentacaoClient = new MovimentacaoClient()
      movimentacaoClient
        .findById(id)
        .then(sucess => {
          console.log(sucess)
          this.marca = sucess
        })
        .catch(error => {
          this.mensagem.mensagem = error.response.data
          this.mensagem.status = false
          this.mensagem.ativo = true
        })
    }
  }
})
</script>

<style lang="scss">
$theme-colors: (
  'dark': #111111,
  'primary': #515151,
  'secondary': #c8c8c8,
  'info': #a4a4a4,
  'success': #198754,
  'warning': #ffc107,
  'danger': #dc3545
);
@import 'node_modules/bootstrap/scss/bootstrap.scss';</style>
