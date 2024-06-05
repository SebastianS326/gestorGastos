<script setup>
  import c_presupuesto from './components/control_presupuesto.vue';
</script>

<template>
  <div>
    <header>
      <h1>
        Planificador de Gastos
      </h1>
    </header>
  </div>
</template>

<style>
  /*Estilos Globales de la App*/
  :root {
  --GrisAzul-50: #f6f7f9;
  --GrisAzul-100: #ededf1;
  --GrisAzul-200: #d6d8e1;
  --GrisAzul-300: #b2b6c7;
  --GrisAzul-400: #888ea8;
  --GrisAzul-500: #69708e;
  --GrisAzul-600: #545a75;
  --GrisAzul-700: #474b62;
  --GrisAzul-800: #3c3f50;
  --GrisAzul-900: #353745;
  --GrisAzul-950: #23252e;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    font-size: 1.6rem;
    font-family: "lato", sans-serif;
    background-color: var(--GrisAzul-200);
  }

  header {
    background-color: var(--GrisAzul-600);
  }

  header h1 {
    padding: 3rem 0;
    margin: 0;
    color: var(--GrisAzul-50);
    text-align: center;
  }

  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 3rem;
  }

</style>
