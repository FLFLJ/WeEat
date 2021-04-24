/*
const path = require('path');
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true, 
  publicPath: './', // 设置打包文件相对路径
  // 这是前端解决跨域的代码
  devServer:{
        proxy:{
            '/api3':{
                target:'http://www.tyhowan.com:3000',
                pathRewrite:{'^/api3':''},
                secure:false,
                ws:true,
                changeOrigin:true
            },
            '/api':{
                target:'http://www.tyhowan.com:8080',
                ws:true,
                changeOrigin:true,
                
                }
            },
            disableHostCheck:true
        },
  configureWebpack:{
    resolve:{
      alias:{
        '@':path.resolve(__dirname, './src'),
        '@i':path.resolve(__dirname, './src/assets'),
      } 
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      
      // 下面是下载的插件的配置
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5, 
        minChunkSize: 100
      })
    ]
  }
}


*/
module.exports={
    devServer:{
        proxy:{
            '/api3':{
                target:'http://localhost:3000',
                changeOrigin:true
            },
            '/api':{
                target:'http://localhost:8080',
                ws:true,
                changeOrigin:true,
                
                }
            }
        }
    }

    