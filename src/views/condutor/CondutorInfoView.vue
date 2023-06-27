<template>
  <div class="container w-50">
    <div class="row mt-5">
      <div class="col-md-12 text-start">
        <p class="fs-5">Detalhes do Condutor</p>
      </div>
      <div class="col-md-2"></div>
    </div>

    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="mt-3 w-100 text-start">
        <p class="fs-6 m-0"><span class="dado">Nome: </span> {{ condutor.nome }} </p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="mt-3 w-100 text-start">
        <p class="fs-6 m-0"><span class="dado">Telefone: </span> {{ condutor.telefone }} </p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="mt-3 w-100 text-start">
        <p class="fs-6"><span class="dado">CPF: </span> {{ condutor.cpf }} </p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6"><span class="dado">Total Tempo Pago: </span> {{
          segundosParaHoras(condutor.tempoPagoSegundos) }}h</p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6"><span class="dado">Tempo de Desconto Disponível: </span> {{
          segundosParaHoras(condutor.tempoDescontoSegundos) }}h</p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6"><span class="dado">Tempo de Desconto Usado: </span> {{
          segundosParaHoras(condutor.tempoDescontoUsadoSegundos) }}h</p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6"><span class="dado">Total Tempo Estacionado: </span> {{
          segundosParaHoras(condutor.tempoDescontoUsadoSegundos + condutor.tempoDescontoSegundos + condutor.tempoPagoSegundos) }}h</p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6"><span class="dado"> Status: </span>
          <span v-if="condutor.ativo" class="badge text-bg-success">
            Ativo
          </span>
          <span v-if="!condutor.ativo" class="badge text-bg-danger">
            Desativado
          </span>
        </p>
      </div>
    </div>
    <hr>
    <div class="row mt-5">
      <div class="col-md-12 text-start">
        <p class="fs-5">Histórico</p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6"><span class="dado">Data do Cadastro: </span>{{ formatDate(condutor.cadastro) }}</p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6"><span class="dado">Última edição: </span> {{ formatDate(condutor.edicao) }}</p>
      </div>
    </div>

    <div class="row d-flex justify-content-center mt-3 mb-5">
      <div class="col-md-3">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-secondary" to="/condutores">Voltar
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CondutorClient } from '@/client/condutor.client'
import { Condutor } from '@/model/condutor'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VeiculoInfo',
  data(): any {
    return {
      condutor: new Condutor(),
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
    segundosParaHoras(segundos: number) {
      const horas = Math.floor(segundos / 3600);
      const minutos = Math.floor((segundos % 3600) / 60);
      const horasFormatadas = horas.toString().padStart(2, '0');
      const minutosFormatados = minutos.toString().padStart(2, '0');
      return `${horasFormatadas}:${minutosFormatados}`;
    },
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
      const condutorClient = new CondutorClient()
      condutorClient
        .findById(id)
        .then(sucess => {
          this.condutor = sucess
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

<style scoped lang="scss">
$theme-colors: (
  'dark': #111111,
  'primary': #515151,
  'secondary': #c8c8c8,
  'info': #a4a4a4,
  'success': #198754,
  'warning': #ffc107,
  'danger': #dc3545
);
@import 'node_modules/bootstrap/scss/bootstrap.scss';
</style>
