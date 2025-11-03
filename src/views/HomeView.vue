<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";
import Header from "../components/Header.vue";
import { useCursoStore } from "../stores/curso";
import CursosCosmetologia from "../components/CursosCosmetologia.vue";

// 1. Inicialización y Reactividad
const authStore = useAuthStore();
const cursoStore = useCursoStore();
const router = useRouter();

// 2. Reactividad de auth y cursos
const { user, isAuthenticated } = storeToRefs(authStore);
const { cursosDisponibles, loadingCourses } = storeToRefs(cursoStore);

// 3. Lógica del header: Nombre de usuario
const userNameDisplay = computed(() => {
  return user.value && user.value.email
    ? user.value.email.split("@")[0]
    : "Invitado";
});

// 4. Lógica de Cierre de Sesión
const handleLogout = async () => {
  await authStore.logoutUser();
  if (!isAuthenticated.value) {
    router.push({ name: "login" });
  }
};

// 5. Estado para el diálogo de detalles
const selectedCourse = ref(null);
const showCourseDetails = ref(false);

// Función para abrir detalles del curso
const openCourseDetails = (course) => {
  selectedCourse.value = course;
  showCourseDetails.value = true;
};

// 6. Carga de cursos
onMounted(() => {
  cursoStore.iniciarListenerCursos();
});

// 7. Limpieza al desmontar
onUnmounted(() => {
  cursoStore.detenerListenerCursos();
});
</script>

<template>
  <v-app>
    <Header :user-name="userNameDisplay" @logout="handleLogout" />
    <v-main>
      <CursosCosmetologia />
      <v-container class="home-view-wrapper mt-15" fluid>
        <v-row justify="center">
          <v-col cols="12" class="text-center pa-6 mt-6">
            <h2 class="text-h3 font-weight-bold text-primary mb-4">
              Descubre nuestros Cursos de Pago
            </h2>
          </v-col>

          <!-- Estado de carga -->
          <v-col v-if="loadingCourses" cols="12" class="text-center py-12">
            <v-progress-circular indeterminate color="primary" size="64" width="4" class="mb-4"></v-progress-circular>
            <p class="text-body-1 text-medium-emphasis">Cargando cursos...</p>
          </v-col>

          <!-- Grid de cursos -->
          <v-col v-else-if="cursosDisponibles.length > 0" cols="12">
            <v-row class="px-2">
              <v-col v-for="course in cursosDisponibles" :key="course.id" cols="12" sm="6" md="4" lg="3">
                <v-card class="course-card mx-auto" elevation="2" rounded="lg" max-width="300">
                  <!-- Imagen del curso -->
                  <v-img :src="course.img" :alt="course.nombre" height="160" cover class="bg-surface"></v-img>

                  <!-- Contenido de la card -->
                  <v-card-item>
                    <v-card-title class="text-h6 font-weight-bold text-primary">
                      {{ course.nombre }}
                    </v-card-title>
                    <v-card-subtitle class="text-caption">
                      Código: {{ course.codigo }}
                    </v-card-subtitle>
                  </v-card-item>

                  <v-card-text class="pt-0">
                    <!-- Descripción limitada a 2 líneas -->
                    <div class="description-container mb-3">
                      <p class="text-body-2 text-medium-emphasis line-clamp-2">
                        {{ course.descripcion }}
                      </p>
                    </div>

                    <!-- Estado del curso -->
                    <v-chip :color="course.estado ? 'success' : 'error'" variant="flat" size="small" class="mb-3">
                      {{ course.estado ? "Disponible" : "Cerrado" }}
                    </v-chip>
                  </v-card-text>

                  <v-card-actions class="px-4 pb-4">
                    <v-btn color="primary" variant="flat" size="small" @click="openCourseDetails(course)" block>
                      <v-icon icon="mdi-information" start size="18"></v-icon>
                      Ver Más
                    </v-btn>
                  </v-card-actions>

                  <!-- Footer de la card -->
                  <v-divider></v-divider>
                  <v-card-actions class="px-4 py-3 bg-grey-lighten-4">
                    <v-chip color="info" variant="flat" size="small">
                      <v-icon icon="mdi-clock" start size="16"></v-icon>
                      {{ course.duracion }}
                    </v-chip>
                    <v-spacer></v-spacer>
                    <span class="text-h6 font-weight-bold text-primary">
                      ${{ Number(course.precio).toLocaleString('es-CL') }}
                    </span>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <!-- Estado vacío -->
          <v-col v-else cols="12" class="text-center py-12">
            <v-icon icon="mdi-information-outline" size="64" color="grey" class="mb-4"></v-icon>
            <p class="text-h6 text-medium-emphasis">
              No hay cursos disponibles para mostrar.
            </p>
          </v-col>
        </v-row>

        <!-- Diálogo de detalles del curso -->
        <v-dialog v-model="showCourseDetails" max-width="500">
          <v-card v-if="selectedCourse">
            <v-card-item>
              <v-card-title class="text-h5 font-weight-bold">
                {{ selectedCourse.nombre }}
              </v-card-title>
              <v-card-subtitle>
                Código: {{ selectedCourse.codigo }}
              </v-card-subtitle>
            </v-card-item>

            <v-img :src="selectedCourse.img" :alt="selectedCourse.nombre" height="200" cover></v-img>

            <v-card-text class="pa-4">
              <v-row class="mb-3">
                <v-col cols="6">
                  <div class="d-flex align-center">
                    <v-icon icon="mdi-clock" color="info" class="me-2" size="20"></v-icon>
                    <span class="text-body-2">{{ selectedCourse.duracion }}</span>
                  </div>
                </v-col>
                <v-col cols="6" class="text-end">
                  <span class="text-h5 font-weight-bold text-primary">
                    ${{ Number(selectedCourse.precio).toLocaleString('es-CL') }}
                  </span>
                </v-col>
              </v-row>

              <v-chip :color="selectedCourse.estado ? 'success' : 'error'" variant="flat" class="mb-3">
                {{ selectedCourse.estado ? "Curso Disponible" : "Curso Cerrado" }}
              </v-chip>

              <!-- Descripción completa en el diálogo -->
              <div class="full-description">
                <h4 class="text-body-1 font-weight-bold mb-2">Descripción:</h4>
                <p class="text-body-1">
                  {{ selectedCourse.descripcion }}
                </p>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="text" @click="showCourseDetails = false">
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.home-view-wrapper {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  padding-top: 0;
}

/* Ajustar el padding superior para el header */
.v-main {
  padding-top: 0 !important;
}

.course-card {
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
}

/* Estilo para limitar la descripción a 2 líneas */
.description-container {
  min-height: 40px;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  max-height: 2.8em;
}

/* Estilo para la descripción completa en el diálogo */
.full-description {
  background-color: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #1976d2;
}

@media (max-width: 600px) {
  .home-view-wrapper {
    padding: 0.5rem;
  }
  
  .v-col {
    padding: 0.5rem;
  }
}

@media (max-width: 960px) {
  .course-card {
    max-width: 100% !important;
  }
}

.v-chip {
  transition: all 0.2s ease;
}

.v-chip:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .text-h3 {
    font-size: 1.75rem !important;
  }
  
  .text-h6 {
    font-size: 1rem !important;
  }
  
  .pa-6 {
    padding: 2rem 1rem !important;
  }
}

@media (max-width: 500px) {
  .v-dialog {
    margin: 8px;
  }
  
  .full-description {
    padding: 8px;
  }
}
</style>