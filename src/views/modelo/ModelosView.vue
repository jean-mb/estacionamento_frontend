<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-10 text-start">
        <p class="fs-5">Modelos</p>
      </div>
      <div class="col-md-2 col-md-2 align-self-center">
        <div class="d-grid gap-2">
          <router-link
            type="button"
            class="btn btn-success"
            to="/modelo/formulario"
            >Cadastrar
          </router-link>
        </div>
      </div>
    </div>
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th class="text-center">ID</th>
          <th>Nome</th>
          <th>Marca</th>
          <th>Status</th>
          <th class="text-center">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in modelosList" :key="item.id">
          <th class="align-middle text-center col-md-1">{{ item.id }}</th>
          <th class="align-middle col-md-3">{{ item.nome }}</th>
          <th class="align-middle text-start col-md-3">
            <span v-if="item.ativo" class="badge text-bg-success"> Ativo </span>
            <span v-if="!item.ativo" class="badge text-bg-danger">
              Inativo
            </span>
          </th>
          <th class="align-middletext-start col-md-3">{{ item.marca.nome }}</th>
          <th class="align-middletext-center col-md-2">
            <div
              class="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <router-link
                type="button"
                class="btn btn-sm btn-warning"
                :to="{
                  name: 'modelo.form.editar',
                  query: { id: item.id, form: 'editar' }
                }"
              >
                Editar
              </router-link>
              <router-link
                type="button"
                class="btn btn-sm btn-danger"
                :to="{
                  name: 'modelo.form.desativar',
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

import { ModeloClient } from '@/client/modelo.client'
import { Modelo } from '@/model/modelo'

export default defineComponent({
  name: 'ModelosView',
  data() {
    return {
      modelosList: new Array<Modelo>()
    }
  },
  mounted() {
    this.findAll()
  },
  methods: {
    findAll() {
      const modeloClient = new ModeloClient()
      modeloClient
        .listaCompleta()
        .then(sucess => {
          this.modelosList = sucess
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
