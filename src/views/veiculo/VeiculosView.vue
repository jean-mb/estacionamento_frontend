<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-10 text-start">
        <p class="fs-5">Veículos</p>
      </div>
      <div class="col-md-2 col-md-2 align-self-center">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-success" to="/veiculo/formulario">Cadastrar
          </router-link>
        </div>
      </div>
    </div>
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th class="text-center">ID</th>
          <th class="text-center">Placa</th>
          <th class="text-center">Tipo</th>
          <th class="text-center">Modelo</th>
          <th class="text-center">Status</th>
          <th class="text-center">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in veiculosList" :key="item.id">
          <th class="align-middle text-center col-md-1">{{ item.id }}</th>
          <th class="align-middle text-center col-md-2">{{ item.placa }}</th>
          <th class="align-middle text-center col-md-2">{{ item.tipo }}</th>
          <th class="align-middle text-center col-md-3">
            {{ item.modelo.marca.nome }} - {{ item.modelo.nome }}
            <span v-if="!item.modelo.ativo" class="badge text-bg-danger">Desativado</span>
          </th>
          <th class="align-middle text-center col-md-2">
            <span v-if="item.ativo" class="badge text-bg-success"> Ativo </span>
            <span v-if="!item.ativo" class="badge text-bg-danger">
              Inativo
            </span>
          </th>
          <th class="align-middle text-center col-md-2">
            <BotoesAcoes listarRoute="veiculo.listar" editarRoute="veiculo.form.editar" toggleRoute="veiculo.form.toggle"
              :id="item.id" :isAtivo="item.ativo">
            </BotoesAcoes>
          </th>
        </tr>
      </tbody>
    </table>
    <div v-if="veiculosList.length == 0" class="alert alert-secondary" role="alert">
      Nenhum veículo encontrado
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BotoesAcoes from '@/components/BotoesAcoes.vue'
import { Veiculo } from '@/model/veiculo'
import { VeiculoClient } from '@/client/veiculo.client'

export default defineComponent({
  name: 'VeiculosView',
  data() {
    return {
      veiculosList: new Array<Veiculo>()
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
      const veiculoClient = new VeiculoClient()
      veiculoClient
        .listarAll()
        .then(sucess => {
          this.veiculosList = sucess
        })
        .catch(error => {
          
        })
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
  width: 100%;
}
</style>
