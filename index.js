var errors = [];

var fuu = {
    /**
     * Add new custom errors to array
     *
     * @param  {String} html
     * @return {String}
     */
    add: function (error) {
        if (Array.isArray(error))
            error.forEach(function (e) {
                add(e);
            }, this);
        else
            errors.push(e);
    },
    handlers: {
        expressProd: function (err, req, res, next) {
            res.status(err.status || 500);
            res.send({
                message: err.message,
                error: err
            });
        },
        expressDev: function (err, req, res, next) {
            res.status(err.status || 500);
            res.send({
                message: err.message,
                error: err
            });
        }
    },
    list: function () {
        console.log(errors);
    }
};

module.exports = fuu;