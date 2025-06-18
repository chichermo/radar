// Script de prueba para verificar el sistema de i18n
const puppeteer = require('puppeteer');

async function testI18n() {
  console.log('🧪 Iniciando pruebas del sistema de i18n...');
  
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navegar a la aplicación
    await page.goto('http://localhost:3004');
    await page.waitForSelector('body', { timeout: 10000 });
    
    console.log('✅ Página cargada correctamente');
    
    // Verificar que los textos estén en español
    const spanishTexts = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      return {
        hasPanelControl: bodyText.includes('Panel de Control'),
        hasMetricas: bodyText.includes('Métricas Avanzadas'),
        hasPredicciones: bodyText.includes('Predicciones IA'),
        hasAnalisis: bodyText.includes('Análisis de Patrones')
      };
    });
    
    console.log('📝 Verificando textos en español:', spanishTexts);
    
    // Buscar el selector de idioma
    const languageSelector = await page.$('[class*="Globe"]');
    if (languageSelector) {
      console.log('✅ Selector de idioma encontrado');
      
      // Hacer clic en el selector de idioma
      await languageSelector.click();
      await page.waitForTimeout(1000);
      
      // Buscar y hacer clic en "English"
      const englishOption = await page.$('button:has-text("English")');
      if (englishOption) {
        await englishOption.click();
        await page.waitForTimeout(2000);
        
        console.log('🔄 Cambiando a inglés...');
        
        // Verificar que los textos estén en inglés
        const englishTexts = await page.evaluate(() => {
          const bodyText = document.body.innerText;
          return {
            hasDashboard: bodyText.includes('Dashboard'),
            hasAdvancedMetrics: bodyText.includes('Advanced Metrics'),
            hasAIPredictions: bodyText.includes('AI Predictions'),
            hasPatternAnalysis: bodyText.includes('Pattern Analysis')
          };
        });
        
        console.log('📝 Verificando textos en inglés:', englishTexts);
        
        // Volver a español
        await languageSelector.click();
        await page.waitForTimeout(1000);
        
        const spanishOption = await page.$('button:has-text("Español")');
        if (spanishOption) {
          await spanishOption.click();
          await page.waitForTimeout(2000);
          console.log('🔄 Volviendo a español...');
        }
      }
    }
    
    console.log('✅ Pruebas completadas exitosamente');
    
  } catch (error) {
    console.error('❌ Error durante las pruebas:', error.message);
  } finally {
    await browser.close();
  }
}

// Ejecutar las pruebas si el script se ejecuta directamente
if (require.main === module) {
  testI18n();
}

module.exports = { testI18n }; 