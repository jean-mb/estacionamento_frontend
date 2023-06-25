<template>
  <div class="container w-50">
    <div class="row mt-5">
      <div class="col-md-12 text-center">
        <p class="fs-5">Cadastro de Marca</p>
      </div>
      <div class="col-md-2"></div>
    </div>

    <div v-if="mensagem.ativo" class="row text-center justify-content-center">
      <div class="col-md-12 text-center w-75">
        <div :class="mensagem.css" role="alert">
          <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>

    <div class="row w-100 d-flex justify-content-center m-0 mb-2">
      <div class="mb-3 mt-3 w-50 text-start">
        <label class="form-label">Nome da Marca</label>
        <input
          type="text"
          :disabled="this.form === 'desativar' ? '' : disabled"
          class="form-control"
          v-model="marca.nome"
        />
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div class="col-md-3">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-secondary" to="/marcas"
            >Voltar
          </router-link>
        </div>
      </div>
      <div class="col-md-3">
        <div class="d-grid gap-2">
          <button
            v-if="this.form === undefined"
            type="button"
            class="btn btn-primary"
            @click="onClickCadastrar()"
          >
            Cadastrar
          </button>
          <button
            v-if="this.form === 'editar'"
            type="button"
            class="btn btn-warning"
            @click="onClickEditar()"
          >
            Editar
          </button>
          <button
            v-if="this.form === 'desativar'"
            type="button"
            class="btn btn-danger"
            @click="onClickExcluir()"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MarcaClient } from '@/client/marca.client'
import { Marca } from '@/model/marca'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MarcaFormulario',
  data(): any {
    return {
      marca: new Marca(),
      mensagem: {
        ativo: false as boolean,
        titulo: '' as string,
        mensagem: '' as string,
        css: '' as string
      }
    }
  },
  computed: {
    id(): any {
      return this.$route.query.id
    },
    form(): any {
      return this.$route.query.form
    }
  },
  mounted() {
    if (this.id !== undefined) {
      this.findById(Number(this.id))
    }
  },
  methods: {
    onClickCadastrar() {
      const marcaClient = new MarcaClient()
      marcaClient
        .cadastrarMarca(this.marca)
        .then(sucess => {
          this.marca = new Marca()

          this.mensagem.ativo = true
          this.mensagem.mensagem = sucess
          this.mensagem.titulo = 'Ok!'
          this.mensagem.css = 'alert alert-success alert-dismissible fade show'
        })
        .catch(error => {
          this.mensagem.ativo = true
          this.mensagem.mensagem = error
          this.mensagem.titulo = 'Error. '
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show'
        })
    },
    findById(id: number) {
      const marcaClient = new MarcaClient()
      console.log('aqui a')
      marcaClient
        .findById(id)
        .then(sucess => {
          this.marca = sucess
        })
        .catch(error => {
          this.mensagem.ativo = true
          this.mensagem.mensagem = error
          this.mensagem.titulo = 'Error. '
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show'
        })
    },
    onClickEditar() {
      const marcaClient = new MarcaClient()
      console.log('aqui')
      marcaClient
        .atualizarMarca(this.marca.id, this.marca)
        .then(sucess => {
          this.marca = new Marca()

          this.mensagem.ativo = true
          this.mensagem.mensagem = sucess
          this.mensagem.titulo = 'Ok!  '
          this.mensagem.css = 'alert alert-success alert-dismissible fade show'
        })
        .catch(error => {
          this.mensagem.ativo = true
          this.mensagem.mensagem = error
          this.mensagem.titulo = 'Erro. '
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show'
        })
    },
    onClickExcluir() {
      const marcaClient = new MarcaClient()
      marcaClient
        .desativar(this.marca.id)
        .then(sucess => {
          this.marca = new Marca()

          this.$router.push({ name: 'marca-lista-view' })
        })
        .catch(error => {
          this.mensagem.ativo = true
          this.mensagem.mensagem = error
          this.mensagem.titulo = 'Error. '
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show'
        })
    }
  }
})
</script>

<style lang="scss">
$theme-colors: (
  'dark': #111111,
  // 'dark': black,
  'primary': #515151,
  'secondary': #C8C8C8,
  'info': #A4A4A4,
  'success': green
);

@import 'node_modules/bootstrap/scss/bootstrap.scss';
</style>
