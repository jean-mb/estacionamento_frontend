<template>
  <div class="container w-50">
    <div class="row mt-5">
      <div class="col-md-12 text-start">
        <p class="fs-5">Detalhes da Movimentação</p>
      </div>
    </div>

    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="mt-3 w-100 text-start">
        <p class="fs-6"><span class="dado">Condutor: </span>{{ condutor.nome }} | {{ condutor.cpf }}</p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6"><span class="dado">Veículo: </span> {{ veiculo.placa }} [ {{ veiculo.tipo }} ] </p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p v-if="movimentacao.tempoEstacionadoSegundos" class="fs-6"><span class="dado">Tempo Estacionado: </span> {{
          segundosParaHoras(movimentacao.tempoEstacionadoSegundos) }}h </p>
        <p v-if="!movimentacao.tempoEstacionadoSegundos" class="fs-6"><span class="dado">Tempo Estacionado: </span> {{ tempoEstacionado }}</p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6"><span class="dado">Tempo de Multa: </span> {{
          segundosParaHoras(movimentacao.tempoMultaSegundos) }}h ( {{ Math.round(movimentacao.tempoMultaSegundos /
    60) }} min. )</p>

      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6"><span class="dado">Tempo de Desconto: </span> {{
          segundosParaHoras(movimentacao.tempoDescontoSegundos) }}h (
          {{ Math.round(movimentacao.tempoDescontoSegundos / 60) }} min. )</p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p v-if="valorTotal" class="fs-6"><span class="dado">Valor Estacionado: </span>R$ {{ valorEstacionado.toFixed(2)
        }} </p>
        <p v-if="!valorTotal" class="fs-6"><span class="dado">Valor Estacionado: </span> Não calculado </p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p v-if="valorTotal" class="fs-6"><span class="dado">Valor Multa: </span>R$ {{ valorMulta.toFixed(2) }} </p>
        <p v-if="!valorTotal" class="fs-6"><span class="dado">Valor Multa: </span> Não calculado </p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p v-if="valorTotal" class="fs-6"><span class="dado">Valor Total: </span>R$ {{ valorTotal.toFixed(2) }} </p>
        <p v-if="!valorTotal" class="fs-6"><span class="dado">Valor Total: </span> Não calculado </p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6"><span class="dado">Entrada: </span>{{ formatDate(movimentacao.dataEntrada) }}</p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6"><span class="dado">Saída: </span>{{ formatDate(movimentacao.dataSaida) }}</p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6"><span class="dado"> Status: </span>
          <span v-if="movimentacao.ativo && movimentacao.dataSaida == null" class="badge text-bg-success">
            Ativo
          </span>
          <span v-if="movimentacao.ativo && movimentacao.dataSaida != null" class="badge text-bg-success">
            Concluído
          </span>
          <span v-if="!movimentacao.ativo" class="badge text-bg-danger">
            Cancelado
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
        <p class="fs-6"><span class="dado">Data de Criação: </span>{{ formatDate(movimentacao.cadastro) }}</p>
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="w-100 text-start">
        <p class="fs-6"><span class="dado">Data de Edição: </span>{{ formatDate(movimentacao.edicao) }}</p>
      </div>
    </div>

    <div class="row d-flex justify-content-center mt-3 mb-5">
      <div class="col-md-3">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-secondary" to="/movimentacoes">Voltar
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MovimentacaoClient } from '@/client/movimentacao.client'
import { Condutor } from '@/model/condutor'
import { Movimentacao } from '@/model/movimentacao'
import { Veiculo } from '@/model/veiculo'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MovimentacaoInfo',
  data(): any {
    return {
      movimentacao: new Movimentacao(),
      condutor: new Condutor(),
      veiculo: new Veiculo(),
      valorTotal: 0 as number,
      valorMulta: 0 as number,
      tempoEstacionado: 'Não calculado' as string
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
    if (!this.movimentacao.dataSaida) {
      setInterval(() => {
        this.contador()
      }, 1000);
    }
  },
  methods: {
    contador(){
      var atual = new Date()
      var entrada = new Date(this.movimentacao.dataEntrada)
      // atual.setHours(0, 0, 0, 0);
      // entrada.setHours(0, 0, 0, 0);

      // Calcular a diferença em milissegundos
      const diferenca: number = Math.abs(entrada.getTime() - atual.getTime());

      // Converter a diferença em horas e minutos
      const horas: number = Math.floor(diferenca / 3600000); // 1 hora = 3600000 milissegundos
      const minutos: number = Math.floor((diferenca % 3600000) / 60000); // 1 minuto = 60000 milissegundos
      const segundos: number = Math.floor((diferenca % 60000) / 1000); // 1 segundo = 1000 milissegundos

      // Retornar a diferença formatada
      this.tempoEstacionado = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
;
      console.log(this.tempoEstacionado)
    },
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
      const movimentacaoClient = new MovimentacaoClient()
      movimentacaoClient
        .findById(id)
        .then(sucess => {
          this.movimentacao = sucess
          this.condutor = sucess.condutor
          this.veiculo = sucess.veiculo
          this.valorTotal = sucess.valorTotal
          console.log(sucess)
          if (sucess.valorMulta) {
            this.valorMulta = sucess.valorMulta
            this.valorEstacionado = sucess.valorTotal - sucess.valorMulta
          } else {
            this.valorEstacionado = sucess.valorTotal
          }
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
@import 'node_modules/bootstrap/scss/bootstrap.scss';
</style>
