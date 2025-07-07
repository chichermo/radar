# 📧 Sistema de Envío Masivo de Emails - COSMIC EYE

## 🚀 Configuración Rápida

### 1. Instalar Dependencias
```bash
cd marketing
npm install
```

### 2. Configurar Gmail
1. Ve a tu cuenta de Gmail
2. Activa la verificación en dos pasos
3. Genera una contraseña de aplicación:
   - Ve a "Seguridad" → "Contraseñas de aplicación"
   - Selecciona "Correo" y "Windows"
   - Copia la contraseña generada

### 3. Editar Configuración
Abre `email-sender.js` y edita estas líneas:
```javascript
const SENDER_CONFIG = {
  name: "Tu Nombre Real",
  email: "tu-email@gmail.com",
  password: "tu-contraseña-de-aplicación", // La que generaste en Gmail
  phone: "+1-XXX-XXX-XXXX",
  linkedin: "linkedin.com/in/tu-perfil"
};
```

### 4. Probar el Sistema
```bash
# Modo prueba (no envía emails reales)
npm run test

# Ver estadísticas
npm run stats

# Generar lista de emails
npm run emails
```

## 📋 Comandos Disponibles

### Envío Masivo
```bash
# Enviar a TODOS los destinatarios
npm start todos

# Enviar solo a universidades
npm run universidades

# Enviar solo a agencias espaciales
npm run agencias

# Enviar solo a empresas espaciales
npm run empresas

# Enviar solo a medios de comunicación
npm run medios

# Enviar solo a observatorios
npm run observatorios
```

### Utilidades
```bash
# Ver estadísticas por categoría
npm run stats

# Generar lista de emails para copiar/pegar
npm run emails
```

## ⚙️ Configuración Avanzada

### Modo Real vs Prueba
En `email-sender.js`, cambia esta línea:
```javascript
const CAMPAIGN_CONFIG = {
  testMode: true, // Cambiar a false para envío real
  delayBetweenEmails: 30000, // 30 segundos entre emails
  maxEmailsPerDay: 50
};
```

### Personalizar Plantilla
Edita la variable `PLANTILLA_UNIVERSAL` en `email-sender.js` para cambiar el mensaje.

## 📊 Destinatarios Incluidos

### 🎓 Universidades (10)
- MIT, Harvard, Stanford, Cambridge, Leiden
- UNAM, Universidad de Chile
- American Museum of Natural History
- Griffith Observatory, Planetario Galileo Galilei

### 🛰️ Agencias Espaciales (4)
- NASA, ESA, CONAE, AEB

### 💼 Empresas Espaciales (3)
- SpaceX, Blue Origin, Virgin Galactic

### 📺 Medios de Comunicación (3)
- Discovery Channel, National Geographic, BBC Earth

### 🔬 Observatorios (3)
- ESO, Gemini Observatory, Las Cumbres Observatory

**Total: 23 destinatarios**

## 📈 Reportes y Seguimiento

### Archivos Generados
- `reporte-campana.json` - Reporte detallado de la campaña
- `lista-emails.txt` - Lista de emails para copiar/pegar

### Métricas Incluidas
- Total de emails enviados
- Emails exitosos vs fallidos
- Tasa de éxito
- Estadísticas por categoría
- Valor total estimado

## ⚠️ Consideraciones Importantes

### Límites de Gmail
- **Gmail gratuito:** 500 emails/día
- **Gmail Workspace:** 2,000 emails/día
- **Recomendado:** No más de 50 emails por sesión

### Mejores Prácticas
- ✅ Enviar en horarios laborales (9 AM - 5 PM)
- ✅ Esperar 30 segundos entre emails
- ✅ Personalizar cada email (ya incluido)
- ✅ Incluir opción de cancelar suscripción (ya incluido)
- ✅ Seguir leyes anti-spam

### Servicios Alternativos
Si necesitas enviar más emails, considera:
1. **SendGrid** - 100 emails/día gratis
2. **Mailgun** - 5,000 emails/mes gratis
3. **AWS SES** - Muy económico para grandes volúmenes

## 🔧 Solución de Problemas

### Error de Autenticación
```
Error: Invalid login
```
**Solución:** Verifica que estés usando la contraseña de aplicación, no tu contraseña normal.

### Error de Límite
```
Error: Message failed: 550 5.7.1
```
**Solución:** Reduce el número de emails por día o usa un servicio profesional.

### Error de Conexión
```
Error: connect ETIMEDOUT
```
**Solución:** Verifica tu conexión a internet y los ajustes de firewall.

## 📞 Soporte

Si tienes problemas:
1. Verifica que todas las dependencias estén instaladas
2. Confirma que tu configuración de Gmail sea correcta
3. Revisa los logs de error en la consola
4. Prueba primero en modo test

## 🎯 Próximos Pasos

1. **Configura tu Gmail** con contraseña de aplicación
2. **Edita tu información** en SENDER_CONFIG
3. **Prueba en modo test** primero
4. **Ejecuta la campaña** cuando estés listo
5. **Monitorea las respuestas** y haz seguimiento

---

*Herramienta desarrollada para COSMIC EYE - Enero 2024* 