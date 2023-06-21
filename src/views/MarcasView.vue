<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-10 text-start">
        <p class="fs-3">Marcas</p>
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
          <th>Nome</th>
          <th>Status</th>
          <th class="text-center">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in marcasList" :key="item.id">
          <th class="text-center col-md-1">{{ item.id }}</th>
          <th class="col-md-2">{{ item.nome }}</th>
          <th class="text-start col-md-2">
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

import { MarcaClient } from '@/client/marca.client'
import { Marca } from '@/model/marca'

export default defineComponent({
  name: 'MarcaView',
  data() {
    return {
      marcasList: new Array<Marca>()
    }
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
.btn {
  font-weight: var(--font-weight-forte);
}
</style>
