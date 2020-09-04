const path = require('path');

module.exports = {
    entry: {
        antd: path.resolve(__dirname, '../lib/index.js'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "st.[name].min.js",
        library: "st",
        libraryTarget: "umd",
    },
    mode: "production",
    externals: [
        {
            react: "React",
            antd: "antd",
            // moment: "moment",
            // lodash : "lodash",
        }, 
    ]
};