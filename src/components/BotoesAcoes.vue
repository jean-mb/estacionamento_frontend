<template>
  <th class="text-center col-md-2">
    <div class="btn-group" role="group">
      <router-link
        type="button"
        class="btn btn-sm btn-warning mr-2"
        :to="{
          name: editarRoute,
          query: { id: id, form: 'editar' }
        }"
      >
        <i class="bi bi-pencil-square"></i>
      </router-link>
      <router-link
        type="button"
        class="btn btn-sm btn-danger"
        :to="{
          name: desativarRoute,
          query: { id: id, form: 'desativar' }
        }"
      >
        <i class="bi bi-x-circle"></i>
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
      required: true
    },
    desativarRoute: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  }
})
</script>
<style scoped lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap.scss';
.btn {
  font-weight: var(--font-weight-forte);
}

i {
  vertical-align: middle;
  font-size: 1.2rem;
}
</style>
