<template>

    <div class="alerta">

        <slot></slot>

    </div>
    
</template>

<style scoped>
    .alerta {
        padding: 1rem;
        font-weight: 900;
        text-transform: uppercase;
        font-size: 1.8 rem;
        text-align: center;
        background-color: var(--GrisAzul-50);
        border-left: 0.5rem solid #B91C1C;
        color: #B91C1C;
    }
</style>
