<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';
import Header from '../components/Header.vue';

const authStore = useAuthStore();
const router = useRouter();
const { user, isAuthenticated } = storeToRefs(authStore);

// Lógica del Header
const userNameDisplay = ref('Invitado');

// Footer icons con enlaces
const icons = ref([
    {
        name: 'mdi-instagram',
        link: 'https://www.instagram.com/cosmetologa.de.hoy/'
    },
    {
        name: 'mdi-youtube',
        link: 'https://www.youtube.com/@Cosmetologadehoy'
    },
    {
        name: 'mdi-email',
        link: 'mailto:info@dgstudioacademy.com'
    }
]);

const handleLogout = async () => {
    await authStore.logoutUser();
};

const goToLogin = () => {
    router.push({ name: 'login' });
};

const goToRegister = () => {
    router.push({ name: 'register' });
};
</script>

<template>
    <v-app>
        <Header :user-name="userNameDisplay" @logout="handleLogout" />

        <v-main>
            <!-- Sección 1: Bienvenida con Background -->
            <section class="welcome-section">
    <v-container fluid class="welcome-background compact-height">
        <v-row align="center" justify="center" class="fill-height">
            <v-col cols="12" class="text-center">
                <v-avatar size="120" class="mb-4">
                    <v-img src="/public/my2.jpg" alt="Mi foto"></v-img>
                </v-avatar>
                <h1 class="text-h3 font-weight-bold text-white mb-4">
                    Bienvenidos a DG Studio Academy <br>Cosmetología Online
                </h1>
                <p class="text-h6 text-white mb-6">
                    Tu centro de apoyo integral para cosmetólogas profesionales aqui encontrarás protocolos,
                    evaluaciones y consejos prácticos para llevar tu carrera al siguiente nivel.
                </p>
                <div class="d-flex justify-center gap-4 flex-wrap">
                    <v-btn color="primary" size="large" variant="flat" @click="goToLogin" class="px-6">
                        <v-icon icon="mdi-login" start></v-icon>
                        Ingresar
                    </v-btn>
                    <v-btn color="white" size="large" variant="flat" @click="goToRegister" class="px-6">
                        <v-icon icon="mdi-account-plus" start></v-icon>
                        Registrarse
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</section>

            <!-- Sección 2: Explicación de la Plataforma -->
            <section class="platform-section">
                <v-container fluid class="pa-0">
                    <v-row justify="center" class="ma-0">
                        <v-col cols="12" class="pa-0">
                            <div class="white-background">
                                <v-container>
                                    <v-row justify="center">
                                        <v-col cols="12" xl="10" lg="10" md="12">
                                            <div class="text-center mb-8">
                                                <img src="/public/youtuber.svg" alt="Icono Cosmetología"
                                                    class="section-icon">
                                                <h2 class="text-h3 font-weight-bold text-primary mb-4">
                                                    Tu Aliada en el Mundo de la Cosmetología
                                                </h2>
                                                <v-divider class="my-4" color="primary" thickness="2"
                                                    width="100"></v-divider>
                                            </div>

                                            <v-card class="platform-main-card pa-6" elevation="4">
                                                <v-row align="center" class="h-100">
                                                    <v-col cols="12" lg="6" md="6">
                                                        <v-img src="/public/golden.png" alt="Cosmetología" height="400"
                                                            cover class="rounded-lg platform-image"></v-img>
                                                    </v-col>
                                                    <v-col cols="12" lg="6" md="6">
                                                        <h3 class="text-h3 font-weight-bold text-secondary mb-4">
                                                            Apoyo Integral para Cosmetólogas
                                                        </h3>
                                                        <p class="text-body-1 mb-6 platform-description">
                                                            Studio Academy es una plataforma diseñada específicamente
                                                            para
                                                            <strong class="highlight-text">apoyar a
                                                                cosmetólogas</strong> en todos los aspectos de su
                                                            práctica
                                                            profesional.
                                                        </p>

                                                        <v-list class="transparent platform-list">
                                                            <v-list-item class="platform-list-item">
                                                                <template #prepend>
                                                                    <v-icon icon="mdi-check-circle" color="success"
                                                                        size="28"></v-icon>
                                                                </template>
                                                                <v-list-item-title
                                                                    class="font-weight-medium text-body-1">
                                                                    Protocolos de tratamientos faciales y corporales
                                                                </v-list-item-title>
                                                            </v-list-item>
                                                            <v-list-item class="platform-list-item">
                                                                <template #prepend>
                                                                    <v-icon icon="mdi-check-circle" color="success"
                                                                        size="28"></v-icon>
                                                                </template>
                                                                <v-list-item-title
                                                                    class="font-weight-medium text-body-1">
                                                                    Evaluación y diagnóstico profesional
                                                                </v-list-item-title>
                                                            </v-list-item>
                                                            <v-list-item class="platform-list-item">
                                                                <template #prepend>
                                                                    <v-icon icon="mdi-check-circle" color="success"
                                                                        size="28"></v-icon>
                                                                </template>
                                                                <v-list-item-title
                                                                    class="font-weight-medium text-body-1">
                                                                    Protocolos de atención al cliente
                                                                </v-list-item-title>
                                                            </v-list-item>
                                                            <v-list-item class="platform-list-item">
                                                                <template #prepend>
                                                                    <v-icon icon="mdi-check-circle" color="success"
                                                                        size="28"></v-icon>
                                                                </template>
                                                                <v-list-item-title
                                                                    class="font-weight-medium text-body-1">
                                                                    Experiencia personal como cosmetóloga y
                                                                    micropigmentadora
                                                                </v-list-item-title>
                                                            </v-list-item>
                                                        </v-list>
                                                    </v-col>
                                                </v-row>
                                            </v-card>

                                            <!-- Información adicional -->
                                            <v-row class="mt-8" justify="center">
                                                <v-col cols="12" md="4" class="text-center">
                                                    <v-card class="pa-4 info-card" elevation="2" height="100%">
                                                        <v-icon icon="mdi-certificate" size="48" color="primary"
                                                            class="mb-3"></v-icon>
                                                        <h4 class="text-h6 font-weight-bold text-secondary mb-3">
                                                            Certificación Profesional
                                                        </h4>
                                                        <p class="text-body-2">
                                                            Contenido avalado por años de experiencia en el sector de la
                                                            cosmetología
                                                        </p>
                                                    </v-card>
                                                </v-col>
                                                <v-col cols="12" md="4" class="text-center">
                                                    <v-card class="pa-4 info-card" elevation="2" height="100%">
                                                        <v-icon icon="mdi-update" size="48" color="primary"
                                                            class="mb-3"></v-icon>
                                                        <h4 class="text-h6 font-weight-bold text-secondary mb-3">
                                                            Actualización Constante
                                                        </h4>
                                                        <p class="text-body-2">
                                                            Protocolos y técnicas siempre actualizadas según las últimas
                                                            tendencias
                                                        </p>
                                                    </v-card>
                                                </v-col>
                                                <v-col cols="12" md="4" class="text-center">
                                                    <v-card class="pa-4 info-card" elevation="2" height="100%">
                                                        <v-icon icon="mdi-account-group" size="48" color="primary"
                                                            class="mb-3"></v-icon>
                                                        <h4 class="text-h6 font-weight-bold text-secondary mb-3">
                                                            Comunidad Activa
                                                        </h4>
                                                        <p class="text-body-2">
                                                            Forma parte de una red de cosmetólogas profesionales en
                                                            crecimiento
                                                        </p>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </section>

            <!-- Sección 3: Mi Experiencia Personal -->
            <section class="experience-section">
                <v-container>
                    <v-row justify="center">
                        <v-col cols="12" md="10" lg="8">
                            <v-card color="secondary" class="pa-6 rounded-lg" dark>
                                <v-row align="center">
                                    <v-col cols="12" md="8">
                                        <h3 class="text-h4 font-weight-bold mb-4">
                                            Mi Experiencia Personal
                                        </h3>
                                        <p class="text-body-1 mb-4">
                                            Como cosmetóloga y micropigmentadora con años de experiencia,
                                            he creado esta plataforma para compartir todo mi conocimiento
                                            y apoyar a otras profesionales del sector.
                                        </p>
                                        <p class="text-body-1">
                                            Aquí encontrarás no solo información técnica, sino también
                                            <strong>consejos prácticos, experiencias reales y protocolos</strong>
                                            que he desarrollado a lo largo de mi carrera.
                                        </p>
                                    </v-col>
                                    <v-col cols="12" md="4" class="text-center">
                                        <v-avatar size="120" class="mb-4">
                                            <v-img src="/public/my.jpg" alt="Mi foto"></v-img>
                                        </v-avatar>
                                        <p class="text-caption font-italic">
                                            Cosmetóloga & Micropigmentadora
                                        </p>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </section>
        </v-main>

        <v-footer class="text-center d-flex flex-column ga-2 py-8" color="primary">
            <div class="d-flex ga-4 mb-4">
                <v-btn v-for="(icon, index) in icons" :key="index" :icon="icon.name" :href="icon.link" target="_blank"
                    rel="noopener noreferrer" density="comfortable" variant="text" color="white" size="large"></v-btn>
            </div>

            <v-divider class="my-2" thickness="2" width="100" color="white"></v-divider>
            <div class="text-body-2 font-weight-regular text-white px-4 mb-4"
                style="max-width: 800px; line-height: 1.6;">
                DG Studio Academy es tu centro de apoyo integral para cosmetólogas y profesionales de la belleza.
                Únete a nuestra comunidad de profesionales comprometidas con la excelencia en la cosmetología y la atención.
            </div>
            <v-divider class="mb-4" color="white" thickness="1"></v-divider>
            <div class="text-caption font-weight-regular text-white">
                {{ new Date().getFullYear() }} — <strong>DG Studio Academy Cosmetología</strong> —
                <span class="opacity-80">Tu aliada en el mundo de la belleza profesional</span>
            </div>
            <div class="text-caption font-weight-regular text-white opacity-60 mt-2">
                Desarrollado con ❤️ para cosmetólogas.
            </div>
        </v-footer>
    </v-app>
