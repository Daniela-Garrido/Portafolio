import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth'; 

// Definición de las rutas
const routes = [
    {
        path: '/',
        name: 'sobreMi',
        component: () => import('../views/SobreMi.vue'),
        meta: { requiresAuth: false } // No requiere autenticación
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../components/Register.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: { requiresAuth: true } // REQUIERE autenticación
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/AdminView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/editar/:id',
        name: 'editCourse',
        component: () => import('../views/EditCourseView.vue'),
        meta: { requiresAuth: true }    
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// GUARDIA DE NAVEGACIÓN GLOBAL
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore(); 
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    
    // Si la ruta requiere autenticación y el usuario NO está autenticado
    if (requiresAuth && !authStore.isAuthenticated) {
        // Redirige a la página SobreMi en lugar de login
        next({ name: 'sobreMi' });
    } 
    // Si el usuario ya está autenticado e intenta acceder a páginas públicas
    else if (!requiresAuth && authStore.isAuthenticated && 
             (to.name === 'sobreMi' || to.name === 'login' || to.name === 'register')) {
        // Redirige al home
        next({ name: 'home' });
    }
    // Permite la navegación
    else {
        next();
    }
});

export default router;