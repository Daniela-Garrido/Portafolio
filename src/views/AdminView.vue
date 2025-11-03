<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';
import { useCursoStore } from '../stores/curso';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import CourseModal from '../components/CourseModal.vue';
import { useNotificationStore } from '../stores/notification';

// 1. Inicialización de Stores
const authStore = useAuthStore();
const cursoStore = useCursoStore();
const router = useRouter();
const notificationStore = useNotificationStore();

// 2. Reactividad
const { user, isAuthenticated } = storeToRefs(authStore);
const { cursosDisponibles, loadingCourses } = storeToRefs(cursoStore);

// 3. Lógica del Header: Nombre de Usuario
const userNameDisplay = computed(() => {
    return user.value && user.value.email ? user.value.email.split('@')[0] : 'Admin';
});

// 4. Lógica de Cierre de Sesión
const handleLogout = async () => {
    await authStore.logoutUser();
    if (!isAuthenticated.value) {
        router.push({ name: "login" });
    }
};

// 5. Lógica del Modal de Administración
const isModalOpen = ref(false);
const isConfirmAddModalOpen = ref(false);
const isConfirmDeleteModalOpen = ref(false);
const pendingNewCourse = ref(null);
const pendingDeleteCourse = ref(null);

// Abre el modal para agregar un nuevo curso
const openAddModal = () => {
    isModalOpen.value = true;
};

// Cierra el modal
const closeModal = () => {
    isModalOpen.value = false;
};

// 6. Lógica de CRUD
const handleSaveCourse = async (curso) => {
    pendingNewCourse.value = { ...curso };
    isConfirmAddModalOpen.value = true;
};

// Confirmar o cancelar agregar curso nuevo
const confirmAddCourse = async () => {
    if (!pendingNewCourse.value) return;
    const result = await cursoStore.agregarCurso(pendingNewCourse.value);
    if (result.success) {
        notificationStore.showNotification({
            type: 'success',
            message: 'Curso agregado con éxito.'
        });
    } else {
        notificationStore.showNotification({
            type: 'error',
            message: 'Error al agregar curso.'
        });
    }

    isConfirmAddModalOpen.value = false;
    closeModal();
    pendingNewCourse.value = null;
};

// Cancelar agregar curso
const cancelAddCourse = () => {
    isConfirmAddModalOpen.value = false;
    pendingNewCourse.value = null;
};

// 7. Carga de cursos en tiempo real
onMounted(() => {
    cursoStore.iniciarListenerCursos();
});

// Abrir modal de confirmación para eliminar curso
const openDeleteModal = (cursoId, nombre) => {
    pendingDeleteCourse.value = { id: cursoId, nombre };
    isConfirmDeleteModalOpen.value = true;
};

// Cancela eliminación de curso
const cancelDeleteCourse = () => {
    isConfirmDeleteModalOpen.value = false;
    pendingDeleteCourse.value = null;
};

// Confirmar eliminación de curso
const confirmDeleteCourse = async () => {
    if (!pendingDeleteCourse.value) return;
    const { id, nombre } = pendingDeleteCourse.value;
    const result = await cursoStore.eliminarCurso(id);
    if (result.success) {
        notificationStore.showNotification({
            type: 'success',
            message: `🗑️ Curso '${nombre}' eliminado.`
        });
    } else {
        notificationStore.showNotification({
            type: 'error',
            message: '❌ Error al eliminar el curso.'
        });
    }
    isConfirmDeleteModalOpen.value = false;
    pendingDeleteCourse.value = null;
};

// 8. Lógica de edición (Redirección)
const goToEdit = (cursoId) => {
    router.push({ name: 'editCourse', params: { id: cursoId } });
};
</script>

