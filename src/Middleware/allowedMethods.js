const allowedMethods = (...methods) => {
    return (req, res, next) => {
        if (methods.includes(req.method)) {
            next()
            return
        }
        else {
            res.status(405).json({ message: "Method not Allowed!" })
        }
    }
}

module.exports = { allowedMethods }