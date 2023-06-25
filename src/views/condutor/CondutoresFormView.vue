<template>
  <div class="container w-50">
    <div class="row mt-5">
      <div class="col-md-12 text-center">
        <p class="fs-5">Cadastro de Condutor</p>
      </div>
      <div class="col-md-2"></div>
    </div>

    <AvisoComponent :ativo="mensagem.ativo" :sucesso="mensagem.status" :mensagem="mensagem.mensagem"></AvisoComponent>

    <div class="row w-100 d-flex justify-content-center m-0 mb-2">
      <div class="mb-3 mt-3 w-50 text-start">
        <label for="nome" class="form-label">Nome do Condutor</label>
        <input id="nome" type="text" :disabled="this.form === 'desativar' ? '' : disabled" class="form-control"
          v-model="condutor.nome" />
      </div>
      <div class="mb-3 mt-3 w-50 text-start">
        <label for="telefone" class="form-label">Telefone</label>
        <input id="telefone" type="text" :disabled="this.form === 'desativar' ? '' : disabled" class="form-control"
          v-model="condutor.telefone" />
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0 mb-2">
      <div class="mb-3 mt-3 w-50 text-start">
        <label for="cpf" class="form-label">CPF do Condutor</label>
        <input id="cpf" type="text" :disabled="this.form === 'desativar' ? '' : disabled" class="form-control"
          v-mask="'###.###.###-##'" v-model="condutor.cpf" />
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div class="col-md-3">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-secondary" to="/condutores">Voltar
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
          <button v-if="this.form === 'desativar'" type="button" class="btn btn-danger" @click="onClickExcluir()">
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AvisoComponent from '@/components/AvisoComponent.vue'
import { defineComponent } from 'vue'
import { Condutor } from '@/model/condutor'
import { CondutorClient } from '@/client/condutor.client'

export default defineComponent({
  name: 'CondutorFormulario',
  data(): any {
    return {
      condutor: new Condutor(),
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
      const condutorClient = new CondutorClient()
      condutorClient
        .cadastrarCondutor(this.condutor)
        .then(sucess => {
          this.marca = new Condutor()
          this.mensagem.mensagem = sucess
          this.mensagem.status = true
          this.mensagem.ativo = true
        })
        .catch(error => {
          if (typeof (error.response.data) == 'object') {
            this.mensagem.mensagem = Object.values(error.response.data)[0]
          } else {
            this.mensagem.mensagem = error.response.data
          }
          this.mensagem.status = false
          this.mensagem.ativo = true
        })
    },
    findById(id: number) {
      const condutorClient = new CondutorClient()
      condutorClient
        .findById(id)
        .then(sucess => {
          this.condutor = sucess
        })
        .catch(error => {
          this.mensagem.mensagem = error.response.data
          this.mensagem.status = false
          this.mensagem.ativo = true
        })
    },
    onClickEditar() {
      const condutorClient = new CondutorClient()
      console.log('aqui')
      condutorClient
        .editarCondutor(this.condutor)
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
    onClickExcluir() {
      if (confirm("Tem certeza que deseja desativar esse condutor?")) {
        const condutorClient = new CondutorClient()
        condutorClient
          .desativarCondutor(this.condutor.id)
          .then(sucess => {
            this.marca = new Condutor()
            this.id = undefined
            this.mensagem.mensagem = sucess
            this.mensagem.status = false
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
@import 'node_modules/bootstrap/scss/bootstrap.scss';
</style>
