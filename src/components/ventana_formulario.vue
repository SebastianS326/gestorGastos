<!-- ventana_formulario.vue -->

<script setup>
import { defineEmits, defineProps, ref } from 'vue'

import global_error from './gobal_error.vue'
import iconoCerrar from '../assets/images/closeRed.svg'

// Referencia reactiva para el mensaje de error
const error = ref('')

// Definición de eventos
const emit = defineEmits(['cerrar-ventana', 'guardar-gasto', 'update:nombre', 'update:cantidad', 'update:categoria'])

// Definición de propiedades
const props = defineProps({
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: [String, Number],
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    disponible: {
        type: Number,
        required: true
    }
})

// Función para agregar un gasto
const aggGasto = () => {
    const { nombre, cantidad, categoria, disponible } = props
    // Verifica si todos los campos están llenos
    if ([nombre, cantidad, categoria].includes('')) {
        error.value = "Todos los Campos son Obligatorios"

        setTimeout(() => {
            error.value = ''
        }, 3000)
    }
    // Verifica si la cantidad es mayor que 0
    else if (cantidad <= 0) {
        error.value = "El gasto debe ser mayor a 0"

        setTimeout(() => {
            error.value = ''
        }, 3000)
    }
    // Verifica si la cantidad no excede el disponible
    else if (cantidad > disponible) {
        error.value = "El gasto no puede ser mayor al disponible"

        setTimeout(() => {
            error.value = ''
        }, 3000)
    }
    // Si todas las validaciones pasan, emite el evento para guardar el gasto
    else {
        emit('guardar-gasto')
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
            <!-- Formulario para agregar un gasto -->
            <form class="contenedor-formulario" @submit.prevent="aggGasto">

                <legend>Agregar Gasto</legend>

                <!-- Componente para mostrar mensajes de error -->
                <global_error v-if="error">{{ error }}</global_error>

                <!-- Campo para el nombre del gasto -->
                <div class="Campo">
                    <label for="Nombre">Nombre Gasto: </label>
                    <input id="nombreGasto" type="text" placeholder="Agrega el nombre del gasto" :value="props.nombre"
                        @input="emit('update:nombre', $event.target.value)">
                </div>

                <!-- Campo para el monto del gasto -->
                <div class="Campo">
                    <label for="cantidad">Monto del Gasto: </label>
                    <input id="cantidadGasto" type="number" placeholder="Agrega el monto del gasto"
                        :value="props.cantidad" @input="emit('update:cantidad', +$event.target.value)">
                </div>

                <!-- Campo para la categoría del gasto -->
                <div class="Campo">
                    <label for="categoria">Categoria: </label>
                    <select id="categoria" :value="props.categoria"
                        @input="emit('update:categoria', $event.target.value)">
                        <option value="">*** Seleccione ***</option>
                        <option value="Ahorro">Ahorro</option>
                        <option value="Gasto de comida">Comida</option>
                        <option value="Gasto de casa">Gastos de Casa</option>
                        <option value="Gasto de ocio">Ocio</option>
                        <option value="Gasto de salud">Salud</option>
                        <option value="Gasto de suscripciones">Suscripciones</option>
                        <option value="Otros gastos">Gastos Varios</option>
                    </select>
                </div>

                <!-- Botón para agregar el gasto -->
                <input type="submit" value="Agregar">

            </form>
        </div>
    </section>
</template>

<style scoped>
/* Estilo para la ventana emergente */
.ventana-emergente {
    position: absolute;
    background-color: rgb(0 0 0 / 0.9);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

/* Estilo para el botón de cierre */
.cerrar-Ventana {
    position: absolute;
    right: 3rem;
    top: 3rem;
}

/* Estilo para la imagen del botón de cierre */
.cerrar-Ventana img {
    width: 3rem;
    cursor: pointer;
}

/* Estilo para el formulario */
.contenedor-formulario {
    margin: 10rem auto 0 auto;
    display: grid;
    gap: 2rem;
}

/* Estilo para el título del formulario */
.contenedor-formulario legend {
    text-align: center;
    color: var(--GrisAzul-50);
    font-size: 4rem;
    font-weight: 700;
}

/* Estilo para entradas y selects en el formulario */
.contenedor-formulario input,
.contenedor-formulario select {
    background-color: var(--GrisAzul-200);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
}

/* Estilo para etiquetas en el formulario */
.contenedor-formulario label {
    color: var(--GrisAzul-50)
}

/* Estilo para el botón de envío */
.contenedor-formulario input[type="submit"] {
    background-color: var(--GrisAzul-700);
    color: var(--GrisAzul-50);
    cursor: pointer;
    font-weight: 700;
}

/* Estilo para cada campo del formulario */
.Campo {
    display: grid;
    gap: 2rem;
}
</style>
