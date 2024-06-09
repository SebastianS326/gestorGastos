<script setup>
import { defineProps, computed } from 'vue'
import CircleProgress from 'vue3-circle-progress-bar'
import 'vue3-circle-progress-bar/dist/circle-progress-bar.css'
import { formatoDinero } from '../Funtions'

const props = defineProps({
    presupuestoGeneral: {
        type: Number,
        required: true
    },
    disponible: {
        type: Number,
        required: true
    },
    gastado: {
        type: Number,
        required: true
    }

})

const porcentaje = computed(() => {
    return parseInt(((props.presupuestoGeneral - props.disponible) / props.presupuestoGeneral) * 100)
})

</script>

<template>
    <section class="dos-columnas">

        <div class="contenedor-grafico">
            <CircleProgress :size="200" :percent="porcentaje" :border-width="20" :border-bg-width="20" :transition=300
                fill-color="#3c3f50" empty-color="#b2b6c7" :show-percent="true" />
        </div>

        <div class="contenedor-presupuesto">

            <p>
                <span>Presupuesto: </span>
                {{ formatoDinero(props.presupuestoGeneral) }}
            </p>

            <p>
                <span>Disponible: </span>
                {{ formatoDinero(props.disponible) }}
            </p>

            <p>
                <span>Gastado: </span>
                {{ formatoDinero(props.gastado) }}
            </p>

            <button class="ResetApp"> Resetear App </button>
        </div>

    </section>
</template>

<style scoped>
.dos-columnas {
    display: flex;
    flex-direction: column;

}

.dos-columnas :first-child {
    margin-bottom: 2rem;
}

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

.ResetApp {
    background-color: var(--GrisAzul-950);
    color: var(--GrisAzul-50);
    font-weight: 900;
    border: none;
    padding: 1rem;
    border-radius: 1rem;
    width: 100%;
}

.ResetApp:hover {
    cursor: pointer;
    background-color: var(--GrisAzul-700);
}

.contenedor-presupuesto {
    width: 100%;

}

.contenedor-grafico {
    width: 100%;
}

.contenedor-presupuesto p {
    font-size: 2.4rem;
    text-align: center;
    color: var(--GrisAzul-300);
}

@media (min-width: 768px) {
    .contenedor-presupuesto p {
        text-align: left;
    }
}

.contenedor-presupuesto span {
    font-weight: 900;
    color: var(--GrisAzul-600);
}
</style>