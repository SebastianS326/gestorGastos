<script setup>
import { ref, defineEmits } from 'vue'
import global_error from './gobal_error.vue'

// Referencias reactivas para el presupuesto y el mensaje de error
const presupuesto = ref(0)
const error = ref('')

// Define el evento que el componente emitirá cuando se defina el presupuesto
const emit = defineEmits(['definir-presupuesto'])

// Función para definir el presupuesto
const definirPresupuesto = () => {
    // Verifica si el presupuesto es mayor que 0
    if (presupuesto.value <= 0) {
        // Establece un mensaje de error si el presupuesto es inválido
        error.value = 'El presupuesto debe ser mayor a 0'

        // Limpia el mensaje de error después de 3 segundos
        setTimeout(() => {
            error.value = ''
        }, 3000)
    } else {
        // Emite el evento 'definir-presupuesto' con el valor del presupuesto
        emit('definir-presupuesto', presupuesto.value)
    }
}
</script>

<template>
    <!-- Formulario para definir el presupuesto -->
    <form class="presupuesto" @submit.prevent="definirPresupuesto">
        <!-- Componente para mostrar errores globales -->
        <global_error v-if="error">
            {{ error }}
        </global_error>

        <!-- Sección de campo para ingresar el presupuesto -->
        <section class="campo">
            <label for="">Definir Presupuesto</label>
            <input id="nuevo-presupuesto" class="nuevo-presupuesto" type="number" min="0"
                placeholder="Agrega tu Presupuesto" v-model.number="presupuesto" />
        </section>

        <!-- Botón para enviar el formulario -->
        <input type="submit" value="Definir Presupuesto">
    </form>
</template>

<style scoped>
/* Estilos para el formulario */
.presupuesto {
    width: 100%;
    color: var(--GrisAzul-600);
}

/* Estilos para la etiqueta del campo de entrada */
.presupuesto label {
    font-size: 2.8rem;
}

/* Estilos para el campo de entrada del presupuesto */
.presupuesto input[type="number"] {
    background-color: var(--GrisAzul-100);
    border-radius: 1rem;
    padding: 1.5rem;
    border: none;
    font-size: 2.2rem;
    text-align: center;
    width: 100%;
}

/* Estilos para el botón de envío del formulario */
.presupuesto input[type="submit"] {
    background-color: var(--GrisAzul-600);
    color: var(--GrisAzul-50);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2rem;
    margin-top: 2rem;
    text-align: center;
    font-weight: 900;
    width: 100%;
    transition: background-color 300ms ease;
}

/* Cambia el color de fondo del botón de envío cuando se pasa el ratón por encima */
.presupuesto input[type="submit"]:hover {
    background-color: var(--GrisAzul-400);
    cursor: pointer;
}

/* Estilos para la sección de campo */
.campo {
    display: grid;
    gap: 2rem;
}
</style>
