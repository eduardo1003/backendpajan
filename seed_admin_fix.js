const db = require("./app/models");
const User = db.user;
const Role = db.role;
const bcrypt = require("bcryptjs");

async function seedAdmin() {
    try {
        // Buscar o crear roles
        const rolesList = ["admin", "tic", "participacion", "comunicacion", "transparencia"];
        for (const name of rolesList) {
            await Role.findOrCreate({ where: { name: name } });
        }

        // Buscar o crear usuario admin
        let user = await User.findOne({ where: { username: "admin" } });
        if (!user) {
            user = await User.create({
                username: "admin",
                email: "admin@gadpajan.gob.ec",
                password: bcrypt.hashSync("admin123", 8)
            });
            console.log("Usuario admin creado.");
        } else {
            user.password = bcrypt.hashSync("admin123", 8);
            await user.save();
            console.log("Contraseña de admin actualizada.");
        }

        // Asignar rol admin
        const adminRole = await Role.findOne({ where: { name: "admin" } });
        await user.setRoles([adminRole]);

        console.log("Rol 'admin' asignado correctamente.");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding admin:", err);
        process.exit(1);
    }
}

seedAdmin();
