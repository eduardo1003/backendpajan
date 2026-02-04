const db = require("./app/models");
const Content = db.content;
const News = db.news;

const seed = async () => {
    try {
        await db.sequelize.sync({ alter: true });

        // 1. Home Content
        const homeContent = [
            {
                title: "Bienvenidos al GAD Municipal de Paján",
                slug: "bienvenida-inicio",
                content: `<p class="lead">El Gobierno Autónomo Descentralizado Municipal de Paján es una institución comprometida con el desarrollo integral de nuestro cantón, trabajando incansablemente para mejorar la calidad de vida de todos nuestros ciudadanos.</p><p>Nuestra misión es promover el desarrollo sostenible, la participación ciudadana y la prestación de servicios públicos de calidad, siempre con transparencia y eficiencia en la gestión municipal.</p>`,
                section: "inicio",
                type: "page",
                order: 1,
                status: "published",
                isPublic: true
            },
            {
                title: "Gestión Transparente",
                slug: "gestion-transparente",
                content: "Administración pública con total transparencia y rendición de cuentas.",
                section: "inicio",
                type: "block",
                order: 2,
                status: "published",
                isPublic: true
            },
            {
                title: "Participación Ciudadana",
                slug: "participacion-ciudadana-inicio",
                content: "Fomentamos la participación activa de la comunidad en las decisiones municipales.",
                section: "inicio",
                type: "block",
                order: 3,
                status: "published",
                isPublic: true
            },
            {
                title: "Desarrollo Sostenible",
                slug: "desarrollo-sostenible",
                content: "Promovemos el desarrollo económico, social y ambiental sostenible.",
                section: "inicio",
                type: "block",
                order: 4,
                status: "published",
                isPublic: true
            }
        ];

        // 2. Misión y Visión
        const misionVision = [
            {
                title: "Nuestra Misión",
                slug: "mision-institucional",
                content: `
          <p class="lead">El Gobierno Autónomo Descentralizado Municipal de Paján tiene como misión promover el desarrollo integral y sostenible del cantón, garantizando la prestación de servicios públicos de calidad, fomentando la participación ciudadana y el bienestar de todos sus habitantes.</p>
          <ul>
            <li>Gestionar eficientemente los recursos municipales</li>
            <li>Promover el desarrollo económico local</li>
            <li>Mejorar la infraestructura y servicios básicos</li>
            <li>Fomentar la participación ciudadana activa</li>
          </ul>
        `,
                section: "mision-vision",
                type: "page",
                order: 1,
                status: "published",
                isPublic: true
            },
            {
                title: "Nuestra Visión",
                slug: "vision-institucional",
                content: `
          <p class="lead">Ser reconocidos como un cantón modelo en la gestión municipal, caracterizado por su desarrollo sostenible, innovación en servicios públicos, participación ciudadana activa y alta calidad de vida para todos sus habitantes.</p>
        `,
                section: "mision-vision",
                type: "page",
                order: 2,
                status: "published",
                isPublic: true
            },
            {
                title: "Nuestros Valores",
                slug: "valores-institucionales",
                content: `
          <ul>
            <li><strong>Transparencia:</strong> Actuamos con honestidad.</li>
            <li><strong>Participación:</strong> Fomentamos la involucración ciudadana.</li>
            <li><strong>Eficiencia:</strong> Optimizamos el uso de recursos.</li>
          </ul>
        `,
                section: "mision-vision",
                type: "block",
                order: 3,
                status: "published",
                isPublic: true
            }
        ];

        // 3. Historia
        const historia = [
            {
                title: "Nuestra Historia",
                slug: "historia-pajan",
                content: "<p>Paján, conocido como el Granero de Manabí, tiene una rica historia de lucha y desarrollo...</p>",
                section: "historia",
                type: "page",
                order: 1,
                status: "published",
                isPublic: true
            }
        ];

        // 4. Noticias Iniciales
        const initialNews = [
            {
                title: "Inauguración de nuevas obras viales",
                slug: "inauguracion-obras-viales",
                content: "El alcalde de Paján inauguró hoy importantes obras de vialidad en el sector rural...",
                excerpt: "Nuevas vías para conectar nuestras comunidades rurales.",
                category: "Gobierno",
                status: "published",
                isFeatured: true,
                image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800",
                publishedAt: new Date()
            },
            {
                title: "Campaña de Salud Municipal",
                slug: "campana-salud-municipal",
                content: "Este fin de semana se llevará a cabo la brigada médica gratuita...",
                excerpt: "Atención médica gratuita para toda la familia este sábado.",
                category: "Salud",
                status: "published",
                featured: false,
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
                publishedAt: new Date()
            }
        ];

        console.log("Seeding CMS content...");
        const allContent = [...homeContent, ...misionVision, ...historia];
        for (const item of allContent) {
            const [record, created] = await Content.findOrCreate({
                where: { slug: item.slug },
                defaults: item
            });
            if (!created) {
                await record.update(item);
            }
        }

        console.log("Seeding News...");
        for (const item of initialNews) {
            const [record, created] = await News.findOrCreate({
                where: { slug: item.slug },
                defaults: item
            });
            if (!created) {
                await record.update(item);
            }
        }

        console.log("Seeding completed successfully.");
        // process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        // process.exit(1);
    }
};

module.exports = seed;
