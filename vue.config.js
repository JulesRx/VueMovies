module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/scss/settings.scss";'
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/VueMovies/' : '/'
}
