# DG Studio Academy - Plataforma de Gestión de Cursos

## 👤 Integrante: Daniela Garrido olivares
## 💾 Repositorio: https://github.com/Daniela-Garrido/Portafolio

---

## 🔐 Credenciales Administrador

**URL de Acceso:** [`https://dg-studio-academy.web.app/admin`](https://dg-studio-academy.web.app/admin)  
**URL de Login:** [`https://dg-studio-academy.web.app/login`](https://dg-studio-academy.web.app/login)

**Importante:** Solo usuarios autenticados con rol de administrador pueden realizar operaciones CRUD en los cursos.

**Credenciales de Prueba:**  
📧 **Correo:** `admin@dgstudio.com`  
🔑 **Contraseña:** `admin123`

## 🌐 Demo en Vivo
**URL del Proyecto:** [https://dg-studio-academy.web.app](https://dg-studio-academy.web.app)

---

## 📋 Descripción del Proyecto

**DG Studio Academy** es una **Single Page Application (SPA)** moderna desarrollada con **Vue.js 3** que ofrece una plataforma completa para la gestión y visualización de cursos de cosmetología. La aplicación implementa una arquitectura robusta con **gestión de estado centralizado (Pinia)** y una **interfaz de usuario responsiva** construida con **Vuetify 3**.

### 🎯 Objetivos Cumplidos
- ✅ **Vista pública** para exploración de cursos por estudiantes
- ✅ **Panel administrativo** seguro para gestión completa de contenido
- ✅ **Actualizaciones en tiempo real** mediante Cloud Firestore
- ✅ **Sistema de autenticación** con Firebase Authentication
- ✅ **Diseño completamente responsivo** para todos los dispositivos

---

## 🛠 Stack Tecnológico

### Frontend Framework & Arquitectura
| Tecnología | Implementación | Cumplimiento Rúbrica |
|------------|----------------|---------------------|
| **Vue.js 3 (Composition API)** | Componentes reactivos y modulares | ✅  - Arquitectura modular y mantenible |
| **Vuetify 3** | Framework CSS completo | ✅  - Utilización consistente en todos los elementos |
| **Vue Router** | Sistema de rutas SPA | ✅  - Rutas URI consistentes y jerárquicas |
| **Pinia** | Gestión de estado centralizado | ✅  - Sustituye Vuex con mejores prácticas |

### Backend & Firebase
| Tecnología | Implementación | Cumplimiento Rúbrica |
|------------|----------------|---------------------|
| **Firebase Authentication** | Autenticación segura | ✅  - Configuración óptima con control de acceso |
| **Cloud Firestore** | Base de datos en tiempo real | ✅  - Reglas de seguridad y validaciones |
| **Firebase Hosting** | Despliegue productivo | ✅  - Despliegue optimizado y funcional |

### Características Técnicas Destacadas
- 🔧 **Componentes Reutilizables** (`Header`, `CourseModal`, `AppToast`)
- 🔄 **Ciclo de Vida Vue** (`onMounted`, `watch`, `computed`)
- 📡 **Comunicación entre Componentes** (props, emits, Pinia stores)
- 🎨 **Framework CSS** (Vuetify con personalización mediante `simpleTheme.js`)
- 📱 **Diseño Responsive** (breakpoints para mobile, tablet, desktop)

---

## 🏗 Arquitectura de Componentes

### Comunicación entre Componentes
```javascript
// Props (Padre → Hijo)
<CourseModal :show="isModalOpen" @close="closeModal" />

// Emits (Hijo → Padre)  
const emit = defineEmits(['close', 'save']);

// Pinia Stores (Estado Global)
const cursoStore = useCursoStore();
const { cursosDisponibles } = storeToRefs(cursoStore);
```

### Métodos del Ciclo de Vida
```javascript
// En componentes principales
onMounted(() => {
  cursoStore.iniciarListenerCursos();
});

// Watchers para reactividad
watch([cursosDisponibles, loadingCourses], ([newCursos, newLoading]) => {
  // Lógica de actualización en tiempo real
});

// Computed properties
const isFormValid = computed(() => {
  return courseData.value.codigo && courseData.value.nombre;
});
```

---

## 🎯 Funcionalidades Implementadas

### ✅ Experiencia de Usuario 
- **Navegación consistente** entre vistas públicas y administrativas
- **Interfaz intuitiva** con elementos claramente interactivos
- **Feedback visual** mediante notificaciones toast
- **Estados de carga** y manejo de errores

### ✅ Completitud del Entregable
| Módulo | Funcionalidades |
|--------|-----------------|
| **Vista Pública** | Catálogo de cursos, detalles modales, diseño responsive |
| **Autenticación** | Login, Registro, protección de rutas, manejo de sesiones |
| **Panel Admin** | CRUD completo, confirmaciones modales, validaciones |
| **Gestión de Estado** | Stores Pinia para auth, cursos y notificaciones |

### ✅ Responsividad 
- **Mobile-first** approach
- **Breakpoints adaptativos** con Vuetify
- **Elementos táctiles** optimizados para móviles
- **Layouts flexibles** que se adaptan a cualquier pantalla

### ✅ Framework CSS 
```css
/* Uso completo de Vuetify con personalización */
.v-btn { border-radius: 6px; text-transform: none; }
.v-card { border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.header-gradient { background: linear-gradient(135deg, #220070 0%, #72006c 100%); }
```

---

## 🔐 Implementación Firebase (TL)

### Autenticación Segura
```javascript
// Store de autenticación
const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  // Validación y manejo de estado
};

// Protección de rutas
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});
```

### Base de Datos en Tiempo Real
```javascript
// Listener para actualizaciones en vivo
iniciarListenerCursos() {
  return onSnapshot(collection(db, "cursos"), (snapshot) => {
    const cursos = [];
    snapshot.forEach((doc) => {
      cursos.push({ id: doc.id, ...doc.data() });
    });
    this.cursosDisponibles = cursos;
  });
}
```

### Reglas de Seguridad Firestore
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cursos/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Buenas Prácticas Implementadas
- **ES6+ Syntax** (Arrow functions, destructuring, modules)
- **Código Limpio** (variables descriptivas, funciones puras)
- **Comentarios Claros** en lógica compleja
- **Separación de Concerns** (lógica separada por responsabilidades)

---

## 🚀 Despliegue y Optimización

### Proceso de Despliegue
```bash
# Build de producción
npm run build

# Despliegue en Firebase
firebase deploy
```

### Características de Producción
- ⚡ **Build optimizado** con Vite
- 🌍 **CDN global** mediante Firebase Hosting
- 🔒 **SSL automático** y seguridad HTTPS
- 📦 **Assets comprimidos** y minificados

