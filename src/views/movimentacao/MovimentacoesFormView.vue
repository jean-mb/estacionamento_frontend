<template>
  <div class="container w-50">
    <div class="row mt-5">
      <div class="col-md-10 text-start">
        <p class="fs-5">Nova Movimentação</p>
      </div>
      <div class="col-md-2"></div>
    </div>

    <AvisoComponent :ativo="mensagem.ativo" :sucesso="mensagem.status" :mensagem="mensagem.mensagem"></AvisoComponent>

    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="mb-3 mt-3 w-50 text-start">
        <label for="condutor" class="form-label">Condutor</label>
        <input type="text" :disabled="this.form === 'toggle' ? '' : disabled" class="form-control" id="condutor"
          v-on:change="procuraCondutor()" v-model="condutor" required />
      </div>
      <div class="mb-3 mt-3 w-50 text-start">
        <label for="veiculo" class="form-label">Veiculo</label>
        <input type="text" :disabled="this.form === 'toggle' ? '' : disabled" class="form-control" id="veiculo"
          v-on:change="procuraVeiculos()" v-model="veiculo" required />
      </div>
    </div>
    <div class="row w-100 d-flex justify-content-center m-0">
      <div class="mb-3 mt-3 w-50 text-start">
        <label for="dataEntrada" class="form-label">Data de Entrada</label>
        <input type="datetime-local" :disabled="this.form === 'toggle' ? '' : disabled" class="form-control"
          id="dataEntrada" v-model="movimentacao.dataEntrada" />
      </div>
      <div class="mb-3 mt-3 w-50 text-start">
        <label for="dataSaida" class="form-label">Data de Saída</label>
        <input type="datetime-local" :disabled="this.form === 'toggle' ? '' : disabled" class="form-control"
          id="dataSaida" v-model="movimentacao.dataSaida" />
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div class="col-md-3">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-secondary" to="/movimentacoes">Voltar
          </router-link>
        </div>
      </div>
      <div class="col-md-3">
        <div class="d-grid gap-2">
          <button v-if="this.form === undefined" type="button" class="btn btn-primary" @click="onClickCadastrar()">
            Abrir
          </button>
          <button v-if="this.form === 'editar'" type="button" class="btn btn-warning" @click="onClickEditar()">
            Editar
          </button>
          <button v-if="this.form === 'toggle' && movimentacao.ativo === true" type="button" class="btn btn-danger"
            @click="onClickExcluir()">
            Cancelar
          </button>
          <button v-if="this.form === 'toggle' && movimentacao.ativo === false" type="button" class="btn btn-success"
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
import { CondutorClient } from '@/client/condutor.client'
import { MovimentacaoClient } from '@/client/movimentacao.client'
import { VeiculoClient } from '@/client/veiculo.client'
import { Movimentacao } from '@/model/movimentacao'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MovimentacaoFormulario',
  data(): any {
    return {
      movimentacao: new Movimentacao(),
      condutor: '' as string,
      veiculo: '' as string,
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
    id() {
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
    procuraCondutor() {
      const condutorClient = new CondutorClient()
      if (this.condutor.trim() != '') {
        if (Number(this.condutor)) {
          condutorClient
            .findById(Number(this.condutor))
            .then(sucess => {
              this.movimentacao.condutor = sucess
            })
            .catch(error => {
              this.mensagem.mensagem = error.response.data
              this.mensagem.status = false
              this.mensagem.ativo = true
            })
        } else {
          condutorClient
            .findByCpf(this.condutor)
            .then(sucess => {
              this.movimentacao.condutor = sucess[0]
            })
            .catch(error => {
              condutorClient
                .findByNome(this.condutor)
                .then(sucess => {
                  this.movimentacao.condutor = sucess[0]
                })
                .catch(error => {
                  this.mensagem.mensagem = error.response.data
                  this.mensagem.status = false
                  this.mensagem.ativo = true
                })
            })
        }
      }
      this.mensagem.ativo = false
    },
    procuraVeiculos() {
      const veiculosClient = new VeiculoClient()
      if (this.veiculo.trim() != '') {
        if (Number(this.veiculo)) {
          veiculosClient
            .findById(Number(this.veiculo))
            .then(sucess => {
              this.movimentacao.veiculo = sucess
            })
            .catch(error => {
              this.mensagem.mensagem = error.response.data
              this.mensagem.status = false
              this.mensagem.ativo = true
            })
        } else {
          veiculosClient
            .findByPlaca(this.veiculo)
            .then(sucess => {
              this.movimentacao.veiculo = sucess[0]
            })
            .catch(error => {
              this.mensagem.mensagem = error.response.data
              this.mensagem.status = false
              this.mensagem.ativo = true
            })
        }
      }
      this.mensagem.ativo = false
    },
    onClickCadastrar() {
      const movimentacaoClient = new MovimentacaoClient()
      movimentacaoClient
        .novaMovimentacao(this.movimentacao)
        .then(sucess => {
          this.movimentacao = new Movimentacao()
          this.condutor = this.veiculo = ''
          this.mensagem.mensagem = sucess
          this.mensagem.status = true
          this.mensagem.ativo = true
        })
        .catch(error => {
          if (typeof error.response.data == 'object') {
            this.mensagem.mensagem = Object.values(error.response.data)[0]
          } else {
            this.mensagem.mensagem = error.response.data
          }
          this.mensagem.status = false
          this.mensagem.ativo = true
        })
    },
    findById(id: number) {
      const movimentacaoClient = new MovimentacaoClient()
      movimentacaoClient
        .findById(id)
        .then(sucess => {
          this.movimentacao = sucess
          this.condutor = sucess.condutor.nome
          this.veiculo = sucess.veiculo.placa
        })
        .catch(error => {
          this.mensagem.mensagem = error.response.data
          this.mensagem.status = false
          this.mensagem.ativo = true
        })
    },
    onClickEditar() {
      const movimentacaoClient = new MovimentacaoClient()
      movimentacaoClient
        .editarMovimentacao(this.movimentacao)
        .then(sucess => {
          this.movimentacao = new Movimentacao()
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
      if (confirm("Tem certeza que deseja reativar essa movimentação?")) {
        this.movimentacao.ativo = true
        const movimentacaoClient = new MovimentacaoClient()
        movimentacaoClient
          .editarMovimentacao(this.movimentacao)
          .then(sucess => {
            this.mensagem.mensagem = "Movimentação reativada com sucesso!"
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
      if (confirm("Tem certeza que deseja cancelar essa movimentação?")) {
        const movimentacaoClient = new MovimentacaoClient()
        movimentacaoClient
          .deletar(this.movimentacao)
          .then(sucess => {
            this.movimentacao.ativo = false
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
@import 'node_modules/bootstrap/scss/bootstrap.scss';
</style>
