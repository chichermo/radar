const nodemailer = require('nodemailer');
const fs = require('fs');

// ============================================================================
// CONFIGURACIÓN DEL REMITENTE - ¡EDITA ESTOS DATOS!
// ============================================================================
const SENDER_CONFIG = {
  name: "Tu Nombre",
  email: "tu-email@gmail.com", // Tu email de Gmail
  password: "tu-password-app", // Contraseña de aplicación de Gmail
  phone: "+1-XXX-XXX-XXXX",
  linkedin: "linkedin.com/in/tu-perfil"
};

// ============================================================================
// CONFIGURACIÓN DE LA CAMPAÑA
// ============================================================================
const CAMPAIGN_CONFIG = {
  delayBetweenEmails: 30000, // 30 segundos entre emails
  maxEmailsPerDay: 50,
  followUpDays: 7,
  testMode: true // Cambiar a false para envío real
};

// ============================================================================
// LISTA COMPLETA DE DESTINATARIOS
// ============================================================================
const DESTINATARIOS = [
  // UNIVERSIDADES
  {
    nombre: "MIT (Massachusetts Institute of Technology)",
    contacto: "Department of Physics, Astrophysics Division",
    email: "physics@mit.edu",
    valor: 45000,
    categoria: "universidad",
    pais: "Estados Unidos"
  },
  {
    nombre: "Harvard University",
    contacto: "Harvard-Smithsonian Center for Astrophysics",
    email: "cfa@cfa.harvard.edu",
    valor: 50000,
    categoria: "universidad",
    pais: "Estados Unidos"
  },
  {
    nombre: "Stanford University",
    contacto: "Department of Physics, Astrophysics Group",
    email: "physics@stanford.edu",
    valor: 40000,
    categoria: "universidad",
    pais: "Estados Unidos"
  },
  {
    nombre: "Universidad de Cambridge",
    contacto: "Institute of Astronomy",
    email: "astro@cam.ac.uk",
    valor: 35000,
    categoria: "universidad",
    pais: "Reino Unido"
  },
  {
    nombre: "Universidad de Leiden",
    contacto: "Leiden Observatory",
    email: "info@strw.leidenuniv.nl",
    valor: 30000,
    categoria: "universidad",
    pais: "Holanda"
  },
  {
    nombre: "Universidad Nacional Autónoma de México (UNAM)",
    contacto: "Instituto de Astronomía",
    email: "astro@astro.unam.mx",
    valor: 25000,
    categoria: "universidad",
    pais: "México"
  },
  {
    nombre: "Universidad de Chile",
    contacto: "Departamento de Astronomía",
    email: "astro@uchile.cl",
    valor: 25000,
    categoria: "universidad",
    pais: "Chile"
  },
  {
    nombre: "American Museum of Natural History",
    contacto: "Hayden Planetarium",
    email: "planetarium@amnh.org",
    valor: 35000,
    categoria: "museo",
    pais: "Estados Unidos"
  },
  {
    nombre: "Griffith Observatory",
    contacto: "Director of Programs",
    email: "info@griffithobservatory.org",
    valor: 30000,
    categoria: "museo",
    pais: "Estados Unidos"
  },
  {
    nombre: "Planetario Galileo Galilei",
    contacto: "Dirección",
    email: "info@planetario.gob.ar",
    valor: 20000,
    categoria: "museo",
    pais: "Argentina"
  },
  
  // AGENCIAS ESPACIALES
  {
    nombre: "NASA",
    contacto: "Science Mission Directorate",
    email: "science@nasa.gov",
    valor: 100000,
    categoria: "agencia_espacial",
    pais: "Estados Unidos"
  },
  {
    nombre: "ESA (Agencia Espacial Europea)",
    contacto: "Directorate of Science",
    email: "science@esa.int",
    valor: 80000,
    categoria: "agencia_espacial",
    pais: "Europa"
  },
  {
    nombre: "CONAE",
    contacto: "Dirección de Proyectos",
    email: "info@conae.gov.ar",
    valor: 40000,
    categoria: "agencia_espacial",
    pais: "Argentina"
  },
  {
    nombre: "AEB",
    contacto: "Coordenação de Satélites",
    email: "aeb@aeb.gov.br",
    valor: 35000,
    categoria: "agencia_espacial",
    pais: "Brasil"
  },
  
  // EMPRESAS TECNOLÓGICAS
  {
    nombre: "SpaceX",
    contacto: "Starlink Division",
    email: "starlink@spacex.com",
    valor: 60000,
    categoria: "empresa_espacial",
    pais: "Estados Unidos"
  },
  {
    nombre: "Blue Origin",
    contacto: "New Shepard Operations",
    email: "operations@blueorigin.com",
    valor: 45000,
    categoria: "empresa_espacial",
    pais: "Estados Unidos"
  },
  {
    nombre: "Virgin Galactic",
    contacto: "Flight Operations",
    email: "flightops@virgingalactic.com",
    valor: 40000,
    categoria: "empresa_espacial",
    pais: "Estados Unidos"
  },
  
  // MEDIOS DE COMUNICACIÓN
  {
    nombre: "Discovery Channel",
    contacto: "Science Programming",
    email: "science@discovery.com",
    valor: 30000,
    categoria: "medio",
    pais: "Estados Unidos"
  },
  {
    nombre: "National Geographic",
    contacto: "Science Content",
    email: "science@natgeo.com",
    valor: 35000,
    categoria: "medio",
    pais: "Estados Unidos"
  },
  {
    nombre: "BBC Earth",
    contacto: "Science Commissioning",
    email: "science@bbc.com",
    valor: 25000,
    categoria: "medio",
    pais: "Reino Unido"
  },
  
  // ORGANIZACIONES DE INVESTIGACIÓN
  {
    nombre: "European Southern Observatory (ESO)",
    contacto: "Science Operations",
    email: "science@eso.org",
    valor: 70000,
    categoria: "observatorio",
    pais: "Chile/Alemania"
  },
  {
    nombre: "Gemini Observatory",
    contacto: "Operations Director",
    email: "operations@gemini.edu",
    valor: 45000,
    categoria: "observatorio",
    pais: "Estados Unidos/Chile"
  },
  {
    nombre: "Las Cumbres Observatory",
    contacto: "Science Director",
    email: "science@lco.global",
    valor: 35000,
    categoria: "observatorio",
    pais: "Estados Unidos"
  }
];

