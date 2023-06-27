<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-center">
      <router-link type="button" class="btn btn-primary w-25 fs-5" to="/movimentacao/formulario">Registrar Entrada
      </router-link>
    </div>
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th class="text-center col-md-1">Carro</th>
          <th class="text-center col-md-2">Moto</th>
          <th class="text-center col-md-2">Van</th>
        </tr>
      </thead>
      <tbody>
        <th>
        <th class="text-center col-md-1">{{ carro }}</th>
        <th class="text-center col-md-2">{{ moto }}</th>
        <th class="text-center col-md-2">{{ van }}</th>
        </th>
      </tbody>
    </table>
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
          <th class="text-center col-md-2">Vaga</th>
          <th class="text-center col-md-3">Condutor</th>
          <th class="text-center col-md-2">Data Entrada</th>
          <th class="text-center col-md-3">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in movimentacoesList" :key="item.id">
          <th class="align-middle text-center col-md-1">{{ item.id }}</th>
          <th class="align-middle text-center col-md-1">{{ item.veiculo.tipo }}</th>
          <th class="align-middle col-md-2 text-center">{{ item.veiculo.placa }} <span v-if="!item.veiculo.ativo"
              class="badge text-bg-danger">Desativado</span>
          </th>
          <th class="align-middle col-md-3 text-center">{{ item.condutor.nome }} <span v-if="!item.condutor.ativo"
              class="badge text-bg-danger">Desativado</span>
          </th>
          <th class="align-middle col-md-2 text-center">
            {{ formatDate(item.dataEntrada) }}
          </th>
          <th class="align-middle text-center col-md-3">
            <BotoesAcoes confirmarRoute="movimentacao.form.confirmar" listarRoute="movimentacao.listar" :id="item.id">
            </BotoesAcoes>
          </th>
        </tr>
      </tbody>
    </table>
    <div v-if="movimentacoesList.length == 0" class="alert alert-secondary" role="alert">
      Nenhuma vaga ocupada no momento
    </div>
  </div>
</template>

<script lang="ts">
import BotoesAcoes from '@/components/BotoesAcoes.vue'
import { defineComponent } from 'vue'
import { Movimentacao } from '@/model/movimentacao'
import { MovimentacaoClient } from '@/client/movimentacao.client'
import { Tipo } from '@/model/tipo'
import { ConfiguracaoClient } from '@/client/configuracao.client'
import { Configuracao } from '@/model/configuracao'
export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      movimentacoesList: new Array<Movimentacao>(),
      carro: 0 as number,
      moto: 0 as number,
      van: 0 as number,
      configs: new Configuracao
    }
  },
  mounted() {
    this.findAll()
    this.getVagas()
  },
  components: {
    BotoesAcoes
  },
  methods: {
    getVagas() {
      var qtdCarro: number
      var qtdMoto: number
      var qtdVan: number
      const configClient = new ConfiguracaoClient()
      const movsClient = new MovimentacaoClient()
      configClient.getConfiguracao().then(sucess => {
        this.carro = sucess.qntdCarro
        this.moto = sucess.qntdMoto
        this.van = sucess.qntdVan

        movsClient.getVagas(Tipo.CARRO).then(sucTipo =>{
          this.carro -= sucTipo.length
          console.log(sucTipo.length)
        })
        movsClient.getVagas(Tipo.MOTO).then(sucTipo =>{
          this.moto -= sucTipo.length
        })
        movsClient.getVagas(Tipo.VAN).then(sucTipo =>{
          this.van -= sucTipo.length
        })
      }).catch(err => {
          console.log(err)
        })
    },
    findAll() {
      const movimentacaoClient = new MovimentacaoClient()
      movimentacaoClient
        .listarAbertas()
        .then(sucess => {
          this.movimentacoesList = sucess
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
  'secondary': #c8c8c8,
  'info': #a4a4a4,
  'success': #198754,
  'warning': #ffc107,
  'danger': #dc3545
);
@import 'node_modules/bootstrap/scss/bootstrap.scss';
</style>
