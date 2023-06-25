<template>
  <div v-if="ativo" class="row">
    <div class="col-md-12 text-start">
      <div :class="status.css" role="alert">
        <strong>{{ status.titulo }}</strong> {{ mensagem }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AvisoComponent',
  props: {
    ativo: {
      type: Boolean,
      required: true
    },
    mensagem: {
      type: String,
      required: true
    },
    sucesso: {
      type: Boolean,
      required: true
    }
  },
  data(): any {
    return {
      status: {
        ativo: this.ativo as boolean,
        titulo: '' as string,
        css: '' as string
      }
    }
  },
  mounted() {
    if (this.sucesso) {
      this.mensagemSucesso()
    } else {
      this.mensagemErro()
    }
  },
  methods: {
    mensagemErro() {
      this.status.titulo = 'Erro: '
      this.status.css = 'alert alert-danger alert-dismissible fade show'
    },
    mensagemSucesso() {
      this.status.titulo = 'Ok! '
      this.status.css = 'alert alert-success alert-dismissible fade show'
    }
  }
})
</script>
