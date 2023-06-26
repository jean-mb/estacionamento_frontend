<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-10 text-start">
        <p class="fs-5">Movimentações</p>
      </div>
      <div class="col-md-2 col-md-2 align-self-center">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-success" to="/movimentacao/formulario">Cadastrar
          </router-link>
        </div>
      </div>
    </div>
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th class="text-center">ID</th>
          <th class="text-center">Placa</th>
          <th class="text-center">Condutor</th>
          <th class="text-center">Data Entrada</th>
          <th class="text-center">Data Saída</th>
          <th class="text-center">Status</th>
          <th class="text-center">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in movimentacoesList" :key="item.id">
          <th class="align-middle text-center col-md-1">{{ item.id }}</th>
          <th class="align-middle col-md-2 text-center">{{ item.veiculo.placa }} <span v-if="!item.veiculo.ativo"
              class="badge text-bg-danger">Desativado</span>
          </th>
          <th class="align-middle col-md-2 text-center">{{ item.condutor.nome }} <span v-if="!item.condutor.ativo"
              class="badge text-bg-danger">Desativado</span>
          </th>
          <th class="align-middle col-md-2 text-center">
            {{ formatDate(item.dataEntrada) }}
          </th>
          <th class="align-middle text-center col-md-2">
            {{ formatDate(item.dataSaida) }}
          </th>
          <th class="align-middle text-center col-md-1">
            <span v-if="item.ativo && item.dataSaida == null" class="badge text-bg-success">
              Ativo
            </span>
            <span v-if="item.ativo && item.dataSaida != null" class="badge text-bg-success">
              Concluído
            </span>
            <span v-if="!item.ativo" class="badge text-bg-danger">
              Cancelado
            </span>
          </th>
          <th class="align-middle text-center col-md-2">
            <BotoesAcoes listarRoute="movimentacao.form.listar" editarRoute="movimentacao.form.editar" toggleRoute="movimentacao.form.toggle" :isAtivo="item.ativo" :id="item.id">
            </BotoesAcoes>
          </th>
        </tr>
      </tbody>
    </table>
    <div v-if="movimentacoesList.length == 0" class="alert alert-secondary" role="alert">
      Nenhuma movimentação encontrada
    </div>
  </div>
</template>

<script lang="ts">
import BotoesAcoes from '@/components/BotoesAcoes.vue'

import { defineComponent } from 'vue'
import { Movimentacao } from '@/model/movimentacao'
import { MovimentacaoClient } from '@/client/movimentacao.client'

export default defineComponent({
  name: 'MovimentacoesView',
  data() {
    return {
      movimentacoesList: new Array<Movimentacao>()
    }
  },
  components: {
    BotoesAcoes
  },
  mounted() {
    this.findAll()
  },
  methods: {
    findAll() {
      const movimentacaoClient = new MovimentacaoClient()
      movimentacaoClient
        .listarAll()
        .then(sucess => {
          this.movimentacoesList = sucess
        })
        .catch(error => {
          console.log(error)
        })
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
    }
  }
})
</script>

<style lang="scss" scoped>
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

.container {
  width: 200%;
}
</style>