<template>
    <v-app>
        <Header :user-name="userNameDisplay" @logout="handleLogout" />

        <v-main>
            <v-container class="admin-view-wrapper" fluid>
                <!-- Header del panel -->
                <v-row class="mb-4">
                    <v-col cols="12" class="text-center">
                        <h1 class="text-h4 font-weight-bold text-primary mb-2">
                            Panel de Administración
                        </h1>
                        <p class="text-body-1 text-medium-emphasis">
                            Gestiona los cursos de la plataforma
                        </p>
                    </v-col>
                </v-row>

                <!-- Botón agregar curso - Siempre visible -->
                <v-row class="mb-4">
                    <v-col cols="12" md="6" lg="4" class="mx-auto">
                        <v-btn @click="openAddModal" color="indigo-darken-3" variant="flat" size="large" block
                            class="mb-4">
                            <v-icon icon="mdi-plus-circle" start></v-icon>
                            Agregar Nuevo Curso
                        </v-btn>
                    </v-col>
                </v-row>

                <!-- Estado de carga -->
                <v-card v-if="loadingCourses" class="text-center pa-6 mb-4">
                    <v-progress-circular indeterminate color="primary" size="48" class="mb-3"></v-progress-circular>
                    <p class="text-body-1 text-medium-emphasis">Cargando cursos...</p>
                </v-card>

                <!-- Estado vacío -->
                <v-card v-else-if="cursosDisponibles.length === 0" class="text-center pa-8 mb-4">
                    <v-icon icon="mdi-information-outline" size="64" color="grey" class="mb-3"></v-icon>
                    <p class="text-h6 text-medium-emphasis mb-2">No hay cursos registrados</p>
                    <p class="text-body-2 text-medium-emphasis">
                        Comienza agregando tu primer curso
                    </p>
                </v-card>

                <!-- Contenido cuando hay cursos -->
                <template v-else>
                    <!-- Vista de tabla para desktop -->
                    <v-card elevation="4" rounded="lg" class="d-none d-md-block mb-4">
                        <v-card-text class="pa-0">
                            <v-table density="comfortable" hover>
                                <thead>
                                    <tr>
                                        <th class="text-left font-weight-bold">Código</th>
                                        <th class="text-left font-weight-bold">Nombre</th>
                                        <th class="text-left font-weight-bold">Precio</th>
                                        <th class="text-left font-weight-bold">Estado</th>
                                        <th class="text-center font-weight-bold">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="curso in cursosDisponibles" :key="curso.id">
                                        <td class="font-weight-medium">{{ curso.codigo }}</td>
                                        <td>
                                            <div class="d-flex align-center">
                                                <v-avatar size="32" class="me-3">
                                                    <v-img :src="curso.img" :alt="curso.nombre"></v-img>
                                                </v-avatar>
                                                <span class="font-weight-medium">{{ curso.nombre }}</span>
                                            </div>
                                        </td>
                                        <td class="font-weight-bold text-primary">
                                            ${{ curso.precio.toLocaleString('es-CL') }}
                                        </td>
                                        <td>
                                            <v-chip :color="curso.estado ? 'success' : 'error'" variant="flat"
                                                size="small">
                                                {{ curso.estado ? 'Activo' : 'Cerrado' }}
                                            </v-chip>
                                        </td>
                                        <td>
                                            <div class="d-flex justify-center">
                                                <v-btn @click="goToEdit(curso.id)" color="info" variant="text"
                                                    size="small" class="me-2">
                                                    <v-icon icon="mdi-pencil" size="18"></v-icon>
                                                </v-btn>
                                                <v-btn @click="openDeleteModal(curso.id, curso.nombre)" color="error"
                                                    variant="text" size="small">
                                                    <v-icon icon="mdi-delete" size="18"></v-icon>
                                                </v-btn>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card-text>
                    </v-card>

                    <!-- Vista de cards para móviles -->
                    <div class="d-md-none">
                        <v-row>
                            <v-col v-for="curso in cursosDisponibles" :key="curso.id" cols="12" class="mb-3">
                                <v-card elevation="2" rounded="lg">
                                    <v-card-item>
                                        <div class="d-flex align-start justify-space-between mb-2">
                                            <div class="d-flex align-center">
                                                <v-avatar size="40" class="me-3">
                                                    <v-img :src="curso.img" :alt="curso.nombre"></v-img>
                                                </v-avatar>
                                                <div>
                                                    <v-card-title class="text-h6 pa-0 mb-1">
                                                        {{ curso.nombre }}
                                                    </v-card-title>
                                                    <v-card-subtitle class="pa-0">
                                                        Código: {{ curso.codigo }}
                                                    </v-card-subtitle>
                                                </div>
                                            </div>
                                            <v-chip :color="curso.estado ? 'success' : 'error'" variant="flat"
                                                size="small">
                                                {{ curso.estado ? 'Activo' : 'Cerrado' }}
                                            </v-chip>
                                        </div>
                                    </v-card-item>

                                    <v-card-text class="pt-0">
                                        <v-row class="mb-2">
                                            <v-col cols="6">
                                                <div class="text-caption text-medium-emphasis">Precio</div>
                                                <div class="text-h6 font-weight-bold text-primary">
                                                    ${{ curso.precio.toLocaleString('es-CL') }}
                                                </div>
                                            </v-col>
                                            <v-col cols="6">
                                                <div class="text-caption text-medium-emphasis">Duración</div>
                                                <div class="text-body-2">{{ curso.duracion }}</div>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>

                                    <v-card-actions class="px-4 pb-4">
                                        <v-btn @click="goToEdit(curso.id)" color="info" variant="flat" size="small"
                                            class="flex-grow-1 me-2">
                                            <v-icon icon="mdi-pencil" start size="18"></v-icon>
                                            Editar
                                        </v-btn>
                                        <v-btn @click="openDeleteModal(curso.id, curso.nombre)" color="error"
                                            variant="outlined" size="small" class="flex-grow-1">
                                            <v-icon icon="mdi-delete" start size="18"></v-icon>
                                            Eliminar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>
                </template>

                <!-- Modal para agregar curso -->
                <CourseModal :show="isModalOpen" @close="closeModal" @save="handleSaveCourse" />

                <!-- Modal de confirmación para agregar curso -->
                <v-dialog v-model="isConfirmAddModalOpen" max-width="400" persistent>
                    <v-card>
                        <v-card-title class="text-h6">
                            Confirmar agregado
                        </v-card-title>
                        <v-card-text class="pt-4">
                            <p>¿Deseas agregar el curso <strong>{{ pendingNewCourse?.nombre }}</strong>?</p>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="secondary" variant="text" @click="cancelAddCourse">
                                Cancelar
                            </v-btn>
                            <v-btn color="success" variant="flat" @click="confirmAddCourse">
                                Agregar Curso
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <!-- Modal de confirmación de eliminar curso -->
                <v-dialog v-model="isConfirmDeleteModalOpen" max-width="400" persistent>
                    <v-card>
                        <v-card-title class="text-h6">
                            Confirmar eliminación
                        </v-card-title>
                        <v-card-text class="pt-4">
                            <p>¿Estás seguro de que quieres ELIMINAR el curso <strong>{{ pendingDeleteCourse?.nombre
                                    }}</strong>?</p>
                            <p class="text-caption text-error mt-2">
                                Esta acción no se puede deshacer.
                            </p>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="secondary" variant="text" @click="cancelDeleteCourse">
                                Cancelar
                            </v-btn>
                            <v-btn color="error" variant="flat" @click="confirmDeleteCourse">
                                Sí, borrar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>