// ============================================================================
// PLANTILLA UNIVERSAL DEL EMAIL
// ============================================================================
const PLANTILLA_UNIVERSAL = `
Estimado/a [NOMBRE_CONTACTO],

Espero que este correo le encuentre bien. Soy [TU_NOMBRE], desarrollador de COSMIC EYE, una plataforma de monitoreo espacial avanzada que está transformando la forma en que se observa y analiza el universo.

¿Por qué COSMIC EYE es perfecto para [NOMBRE_INSTITUCION]?

🛰️ Monitoreo en Tiempo Real: Seguimiento preciso de satélites, asteroides y objetos espaciales con actualizaciones cada 15 segundos.

🔬 Datos Integrados: Acceso unificado a múltiples telescopios incluyendo Vera Rubin, JWST, y observatorios globales.

🤖 IA Avanzada: Sistema de inteligencia artificial para clasificación automática y predicción de eventos astronómicos.

🌍 Colaboración Global: Conecta con redes internacionales y permite intercambio de datos en tiempo real.

Características Destacadas:
• Mapa estelar 3D interactivo con 100,000+ estrellas reales
• Alertas en tiempo real de eventos astronómicos
• Dashboard de métricas y estadísticas espaciales
• Sistema de IA para predicciones climáticas espaciales
• Interfaz responsive para cualquier dispositivo
• APIs abiertas para integración con sistemas existentes

Beneficios Específicos para [NOMBRE_INSTITUCION]:
• Reducción de Costos: Optimización automática de recursos y operaciones
• Mejora de Eficiencia: Automatización de procesos críticos de monitoreo
• Ventaja Tecnológica: Plataforma de vanguardia para investigación y operaciones
• Escalabilidad: Crecimiento adaptado a las necesidades de su organización

Inversión: $[VALOR] USD (incluye licencia perpetua, soporte técnico y actualizaciones)

Demo Disponible: Me encantaría programar una demostración en vivo de 30 minutos para mostrar cómo COSMIC EYE puede beneficiar específicamente a [NOMBRE_INSTITUCION].

¿Podríamos agendar una reunión virtual la próxima semana? Estoy disponible para coordinar horarios que se adapten a su agenda.

Saludos cordiales,

[TU_NOMBRE]
Desarrollador de COSMIC EYE
[TU_EMAIL]
[TU_TELEFONO]
[TU_LINKEDIN]

---
Este es un mensaje personalizado para [NOMBRE_INSTITUCION]. Si no desea recibir futuras comunicaciones, puede responder con "Cancelar suscripción".
`;

// ============================================================================
// FUNCIONES PRINCIPALES
// ============================================================================

