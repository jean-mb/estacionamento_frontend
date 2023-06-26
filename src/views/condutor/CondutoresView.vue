<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-10 text-start">
        <p class="fs-5">Condutores</p>
      </div>
      <div class="col-md-2 col-md-2 align-self-center">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-success" to="/condutor/formulario">Cadastrar
          </router-link>
        </div>
      </div>
    </div>
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th class="text-center">ID</th>
          <th>Nome</th>
          <th>CPF</th>
          <th class="text-center">Status</th>
          <th class="text-center">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in condutoresList" :key="item.id">
          <th class="align-middle text-center col-md-1">{{ item.id }}</th>
          <th class="align-middle col-md-2">{{ item.nome }}</th>
          <th class="align-middle col-md-2">{{ item.cpf }}</th>
          <th class="align-middle text-center col-md-2">
            <span v-if="item.ativo" class="badge text-bg-success"> Ativo </span>
            <span v-if="!item.ativo" class="badge text-bg-danger">
              Inativo
            </span>
          </th>
          <th class="align-middle text-center col-md-2">
            <BotoesAcoes listarRoute="condutor.form.listar" editarRoute="condutor.form.editar" toggleRoute="condutor.form.toggle" :isAtivo="item.ativo" :id="item.id">
            </BotoesAcoes>
          </th>
        </tr>
      </tbody>
    </table>
    <div v-if="condutoresList.length == 0" class="alert alert-secondary" role="alert">
      Nenhum condutor encontrado
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BotoesAcoes from '@/components/BotoesAcoes.vue'
import { Condutor } from '@/model/condutor'
import { CondutorClient } from '@/client/condutor.client'

export default defineComponent({
  name: 'CondutoresView',
  data() {
    return {
      condutoresList: new Array<Condutor>()
    }
  },
  mounted() {
    this.findAll()
  },
  components: {
    BotoesAcoes
  },
  methods: {
    findAll() {
      const condutorClient = new CondutorClient()
      condutorClient
        .lista()
        .then(sucess => {
          this.condutoresList = sucess
        })
        .catch(error => {
          console.log(error)
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
  width: 70%;
}
</style>
