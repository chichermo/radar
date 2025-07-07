# 🚀 Configuración Completa del Sistema de Emails - COSMIC EYE

## 📋 Checklist de Configuración

### ✅ Paso 1: Preparar Gmail
- [ ] Activar verificación en dos pasos en Gmail
- [ ] Generar contraseña de aplicación
- [ ] Probar acceso con la nueva contraseña

### ✅ Paso 2: Instalar Herramientas
- [ ] Instalar Node.js (si no lo tienes)
- [ ] Navegar a la carpeta marketing
- [ ] Ejecutar `npm install`

### ✅ Paso 3: Configurar Datos Personales
- [ ] Editar `email-sender.js`
- [ ] Actualizar SENDER_CONFIG con tus datos
- [ ] Verificar que la contraseña de aplicación sea correcta

### ✅ Paso 4: Probar el Sistema
- [ ] Ejecutar `npm run test` (modo prueba)
- [ ] Verificar que no hay errores
- [ ] Revisar los logs de simulación

### ✅ Paso 5: Envío Real
- [ ] Cambiar `testMode: false` en email-sender.js
- [ ] Ejecutar campaña completa o por categoría
- [ ] Monitorear resultados

---

## 🔧 Instrucciones Detalladas

### 1. Configurar Gmail

#### Activar Verificación en Dos Pasos
1. Ve a tu cuenta de Google
2. Navega a "Seguridad"
3. Busca "Verificación en dos pasos"
4. Actívala siguiendo las instrucciones

#### Generar Contraseña de Aplicación
1. Ve a "Seguridad" → "Contraseñas de aplicación"
2. Selecciona "Correo" como aplicación
3. Selecciona "Windows" como dispositivo
4. Copia la contraseña de 16 caracteres generada

### 2. Instalar Node.js

#### Windows
1. Ve a https://nodejs.org/
2. Descarga la versión LTS
3. Instala siguiendo el asistente
4. Verifica instalación: `node --version`

#### macOS
```bash
brew install node
```

#### Linux
```bash
sudo apt update
sudo apt install nodejs npm
```

### 3. Configurar el Proyecto

#### Navegar al Directorio
```bash
cd marketing
```

#### Instalar Dependencias
```bash
npm install
```

#### Editar Configuración
Abre `email-sender.js` y edita estas líneas:

```javascript
const SENDER_CONFIG = {
  name: "Tu Nombre Real",           // ← Editar
  email: "tu-email@gmail.com",      // ← Editar
  password: "abcd-efgh-ijkl-mnop",  // ← Editar (contraseña de aplicación)
  phone: "+1-XXX-XXX-XXXX",         // ← Editar
  linkedin: "linkedin.com/in/tu-perfil" // ← Editar
};
```

### 4. Probar el Sistema

#### Modo Prueba
```bash
npm run test
```

Deberías ver algo como:
```
🚀 Iniciando campaña masiva de emails...
📊 Total de destinatarios: 23
⚙️ Modo: PRUEBA
📧 [MODO PRUEBA] Email simulado para: MIT...
```

#### Ver Estadísticas
```bash
npm run stats
```

#### Generar Lista de Emails
```bash
npm run emails
```

### 5. Envío Real

#### Cambiar a Modo Real
En `email-sender.js`, cambia:
```javascript
const CAMPAIGN_CONFIG = {
  testMode: false, // ← Cambiar de true a false
  // ... resto de configuración
};
```

#### Ejecutar Campaña Completa
```bash
npm start todos
```

#### Ejecutar por Categoría
```bash
npm run universidades    # Solo universidades
npm run agencias        # Solo agencias espaciales
npm run empresas        # Solo empresas espaciales
npm run medios          # Solo medios de comunicación
npm run observatorios   # Solo observatorios
```

---

## 📊 Monitoreo y Seguimiento

### Archivos Generados
- `reporte-campana.json` - Reporte detallado
- `lista-emails.txt` - Lista de emails

### Métricas a Revisar
- Total de emails enviados
- Emails exitosos vs fallidos
- Tasa de éxito
- Respuestas recibidas

### Seguimiento Manual
1. Revisa tu bandeja de entrada
2. Responde a las consultas rápidamente
3. Programa demos para interesados
4. Mantén un registro de contactos

---

## ⚠️ Solución de Problemas

### Error: "Invalid login"
**Causa:** Contraseña incorrecta
**Solución:** Verifica que uses la contraseña de aplicación, no tu contraseña normal

### Error: "Message failed: 550"
**Causa:** Límite de Gmail alcanzado
**Solución:** Reduce emails por día o usa servicio profesional

### Error: "connect ETIMEDOUT"
**Causa:** Problema de conexión
**Solución:** Verifica internet y firewall

### Error: "nodemailer not found"
**Causa:** Dependencias no instaladas
**Solución:** Ejecuta `npm install` nuevamente

---

## 🎯 Estrategia de Envío Recomendada

### Semana 1: Pruebas
- Configura todo el sistema
- Prueba con 2-3 emails manuales
- Verifica que todo funcione

### Semana 2: Campaña Inicial
- Envía a universidades (10 emails)
- Monitorea respuestas
- Ajusta plantilla si es necesario

### Semana 3: Expansión
- Envía a agencias espaciales (4 emails)
- Envía a empresas espaciales (3 emails)
- Continúa monitoreo

### Semana 4: Finalización
- Envía a medios y observatorios
- Haz seguimiento a interesados
- Programa demos

---

## 📞 Soporte y Contacto

Si tienes problemas:
1. Revisa los logs de error
2. Verifica la configuración
3. Prueba en modo test primero
4. Consulta la documentación de nodemailer

---

*Configuración completada para COSMIC EYE - Enero 2024* 