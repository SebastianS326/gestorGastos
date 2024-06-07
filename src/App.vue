<script setup>
  import { ref, reactive } from 'vue'

  import c_presupuesto from './components/control_presupuesto.vue'
  import control_disponible from './components/control_disponible.vue'
  import ventana_formulario from './components/ventana_formulario.vue'
  import iconoAddGasto from './assets/images/AddGasto.svg'
  import iconoAddPresupuesto from './assets/images/AddPresupuesto.svg'

  const presupuestoGeneral = ref(0)
  const disponible = ref(0)

  const ventana = reactive({
    mostrar: false,
    animar: false
  })

  const mostarVentana = () => {
    ventana.mostrar = true
    ventana.animar = true
  }


  const definirPresupuestoGeneral = (cantidad) => {
    presupuestoGeneral.value = cantidad
    disponible.value = cantidad
  }
</script>

<template>
  <div>
    <header>
      <h1>
        Planificador de Gastos
      </h1>

      <section class="contenedor-header contenedor sombra">

        <c_presupuesto v-if="presupuestoGeneral === 0"
          @definir-presupuesto="definirPresupuestoGeneral"
        />

        <control_disponible
          v-else
          :presupuestoGeneral="presupuestoGeneral"
          :disponible="disponible"
        />

      </section>
      
    </header>

    <main v-if="presupuestoGeneral > 0">
      <section class="AddGasto">
          <img :src="iconoAddPresupuesto" alt="">
          <br>
          <br>
          <img :src="iconoAddGasto" alt="" @click="mostarVentana">
      </section>

      <ventana_formulario 
        v-if="ventana.mostrar === true"
      />

    </main>

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

  .contenedor {
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }

  .contenedor-header {
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
  }

  .sombra {
    box-shadow: 0px 0px 100px 100px rgba(0,0,0,0.1);
    background-color: var(--GrisAzul-50);
  }

  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 3rem;
  }

  .AddGasto {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
  }

  .AddGasto img {
    width: 5rem;
    cursor: pointer;
  }

</style>
