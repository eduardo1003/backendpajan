const db = require("./app/models");
const Role = db.role;
const User = db.user;
const bcrypt = require("bcryptjs");

// Sincronizar y forzar creación de tablas para la nueva DB
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

async function initial() {
    try {
        await Role.create({ id: 1, name: "user" });
        await Role.create({ id: 2, name: "tic" });
        await Role.create({ id: 3, name: "admin" });
        await Role.create({ id: 4, name: "participacion" });
        await Role.create({ id: 5, name: "comunicacion" });
        await Role.create({ id: 6, name: "transparencia" });

        console.log("Roles created.");

        // Crear el superadmin por defecto solicitado
        const admin = await User.create({
            username: "admin",
            email: "admin@gadpajan.gob.ec",
            password: bcrypt.hashSync("admin123", 8)
        });

        const adminRole = await Role.findOne({ where: { name: "admin" } });
        await admin.setRoles([adminRole]);

        console.log("Superadmin created: admin / admin123");
        console.log("Database seeded successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding database:", err);
        process.exit(1);
    }
}
