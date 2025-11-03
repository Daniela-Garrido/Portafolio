<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

// 1. Inicializar Store
const authStore = useAuthStore();
const router = useRouter();

// 2. Desestructurar propiedades reactivas del Store usando storeToRefs
const { error, loading, user } = storeToRefs(authStore);

// 3. Variables reactivas para el formulario
const email = ref('');
const password = ref('');
const visible = ref(false);

// 4. Función principal de Login
const handleLogin = async () => {
  // 4.1. Limpiar error previo
  authStore.error = null;

  // 4.2. Llamar a la acción del Store
  await authStore.loginUser(email.value, password.value);

  // 4.3. LÓGICA DE REDIRECCIÓN
  if (!error.value && user.value) {
    router.push({ name: 'home' });
  }
};
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">

        <!-- Card del formulario -->
        <v-card class="mx-auto pa-8 pb-6" elevation="8" rounded="lg">
          <!-- Logo/Header -->
          <div class="text-center mb-8">
            <img src="/public//b.svg" alt="" style="width: 60px;" />
            <h1 class="text-h4 font-weight-bold text-primary mb-2">
              DG Studio Academy
            </h1>
            <p class="text-medium-emphasis">
              Inicia sesión para continuar
            </p>
          </div>
          <v-form @submit.prevent="handleLogin">
            <!-- Email -->
            <div class="text-subtitle-1 text-medium-emphasis mb-2">Correo electrónico</div>
            <v-text-field v-model="email" density="compact" placeholder="usuario@ejemplo.com"
              prepend-inner-icon="mdi-email-outline" variant="outlined" type="email" required
              autocomplete="email"></v-text-field>

            <!-- Contraseña -->
            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between mb-2">
              Contraseña
            </div>
            <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'" density="compact" placeholder="••••••••"
              prepend-inner-icon="mdi-lock-outline" variant="outlined" required autocomplete="current-password"
              @click:append-inner="visible = !visible"></v-text-field>

            <!-- Error Alert -->
            <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
              <div class="d-flex align-center">
                <v-icon icon="mdi-alert-circle-outline" class="me-2"></v-icon>
                <span>{{ error }}</span>
              </div>
            </v-alert>

            <!-- Botón Login -->
            <v-btn type="submit" color="primary" size="large" variant="flat" block class="mb-4" :loading="loading"
              :disabled="loading">
              <template v-slot:loader>
                <v-progress-circular indeterminate size="20" width="2" class="me-2"></v-progress-circular>
                Iniciando sesión...
              </template>
              <v-icon icon="mdi-login" start></v-icon>
              Iniciar Sesión
            </v-btn>

            <!-- Link a Registro -->
            <v-card-text class="text-center pt-0">
              <span class="text-medium-emphasis">
                ¿No tienes cuenta?
                <router-link to="/register" class="text-primary text-decoration-none font-weight-bold">
                  Regístrate aquí
                </router-link>
              </span>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.fill-height {
  min-height: 100vh;
  background: linear-gradient(135deg, #210169 0%, #4f0556 100%);
}

/* Estilos para el enlace del router */
.text-primary {
  color: rgb(var(--v-theme-primary)) !important;
}

/* Asegurar que el contenedor ocupe toda la altura */
.v-container {
  padding: 0;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .v-card {
    margin: 1rem;
    padding: 1.5rem !important;
  }

  .text-h4 {
    font-size: 1.5rem !important;
  }
}

/* Animación suave para la card */
.v-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-card:hover {
  transform: translateY(-2px);
}
</style>