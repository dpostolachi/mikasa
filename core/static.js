import serve from 'koa-static'

export default ( opts ) => {
    const { path, options } = opts
    return serve( path, options || {} )
}
