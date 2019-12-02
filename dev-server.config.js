const path = require('path');

module.exports = {
    contentBase: path.resolve(__dirname, './src'),
    hot: true,
    // port: 8080,
    // Это чтобы все роуты дальше не рулились дев-сервером, а грузился только хостовый
    historyApiFallback: true,
    overlay: {
        errors: true,
        warnings: false
    }
};
