<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '../stores/notification';

const notificationStore = useNotificationStore();
const { type, message, isVisible } = storeToRefs(notificationStore);

// Determina las clases de color del Toast
const toastClass = computed(() => {
    switch (type.value) {
        case 'success':
            return 'bg-success text-white';
        case 'error':
            return 'bg-danger text-white';
        case 'info':
            return 'bg-info text-white';
        default:
            return 'bg-secondary text-white';
    }
});

// Determina el ícono a mostrar
const iconClass = computed(() => {
    switch (type.value) {
        case 'success':
            return 'bi bi-check-circle-fill';
        case 'error':
            return 'bi bi-x-octagon-fill';
        case 'info':
            return 'bi bi-info-circle-fill';
        default:
            return 'bi bi-bell-fill';
    }
});

</script>

<template>
    <v-snackbar v-model="isVisible" :color="toastClass" :timeout="3000" location="top end" multi-line>
        <div class="d-flex align-center">
            <v-icon :icon="iconClass" class="me-2"></v-icon>
            <span class="fw-semibold">{{ message }}</span>
        </div>

        <template v-slot:actions>
            <v-btn icon variant="text" @click="notificationStore.hideNotification()">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<style scoped>
/* Asegura que el toast siempre esté en la parte superior del resto del contenido */
.toast-container {
    z-index: 2000;
}
</style>