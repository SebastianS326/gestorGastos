<script setup>

</script>


<template>
    <form class="presupuesto">
        <section class="campo">
            <label for="">Definir Presupuesto</label>
            <input id="nuevo-presupuesto" class="nuevo-presupuesto"  type="number" placeholder="Agrega tu Presupuesto">
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