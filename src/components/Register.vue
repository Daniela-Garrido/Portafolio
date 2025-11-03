<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

// Variables reactivas para el formulario
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const visible = ref(false);
const confirmVisible = ref(false);

// Variables auxiliares para la UI
const success = ref(null);
const localError = ref(null);

// Función principal de Registro
const handleRegister = async () => {
  // Limpiar estados locales
  localError.value = null;
  success.value = null;

  // Validar que las contraseñas coincidan
  if (password.value !== confirmPassword.value) {
    localError.value = 'Las contraseñas no coinciden';
    return;
  }

  // Registrar usuario
  const result = await authStore.registerUser(email.value, password.value);

  // Si la promesa devuelve éxito (sin Firebase error)
  if (result && result.success) {
    success.value = '¡Cuenta creada exitosamente! Redirigiendo...';

    // Esperar 2 segundos y redirigir
    setTimeout(() => {
      router.push({ name: 'login' });
    }, 2000);
  }
};
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="5" xl="4">

        <!-- Card del formulario -->
        <v-card class="mx-auto pa-8 pb-6" elevation="8" rounded="lg">
          <div class="text-center mb-8">
            <img src="/public//a.svg" alt="" style="width: 50px;" />
            <h1 class="text-h4 font-weight-bold text-success mb-2">
              Crear Cuenta
            </h1>
            <p class="text-medium-emphasis">
              Regístrate para comenzar
            </p>
          </div>
          <v-form @submit.prevent="handleRegister">
            <!-- Email -->
            <div class="text-subtitle-1 text-medium-emphasis mb-2">Correo electrónico</div>
            <v-text-field v-model="email" density="compact" placeholder="tu@email.com"
              prepend-inner-icon="mdi-email-outline" variant="outlined" type="email" required autocomplete="email"
              class="mb-4"></v-text-field>

            <!-- Contraseña -->
            <div class="text-subtitle-1 text-medium-emphasis mb-2">Contraseña</div>
            <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'" density="compact" placeholder="Mínimo 6 caracteres"
              prepend-inner-icon="mdi-lock-outline" variant="outlined" required minlength="6"
              autocomplete="new-password" @click:append-inner="visible = !visible" class="mb-2"></v-text-field>
            <div class="text-caption text-medium-emphasis mb-4">
              La contraseña debe tener al menos 6 caracteres
            </div>

            <!-- Confirmar Contraseña -->
            <div class="text-subtitle-1 text-medium-emphasis mb-2">Confirmar Contraseña</div>
            <v-text-field v-model="confirmPassword" :append-inner-icon="confirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="confirmVisible ? 'text' : 'password'" density="compact" placeholder="Confirma tu contraseña"
              prepend-inner-icon="mdi-lock-check-outline" variant="outlined" required autocomplete="new-password"
              @click:append-inner="confirmVisible = !confirmVisible" class="mb-4"></v-text-field>

            <!-- Error Alert -->
            <v-alert v-if="localError || authStore.error" type="error" variant="tonal" class="mb-4">
              <div class="d-flex align-center">
                <v-icon icon="mdi-alert-circle-outline" class="me-2"></v-icon>
                <span>{{ localError || authStore.error }}</span>
              </div>
            </v-alert>

            <!-- Success Alert -->
            <v-alert v-if="success" type="success" variant="tonal" class="mb-4">
              <div class="d-flex align-center">
                <v-icon icon="mdi-check-circle-outline" class="me-2"></v-icon>
                <span>{{ success }}</span>
              </div>
            </v-alert>

            <!-- Botón Registro -->
            <v-btn type="submit" color="success" size="large" variant="flat" block class="mb-4"
              :loading="authStore.loading" :disabled="authStore.loading">
              <template v-slot:loader>
                <v-progress-circular indeterminate size="20" width="2" class="me-2"></v-progress-circular>
                Creando cuenta...
              </template>
              <v-icon icon="mdi-account-plus" start></v-icon>
              Crear Cuenta
            </v-btn>

            <!-- Link a Login -->
            <v-card-text class="text-center pt-0">
              <span class="text-medium-emphasis">
                ¿Ya tienes cuenta?
                <router-link to="/login" class="text-success text-decoration-none font-weight-bold">
                  Inicia Sesión
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

/* Estilos para los enlaces del router */
.text-success {
  color: rgb(var(--v-theme-success)) !important;
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