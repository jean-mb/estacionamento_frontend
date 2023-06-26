<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-10 text-start">
        <p class="fs-5 m-0">Marcas</p>
      </div>
      <div class="col-md-2 col-md-2 align-self-center mb-2">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-success" to="/marca/formulario">Cadastrar
          </router-link>
        </div>
      </div>
    </div>
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th class="text-center">ID</th>
          <th>Nome</th>
          <th>Status</th>
          <th class="text-center">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in marcasList" :key="item.id">
          <th class="text-center align-middle col-md-1">{{ item.id }}</th>
          <th class="col-md-2 align-middle">{{ item.nome }}</th>
          <th class="text-start align-middle col-md-2">
            <span v-if="item.ativo" class="badge text-bg-success"> Ativo </span>
            <span v-if="!item.ativo" class="badge text-bg-danger">
              Inativo
            </span>
          </th>

          <th class="align-middle text-center col-md-2">
            <BotoesAcoes listarRoute="marca.form.listar" editarRoute="marca.form.editar" toggleRoute="marca.form.toggle" :isAtivo="item.ativo" :id="item.id">
            </BotoesAcoes>
          </th>
        </tr>
      </tbody>
    </table>
    <div v-if="marcasList.length == 0" class="alert alert-secondary" role="alert">
      Nenhuma marca encontrada
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BotoesAcoes from '@/components/BotoesAcoes.vue'
import { MarcaClient } from '@/client/marca.client'
import { Marca } from '@/model/marca'

export default defineComponent({
  name: 'MarcasView',
  data() {
    return {
      marcasList: new Array<Marca>()
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
      const marcaClient = new MarcaClient()
      marcaClient
        .listarAll()
        .then(sucess => {
          this.marcasList = sucess
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';

.container {
  width: 60%;
}
</style>
