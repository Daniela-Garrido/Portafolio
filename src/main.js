import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'

// Importar tu tema personalizado
import { simpleTheme } from './theme/simpleTheme'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'simpleTheme', // Cambia el tema por defecto
    themes: {
      simpleTheme: { // Define tu tema personalizado
        dark: false,
        colors: {
          // Colores principales de simpleTheme
          primary: simpleTheme.colors.primary,      // '#001274ff'
          secondary: simpleTheme.colors.secondary,  // '#5b0b69ff'
          success: simpleTheme.colors.success,      // '#01bb07ff'
          error: simpleTheme.colors.error,          // '#ff1100ff'
          warning: simpleTheme.colors.warning,      // '#ff9900ff'
          info: simpleTheme.colors.info,           // '#1596ffff'
          
          // Colores de fondo
          background: simpleTheme.colors.background,
          surface: simpleTheme.colors.surface,
          
          // Colores para texto sobre botones
          'on-primary': '#ffffff',
          'on-secondary': '#ffffff',
          'on-success': '#ffffff',
          'on-error': '#ffffff',
          'on-warning': '#000000',
          'on-info': '#ffffff'
        }
      },
      // Puedes mantener el tema light original como alternativa
      light: {
        colors: {
          primary: '#081b88ff',
          secondary: '#4a0955ff',
          success: '#4caf50',
          error: '#ff1100ff',
          warning: '#ff9800',
          info: '#31a2ffff',
          background: '#f8f9fa',
          surface: '#ffffff',
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