<script setup>
    import { defineEmits } from 'vue'
    import iconoCerrar from '../assets/images/closeRed.svg'

    const emit = defineEmits(['cerrar-ventana'])
</script>

<template>
    <section class="ventana-emergente">
        <div class="cerrar-Ventana">
            <img :src="iconoCerrar" @click="emit('cerrar-ventana')">
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
</style>