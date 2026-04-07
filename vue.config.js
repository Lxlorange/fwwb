const path = require('path')

module.exports = {
    publicPath: '/',
    devServer: {
        open: true,
        port: 8080,
        disableHostCheck: true,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    css: {
        sourceMap: true,
        loaderOptions: {
            sass: {
                additionalData: "@import '@/styles/common.scss';"
            }
        }
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => args)
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            }
        }
    }
}
