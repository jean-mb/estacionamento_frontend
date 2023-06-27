<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <div class="container-fluid">
      <ul class="navbar-nav d-flex w-100 justify-content-around">
        <li class="nav-item">
          <router-link class="nav-link" to="/condutores">Condutor</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/movimentacoes">Movimentações</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/veiculos">Veiculos</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/">Início</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/modelos">Modelos</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/marcas">Marcas</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/configs">Configuração</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavbarComponent'
})
</script>

<style scoped lang="scss">
.nav-link {
  font-weight: var(--font-weight-principal);
  color: white;
}
.home-icon {
  font-size: 1.5rem;
}
ul{
  margin-right: 2rem;
}
</style>
