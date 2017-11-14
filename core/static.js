const serve = require('koa-static')

module.exports = (opts) => {
    return serve(opts.path, opts.options || {})
}
