// eslint-disable-next-line @typescript-eslint/no-var-requires
const { preserveFunctionNamesWithTerser } = require('typesafe-vuex/helpers')

module.exports = {
    // other Vue CLI options, like devServer

    configureWebpack: (config) => {
        preserveFunctionNamesWithTerser(config)
    }
}
