<script setup>
import { ref, watch, computed } from 'vue';

// Definición de las props que recibe el modal
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    initialCourse: {
        type: Object,
        default: null
    }
});

// Definición de los eventos que emite el modal
const emit = defineEmits(['close', 'save']);

// Estado inicial del curso vacío/por defecto
const defaultCourse = {
    nombre: '',
    codigo: '',
    precio: 0,
    duracion: '',
    descripcion: '',
    img: 'https://placehold.co/400x200/222/FFF?text=Curso+Nuevo',
    estado: null
};

// Objeto reactivo que modela los datos del formulario
const courseData = ref({ ...defaultCourse });

// Computed para validar si el formulario es válido
const isFormValid = computed(() => {
    return courseData.value.codigo &&
        courseData.value.nombre &&
        courseData.value.precio >= 0 &&
        courseData.value.duracion &&
        courseData.value.descripcion &&
        courseData.value.img &&
        courseData.value.estado !== null;
});

// Lógica para precargar/resetear el formulario cuando el modal se abre/cierra
watch(() => props.show, (newVal) => {
    if (newVal) {
        // Al abrir: resetear a valores por defecto (modo Crear)
        courseData.value = { ...defaultCourse };
    }
});

// Función que se ejecuta al enviar el formulario
const handleSubmit = () => {
    // Validación: asegurar que todos los campos estén completos
    if (!isFormValid.value) {
        alert("Por favor, complete todos los campos requeridos.");
        return;
    }

    // Emitir el evento 'save' con los datos del curso
    emit('save', courseData.value);

    // Cerrar el modal después de guardar exitosamente
    emit('close');
};
</script>

<template>
    <v-dialog v-model="props.show" max-width="800" persistent>
        <v-card>
            <!-- Header del modal -->
            <v-toolbar color="primary" density="compact">
                <v-toolbar-title class="text-white">
                    Agregar Nuevo Curso
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="emit('close')" variant="text" color="white">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-form @submit.prevent="handleSubmit">
                <v-card-text class="pa-6">
                    <v-row>
                        <!-- Código -->
                        <v-col cols="12" md="4">
                            <v-text-field v-model="courseData.codigo" label="Código *" variant="outlined"
                                density="comfortable" required
                                :rules="[v => !!v || 'El código es requerido']"></v-text-field>
                        </v-col>

                        <!-- Nombre -->
                        <v-col cols="12" md="8">
                            <v-text-field v-model="courseData.nombre" label="Nombre *" variant="outlined"
                                density="comfortable" required
                                :rules="[v => !!v || 'El nombre es requerido']"></v-text-field>
                        </v-col>

                        <!-- URL de Imagen -->
                        <v-col cols="12">
                            <v-text-field v-model="courseData.img" label="URL de la Imagen del Curso *"
                                placeholder="http://..." variant="outlined" density="comfortable" type="url" required
                                :rules="[v => !!v || 'La URL de la imagen es requerida']"></v-text-field>

                            <!-- Vista previa de imagen -->
                            <div class="mt-2 text-center" v-if="courseData.img">
                                <v-img :src="courseData.img" alt="Vista previa" max-height="100" contain
                                    class="rounded"></v-img>
                            </div>
                        </v-col>

                        <!-- Duración -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="courseData.duracion" label="Duración *" variant="outlined"
                                density="comfortable" required
                                :rules="[v => !!v || 'La duración es requerida']"></v-text-field>
                        </v-col>

                        <!-- Precio -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model.number="courseData.precio" label="Costo ($) *" variant="outlined"
                                density="comfortable" type="number" min="0" required :rules="[
                                    v => v >= 0 || 'El precio debe ser mayor o igual a 0',
                                    v => !!v || 'El precio es requerido'
                                ]"></v-text-field>
                        </v-col>

                        <!-- Descripción -->
                        <v-col cols="12">
                            <v-textarea v-model="courseData.descripcion" label="Descripción *" variant="outlined"
                                density="comfortable" rows="3" required
                                :rules="[v => !!v || 'La descripción es requerida']"></v-textarea>
                        </v-col>

                        <!-- Estado del Curso -->
                        <v-col cols="12">
                            <v-radio-group v-model="courseData.estado" label="Estado del Curso *"
                                :rules="[v => v !== null || 'El estado es requerido']" required>
                                <v-radio label="Curso Activo / Disponible" :value="true" color="success"></v-radio>
                                <v-radio label="Curso Cerrado / No disponible" :value="false" color="error"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-card-text>

                <!-- Footer con botones -->
                <v-card-actions class="pa-4">
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" variant="text" @click="emit('close')" class="me-2">
                        Cancelar
                    </v-btn>
                    <v-btn type="submit" color="primary" variant="flat" :disabled="!isFormValid">
                        <v-icon icon="mdi-content-save" start></v-icon>
                        Guardar Curso
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<style scoped>
/* Estilos para mejorar la apariencia */
.v-card {
    border-radius: 8px;
}

/* Asegurar que los textos sean legibles en el toolbar */
.text-white {
    color: white !important;
}

/* Espaciado responsivo */
@media (max-width: 600px) {
    .v-card-text {
        padding: 1rem !important;
    }

    .v-card-actions {
        padding: 0.75rem !important;
    }
}

/* Mejorar la apariencia de los campos */
.v-text-field,
.v-textarea {
    margin-bottom: 8px;
}
</style>