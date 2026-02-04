const db = require("./app/models");
const User = db.user;
const Role = db.role;

async function checkUser() {
    try {
        const user = await User.findOne({
            where: { username: "admin" },
            include: Role
        });

        if (user) {
            console.log("Usuario encontrado:", user.username);
            console.log("Roles:", user.roles.map(r => r.name));
        } else {
            console.log("Usuario 'admin' NO encontrado.");
        }
        process.exit(0);
    } catch (err) {
        console.error("Error checking user:", err);
        process.exit(1);
    }
}

checkUser();
