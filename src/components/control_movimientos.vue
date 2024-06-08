<script setup>
    import { defineProps } from 'vue'
    import { formatoDinero, formatoFecha } from '../Funtions'

    const props = defineProps({
        gasto: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div class="movimiento sombra">
        <section class="contenido">
            <div>
                <p> <span>Concepto: </span> {{ props.gasto.nombre }} </p>
                <p> <span>Categoria: </span> {{ props.gasto.categoria }} </p>
                <p> <span>Fecha: </span> {{ formatoFecha(props.gasto.fecha) }} </p>
                <p> <span>Valor: </span> {{ formatoDinero(props.gasto.cantidad) }} </p>
            </div>

        </section>
        
    </div>
</template>

<style scoped>
    .contenido p span {
        font-size: 2rem;
        font-weight: 900;
        color: var(--GrisAzul-700);
    }

    .contenido p {
        font-size: 1.8rem;
        font-weight: 500;
        color: var(--GrisAzul-500);
    }
</style>