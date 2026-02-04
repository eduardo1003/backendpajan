const db = require("./app/models");

const checkContent = async () => {
    try {
        await db.sequelize.authenticate();
        console.log("✅ Conexión a BD exitosa\n");

        // Verificar contenido
        const contents = await db.content.findAll({
            order: [['section', 'ASC'], ['order', 'ASC']]
        });

        console.log("=== CONTENIDO EN BASE DE DATOS ===");
        console.log(`Total de registros: ${contents.length}\n`);

        const sections = {};
        contents.forEach(item => {
            if (!sections[item.section]) {
                sections[item.section] = [];
            }
            sections[item.section].push({
                id: item.id,
                title: item.title,
                status: item.status,
                order: item.order
            });
        });

        Object.keys(sections).forEach(section => {
            console.log(`\n📁 SECCIÓN: ${section}`);
            sections[section].forEach(item => {
                console.log(`   - [${item.status}] ${item.title} (orden: ${item.order})`);
            });
        });

        // Verificar noticias
        const news = await db.news.findAll({
            order: [['createdAt', 'DESC']]
        });

        console.log("\n\n=== NOTICIAS EN BASE DE DATOS ===");
        console.log(`Total de noticias: ${news.length}\n`);

        news.forEach(item => {
            console.log(`   - [${item.status}] ${item.title} ${item.isFeatured ? '⭐' : ''}`);
        });

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

checkContent();
