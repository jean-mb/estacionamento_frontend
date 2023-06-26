<template>
  <div class="container w-50">
    <div class="row mt-5">
      <div class="col-md-12 text-center">
        <p class="fs-5">Cadastro de Marca</p>
      </div>
      <div class="col-md-2"></div>
    </div>

    <AvisoComponent :ativo="mensagem.ativo" :sucesso="mensagem.status" :mensagem="mensagem.mensagem"></AvisoComponent>

    <div class="row w-100 d-flex justify-content-center m-0 mb-2">
      <div class="mb-3 mt-3 w-50 text-start">
        <label for="nome" class="form-label">Nome da Marca</label>
        <input id="nome" type="text" :disabled="this.form === 'toggle' ? '' : disabled" class="form-control"
          v-model="marca.nome" />
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div class="col-md-3">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-secondary" to="/marcas">Voltar
          </router-link>
        </div>
      </div>
      <div class="col-md-3">
        <div class="d-grid gap-2">
          <button v-if="this.form === undefined" type="button" class="btn btn-primary" @click="onClickCadastrar()">
            Cadastrar
          </button>
          <button v-if="this.form === 'editar'" type="button" class="btn btn-warning" @click="onClickEditar()">
            Editar
          </button>
          <button v-if="this.form === 'toggle' && marca.ativo == true" type="button" class="btn btn-danger"
            @click="onClickExcluir()">
            Excluir
          </button>
          <button v-if="this.form === 'toggle' && marca.ativo == false" type="button" class="btn btn-success"
            @click="onClickAtivar()">
            Ativar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AvisoComponent from '@/components/AvisoComponent.vue'
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
        status: false as boolean,
        mensagem: '' as string
      }
    }
  },
  components: {
    AvisoComponent
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
          this.mensagem.mensagem = sucess
          this.mensagem.status = true
          this.mensagem.ativo = true
        })
        .catch(error => {
          this.mensagem.mensagem = error.response.data
          this.mensagem.status = false
          this.mensagem.ativo = true
        })
    },
    findById(id: number) {
      const marcaClient = new MarcaClient()
      marcaClient
        .findById(id)
        .then(sucess => {
          this.marca = sucess
        })
        .catch(error => {
          this.mensagem.mensagem = error.response.data
          this.mensagem.status = false
          this.mensagem.ativo = true
        })
    },
    onClickEditar() {
      const marcaClient = new MarcaClient()
      marcaClient
        .atualizarMarca(this.marca.id, this.marca)
        .then(sucess => {
          this.mensagem.mensagem = sucess
          this.mensagem.status = true
          this.mensagem.ativo = true
        })
        .catch(error => {
          this.mensagem.mensagem = error.response.data
          this.mensagem.status = false
          this.mensagem.ativo = true
        })
    },
    onClickAtivar() {
      if (confirm("Tem certeza que deseja reativar essa marca?")) {
        this.marca.ativo = true
        const marcaClient = new MarcaClient()
        marcaClient
          .atualizarMarca(this.marca.id, this.marca)
          .then(sucess => {
            this.mensagem.mensagem = "Marca reativada com sucesso!"
            this.mensagem.status = true
            this.mensagem.ativo = true
          })
          .catch(error => {
            this.mensagem.mensagem = error.response.data
            this.mensagem.status = false
            this.mensagem.ativo = true
          })
      }
    },
    onClickExcluir() {
      if (confirm("Tem certeza que deseja desativar essa marca?")) {
        const marcaClient = new MarcaClient()
        marcaClient
          .desativar(this.marca.id)
          .then(sucess => {
            this.mensagem.mensagem = sucess
            this.mensagem.status = true
            this.mensagem.ativo = true
          })
          .catch(error => {
            this.mensagem.mensagem = error.response.data
            this.mensagem.status = false
            this.mensagem.ativo = true
          })
      }
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
@import 'node_modules/bootstrap/scss/bootstrap.scss';</style>
