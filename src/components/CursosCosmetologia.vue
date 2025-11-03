<script setup>
import { ref } from 'vue'

// Array de cursos de cosmetología
const cursos = ref([
    {
        id: 1,
        nombre: "Maquillaje Profesional",
        codigo: "COSM-001",
        descripcion: "Aprende técnicas avanzadas de maquillaje para eventos sociales, fotografía y pasarela. Incluye corrección de rostro, técnicas de iluminación y sombreado.",
        img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60",
        estado: true,
        duracion: "3 meses",
        precio: 0
    },
    {
        id: 2,
        nombre: "Cuidado Facial Avanzado",
        codigo: "COSM-002",
        descripcion: "Técnicas profesionales de limpieza facial, extracción de comedones, aplicación de mascarillas y uso de tecnología estética.",
        img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=60",
        estado: true,
        duracion: "4 meses",
        precio: 0
    },
    {
        id: 3,
        nombre: "Manicure Profesional",
        codigo: "COSM-003",
        descripcion: "Dominio de técnicas de esmaltado tradicional, semipermanente, acrílico y escultural. Incluye cuidados de cutículas y tratamientos spa.",
        img: "https://nailboo.com/cdn/shop/articles/Manicure_2248b30f-65fd-4fb4-bd4b-296644a709e3.jpg?v=1754502555&width=1100",
        estado: true,
        duracion: "2 meses",
        precio: 0
    },
    {
        id: 4,
        nombre: "Estilismo de Cejas",
        codigo: "COSM-004",
        descripcion: "Técnicas de diseño y perfilado de cejas, depilación con cera e hilo, henna y maquillaje semipermanente.",
        img: "https://esteticadelamirada.es/wp-content/uploads/2022/02/Planchado_cejas-704x433.jpg",
        estado: false,
        duracion: "3 horas",
        precio: 0
    }
])

// Estado para el diálogo de detalles
const selectedCourse = ref(null)
const showCourseDetails = ref(false)

// Función para abrir detalles del curso
const openCourseDetails = (course) => {
    selectedCourse.value = course
    showCourseDetails.value = true
}

// Función para formatear precio
const formatPrice = (price) => {
    return Number(price).toLocaleString('es-CL')
}

// Función para inscripción
const inscribirse = (course) => {
    alert(`Inscripción al curso: ${course.nombre}`)
    // Aquí iría la lógica de inscripción real
}

// Función para obtener items de aprendizaje
const getLearningItems = (courseId) => {
    const items = {
        1: [
            "Técnicas de corrección de rostro",
            "Iluminación y sombreado profesional",
            "Maquillaje para fotografía y video",
            "Protocolos de higiene y sanitización"
        ],
        2: [
            "Diagnóstico de tipos de piel",
            "Técnicas de extracción segura",
            "Aplicación de mascarillas profesionales",
            "Uso de tecnología estética facial"
        ],
        3: [
            "Esmaltado semipermanente profesional",
            "Técnicas de sculpting acrílico",
            "Tratamientos spa para manos y pies",
            "Decoraciones y arte en uñas"
        ],
        4: [
            "Diseño y perfilado de cejas",
            "Técnicas de depilación con hilo",
            "Aplicación de henna y tintes",
            "Armonización facial profesional"
        ]
    }
    return items[courseId] || ["Habilidades profesionales especializadas"]
}
</script>


<template>
    <div class="cursos-cosmetologia-wrapper">
        <!-- Header del componente -->
        <v-row justify="center">
            <v-col cols="12" class="text-center pa-6 mt-6">
                <h2 class="text-h3 font-weight-bold text-primary mb-4 mt-15">
                    Cursos de Cosmetología Gratuitos
                </h2>
                <p class="text-h6 text-medium-emphasis">
                    Descubre nuestra amplia variedad de cursos especializados en belleza y estética
                </p>
            </v-col>
        </v-row>

        <!-- Grid de cursos -->
        <v-row justify="center">
            <v-col cols="12">
                <v-row class="px-2">
                    <v-col v-for="course in cursos" :key="course.id" cols="12" sm="6" md="4" lg="3">
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
                                <v-chip :color="course.estado ? 'success' : 'error'" variant="flat" size="small"
                                    class="mb-3">
                                    {{ course.estado ? "Disponible" : "Cerrado" }}
                                </v-chip>
                            </v-card-text>

                            <v-card-actions class="px-4 pb-4">
                                <v-btn class="header-gradient" color="secondary" variant="flat" size="small"
                                    @click="openCourseDetails(course)" block>
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
                                    ${{ formatPrice(course.precio) }}
                                </span>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
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
                                ${{ formatPrice(selectedCourse.precio) }}
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

                    <!-- Lo que aprenderás (adicional para cosmetología) -->
                    <div class="learning-items mt-4">
                        <h4 class="text-body-1 font-weight-bold mb-2">Lo que aprenderás:</h4>
                        <ul class="text-body-2 pl-4">
                            <li v-for="(item, index) in getLearningItems(selectedCourse.id)" :key="index" class="mb-1">
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" variant="text" @click="showCourseDetails = false">
                        Cerrar
                    </v-btn>
                    <!-- <v-btn color="secondary" variant="flat" v-if="selectedCourse.estado"
                        @click="inscribirse(selectedCourse)">
                        Inscribirse
                    </v-btn> -->
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>


<style scoped>
.cursos-cosmetologia-wrapper {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    min-height: 100vh;
    padding-top: 0;
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

/* Estilo para los items de aprendizaje */
.learning-items {
    background-color: #e8f5e8;
    padding: 12px;
    border-radius: 8px;
    border-left: 4px solid #4caf50;
}

.v-chip {
    transition: all 0.2s ease;
}

.v-chip:hover {
    transform: scale(1.05);
}

@media (max-width: 600px) {
    .cursos-cosmetologia-wrapper {
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

    .learning-items {
        padding: 8px;
    }
}
</style>