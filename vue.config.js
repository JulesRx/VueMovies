module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/VueMovies/' : '/',
  css: {
    sourceMap: process.env.NODE_ENV === 'production' ? true : false,
  }
}
