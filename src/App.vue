<!-- App.vue -->

<script setup>
import { ref, reactive, watch } from 'vue'

import c_presupuesto from './components/control_presupuesto.vue'
import control_disponible from './components/control_disponible.vue'
import ventana_formulario from './components/ventana_formulario.vue'
import ventana_formularioAddP from './components/ventana_formularioAddP.vue'
import control_movimientos from './components/control_movimientos.vue'

import iconoAddGasto from './assets/images/AddGasto.svg'
import iconoAddPresupuesto from './assets/images/AddPresupuesto.svg'

/**
 * Variables reactivas que representan el estado del presupuesto general,
 * el dinero disponible, el dinero gastado y una lista de gastos.
 */
const presupuestoGeneral = ref(0)
const disponible = ref(0)
const gastado = ref(0)
const gastos = ref([])

/**
 * Estructuras reactivas que representan un estado de un  modal (ventana emergente (formularios))
 */
const ventana = reactive({
  mostrar: false
})

const ventana2 = reactive({
  mostrar: false
})

/**
 * Estructuras reactivas que representan un nuevo gasto y un nuevo ingreso.
 */
const gasto = reactive({
  nombre: '',
  cantidad: '',
  categoria: '',
  fecha: Date.now()
})

const presupAdd = reactive({
  nombre: '',
  cantidad: '',
  categoria: 'Ingreso',
  fecha: Date.now()
})


/**
 * Observa la lista de gastos y calcula el total gastado cada vez que cambia la lista,
 * excluyendo los ingresos.
 */
watch(gastos, (newGastos) => {
  const totalGastado = newGastos
    .filter(gasto => gasto.categoria !== 'Ingreso') // Filtra los elementos con categoría 'Ingreso'
    .reduce((total, gasto) => gasto.cantidad + total, 0);

  gastado.value = totalGastado;
}, { deep: true });

/**
 * Actualiza el dinero disponible cada vez que cambian los valores de 'gastado' o 'presupuestoGeneral'.
 */
watch([gastado, presupuestoGeneral], () => {
  disponible.value = presupuestoGeneral.value - gastado.value
})

/**
 * Observa las propiedades de los objetos ventana, ventana2. actua cada vez que se cierran.
 */
watch(ventana, () => {
  if (!ventana.mostrar) {
    limpiarFormulario()
  }
});

watch(ventana2, () => {
  if (!ventana2.mostrar) {
    limpiarFormularioAdd()
  }
});

/**
 * Funciones para mostrar y cerrar las ventanas emergentes.
 */
const mostarVentana = (tipo) => {
  tipo.mostrar = true
}

const cerrarVentana = (tipo) => {
  tipo.mostrar = false
}

/**
 * Funciones para limpiar los formularios de gastos y de presupuestos.
 */
const limpiarFormulario = () => {
  Object.assign(gasto, {
    nombre: '',
    cantidad: '',
    categoria: '',
    fecha: Date.now()
  })
}

const limpiarFormularioAdd = () => {
  Object.assign(presupAdd, {
    nombre: '',
    cantidad: '',
    categoria: 'Ingreso',
    fecha: Date.now()
  })
}

/**
 * Función para definir el presupuesto general y el disponible inicial.
 */
const definirPresupuestoGeneral = (cantidad) => {
  presupuestoGeneral.value = cantidad
  disponible.value = cantidad
}

/**
 * Funciones para guardar nuevos gastos e ingresos en la lista de gastos.
 */
const guardarGasto = () => {
  gastos.value.push({
    ...gasto
  })
  cerrarVentana(ventana)
  limpiarFormulario()
}

const guardarAdd = () => {
  gastos.value.push({
    ...presupAdd
  })
  presupuestoGeneral.value = presupAdd.cantidad + presupuestoGeneral.value
  cerrarVentana(ventana2)
  limpiarFormularioAdd()
}

</script>

