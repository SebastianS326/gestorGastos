<!-- ventana_formulario.vue -->

<script setup>
import { defineEmits, defineProps, ref } from 'vue'

import global_error from './gobal_error.vue'
import iconoCerrar from '../assets/images/closeRed.svg'

// Referencia reactiva para el mensaje de error
const error = ref('')

// Definición de eventos
const emit = defineEmits(['cerrar-ventana', 'guardar-Add', 'update:nombre', 'update:cantidad'])

// Definición de propiedades
const props = defineProps({
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: [String, Number],
        required: true
    }
})

// Función para agregar un presupuesto
const aggPresupuesto = () => {
    const { nombre, cantidad } = props
    // Verifica si todos los campos están llenos
    if ([nombre, cantidad].includes('')) {
        error.value = "Todos los Campos son Obligatorios"

        setTimeout(() => {
            error.value = ''
        }, 3000)
    }
    // Verifica si la cantidad es mayor que 0
    else if (cantidad <= 0) {
        error.value = "El ingreso debe ser mayor a 0"

        setTimeout(() => {
            error.value = ''
        }, 3000)
    }
    // Si todas las validaciones pasan, emite el evento para guardar el presupuesto
    else {
        emit('guardar-Add')
    }
}
</script>

<template>
    <section class="ventana-emergente">
        <div class="cerrar-Ventana">
            <!-- Botón de cierre de la ventana -->
            <img :src="iconoCerrar" @click="emit('cerrar-ventana')">
        </div>

        <div class="contenedor">
            <!-- Formulario para agregar un presupuesto -->
            <form class="contenedor-formulario" @submit.prevent="aggPresupuesto">

                <legend>Agregar Presupuesto</legend>

                <!-- Componente para mostrar mensajes de error -->
                <global_error v-if="error">{{ error }}</global_error>

                <!-- Campo para el concepto del presupuesto -->
                <div class="Campo">
                    <label for="nombre">Concepto: </label>
                    <input id="nombre" type="text" placeholder="Agrega el concepto" :value="props.nombre"
                        @input="emit('update:nombre', $event.target.value)">
                </div>

                <!-- Campo para el monto del presupuesto -->
                <div class="Campo">
                    <label for="cantidad">Monto a Adicionar: </label>
                    <input id="cantidadGasto" type="number" placeholder="Agrega el monto" :value="props.cantidad"
                        @input="emit('update:cantidad', +$event.target.value)">
                </div>

                <!-- Botón para agregar el presupuesto -->
                <input type="submit" value="Agregar">

            </form>
        </div>
    </section>
</template>

<style scoped>
/* Estilo para la ventana emergente */
.ventana-emergente {
    position: absolute; /* La ventana se posiciona de forma absoluta en relación al contenedor más cercano con posición relativa */
    background-color: rgb(0 0 0 / 0.9); /* Fondo negro con 90% de opacidad */
    top: 0; /* Se alinea en la parte superior */
    left: 0; /* Se alinea a la izquierda */
    right: 0; /* Se alinea a la derecha */
    bottom: 0; /* Se alinea en la parte inferior */
}

/* Estilo para el contenedor del botón de cierre */
.cerrar-Ventana {
    position: absolute; /* Posición absoluta en relación al contenedor */
    right: 3rem; /* Se separa 3rem del borde derecho */
    top: 3rem; /* Se separa 3rem del borde superior */
}

/* Estilo para la imagen del botón de cierre */
.cerrar-Ventana img {
    width: 3rem; /* Ancho de 3rem */
    cursor: pointer; /* Cambia el cursor a pointer para indicar que es clicable */
}

/* Estilo para el formulario */
.contenedor-formulario {
    margin: 10rem auto 0 auto; /* Centra horizontalmente y separa 10rem del borde superior */
    display: grid; /* Disposición en cuadrícula */
    gap: 2rem; /* Espacio de 2rem entre los elementos */
}

/* Estilo para el título del formulario */
.contenedor-formulario legend {
    text-align: center; /* Texto centrado */
    color: var(--GrisAzul-50); /* Color de texto blanco */
    font-size: 4rem; /* Tamaño de fuente de 4rem */
    font-weight: 700; /* Peso de fuente 700 (negrita) */
}

/* Estilo para entradas y selects en el formulario */
.contenedor-formulario input,
.contenedor-formulario select {
    background-color: var(--GrisAzul-200); /* Fondo gris claro */
    border-radius: 1rem; /* Bordes redondeados de 1rem */
    padding: 1rem; /* Espaciado interno de 1rem */
    border: none; /* Sin borde */
}

/* Estilo para etiquetas en el formulario */
.contenedor-formulario label {
    color: var(--GrisAzul-50); /* Color de texto blanco */
}

/* Estilo para el botón de envío */
.contenedor-formulario input[type="submit"] {
    background-color: var(--GrisAzul-700); /* Fondo gris oscuro */
    color: var(--GrisAzul-50); /* Color de texto blanco */
    cursor: pointer; /* Cambia el cursor a pointer para indicar que es clicable */
    font-weight: 700; /* Peso de fuente 700 (negrita) */
}

/* Estilo para cada campo del formulario */
.Campo {
    display: grid; /* Disposición en cuadrícula */
    gap: 2rem; /* Espacio de 2rem entre los elementos */
}
</style>
