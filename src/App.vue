<template>
  <NavbarComponent></NavbarComponent>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavbarComponent from '@/components/NavbarComponent.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    NavbarComponent,
  },
});
</script>

<style lang="scss">
/* Option 2: Import via CSS */
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap');

$theme-colors: (
  'dark': #111111,
  // 'dark': black,
  'primary': #515151,
  'secondary': #C8C8C8,
  'info': #A4A4A4,
  'success': green,
  'danger': red
);

// // Then import Bootstrap and Boo tstrapVue SCSS files (order is important)
@import 'node_modules/bootstrap/scss/bootstrap.scss';
:root {
  --font-principal: 'Inter', sans-serif;
  --font-weight-leve: 400;
  --font-weight-principal: 500;
  --font-weight-destaque: 600;
  --font-weight-forte: 800;
}
.fs-5{
  font-weight: var(--font-weight-destaque);
}

* {
  font-family: var(--font-principal);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
</style>
