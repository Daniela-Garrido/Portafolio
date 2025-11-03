import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'

// Tema mejorado
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          // Colores principales
          primary: '#081b88ff',      // Azul principal
          secondary: '#4a0955ff',    // Púrpura
          success: '#4caf50',      // Verde
          error: '#ff1100ff',        // Rojo
          warning: '#ff9800',      // Naranja
          info: '#31a2ffff',         // Azul claro
          
          // Colores de fondo
          background: '#f8f9fa',
          surface: '#ffffff',
          
          // Colores para texto sobre botones
          'on-primary': '#ffffff',
          'on-secondary': '#ffffff',
          'on-success': '#ffffff',
          'on-error': '#ffffff',
          'on-warning': '#000000',
          'on-info': '#ffffff'
        }
      }
    }
  },
  // Opcional: Configuración global de componentes
  defaults: {
    VBtn: {
      variant: 'flat',
      rounded: 'lg'
    },
    VCard: {
      rounded: 'lg'
    }
  }
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')