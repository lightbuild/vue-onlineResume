/**
 * Created by Administrator on 2017/1/15.
 */
var Webpack = require("webpack");
module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js'
    },
    module:{
        loaders:[
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    }
}