<template>
  <th class="text-center col-md-2">
    <div class="btn-group" role="group">
      <router-link v-if="listarRoute != null" type="button" class="btn btn-sm btn-info" :to="{
        name: listarRoute,
        query: { id: id }
      }">
        <i class="bi bi-info-square"></i> </router-link>
      <router-link v-if="editarRoute != null" type="button" class="btn btn-sm btn-warning mr-2" :to="{
        name: editarRoute,
        query: { id: id, form: 'editar' }
      }">
        <i class="bi bi-pencil-square"></i>
      </router-link>
      <router-link v-if="confirmarRoute != null" aria-label="Confirmar" type="button" class="btn btn-sm btn-success mr-2"
        :to="{
          name: confirmarRoute,
          query: { id: id, form: 'confirmar' }
        }">
        <i class="bi bi-check-square"></i> </router-link>
      <router-link v-if="toggleRoute != null && isAtivo == true" type="button" class="btn btn-sm btn-danger" :to="{
        name: toggleRoute,
        query: { id: id, form: 'toggle' }
      }">
        <i class="bi bi-x-circle"></i>
      </router-link>
      <router-link v-if="toggleRoute != null && isAtivo == false" type="button" class="btn btn-sm btn-success" :to="{
        name: toggleRoute,
        query: { id: id, form: 'toggle' }
      }">
        <i class="bi bi-arrow-counterclockwise"></i>
      </router-link>
    </div>
  </th>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BotoesAcoes',
  props: {
    editarRoute: {
      type: String,
    },
    toggleRoute: {
      type: String,
    },
    listarRoute: {
      type: String,
    },
    confirmarRoute: {
      type: String,
    },
    id: {
      type: Number,
      required: true
    },
    isAtivo: {
      type: Boolean,
    }
  }
})
</script>
<style scoped lang="scss">
$theme-colors: (
  'dark': #111111,
  'primary': #515151,
  'secondary': #c8c8c8,
  'info': #d4d0d0,
  'success': #198754,
  'warning': #ffc107,
  'danger': #dc3545
);
@import 'node_modules/bootstrap/scss/bootstrap.scss';

.btn {
  font-weight: var(--font-weight-forte);
}

i {
  vertical-align: middle;
  font-size: 1.2rem;
}
</style>
