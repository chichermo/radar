# Configuración de APIs

Para que todas las funcionalidades del dashboard funcionen correctamente, necesitas configurar algunas variables de entorno.

## 1. Crear archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# NASA API Key (obtén una gratis en https://api.nasa.gov/)
NEXT_PUBLIC_NASA_API_KEY=DEMO_KEY

# Mapbox Token (obtén uno gratis en https://www.mapbox.com/)
NEXT_PUBLIC_MAPBOX_TOKEN=

# Space-Track.org Credentials (opcional, para datos reales de satélites)
SPACE_TRACK_USERNAME=
SPACE_TRACK_PASSWORD=

# Vera Rubin Observatory API (opcional)
VERA_RUBIN_API_KEY=

# Otras APIs espaciales
HEAVENS_ABOVE_API_KEY=
```

## 2. Obtener las API Keys

### NASA API Key (Gratuita)
1. Ve a https://api.nasa.gov/
2. Haz clic en "Get Started"
3. Completa el formulario
4. Recibirás tu API key por email
5. Reemplaza `DEMO_KEY` con tu key real

### Mapbox Token (Gratuito)
1. Ve a https://www.mapbox.com/
2. Crea una cuenta gratuita
3. Ve a tu dashboard
4. Copia tu access token
5. Pégalo en `NEXT_PUBLIC_MAPBOX_TOKEN`

### Space-Track.org (Opcional)
1. Ve a https://www.space-track.org/
2. Regístrate para una cuenta
3. Solicita acceso (puede tomar tiempo)
4. Usa tus credenciales en las variables correspondientes

## 3. Reiniciar el servidor

Después de configurar las variables de entorno, reinicia el servidor de desarrollo:

```bash
npm run dev
```

## 4. Verificar funcionamiento

- **NASA APOD**: Debería mostrar imágenes del día
- **Mapa de Satélites**: Debería mostrar el mapa interactivo
- **Datos de Asteroides**: Debería mostrar datos reales de la NASA
- **SkyMap**: Debería cargar sin errores

## Notas

- Si no configuras las APIs, el sistema usará datos simulados
- La NASA API tiene un límite de 1000 requests por día
- Mapbox tiene un límite gratuito de 50,000 map loads por mes
- Space-Track requiere aprobación manual para el acceso

## Errores Comunes y Soluciones

### Error: "data.filter is not a function"
- **Causa**: Las APIs devuelven datos con estructura diferente a la esperada
- **Solución**: Ya corregido en el código, el sistema maneja automáticamente diferentes estructuras de datos

### Error: "Failed to fetch Mapbox"
- **Causa**: No hay token de Mapbox configurado
- **Solución**: Configura `NEXT_PUBLIC_MAPBOX_TOKEN` o el sistema mostrará un fallback informativo

### Error: "Space-Track authentication failed"
- **Causa**: Credenciales incorrectas o no configuradas
- **Solución**: El sistema usa automáticamente datos simulados cuando falla la autenticación
