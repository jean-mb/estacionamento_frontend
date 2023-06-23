<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-10 text-start">
        <p class="fs-5">Movimentações</p>
      </div>
      <div class="col-md-2 col-md-2 align-self-center">
        <div class="d-grid gap-2">
          <router-link
            type="button"
            class="btn btn-success"
            to="/marca/formulario"
            >Cadastrar
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
          <th class="text-center col-md-1">{{ item.id }}</th>
          <th class="col-md-2 text-center">{{ item.veiculo.placa }}</th>
          <th class="col-md-2 text-center">{{ item.condutor.nome }}</th>
          <th class="col-md-2 text-center">{{ formatDate(item.dataEntrada) }}</th>
          <th v-if="item.dataSaida != null" class="text-center col-md-2">{{ formatDate(item.dataSaida) }}</th>
          <th v-if="item.dataSaida == null" class="col-md-2 text-center">---</th>
          <th class="text-center col-md-2">
            <span v-if="item.ativo" class="badge text-bg-success"> Ativo </span>
            <span v-if="!item.ativo" class="badge text-bg-danger">
              Inativo
            </span>
          </th>
          <th class="text-center col-md-2">
            <div
              class="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <router-link
                type="button"
                class="btn btn-sm btn-warning"
                :to="{
                  name: 'marca.form.editar',
                  query: { id: item.id, form: 'editar' }
                }"
              >
                Editar
              </router-link>
              <router-link
                type="button"
                class="btn btn-sm btn-danger"
                :to="{
                  name: 'marca.form.desativar',
                  query: { id: item.id, form: 'desativar' }
                }"
              >
                Excluir
              </router-link>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
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
          console.log(this.movimentacoesList[0].dataSaida)
        })
        .catch(error => {
          console.log(error)
        })
    },
    formatDate(dateString: string | number | Date) {
      const dateTime = new Date(dateString)
      const formattedDate = dateTime.toLocaleDateString()
      const formattedTime = dateTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
      return `${formattedDate} ${formattedTime}`
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';
.container {
  width: 100%;
}
.btn {
  font-weight: var(--font-weight-forte);
}
</style>