// Configurar el transportador de email
function configurarTransportador() {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: SENDER_CONFIG.email,
      pass: SENDER_CONFIG.password
    }
  });
}

// Personalizar el email
function personalizarEmail(destinatario) {
  return PLANTILLA_UNIVERSAL
    .replace(/\[NOMBRE_INSTITUCION\]/g, destinatario.nombre)
    .replace(/\[NOMBRE_CONTACTO\]/g, destinatario.contacto)
    .replace(/\[TU_NOMBRE\]/g, SENDER_CONFIG.name)
    .replace(/\[TU_EMAIL\]/g, SENDER_CONFIG.email)
    .replace(/\[TU_TELEFONO\]/g, SENDER_CONFIG.phone)
    .replace(/\[TU_LINKEDIN\]/g, SENDER_CONFIG.linkedin)
    .replace(/\[VALOR\]/g, destinatario.valor.toLocaleString());
}

// Enviar email individual
async function enviarEmail(destinatario, transporter) {
  const emailPersonalizado = personalizarEmail(destinatario);
  const subject = `Revolucionando el Monitoreo Espacial: COSMIC EYE para ${destinatario.nombre}`;

  const mailOptions = {
    from: `${SENDER_CONFIG.name} <${SENDER_CONFIG.email}>`,
    to: destinatario.email,
    subject: subject,
    text: emailPersonalizado,
    html: emailPersonalizado.replace(/\n/g, '<br>')
  };

  if (CAMPAIGN_CONFIG.testMode) {
    console.log(`📧 [MODO PRUEBA] Email simulado para: ${destinatario.nombre} (${destinatario.email})`);
    console.log(`📝 Asunto: ${subject}`);
    console.log(`📄 Contenido: ${emailPersonalizado.substring(0, 200)}...`);
    console.log('─'.repeat(80));
    return { success: true, messageId: `test_${Date.now()}` };
  } else {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Email enviado exitosamente a ${destinatario.nombre} (${destinatario.email})`);
      console.log(`📧 Message ID: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(`❌ Error enviando email a ${destinatario.nombre}:`, error.message);
      return { success: false, error: error.message };
    }
  }
}

// Función principal de envío masivo
async function enviarCampanaMasiva() {
  console.log('🚀 Iniciando campaña masiva de emails...');
  console.log(`📊 Total de destinatarios: ${DESTINATARIOS.length}`);
  console.log(`⚙️ Modo: ${CAMPAIGN_CONFIG.testMode ? 'PRUEBA' : 'REAL'}`);
  console.log('─'.repeat(80));

  let emailsEnviados = 0;
  let emailsExitosos = 0;
  let emailsFallidos = 0;

  const transporter = configurarTransportador();

  for (const destinatario of DESTINATARIOS) {
    try {
      const resultado = await enviarEmail(destinatario, transporter);
      
      if (resultado.success) {
        emailsExitosos++;
      } else {
        emailsFallidos++;
      }

      emailsEnviados++;

      // Esperar entre emails para evitar spam
      if (emailsEnviados < DESTINATARIOS.length) {
        console.log(`⏳ Esperando ${CAMPAIGN_CONFIG.delayBetweenEmails / 1000} segundos...`);
        await new Promise(resolve => setTimeout(resolve, CAMPAIGN_CONFIG.delayBetweenEmails));
      }

      // Verificar límite diario
      if (emailsEnviados >= CAMPAIGN_CONFIG.maxEmailsPerDay) {
        console.log(`⏰ Límite diario alcanzado (${CAMPAIGN_CONFIG.maxEmailsPerDay} emails)`);
        break;
      }

    } catch (error) {
      emailsFallidos++;
      console.error(`❌ Error inesperado con ${destinatario.nombre}:`, error.message);
    }
  }

  // Reporte final
  console.log('─'.repeat(80));
  console.log('📊 REPORTE FINAL DE CAMPAÑA:');
  console.log(`📧 Total de destinatarios: ${DESTINATARIOS.length}`);
  console.log(`📤 Emails enviados: ${emailsEnviados}`);
  console.log(`✅ Emails exitosos: ${emailsExitosos}`);
  console.log(`❌ Emails fallidos: ${emailsFallidos}`);
  console.log(`📈 Tasa de éxito: ${((emailsExitosos / emailsEnviados) * 100).toFixed(2)}%`);
  
  // Guardar reporte en archivo
  const reporte = {
    fecha: new Date().toISOString(),
    configuracion: CAMPAIGN_CONFIG,
    metricas: {
      totalDestinatarios: DESTINATARIOS.length,
      emailsEnviados,
      emailsExitosos,
      emailsFallidos,
      tasaExito: ((emailsExitosos / emailsEnviados) * 100).toFixed(2) + '%'
    }
  };

  fs.writeFileSync('reporte-campana.json', JSON.stringify(reporte, null, 2));
  console.log('💾 Reporte guardado en: reporte-campana.json');
}

