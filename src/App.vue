<script setup>
import { ref, reactive, watch } from 'vue'

import c_presupuesto from './components/control_presupuesto.vue'
import control_disponible from './components/control_disponible.vue'
import ventana_formulario from './components/ventana_formulario.vue'
import iconoAddGasto from './assets/images/AddGasto.svg'

import iconoAddPresupuesto from './assets/images/AddPresupuesto.svg'

const presupuestoGeneral = ref(0)
const disponible = ref(0)
const gastado = ref(0)
const gastos = ref([])


watch(gastos, () => {
  const totalGastado = gastos.value.reduce((total, gasto) => gasto.cantidad + total, 0)
  gastado.value = totalGastado
  //disponible.value = presupuestoGeneral.value - totalGastado
}, {deep: true});

watch(gastado, () => {
  disponible.value = presupuestoGeneral.value - gastado.value
})

const ventana = reactive({
  mostrar: false,
  animar: false
})

const gasto = reactive({
  nombre: '',
  cantidad: '',
  categoria: '',
  id: null,
  fecha: Date.now()
})

const mostarVentana = () => {
  ventana.mostrar = true
  ventana.animar = true
}

const cerrarVentana = () => {
  ventana.mostrar = false
  ventana.animar = false
}



const definirPresupuestoGeneral = (cantidad) => {
  presupuestoGeneral.value = cantidad
  disponible.value = cantidad
}

const guardarGasto = () => {
  gastos.value.push({
    id: 123,
    ...gasto
  })
  cerrarVentana()

  Object.assign(gasto, {
    nombre: '',
    cantidad: '',
    categoria: '',
    id: null,
    fecha: Date.now()
  })
}

</script>

<template>
  <div>
    <header>
      <h1>
        Planificador de Gastos Sebastian
      </h1>

      <section class="contenedor-header contenedor sombra">

        <c_presupuesto 
          v-if="presupuestoGeneral === 0" 
          @definir-presupuesto="definirPresupuestoGeneral" 
        />

        <control_disponible 
          v-else 
          :presupuestoGeneral="presupuestoGeneral" 
          :disponible="disponible"
          :gastado="gastado"
        />

      </section>

    </header>

    <main v-if="presupuestoGeneral > 0">
      <section class="AddGasto">
        <p> 
          <img :src="iconoAddPresupuesto" alt=""> Agregar Presupuesto 
        </p>
        <br>
        <p>
          <img :src="iconoAddGasto" alt="" @click="mostarVentana"> Agregar Gasto 
        </p>
        
      </section>

      <ventana_formulario v-if="ventana.mostrar === true" @cerrar-ventana="cerrarVentana" @guardar-gasto="guardarGasto"
        v-model:nombre="gasto.nombre" v-model:cantidad="gasto.cantidad" v-model:categoria="gasto.categoria" />

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
  box-shadow: 0px 0px 100px 100px rgba(0, 0, 0, 0.1);
  background-color: var(--GrisAzul-50);
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

.AddGasto p {
  font-size: 2rem;
  font-weight: 900;
  font-family: "lato", sans-serif;
  background-color: var(--GrisAzul-200);

}

.AddGasto {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}

.AddGasto img {
  width: 3rem;
  cursor: pointer;
}
</style>
