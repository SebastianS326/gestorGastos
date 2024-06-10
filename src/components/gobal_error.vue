<template>
    <!-- Contenedor principal de la alerta -->
    <div class="alerta">
        <!-- Slot para contenido personalizado -->
        <slot></slot>
    </div>
</template>

<style scoped>
/* Clase para estilizar el contenedor de la alerta */
.alerta {
    /* Espaciado interno del contenedor */
    padding: 1rem;
    /* Peso de fuente negrita para el texto */
    font-weight: 900;
    /* Transformar texto a mayúsculas */
    text-transform: uppercase;
    /* Tamaño de la fuente */
    font-size: 1.8rem;
    /* Alineación centrada del texto */
    text-align: center;
    /* Color de fondo del contenedor */
    background-color: var(--GrisAzul-50);
    /* Borde izquierdo rojo para resaltar la alerta */
    border-left: 0.5rem solid #B91C1C;
    /* Color del texto */
    color: #B91C1C;
}
</style>
