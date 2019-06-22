var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ["./src/widget.js"],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
                include: /src/
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "sass-loader"],
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
            inject: 'body'
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
    }
};
