<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const { user, isAuthenticated, isAdmin } = storeToRefs(authStore);

const props = defineProps({
    userName: {
        type: String,
        required: true,
    }
});

const emit = defineEmits(['logout']);

const isInHomeView = computed(() => route.name === 'home');
const isInAdminView = computed(() => route.name === 'admin');

const goToAdmin = () => {
    router.push({ name: 'admin' });
};

const goToHome = () => {
    router.push({ name: 'home' });
};

const goToLogin = () => {
    router.push({ name: 'login' });
};

const goToSobreMi = () => {
    router.push({ name: 'sobreMi' });
};

// Lógica de Cierre de Sesión actualizada
const handleLogout = async () => {
    await authStore.logoutUser();
    // Redirigir a SobreMi después del logout
    router.push({ name: 'sobreMi' });
};
</script>

<template>
    <v-app-bar color="secondary" elevation="2" class="header-gradient">
        <img src="/public//b.svg" alt="" style="width: 80px; margin-left: 20px;">
        <!-- Logo/Título -->
        <v-app-bar-title class="d-flex align-center">
            <span class="text-h6 font-weight-bold text-white d-none d-sm-flex">DG Studio Academy</span>
            <span class="text-h6 font-weight-bold text-white d-sm-none">DG Academy</span>
        </v-app-bar-title>

        <!-- Menú de navegación -->
        <template #append>
            <div class="d-flex align-center" style="gap: 8px">
                <!-- Si NO está autenticado -->
                <template v-if="!isAuthenticated">
                    <!-- Botón Ingresar -->
                    <v-btn @click="goToLogin" color="white" variant="outlined" size="small">
                        <v-icon icon="mdi-login" start class="d-none d-sm-inline"></v-icon>
                        <span class="d-none d-sm-inline">Ingresar</span>
                        <v-icon icon="mdi-login" class="d-sm-none"></v-icon>
                    </v-btn>
                </template>

                <!-- Si ESTÁ autenticado -->
                <template v-else>
                    <!-- Navegación para Admin -->
                    <v-btn v-if="isAdmin && isInAdminView" @click="goToHome" color="info" variant="flat" size="small"
                        class="d-none d-md-flex">
                        <v-icon icon="mdi-eye" start></v-icon>
                        <span class="d-none d-lg-inline">Home</span>
                        <span class="d-lg-none">Home</span>
                    </v-btn>

                    <v-btn v-if="isAdmin && !isInAdminView" @click="goToAdmin" color="warning" variant="flat"
                        size="small" class="d-none d-md-flex">
                        <v-icon icon="mdi-cog" start></v-icon>
                        <span class="d-none d-lg-inline">Admin</span>
                        <span class="d-lg-none">Admin</span>
                    </v-btn>

                    <!-- Saludo al usuario -->
                    <span class="text-caption text-white d-none d-md-inline me-2">
                        Hola, <span class="font-weight-bold text-warning">{{ userName }}</span>
                    </span>

                    <!-- Botones para móvil (solo íconos) -->
                    <v-btn v-if="isAdmin && isInAdminView" @click="goToHome" color="info" variant="text" size="small"
                        icon class="d-md-none">
                        <v-icon icon="mdi-eye"></v-icon>
                    </v-btn>

                    <v-btn v-if="isAdmin && !isInAdminView" @click="goToAdmin" color="warning" variant="text"
                        size="small" icon class="d-md-none">
                        <v-icon icon="mdi-cog"></v-icon>
                    </v-btn>

                    <!-- Botón de cerrar sesión -->
                    <v-btn @click="handleLogout" color="error" variant="flat" size="small">
                        <v-icon icon="mdi-logout" start class="d-none d-sm-inline"></v-icon>
                        <span class="d-none d-sm-inline">Salir</span>
                        <v-icon icon="mdi-logout" class="d-sm-none"></v-icon>
                    </v-btn>
                </template>
            </div>
        </template>
    </v-app-bar>
</template>

<style scoped>
.v-btn {
    min-height: 40px;
}

/* Mejorar la apariencia en móviles */
@media (max-width: 600px) {
    .v-app-bar-title {
        font-size: 1rem !important;
    }

    .v-btn {
        min-width: auto !important;
    }
}

/* Transiciones suaves */
.v-btn {
    transition: all 0.2s ease;
}

.v-btn:hover {
    transform: translateY(-1px);
}

/* Espaciado entre botones */
.d-flex.align-center {
    gap: 8px;
}
</style>