.admin-view-wrapper {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    min-height: 100vh;
    padding: 1rem;
}

/* Mejorar la apariencia de la tabla */
.v-table {
    border-radius: 8px;
}

/* Efecto hover en las filas de la tabla */
.v-table tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.04);
}

/* Espaciado responsivo */
@media (max-width: 960px) {
    .admin-view-wrapper {
        padding: 0.5rem;
    }
}

/* Ajustes para móviles */
@media (max-width: 600px) {
    .admin-view-wrapper {
        padding: 0.25rem;
    }

    .v-card-title {
        font-size: 1rem !important;
    }

    .v-btn {
        font-size: 0.75rem;
    }
}

/* Animaciones suaves */
.v-btn {
    transition: all 0.2s ease;
}

.v-btn:hover {
    transform: translateY(-1px);
}

/* Mejorar la legibilidad en móviles */
@media (max-width: 768px) {
    .text-h4 {
        font-size: 1.5rem !important;
    }

    .v-card {
        margin: 0.25rem;
    }
}

/* Asegurar que los botones sean táctiles en móviles */
@media (max-width: 768px) {
    .v-btn {
        min-height: 44px;
    }
}

/* Mejorar el espaciado en las cards móviles */
@media (max-width: 960px) {
    .v-card-actions .v-btn {
        margin-bottom: 0.25rem;
    }
}

/* Ajustes específicos para tablets */
@media (max-width: 1264px) and (min-width: 960px) {
    .admin-view-wrapper {
        padding: 1.5rem;
    }
}

/* Mejorar la visualización de los botones de acción en móviles */
@media (max-width: 600px) {
    .v-card-actions {
        flex-direction: column;
        gap: 0.5rem;
    }

    .v-card-actions .v-btn {
        width: 100%;
    }
}
</style>