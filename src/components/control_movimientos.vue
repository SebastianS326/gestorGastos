<!-- control_movimientos.vue -->

<script setup>
import { defineProps } from 'vue'
import { formatoDinero, formatoFecha } from '../Funtions'

// Definición de propiedades
const props = defineProps({
    // 'gasto': Objeto que contiene los detalles del gasto
    gasto: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <!-- Contenedor principal del movimiento -->
    <div class="movimiento sombra">
        <!-- Sección de contenido del movimiento -->
        <section class="contenido">
            <div>
                <!-- Mostrar el nombre del gasto -->
                <p> <span>Concepto: </span> {{ props.gasto.nombre }} </p>
                <!-- Mostrar la categoría del gasto -->
                <p> <span>Categoria: </span> {{ props.gasto.categoria }} </p>
                <!-- Mostrar la fecha del gasto, formateada -->
                <p> <span>Fecha: </span> {{ formatoFecha(props.gasto.fecha) }} </p>
                <!-- Mostrar el valor del gasto, formateado -->
                <p> <span>Valor: </span> {{ formatoDinero(props.gasto.cantidad) }} </p>
            </div>
        </section>
    </div>
</template>

<style scoped>
/* Estilo para los <span> dentro de los párrafos */
.contenido p span {
    font-size: 2rem; /* Tamaño de fuente de 2rem */
    font-weight: 900; /* Peso de fuente 900 (negrita) */
    color: var(--GrisAzul-700); /* Color gris oscuro */
}

/* Estilo para los párrafos */
.contenido p {
    font-size: 1.8rem; /* Tamaño de fuente de 1.8rem */
    font-weight: 500; /* Peso de fuente 500 (medio) */
    color: var(--GrisAzul-500); /* Color gris medio */
}
</style>
