<!-- control_disponible.vue -->

<script setup>
import { defineProps, computed, defineEmits } from 'vue'
import CircleProgress from 'vue3-circle-progress-bar'
import 'vue3-circle-progress-bar/dist/circle-progress-bar.css'
import { formatoDinero } from '../Funtions'

const emit = defineEmits(['reset-App'])
// Definición de propiedades
// Estas propiedades permiten al componente recibir datos del componente padre.
const props = defineProps({
    // 'presupuestoGeneral': El presupuesto total disponible.
    presupuestoGeneral: {
        type: Number,
        required: true
    },
    // 'disponible': La cantidad de dinero aún disponible.
    disponible: {
        type: Number,
        required: true
    },
    // 'gastado': La cantidad de dinero ya gastada.
    gastado: {
        type: Number,
        required: true
    }
})

// Propiedad computada para calcular el porcentaje de presupuesto gastado
const porcentaje = computed(() => {
    return parseInt(((props.presupuestoGeneral - props.disponible) / props.presupuestoGeneral) * 100)
})
</script>

<template>
    <section class="dos-columnas">
        <!-- Contenedor del gráfico circular -->
        <div class="contenedor-grafico">
            <!-- Componente gráfico para mostrar el porcentaje del presupuesto gastado -->
            <CircleProgress :size="200" :percent="porcentaje" :border-width="20" :border-bg-width="20" :transition=300
                fill-color="#3c3f50" empty-color="#b2b6c7" :show-percent="true" />
        </div>

        <!-- Contenedor del presupuesto -->
        <div class="contenedor-presupuesto">
            <p>
                <span>Presupuesto: </span>
                <!-- Formatea y muestra el presupuesto total -->
                {{ formatoDinero(props.presupuestoGeneral) }}
            </p>
            <p>
                <span>Disponible: </span>
                <!-- Formatea y muestra la cantidad disponible -->
                {{ formatoDinero(props.disponible) }}
            </p>
            <p>
                <span>Gastado: </span>
                <!-- Formatea y muestra la cantidad gastada -->
                {{ formatoDinero(props.gastado) }}
            </p>
            <!-- Botón para resetear la aplicación -->
            <button class="ResetApp" type="button" @click="emit('reset-App')"> Resetear App </button> 
        </div>
    </section>
</template>

<style scoped>
/* Estilos para la disposición en dos columnas */
.dos-columnas {
    display: flex;
    flex-direction: column;
}

/* Margen inferior para el primer hijo dentro de '.dos-columnas' */
.dos-columnas :first-child {
    margin-bottom: 2rem;
}

/* Media query para pantallas más grandes */
@media (min-width: 768px) {
    .dos-columnas {
        flex-direction: row;
        gap: 4rem;
        align-items: center;
    }
    .dos-columnas :first-child {
        margin-bottom: 0.5rem;
    }
}

/* Estilos para el botón de reset */
.ResetApp {
    background-color: var(--GrisAzul-950);
    color: var(--GrisAzul-50);
    font-weight: 900;
    border: none;
    padding: 1rem;
    border-radius: 1rem;
    width: 100%;
}

/* Cambia el color de fondo del botón de reset cuando se pasa el ratón por encima */
.ResetApp:hover {
    cursor: pointer;
    background-color: var(--GrisAzul-700);
}

/* Estilos para el contenedor del presupuesto */
.contenedor-presupuesto {
    width: 100%;
}

/* Estilos para el contenedor del gráfico */
.contenedor-grafico {
    width: 100%;
}

/* Estilos para los párrafos dentro del contenedor del presupuesto */
.contenedor-presupuesto p {
    font-size: 2.4rem;
    text-align: center;
    color: var(--GrisAzul-300);
}

/* Media query para cambiar la alineación del texto en pantallas más grandes */
@media (min-width: 768px) {
    .contenedor-presupuesto p {
        text-align: left;
    }
}

/* Estilos para el texto en negrita dentro de los párrafos */
.contenedor-presupuesto span {
    font-weight: 900;
    color: var(--GrisAzul-600);
}
</style>