// ============================================================================
// FUNCIONES ADICIONALES
// ============================================================================

// Enviar solo a una categoría específica
async function enviarPorCategoria(categoria) {
  const destinatariosFiltrados = DESTINATARIOS.filter(d => d.categoria === categoria);
  console.log(`🎯 Enviando emails solo a categoría: ${categoria}`);
  console.log(`📊 Destinatarios en esta categoría: ${destinatariosFiltrados.length}`);
  
  // Crear una copia temporal de la configuración
  const configOriginal = { ...CAMPAIGN_CONFIG };
  CAMPAIGN_CONFIG.maxEmailsPerDay = destinatariosFiltrados.length;
  
  // Ejecutar campaña con destinatarios filtrados
  const destinatariosOriginales = [...DESTINATARIOS];
  DESTINATARIOS.length = 0;
  DESTINATARIOS.push(...destinatariosFiltrados);
  
  await enviarCampanaMasiva();
  
  // Restaurar configuración original
  DESTINATARIOS.length = 0;
  DESTINATARIOS.push(...destinatariosOriginales);
  Object.assign(CAMPAIGN_CONFIG, configOriginal);
}

// Generar lista de emails para copiar/pegar
function generarListaEmails() {
  const emails = DESTINATARIOS.map(d => d.email).join(', ');
  console.log('📧 Lista de emails para copiar/pegar:');
  console.log(emails);
  
  fs.writeFileSync('lista-emails.txt', emails);
  console.log('💾 Lista guardada en: lista-emails.txt');
}

// Mostrar estadísticas por categoría
function mostrarEstadisticas() {
  const stats = {};
  DESTINATARIOS.forEach(d => {
    if (!stats[d.categoria]) {
      stats[d.categoria] = { count: 0, totalValue: 0 };
    }
    stats[d.categoria].count++;
    stats[d.categoria].totalValue += d.valor;
  });

  console.log('📊 ESTADÍSTICAS POR CATEGORÍA:');
  Object.entries(stats).forEach(([categoria, data]) => {
    console.log(`${categoria}: ${data.count} destinatarios - $${data.totalValue.toLocaleString()} USD total`);
  });
}

// ============================================================================
// EJECUCIÓN PRINCIPAL
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  
  switch (args[0]) {
    case 'todos':
      await enviarCampanaMasiva();
      break;
    case 'universidad':
      await enviarPorCategoria('universidad');
      break;
    case 'agencia_espacial':
      await enviarPorCategoria('agencia_espacial');
      break;
    case 'empresa_espacial':
      await enviarPorCategoria('empresa_espacial');
      break;
    case 'medio':
      await enviarPorCategoria('medio');
      break;
    case 'observatorio':
      await enviarPorCategoria('observatorio');
      break;
    case 'emails':
      generarListaEmails();
      break;
    case 'stats':
      mostrarEstadisticas();
      break;
    default:
      console.log('🚀 COSMIC EYE - Herramienta de Envío Masivo de Emails');
      console.log('');
      console.log('📋 Comandos disponibles:');
      console.log('  node email-sender.js todos          - Enviar a todos los destinatarios');
      console.log('  node email-sender.js universidad    - Enviar solo a universidades');
      console.log('  node email-sender.js agencia_espacial - Enviar solo a agencias espaciales');
      console.log('  node email-sender.js empresa_espacial - Enviar solo a empresas espaciales');
      console.log('  node email-sender.js medio          - Enviar solo a medios de comunicación');
      console.log('  node email-sender.js observatorio   - Enviar solo a observatorios');
      console.log('  node email-sender.js emails         - Generar lista de emails');
      console.log('  node email-sender.js stats          - Mostrar estadísticas');
      console.log('');
      console.log('⚠️  IMPORTANTE:');
      console.log('  1. Edita SENDER_CONFIG con tus datos');
      console.log('  2. Configura tu contraseña de aplicación de Gmail');
      console.log('  3. Cambia testMode a false para envío real');
      console.log('  4. Instala nodemailer: npm install nodemailer');
  }
}

// Ejecutar si es el archivo principal
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  enviarCampanaMasiva,
  enviarPorCategoria,
  generarListaEmails,
  mostrarEstadisticas
}; 