const { authJwt } = require("../middleware");
const content = require("../controllers/content.controller.js");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Public routes
    app.get("/api/content/section/:section", content.findBySection);
    app.get("/api/content", content.findAll);

    // Admin routes
    app.post("/api/content", [authJwt.verifyToken, authJwt.isAdmin], content.create);
    app.put("/api/content/:id", [authJwt.verifyToken, authJwt.isAdmin], content.update);
    app.delete("/api/content/:id", [authJwt.verifyToken, authJwt.isAdmin], content.delete);
};
