<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";
import { useCursoStore } from "../stores/curso";
import { useNotificationStore } from '../stores/notification';
import Header from "../components/Header.vue";

// 1. Inicialización de Stores y Router
const authStore = useAuthStore();
const cursoStore = useCursoStore();
const notificationStore = useNotificationStore();
const router = useRouter();
const route = useRoute();

// 2. Reactividad
const { user } = storeToRefs(authStore);
const { cursosDisponibles, loadingCourses } = storeToRefs(cursoStore);

// 3. Estado Local del Formulario
const courseData = ref(null);
const isLoadingData = ref(true);

// 4. Obtener y cargar el curso
const courseId = route.params.id;

// Computed para validar si el formulario es válido
const isFormValid = computed(() => {
  if (!courseData.value) return false;
  return courseData.value.codigo && 
         courseData.value.nombre && 
         courseData.value.precio >= 0 && 
         courseData.value.duracion && 
         courseData.value.descripcion && 
         courseData.value.img && 
         courseData.value.estado !== null;
});

onMounted(() => {
  cursoStore.iniciarListenerCursos();
});

// Watcher para cargar los datos del curso
watch(
  [cursosDisponibles, loadingCourses],
  ([newCursos, newLoading]) => {
    if (!newLoading && newCursos.length > 0 && courseData.value === null) {
      const course = newCursos.find(c => c.id === courseId);

      if (course) {
        courseData.value = { ...course };
        isLoadingData.value = false;
      } else {
        notificationStore.showNotification({
          type: 'error',
          message: `❌ Curso con ID ${courseId} no encontrado.`
        });
        router.push({ name: 'admin' });
      }
    }
  }, { immediate: true }
);

// 5. Lógica del Header
const userNameDisplay = computed(() => {
  return user.value && user.value.email ? user.value.email.split("@")[0] : "Admin";
});

const handleLogout = async () => {
  await authStore.logoutUser();
  router.push({ name: "login" });
};

// Modal de confirmación
const isConfirmModalOpen = ref(false);
const pendingUpdate = ref(null);

const openConfirmModal = () => {
  isConfirmModalOpen.value = true;
};

const closeConfirmModal = () => {
  isConfirmModalOpen.value = false;
};

const confirmUpdateCourse = async () => {
  closeConfirmModal();
  await updateCourseConfirmed();
};

// 6. Lógica de Edición (CRUD)
const handleUpdateCourse = async () => {
  if (!courseData.value || !courseId) return;

  // Validación básica
  if (!isFormValid.value) {
    notificationStore.showNotification({
      type: 'error',
      message: "⚠️ Por favor, complete todos los campos requeridos."
    });
    return;
  }

  pendingUpdate.value = { ...courseData.value };
  openConfirmModal();
};

const updateCourseConfirmed = async () => {
  const { id, ...dataToUpdate } = courseData.value;

  const result = await cursoStore.actualizarCurso(courseId, dataToUpdate);

  if (result.success) {
    notificationStore.showNotification({
      type: 'success',
      message: `✅ Curso '${courseData.value.nombre}' actualizado con éxito.`
    });
    router.push({ name: 'admin' });
  } else {
    notificationStore.showNotification({
      type: 'error',
      message: '❌ Error al actualizar el curso.'
    });
  }
};

// 7. Navegación
const goBack = () => {
  router.push({ name: 'admin' });
};
</script>

