<template>
  <div class="container w-50">
    <div class="row mt-5">
      <div class="col-md-12 text-center">
        <p class="fs-5">Configurações do sistema</p>
      </div>
      <div class="col-md-2"></div>
    </div>

    <AvisoComponent :ativo="mensagem.ativo" :sucesso="mensagem.status" :mensagem="mensagem.mensagem"></AvisoComponent>

    <div class="row w-100 d-flex justify-content-center m-0 mb-2">
      <div class="mb-3 mt-3 w-33 text-start">
        <label for="vagasCarros" class="form-label">Vagas de Carro</label>
        <input type="number" class="form-control" id="vagasCarros" v-model="configuracoes.qntdCarro" />
      </div>
      <div class="mb-3 mt-3 w-33 text-start">
        <label for="vagasMotos" class="form-label">Vagas de Moto</label>
        <input type="number" class="form-control" id="vagasMotos" v-model="configuracoes.qntdMoto" />
      </div>
      <div class="mb-3 mt-3 w-33 text-start">
        <label for="vagasVan" class="form-label">Vagas de Van</label>
        <input type="number" class="form-control" id="vagasVan" v-model="configuracoes.qntdVan" />
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0 mb-2">
      <div class="mb-3 mt-3 w-50 text-start">
        <label for="valorHora" class="form-label">Valor da Hora Estacionada</label>
        <input type="text" class="form-control" id="valorHora" v-model="configuracoes.valorHora" />
      </div>
      <div class="mb-3 mt-3 w-50 text-start">
        <label for="valorMulta" class="form-label">Valor Multa por Minuto</label>
        <input type="text" class="form-control" id="valorMulta" v-model="configuracoes.valorMulta" />
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0 mb-2">
      <div class="mb-3 mt-3 w-50 text-start">
        <label for="horasParaDesconto" class="form-label">Horas para Gerar Desconto</label>
        <input type="number" class="form-control" id="horasParaDesconto" v-model="configuracoes.horasParaDesconto" />
      </div>
      <div class="mb-3 mt-3 w-50 text-start">
        <label for="horasDesconto" class="form-label">Horas de Desconto geradas</label>
        <input type="number" class="form-control" id="horasDesconto" v-model="configuracoes.horasDesconto" />
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0 mb-2">
      <div class="mb-3 mt-3 w-50 text-start">
        <label for="horaAbertura" class="form-label">Horário de Abertura</label>
        <input v-maska data-maska="##:##:##" type="text" class="form-control" id="horaAbertura"
          v-model="configuracoes.horaAbertura" />
      </div>
      <div class="mb-3 mt-3 w-50 text-start">
        <label for="horaFechamento" class="form-label">Horário de Fechamento</label>
        <input v-maska data-maska="##:##:##" type="text" class="form-control" id="horaFechamento"
          v-model="configuracoes.horaFechamento" />
      </div>
    </div>
    <div class="row d-flex mb-5 justify-content-center">
      <div class="col-md-3">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-secondary" to="/">Voltar
          </router-link>
        </div>
      </div>
      <div class="col-md-3">
        <div class="d-grid gap-2">
          <button v-if="this.configuracoes.id === undefined" type="button" class="btn btn-primary"
            @click="onClickConfigurar()">
            Configurar
          </button>
          <button v-if="this.configuracoes.id != undefined" type="button" class="btn btn-warning" @click="onClickEditar()">
            Editar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { vMaska } from "maska"
</script>

<script lang="ts">
import AvisoComponent from '@/components/AvisoComponent.vue'
import { defineComponent } from 'vue'
import { Configuracao } from "@/model/configuracao"
import { ConfiguracaoClient } from "@/client/configuracao.client"


export default defineComponent({
  name: 'ConfigsView',
  data(): any {
    return {
      configuracoes: new Configuracao(),
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
  mounted() {
    this.getConfiguracao()
  },
  methods: {
    getConfiguracao() {
      const configuracaoClient = new ConfiguracaoClient()
      configuracaoClient.getConfiguracao().then(sucess => {
        this.configuracoes = sucess
        this.mensagem.ativo = false
      }).catch(error => {
        this.mensagem.mensagem = error.response.data
        this.mensagem.status = false
        this.mensagem.ativo = true
      })
    },
    onClickConfigurar() {
      const configuracaoClient = new ConfiguracaoClient()
      configuracaoClient
        .primeiraConfiguracao(this.configuracoes)
        .then(sucess => {
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
    onClickEditar() {
      const configuracaoClient = new ConfiguracaoClient()
      configuracaoClient
        .editar(this.configuracoes)
        .then(sucess => {
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
    }
  }
})
</script>

<style scoped lang="scss">
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

.w-33 {
  width: 33%;
}
</style>
