<script setup>
    import { ref } from 'vue'
    import global_error from './gobal_error.vue'

    const presupuesto = ref(0)
    const error = ref('')

    const definirPresupuesto = () => {
        if (presupuesto.value <= 0) {
            error.value = 'El presupuesto debe ser mayor a 0'

            setTimeout(() => {
                error.value = ''
            }, 3000)
        }
    }

</script>


<template>
    <form class="presupuesto" @submit.prevent="definirPresupuesto">

        <global_error v-if="error">
            {{ error }}
        </global_error>

        <section class="campo">

            <label for="">Definir Presupuesto</label>

            <input id="nuevo-presupuesto" 
                class="nuevo-presupuesto"  
                type="number"
                min="0" 
                placeholder="Agrega tu Presupuesto"
                v-model.number="presupuesto"
            />

        </section>

        
        <input type="submit" value="Definir Presupuesto">

    </form>
</template>


<style scoped>
    .presupuesto {
        width: 100%;
        color: var(--GrisAzul-600);
    }
    
    .presupuesto label {
        font-size: 2.8rem;
    }
    .presupuesto input[type="number"] {
        background-color: var(--GrisAzul-100);
        border-radius: 1rem ;
        padding: 1.5rem;
        border: none;
        font-size: 2.2rem;
        text-align: center;
    }

    .presupuesto input[type="submit"] {
        background-color: var(--GrisAzul-600);
        color: var(--GrisAzul-50);
        border-radius: 1rem ;
        padding: 1rem;
        border: none;
        font-size: 2rem;
        margin-top: 2rem;
        text-align: center;
        font-weight: 900;
        width: 100%;
        transition: background-color 300ms ease;
    }

    .presupuesto input[type="submit"]:hover {
        background-color: var(--GrisAzul-400);
        cursor: pointer;
    }

    .campo {
        display: grid;
        gap: 2rem;
    }
</style>