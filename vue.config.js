const path = require('path');

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}

var port = 2680;
var public = 'ice.broke-it.net';
// vue.config.js
module.exports = {
  //lintOnSave: true,
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        src: resolveSrc('src'),
        assets: resolveSrc('src/assets'),
      },
      extensions: ['*', '.mjs', '.js', '.vue', '.json', '.gql', '.graphql'],
    },
    module: {
      rules: [
        // fixes https://github.com/graphql/graphql-js/issues/1272
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true,
      inline: true,
      host: '0.0.0.0',
      port: port,
      public: public,
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:2690',
      //     //pathRewrite: { '^/api': '' },
      //   },
      // },
      //allowedHosts: ['ice.broke-it.net:2680', 'ice.broke-it.net'],
    },
  },
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'scss',
  //     patterns: [path.resolve(__dirname, './src/styles/global.scss')],
  //   },
  // },
  css: {
    // Enable CSS source maps.
    sourceMap: !process.env.NODE_ENV === 'production',

    loaderOptions: {
      sass: {
        data: `
        @import "@/styles/global.scss";
       `,
        //outputDir: './public/css/main.css',
      },
    },
  },
};
