<script setup>
    import { defineEmits, defineProps, ref } from 'vue'

    import global_error from './gobal_error.vue'
    import iconoCerrar from '../assets/images/closeRed.svg'

    const error = ref('')
    const emit = defineEmits(['cerrar-ventana', 'guardar-gasto', 'update:nombre', 'update:cantidad', 'update:categoria'])

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
        }
    })

    const aggGasto = () => {
        const { nombre, cantidad, categoria} = props
        if([nombre, cantidad, categoria].includes('')) {
            error.value = "Todos los Campos son Obligatorios"

            setTimeout(() => {
                error.value = ''
            }, 3000)
        }

        if (cantidad <= 0) {
            error.value = "El gasto debe ser mayor a 0"

            setTimeout(() => {
                error.value = ''
            }, 3000)
        }
        emit('guardar-gasto')
    }


</script>

<template>
    <section class="ventana-emergente">
        <div class="cerrar-Ventana">
            <img :src="iconoCerrar" @click="emit('cerrar-ventana')">
        </div>

        <div class="contenedor">
            <form class="contenedor-formulario" @submit.prevent="aggGasto">

                <legend>Agregar Gasto</legend>

                <global_error v-if="error">{{ error }}</global_error>

                <div class="Campo">
                    <label for="Nombre">Nombre Gasto: </label>
                    <input id="nombreGasto" type="text" placeholder="Agrega el nombre del gasto" :value="props.nombre" @input="emit('update:nombre', $event.target.value)">
                </div>

                <div class="Campo">
                    <label for="cantidad">Monto del Gasto: </label>
                    <input id="cantidadGasto" type="number" placeholder="Agrega el monto del gasto" :value="props.cantidad"  @input="emit('update:cantidad', +$event.target.value)">
                </div>

                <div class="Campo">
                    <label for="categoria">Categoria: </label>
                    <select id="categoria" :value="props.categoria"  @input="emit('update:categoria', $event.target.value)">
                        <option value="">*** Seleccione ***</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Gastos de Casa</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                        <option value="otros">Gastos Varios</option>
                    </select>
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