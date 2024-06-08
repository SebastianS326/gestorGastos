<script setup>
import { defineEmits, defineProps, ref } from 'vue'

import global_error from './gobal_error.vue'
import iconoCerrar from '../assets/images/closeRed.svg'

const error = ref('')
const emit = defineEmits(['cerrar-ventana', 'guardar-Add', 'update:concepto', 'update:cantidad'])

const props = defineProps({
    concepto: {
        type: String,
        required: true
    },
    cantidad: {
        type: [String, Number],
        required: true
    }

})

const aggPresupuesto = () => {
    const { concepto, cantidad } = props
    if ([concepto, cantidad].includes('')) {
        error.value = "Todos los Campos son Obligatorios"

        setTimeout(() => {
            error.value = ''
        }, 3000)
    }
    else if (cantidad <= 0) {
        error.value = "El ingreso debe ser mayor a 0"

        setTimeout(() => {
            error.value = ''
        }, 3000)
    }
    else {
        emit('guardar-Add')
    }
}

</script>

<template>
    <section class="ventana-emergente">
        <div class="cerrar-Ventana">
            <img :src="iconoCerrar" @click="emit('cerrar-ventana')">
        </div>

        <div class="contenedor">
            <form class="contenedor-formulario" @submit.prevent="aggPresupuesto">

                <legend>Agregar Presupuesto</legend>

                <global_error v-if="error">{{ error }}</global_error>

                <div class="Campo">
                    <label for="concepto">Concepto: </label>
                    <input id="concepto" type="text" placeholder="Agrega el concepto" :value="props.concepto"
                        @input="emit('update:concepto', $event.target.value)">
                </div>

                <div class="Campo">
                    <label for="cantidad">Monto a Adicionar: </label>
                    <input id="cantidadGasto" type="number" placeholder="Agrega el monto" :value="props.cantidad"
                        @input="emit('update:cantidad', +$event.target.value)">
                </div>

                <input type="submit" value="Agregar">

            </form>
        </div>
    </section>
</template>

<style scoped>
.ventana-emergente {
    position: absolute;
    background-color: rgb(0 0 0 / 0.9);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.cerrar-Ventana {
    position: absolute;
    right: 3rem;
    top: 3rem;
}

.cerrar-Ventana img {
    width: 3rem;
    cursor: pointer;
}

.contenedor-formulario {
    margin: 10rem auto 0 auto;
    display: grid;
    gap: 2rem;
}

.contenedor-formulario legend {
    text-align: center;
    color: var(--GrisAzul-50);
    font-size: 4rem;
    font-weight: 700;
}

.contenedor-formulario input,
.contenedor-formulario select {
    background-color: var(--GrisAzul-200);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
}

.contenedor-formulario label {
    color: var(--GrisAzul-50)
}

.contenedor-formulario input[type="submit"] {
    background-color: var(--GrisAzul-700);
    color: var(--GrisAzul-50);
    cursor: pointer;
    font-weight: 700;
}

.Campo {
    display: grid;
    gap: 2rem;
}
</style>