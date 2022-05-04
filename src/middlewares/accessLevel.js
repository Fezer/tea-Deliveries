module.exports = {
    associateAccess(req, res, next) {
        if (req.type === "admin") return next();
        if (req.type != 'associate')
            return res.status(403).json({msg: "Não Autorizado"});
        else
            next();
    },

    motoboyAccess(req, res, next) {
        if (req.type === "admin") return next();
        if (req.type != 'motoboy')
            return res.status(403).json({msg: "Não Autorizado"});
        else
            next();
    },

    adminAccess(req, res, next) {
        if (req.headers.adminkey === 'q4992@#R@#$!asdvsc') {
            req.type = 'admin';
        }
        return next();
    }
}