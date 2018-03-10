const path = require('path');

module.exports = {
    entry: {
        // index: path.join(__dirname, 'src/js', 'index.js'),
        login: path.join(__dirname, 'src/js', 'login.js'),
        // about: path.join(__dirname, 'src/js', 'about.js'),
        // register: path.join(__dirname, 'src/js', 'register.js'),
        // unverified: path.join(__dirname, 'src/js', 'unverified.js'),
        // upload: path.join(__dirname, 'src/js', 'upload.js')
    },    
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js' // The final file will be created in dist/build.js
    },
    module: {
        rules: [{
            test: /\.css$/, // To load the css in react
            use: ['style-loader', 'css-loader'],
            include: /src/
        }, {
            test: /\.jsx?$/, // To load the js and jsx files
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react', 'stage-2']
            }
        }]
    }
}