<template>
  <div class="home">
    <h1>Home</h1>
  </div>
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
