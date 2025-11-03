export const simpleTheme = {
  name: 'simpleTheme',
  dark: false,
  colors: {
    // Colores principales
    primary: '#001274ff',      // Azul principal
    secondary: '#5b0b69ff',    // Púrpura
    success: '#01bb07ff',      // Verde
    error: '#ff1100ff',        // Rojo
    warning: '#ff9900ff',      // Naranja
    info: '#1596ffff',         // Azul claro
    
    // Colores del gradiente del header
    gradientStart: '#210169',
    gradientEnd: '#4f0556',
    
    // Colores de fondo
    background: '#f8f9fa',
    surface: '#ffffff',
    
    // Colores para texto (opcionales pero recomendados)
    'on-primary': '#ffffff',
    'on-secondary': '#ffffff',
    'on-success': '#ffffff',
    'on-error': '#ffffff',
    'on-warning': '#000000',
    'on-info': '#ffffff'
  },
  
  // Tamaños de fuente (para referencia, no se aplican automáticamente)
  fontSizes: {
    small: '0.875rem',
    normal: '1rem',
    large: '1.25rem',
    xlarge: '1.5rem'
  },
  
  // Espaciado (para referencia)
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px'
  },
  
  // Bordes redondeados (para referencia)
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px'
  }
}