<template>

  <div :class="{ fijar2: ventana2.mostrar, fijar: ventana.mostrar }">

    <header>

      <h1>
        Planificador de Gastos <span>&#x1F4B5;</span>
      </h1>

      <section class="contenedor-header contenedor sombra">

        <!-- Muestra el componente de presupuesto si el presupuesto general es 0 -->
        <c_presupuesto 
          v-if="presupuestoGeneral === 0" 
          @definir-presupuesto="definirPresupuestoGeneral" 
        />
        <!-- Muestra el componente de control disponible si el presupuesto general es mayor que 0 -->
        <control_disponible 
          v-else :presupuestoGeneral="presupuestoGeneral" 
          :disponible="disponible"
          :gastado="gastado" 
        />

      </section>
      
    </header>

    <main v-if="presupuestoGeneral > 0">
      <section class="AddGasto">
        <p>
          <img :src="iconoAddPresupuesto" @click="mostarVentana(ventana2)"> Agregar Presupuesto
        </p>
        <br>
        <p>
          <img :src="iconoAddGasto" @click="mostarVentana(ventana)"> Agregar Gasto
        </p>
      </section>

      <!-- Ventana emergente para agregar nuevos gastos -->
      <ventana_formulario 
        v-if="ventana.mostrar === true" 
        @cerrar-ventana="cerrarVentana(ventana)"
        @guardar-gasto="guardarGasto" 
        v-model:nombre="gasto.nombre" 
        v-model:cantidad="gasto.cantidad"
        v-model:categoria="gasto.categoria" 
        v-model:disponible="disponible" 
      />

      <!-- Ventana emergente para agregar nuevos ingresos -->
      <ventana_formularioAddP 
        v-if="ventana2.mostrar === true" 
        @cerrar-ventana="cerrarVentana(ventana2)"
        @guardar-Add="guardarAdd" 
        v-model:nombre="presupAdd.nombre" 
        v-model:cantidad="presupAdd.cantidad" 
      />

      <section class="listado-gastos contenedor">
        <h2>{{ gastos.length > 0 ? 'Movimientos' : 'No hay movimientos' }}</h2>
        <!-- Muestra cada movimiento (gasto o ingreso) en la lista de movimientos -->
        <control_movimientos 
          v-for="gasto in gastos" 
          :key="gasto.concepto" 
          :gasto="gasto" 
        />
      </section>

    </main>

  </div>

</template>

<style>
/* Variables globales de colores */
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

/* Configuración base de fuentes y tamaño */
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

/* Estilo del header */
header {
  background-color: var(--GrisAzul-600);
}

/* Clases para fijar el contenido y evitar el scroll */
.fijar,
.fijar2 {
  overflow: hidden;
  height: 100vh;
}

/* Estilo del título principal */
header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--GrisAzul-50);
  text-align: center;
}

/* Contenedor centralizado */
.contenedor {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

/* Contenedor del header con sombra */
.contenedor-header {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}

/* Estilo de sombra para el contenedor */
.sombra {
  box-shadow: 0px 0px 100px 100px rgba(0, 0, 0, 0.1);
  background-color: var(--GrisAzul-50);
  border-radius: 1rem;
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

/* Estilo de la sección para agregar gastos y presupuestos */
.AddGasto {
  text-align: center;
  padding: 20px;
}

.AddGasto p {
  margin: 20px 0;
  position: relative;
  font-size: 2rem;
  font-weight: 900;
  font-family: "lato", sans-serif;
  background-color: var(--GrisAzul-200);
}

/* Estilo de las imágenes dentro de AddGasto */
.AddGasto img {
  display: inline-block;
  vertical-align: middle;
  width: 3rem;
  cursor: pointer;
  margin: 0 auto;
  max-width: 100%;
}

/* Estilo del icono */
.icono {
  margin-right: 10px;
  width: 40px;
  height: auto;
}

/* Media query para dispositivos móviles */
@media (max-width: 768px) {
  .AddGasto {
    text-align: center;
    padding: 10px;
  }

  .AddGasto p {
    clear: both;
    margin: 20px 0;
  }

  .AddGasto img {
    width: 30px;
    height: auto;
  }

  .icono {
    margin-right: 5px;
  }
}

/* Estilo de la sección de listado de gastos */
.listado-gastos {
  margin-top: 5rem;
}

.listado-gastos h2 {
  font-weight: 900;
  color: var(--GrisAzul-600);
}
</style>
