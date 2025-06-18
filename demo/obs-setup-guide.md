# Guía de Configuración OBS Studio para el Dashboard de Anomalías Espaciales

## 🎬 Configuración Inicial de OBS

### 1. Configuración de Video
- **Resolución Base**: 1920x1080
- **Resolución de Salida**: 1920x1080
- **FPS**: 30 o 60 (recomendado 30 para mejor rendimiento)
- **Filtro de Escalado**: Lanczos

### 2. Configuración de Audio
- **Dispositivo de Audio de Escritorio**: Tu altavoz principal
- **Dispositivo de Micrófono**: Tu micrófono
- **Frecuencia de Muestreo**: 48kHz
- **Canales**: Stereo

## 🖥️ Configuración de Escenas

### Escena Principal: Dashboard Completo
1. **Fuente 1**: Captura de Pantalla (Display Capture)
   - Capturar pantalla completa o ventana específica del navegador
   - Resolución: 1920x1080

2. **Fuente 2**: Webcam (opcional)
   - Posición: Esquina inferior derecha
   - Tamaño: 320x240
   - Bordes redondeados con máscara

### Escena 2: Detalles de Anomalías
- Misma configuración pero enfocada en secciones específicas
- Útil para mostrar detalles de asteroides, exoplanetas, etc.

### Escena 3: Vera Rubin Telescope
- Enfoque en la sección del telescopio
- Mostrar alertas y datos en tiempo real

## 🎨 Configuración Visual

### Overlays Recomendados
1. **Logo del Proyecto**
   - Posición: Esquina superior izquierda
   - Tamaño: 120x60px
   - Opacidad: 80%

2. **Información de Anomalía Actual**
   - Posición: Esquina superior derecha
   - Mostrar: Tipo de anomalía, distancia, tiempo
   - Fondo: Semi-transparente negro

3. **Contador de Seguidores/Alertas**
   - Posición: Esquina inferior izquierda
   - Mostrar: Número de alertas activas

### Transiciones
- **Transición Principal**: Fade (1 segundo)
- **Transición Rápida**: Cut (para cambios de escena)

## 🎤 Configuración de Audio

### Filtros de Audio Recomendados
1. **Compressor**
   - Ratio: 4:1
   - Threshold: -20dB
   - Attack: 5ms
   - Release: 50ms

2. **Noise Gate**
   - Threshold: -50dB
   - Attack: 5ms
   - Release: 100ms

3. **Noise Suppression**
   - Nivel: -20dB

## 📹 Configuración de Grabación

### Configuración de Archivo
- **Formato**: MP4
- **Codec**: H.264
- **Bitrate**: 6000 Kbps (1080p)
- **Preset**: Quality
- **Profile**: High
- **Tune**: zerolatency

### Configuración de Streaming (opcional)
- **Plataforma**: YouTube, Twitch, o Facebook Gaming
- **Servidor**: Automático
- **Clave de Stream**: Tu clave personal
- **Bitrate**: 4500 Kbps
- **FPS**: 30

## 🎯 Escenarios de Grabación

### 1. Demo Inicial (5-10 minutos)
- **Introducción**: "Bienvenidos al Dashboard de Anomalías Espaciales"
- **Navegación**: Mostrar todas las secciones principales
- **Características**: Destacar funcionalidades únicas
- **Cierre**: Llamada a la acción

### 2. Análisis de Anomalía Específica (15-20 minutos)
- **Enfoque**: Una anomalía particular
- **Análisis**: Datos, predicciones, contexto
- **Interacción**: Usar comandos de voz, notificaciones
- **Conclusiones**: Implicaciones y próximos pasos

### 3. Tutorial de Funcionalidades (20-30 minutos)
- **Comandos de Voz**: Demostrar sistema de voz
- **Notificaciones**: Configurar alertas
- **Gamificación**: Mostrar logros y sistema de puntos
- **Predicciones IA**: Explicar algoritmos de predicción

## 🎮 Configuración de Hotkeys

### Teclas Recomendadas
- **F1**: Cambiar a Escena Principal
- **F2**: Cambiar a Escena de Detalles
- **F3**: Cambiar a Escena Vera Rubin
- **F4**: Iniciar/Detener Grabación
- **F5**: Iniciar/Detener Streaming
- **F6**: Mute/Unmute Micrófono
- **F7**: Mute/Unmute Audio de Escritorio

## 🎨 Personalización Visual

### Temas de Color
1. **Tema Espacial Oscuro**
   - Fondo: Negro profundo
   - Acentos: Azul eléctrico (#00BFFF)
   - Texto: Blanco (#FFFFFF)

2. **Tema Anomalía**
   - Fondo: Rojo oscuro (#1a0000)
   - Acentos: Naranja (#FF4500)
   - Texto: Amarillo (#FFFF00)

### Efectos Visuales
1. **Transiciones Espaciales**
   - Efecto de partículas estelares
   - Transiciones con zoom espacial
   - Efectos de distorsión temporal

2. **Overlays Dinámicos**
   - Contador de anomalías en tiempo real
   - Gráficos de actividad espacial
   - Alertas emergentes

## 📊 Métricas de Rendimiento

### Monitoreo Durante la Grabación
- **CPU**: Mantener bajo 80%
- **RAM**: Monitorear uso de memoria
- **GPU**: Verificar uso de gráficos
- **FPS**: Mantener estable en 30fps

### Optimización
- **Cerrar aplicaciones innecesarias**
- **Desactivar notificaciones del sistema**
- **Usar modo de rendimiento**
- **Monitorear temperatura del sistema**

## 🎬 Checklist Pre-Grabación

### [ ] Configuración Técnica
- [ ] OBS configurado correctamente
- [ ] Audio probado y calibrado
- [ ] Video configurado y optimizado
- [ ] Hotkeys configuradas
- [ ] Escenas organizadas

### [ ] Contenido Preparado
- [ ] Script revisado
- [ ] Puntos clave identificados
- [ ] Funcionalidades a demostrar listas
- [ ] Datos de ejemplo preparados
- [ ] Backup de configuración

### [ ] Ambiente
- [ ] Iluminación adecuada
- [ ] Ruido ambiental minimizado
- [ ] Conexión a internet estable
- [ ] Dispositivos conectados
- [ ] Bebida y descanso

## 🚀 Próximos Pasos

1. **Configurar OBS** siguiendo esta guía
2. **Probar grabación** de 2-3 minutos
3. **Revisar calidad** de audio y video
4. **Ajustar configuración** según sea necesario
5. **Grabar demo inicial** de 5-10 minutos
6. **Editar y publicar** contenido

## 💡 Consejos Adicionales

- **Practica antes de grabar** en vivo
- **Ten un script pero sé natural**
- **Interactúa con la audiencia** si haces streaming
- **Mantén un ritmo constante** en la narración
- **Usa pausas estratégicas** para enfatizar puntos importantes
- **Ten siempre un plan B** por si algo falla

¡Con esta configuración estarás listo para crear contenido profesional sobre tu dashboard de anomalías espaciales! 