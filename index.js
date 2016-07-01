var errors = [];

var fuu = {
    add: function (error) {
        if (Array.isArray(error))
            error.forEach(function (e) {
                fuu.add(e);
            }, this);
        else {
            if (!error.hasOwnProperty('code')) {
                throw new Error('Error must have a code.');
            }
            errors.push(error);
        }
    },
    handlers: {
        expressProd: function (err, req, res, next) {
            var e = fuu.parseError(err);
            res.status(e.status);
            res.send({
                message: e.message,
                error: {}
            });
        },
        expressDev: function (err, req, res, next) {
            var e = fuu.parseError(err);
            res.status(e.status);
            res.send({
                message: e.message,
                error: e.error
            });
        }
    },
    list: function () {
        console.log(errors);
    },
    get: function (code) {
        return errors.filter(e => e.code == code)[0];
    },
    parseError: function (err) {
        var e = null;
        var message;
        var error;
        var status;
        if (err.hasOwnProperty('code'))
            e = fuu.get(err.code);
        if (e != null) {
            message = e.message ? e.message : (err.error ? (err.error.message || '') : '');
            status = e.status ? e.status : (err.error ? (err.error.status || 500) : 500);
            error = err.error || {};
        } else {
            message = err.message;
            status = err.status || 500;
            error = err.error;
        }

        return { message: message, error: error, status: status };
    }
};

module.exports = fuu;