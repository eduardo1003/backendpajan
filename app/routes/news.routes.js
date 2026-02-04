const { authJwt } = require("../middleware");
const news = require("../controllers/news.controller.js");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Public routes
    app.get("/api/news", news.findAll);
    app.get("/api/news/:id", news.findOne);

    // Admin routes
    app.post("/api/news", [authJwt.verifyToken, authJwt.isAdmin], news.create);
    app.put("/api/news/:id", [authJwt.verifyToken, authJwt.isAdmin], news.update);
    app.delete("/api/news/:id", [authJwt.verifyToken, authJwt.isAdmin], news.delete);
};
