# 🌌 Cosmic Eye - Dashboard de Anomalías Espaciales

Un dashboard avanzado para el monitoreo en tiempo real de objetos espaciales, alertas de colisión y análisis de datos históricos.

## ✨ Características Principales

### 🛰️ **Visualización Orbital 3D**
- Globo terrestre interactivo con satélites en tiempo real
- Trayectorias orbitales animadas
- Efectos de partículas espaciales con Three.js
- Controles de tiempo y velocidad de reproducción

### 🚨 **Sistema de Alertas de Colisión**
- Detección automática de riesgos de colisión
- Clasificación por niveles de riesgo (Alto, Medio, Bajo)
- Información detallada de satélites involucrados
- Tiempo estimado hasta la colisión

### 📊 **Métricas Históricas Avanzadas**
- Dashboard de análisis de datos históricos
- Gráficos de tendencias en tiempo real
- Métricas de satélites activos, lanzamientos y escombros
- Filtros por rangos de tiempo (24h, 7d, 30d, 1y)

### 🔗 **Integración con APIs Reales**
- **Space-Track.org**: Datos de satélites y TLEs
- **NASA APIs**: Imágenes astronómicas y datos de asteroides
- Sistema de cache y rate limiting
- Autenticación segura

### 🎨 **Interfaz Moderna**
- Diseño responsive con Tailwind CSS
- Tema oscuro optimizado para datos espaciales
- Navegación por categorías lógicas
- Efectos visuales avanzados

## 🚀 Roadmap Implementado

### ✅ **Fase 1: Integración de APIs (Completada)**
- [x] Space-Track.org API para datos de satélites
- [x] NASA APIs para imágenes y asteroides
- [x] Sistema de cache y rate limiting
- [x] Manejo de errores robusto

### ✅ **Fase 2: Datos en Tiempo Real (Completada)**
- [x] Alertas de colisión simuladas
- [x] Actualizaciones automáticas
- [x] Monitoreo de múltiples agencias espaciales
- [x] Sistema de notificaciones

### ✅ **Fase 3: Visualizaciones Avanzadas (Completada)**
- [x] Efectos de partículas 3D con Three.js
- [x] Campo de estrellas animado
- [x] Trayectorias orbitales mejoradas
- [x] Controles de visualización

### ✅ **Fase 4: Dashboards Históricos (Completada)**
- [x] Métricas históricas detalladas
- [x] Gráficos de tendencias interactivos
- [x] Análisis de datos por categorías
- [x] Filtros temporales avanzados

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 13, React 18, TypeScript
- **Estilos**: Tailwind CSS, Lucide React Icons
- **3D**: Three.js, React Globe GL
- **APIs**: Space-Track.org, NASA APIs
- **Datos**: Satellite.js para cálculos orbitales

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/cosmic-eye.git
cd cosmic-eye
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.local.example .env.local
```

Editar `.env.local` con tus credenciales:
```env
SPACE_TRACK_USERNAME=tu_usuario
SPACE_TRACK_PASSWORD=tu_password
NASA_API_KEY=tu_api_key
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

## 🔧 Configuración

### APIs Requeridas

#### Space-Track.org
1. Registrarse en [Space-Track.org](https://www.space-track.org/)
2. Obtener credenciales de usuario
3. Configurar en `.env.local`

#### NASA APIs
1. Obtener API key en [api.nasa.gov](https://api.nasa.gov/)
2. Configurar en `.env.local`

## 📱 Páginas Disponibles

- **Dashboard Principal** (`/`): Vista general del sistema
- **Visualización Orbital** (`/orbital`): Globo 3D con satélites
- **Mapa del Cielo** (`/skymap`): Visualización de objetos espaciales
- **Métricas Históricas** (`/metrics`): Análisis de datos históricos
- **Alertas de Colisión**: Modal integrado en el globo
- **NASA APOD** (`/nasa-apod`): Imagen astronómica del día
- **Asteroides NEO** (`/asteroids`): Objetos cercanos a la Tierra
- **Clima Espacial** (`/space-weather`): Condiciones espaciales
- **Configuración** (`/settings`): Ajustes del sistema

## 🎯 Próximas Funcionalidades

### 🔮 **Fase 5: Inteligencia Artificial**
- [ ] Predicción de colisiones con ML
- [ ] Análisis de patrones anómalos
- [ ] Recomendaciones automáticas

### 🌍 **Fase 6: Integración Global**
- [ ] APIs de ESA, JAXA, Roscosmos
- [ ] Datos de estaciones terrestres
- [ ] Red de sensores distribuidos

### 📈 **Fase 7: Análisis Avanzado**
- [ ] Machine Learning para predicciones
- [ ] Análisis de big data espacial
- [ ] Reportes automáticos

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- **Space-Track.org** por proporcionar datos de satélites
- **NASA** por sus APIs públicas
- **Three.js** por la librería 3D
- **React Globe GL** por el componente de globo

## 📞 Contacto

- **Desarrollador**: [Tu Nombre]
- **Email**: tu-email@ejemplo.com
- **GitHub**: [@tu-usuario](https://github.com/tu-usuario)

---

⭐ **¡Si te gusta este proyecto, dale una estrella en GitHub!**