<template>
  <v-app>
    <Header :user-name="userNameDisplay" @logout="handleLogout" />
    
    <v-main>
      <v-container class="edit-view-wrapper" fluid>
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6" xl="5">
            <!-- Header más compacto -->
            <div class="text-center mb-4">
              <v-icon 
                icon="mdi-pencil" 
                size="48" 
                color="primary" 
                class="mb-2"
              ></v-icon>
              <h1 class="text-h4 font-weight-bold text-primary mb-2">
                Editar Curso
              </h1>
              <p class="text-medium-emphasis">
                Modifica la información del curso
              </p>
            </div>

            <!-- Estado de Carga más compacto -->
            <v-card v-if="isLoadingData || courseData === null" class="text-center pa-6 mb-4">
              <v-progress-circular
                indeterminate
                color="primary"
                size="48"
                width="3"
                class="mb-3"
              ></v-progress-circular>
              <p class="text-body-2 text-medium-emphasis">
                Cargando datos del curso...
              </p>
            </v-card>

            <!-- Formulario de Edición más compacto -->
            <v-card
              v-else
              class="mx-auto"
              elevation="4"
              rounded="lg"
            >
              <!-- Header de la card más compacto -->
              <v-toolbar color="grey-darken-3" density="compact">
                <v-toolbar-title class="text-white text-subtitle-1 font-weight-bold">
                  <v-icon icon="mdi-book-edit" class="me-2" size="20"></v-icon>
                  Editando: {{ courseData.nombre }}
                </v-toolbar-title>
              </v-toolbar>

              <v-form @submit.prevent="handleUpdateCourse">
                <v-card-text class="pa-4">
                  <v-row>
                    <!-- Código -->
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="courseData.codigo"
                        label="Código *"
                        variant="outlined"
                        density="compact"
                        required
                        :rules="[v => !!v || 'El código es requerido']"
                      ></v-text-field>
                    </v-col>

                    <!-- Nombre -->
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="courseData.nombre"
                        label="Nombre *"
                        variant="outlined"
                        density="compact"
                        required
                        :rules="[v => !!v || 'El nombre es requerido']"
                      ></v-text-field>
                    </v-col>

                    <!-- URL de Imagen -->
                    <v-col cols="12">
                      <v-text-field
                        v-model="courseData.img"
                        label="URL de la Imagen del Curso *"
                        placeholder="https://..."
                        variant="outlined"
                        density="compact"
                        type="url"
                        required
                        :rules="[v => !!v || 'La URL de la imagen es requerida']"
                      ></v-text-field>
                      
                      <!-- Vista previa de imagen más pequeña -->
                      <div class="mt-2 text-center" v-if="courseData.img">
                        <v-img
                          :src="courseData.img"
                          alt="Vista previa"
                          max-height="80"
                          contain
                          class="rounded"
                        ></v-img>
                        <p class="text-caption text-medium-emphasis mt-1">
                          Vista previa de la imagen
                        </p>
                      </div>
                    </v-col>

                    <!-- Duración -->
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="courseData.duracion"
                        label="Duración *"
                        variant="outlined"
                        density="compact"
                        required
                        :rules="[v => !!v || 'La duración es requerida']"
                      ></v-text-field>
                    </v-col>

                    <!-- Precio -->
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model.number="courseData.precio"
                        label="Costo ($) *"
                        variant="outlined"
                        density="compact"
                        type="number"
                        min="0"
                        required
                        :rules="[
                          v => v >= 0 || 'El precio debe ser mayor o igual a 0',
                          v => !!v || 'El precio es requerido'
                        ]"
                      ></v-text-field>
                    </v-col>

                    <!-- Descripción -->
                    <v-col cols="12">
                      <v-textarea
                        v-model="courseData.descripcion"
                        label="Descripción *"
                        variant="outlined"
                        density="compact"
                        rows="3"
                        required
                        :rules="[v => !!v || 'La descripción es requerida']"
                      ></v-textarea>
                    </v-col>

                    <!-- Estado del Curso -->
                    <v-col cols="12">
                      <v-radio-group 
                        v-model="courseData.estado" 
                        label="Estado del Curso *"
                        :rules="[v => v !== null || 'El estado es requerido']"
                        required
                        density="compact"
                      >
                        <v-radio
                          label="Curso Activo / Disponible"
                          :value="true"
                          color="success"
                        ></v-radio>
                        <v-radio
                          label="Curso Cerrado / No disponible"
                          :value="false"
                          color="error"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-card-text>

                <!-- Botones de Acción más compactos -->
                <v-card-actions class="pa-3">
                  <v-btn
                    color="secondary"
                    variant="text"
                    @click="goBack"
                    size="small"
                    class="me-2"
                  >
                    <v-icon icon="mdi-arrow-left" start size="18"></v-icon>
                    Volver
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    type="submit"
                    color="success"
                    variant="flat"
                    size="small"
                    :disabled="!isFormValid"
                  >
                    <v-icon icon="mdi-content-save" start size="18"></v-icon>
                    Guardar Cambios
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>

        <!-- MODAL DE CONFIRMACIÓN más compacto -->
        <v-dialog
          v-model="isConfirmModalOpen"
          max-width="400"
          persistent
        >
          <v-card>
            <v-card-title class="text-h6 pa-4">
              Confirmar actualización
            </v-card-title>
            <v-card-text class="pa-4">
              <p class="text-body-2">¿Deseas guardar los cambios en el curso <strong>{{ pendingUpdate?.nombre }}</strong>?</p>
            </v-card-text>
            <v-card-actions class="pa-3">
              <v-spacer></v-spacer>
              <v-btn
                color="secondary"
                variant="text"
                @click="closeConfirmModal"
                size="small"
                class="me-2"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="success"
                variant="flat"
                @click="confirmUpdateCourse"
                size="small"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.edit-view-wrapper {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  padding: 1rem;
  padding-top: 0;
}

.v-main {
  padding-top: 0 !important;
}

/* Estilos para mejorar la apariencia */
.text-white {
  color: white !important;
}

/* Espaciado más compacto */
@media (max-width: 960px) {
  .edit-view-wrapper {
    padding: 0.5rem;
  }
}

/* Mejorar la apariencia de los campos */
.v-text-field, .v-textarea {
  margin-bottom: 4px;
}

/* Ajustes para móviles */
@media (max-width: 600px) {
  .edit-view-wrapper {
    padding: 0.25rem;
  }
  
  .text-h4 {
    font-size: 1.5rem !important;
  }
  
  .v-card {
    margin: 0.25rem;
  }
}

/* Mejorar el formulario en pantallas pequeñas */
@media (max-width: 960px) {
  .v-col {
    padding: 0.5rem;
  }
}

/* Asegurar que los botones sean táctiles en móviles */
@media (max-width: 768px) {
  .v-btn {
    min-height: 44px;
  }
}

/* Mejorar la visualización de los radio buttons en móviles */
@media (max-width: 600px) {
  .v-radio-group .v-radio {
    margin-bottom: 0.5rem;
  }
}

/* Ajustes específicos para tablets */
@media (max-width: 1264px) and (min-width: 960px) {
  .edit-view-wrapper {
    padding: 1.5rem;
  }
}

/* Mejorar la vista previa de imagen */
.v-img.rounded {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

/* Efectos hover suaves */
.v-btn {
  transition: all 0.2s ease;
}

.v-btn:hover {
  transform: translateY(-1px);
}

/* Ajustar el espaciado superior para el header */
.v-main {
  margin-top: 64px; /* Altura del header */
}

@media (max-width: 600px) {
  .v-main {
    margin-top: 56px; /* Altura del header en móviles */
  }
}
</style>