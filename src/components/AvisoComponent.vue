<template>
  <div v-if="ativo" class="row">
    <div class="col-md-12 text-start">
      <div v-if="sucesso" class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Ok! </strong> <p>{{ mensagem }}</p>
      </div>
      <div v-if="!sucesso" class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Erro: </strong>{{ mensagem }}
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

p {
  white-space: pre-wrap;
}
</style>