</template>

<style scoped>
.welcome-section {
    min-height: 100vh;
}

.welcome-background {
    background: linear-gradient(rgba(62, 0, 206, 0.85), rgba(84, 3, 92, 0.85)),
        url('/public/limpieza.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
}

.platform-section {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.experience-section {
    padding: 80px 0;
    background: #ffffff;
}

.fill-height {
    min-height: 100vh;
}

.gap-4 {
    gap: 16px;
}

.white-background {
    background-color: white;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.section-icon {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.platform-main-card {
    border-radius: 16px;
    min-height: 450px;
    margin-bottom: 40px;
}

.platform-image {
    height: 400px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.platform-image:hover {
    transform: scale(1.02);
}

.platform-description {
    line-height: 1.7;
    font-size: 1.1rem;
    color: #424242;
}

.highlight-text {
    color: #5D4037;
    font-weight: 600;
}

.platform-list {
    background: transparent;
}

.platform-list-item {
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
}

.platform-list-item:last-child {
    border-bottom: none;
}

.info-card {
    border-radius: 12px;
    transition: all 0.3s ease;
    border: 1px solid #e0e0e0;
}

.info-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.h-100 {
    height: 100%;
}

.text-white {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.v-card {
    transition: all 0.3s ease;
}

.v-card:hover {
    transform: translateY(-4px);
}

/* Responsive */
@media (max-width: 960px) {
    .platform-main-card {
        min-height: auto;
        padding: 24px !important;
    }

    .platform-image {
        height: 300px;
        margin-bottom: 24px;
    }

    .text-h3 {
        font-size: 1.75rem !important;
    }

    .section-icon {
        width: 80px;
        height: 80px;
    }
}

@media (max-width: 768px) {
    .welcome-background {
        background-attachment: scroll;
    }

    .text-h3 {
        font-size: 1.75rem !important;
    }

    .text-h4 {
        font-size: 1.5rem !important;
    }

    .text-h6 {
        font-size: 1rem !important;
    }

    .d-flex.justify-center {
        flex-direction: column;
        align-items: center;
    }

    .gap-4 {
        gap: 12px;
    }
}

@media (max-width: 600px) {
    .platform-section {
        min-height: auto;
        padding: 40px 0;
    }

    .white-background {
        min-height: auto;
        padding: 20px 0;
    }

    .text-h3 {
        font-size: 1.5rem !important;
    }

    .platform-list-item {
        padding: 8px 0;
    }
}

/* Asegurar que ocupe toda la ventana */
:deep(.v-container) {
    max-width: 100% !important;
}

:deep(.v-col) {
    flex: 1 1 100%;
}
</style>