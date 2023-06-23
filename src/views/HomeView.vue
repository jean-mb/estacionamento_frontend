<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-center">
        <router-link
          type="button"
          class="btn btn-primary w-25 fs-5"
          to="/movimentacoes/formulario"
          >Registrar Entrada
        </router-link>
    </div>

    <div class="row mt-5">
      <div class="col-md-10 text-start">
        <p class="fs-5">Movimentações Abertas</p>
      </div>
    </div>
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th class="text-center col-md-1">ID</th>
          <th class="text-center col-md-2">Placa</th>
          <th class="text-center col-md-3">Condutor</th>
          <th class="text-center col-md-2">Data Entrada</th>
          <th class="text-center col-md-3">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in movimentacoesList" :key="item.id">
          <th class="text-center col-md-1">{{ item.id }}</th>
          <th class="col-md-2 text-center">{{ item.veiculo.placa }}</th>
          <th class="col-md-3 text-center">{{ item.condutor.nome }}</th>
          <th class="col-md-2 text-center">
            {{ formatDate(item.dataEntrada) }}
          </th>
          <th class="text-center col-md-3">
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
  name: 'HomeView',
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
        .listarAbertas()
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
<style lang="scss">

$theme-colors: (
  'dark': #111111,
  'primary': #515151,
  'secondary': #C8C8C8,
  'info': #A4A4A4
);

@import 'node_modules/bootstrap/scss/bootstrap.scss';

.fs-5{
  font-weight: var(--font-weight-destaque);
}

</style>
