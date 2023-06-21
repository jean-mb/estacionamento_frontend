<template>
  <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="nav-link navbar-brand" to="/">Estacionamento</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
      </ul>
    </div>
  </nav> -->
  <!-- Grey with black text -->
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <div class="container-fluid">
      <ul class="navbar-nav d-flex w-100 justify-content-around">
        <li class="nav-item">
          <router-link class="nav-link" to="/condutores">Condutor</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/movimentacoes"
            >Movimentação</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link p-0" to="/"><i class="home-icon bi bi-house-fill"></i></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/veiculos">Veiculos</router-link>
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
.home-icon{
  font-size: 1.5rem;
}
</style>
