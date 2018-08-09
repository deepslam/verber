const path = require('path');

var config = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map'
};

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.devtool = 'source-map';
        config.mode = 'development';
    }

    if (argv.mode === 'production') {
        config.mode = 'production';
    }

    return config;
};