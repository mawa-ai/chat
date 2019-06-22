var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ["./src/widget.js"],
    mode: process.env.NODE_ENV || 'production',
    module: {
        rules: [
            {
                test: /\.js(x|)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/react"],
                        plugins: ["@babel/plugin-syntax-dynamic-import"]
                    }
                },
                include: /src/
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
                include: /src/
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: 'head'            
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        watchContentBase: true,
        port: 3001
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "widget.min.js",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    }
};
