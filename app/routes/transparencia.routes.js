const { authJwt } = require("../middleware");
const controller = require("../controllers/transparencia.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/transparencia", controller.findAll);
    app.get("/api/transparencia/years", controller.findYears);
    app.get("/api/transparencia/:id", controller.findOne);

    app.post(
        "/api/transparencia",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.create
    );

    app.put(
        "/api/transparencia/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.update
    );

    app.delete(
        "/api/transparencia/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.delete
    );
};
