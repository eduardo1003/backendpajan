const axios = require('axios');

const API_URL = 'https://backendpajan.onrender.com';

async function testBackend() {
    console.log('🔍 Probando conexión con backend en Render...\n');

    try {
        // Test 1: Endpoint raíz
        console.log('1️⃣ Probando endpoint raíz...');
        const root = await axios.get(`${API_URL}/`);
        console.log('✅ Respuesta:', root.data);

        // Test 2: Endpoint de content
        console.log('\n2️⃣ Probando endpoint de content...');
        try {
            const content = await axios.get(`${API_URL}/api/content?status=all`);
            console.log('✅ Content encontrado:', content.data.length, 'items');
        } catch (err) {
            console.log('❌ Error en /api/content:', err.response?.status, err.response?.statusText);
            console.log('   Esto significa que las rutas nuevas NO están desplegadas');
        }

        // Test 3: Endpoint de news
        console.log('\n3️⃣ Probando endpoint de news...');
        try {
            const news = await axios.get(`${API_URL}/api/news`);
            console.log('✅ News encontrado:', news.data.length, 'items');
        } catch (err) {
            console.log('❌ Error en /api/news:', err.response?.status, err.response?.statusText);
        }

        // Test 4: Endpoint de transparencia (debería funcionar)
        console.log('\n4️⃣ Probando endpoint de transparencia (existente)...');
        try {
            const transp = await axios.get(`${API_URL}/api/transparencia`);
            console.log('✅ Transparencia funciona:', transp.data.length, 'items');
        } catch (err) {
            console.log('❌ Error en /api/transparencia:', err.response?.status);
        }

    } catch (error) {
        console.error('❌ Error general:', error.message);
    }

    console.log('\n📋 DIAGNÓSTICO:');
    console.log('Si /api/content y /api/news dan 404, el backend NO se actualizó en Render.');
    console.log('Solución: Hacer push al repositorio del backend y esperar que Render redeploy.');
}

testBackend();
