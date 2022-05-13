const HtmlWebPackPlugin  = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  output: {
    clean: true
  },
  module: {
    // Vamos a definir las reglas
    rules: [
      {
        test:/\.html$/,
        loader: 'html-loader',
        options: {
          sources: false
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // Para que el archivo styles.css se cree en la carpeta dist como un archivo separado
        test: /styles.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'] // le indicamos que use el css loader para que lo pueda cargar
      },
      {
        // sin importar donde este la imagen webpack la va reconocer
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader',
      }
    ]
  },
  optimization: {

  },
  plugins: [
    new HtmlWebPackPlugin ({
      title: 'Mi Webpack App',
      filename: 'index.html', // con esto le podemos cambiar el nombre al html
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // main.css
      ignoreOrder: false //
    }),
    new CopyPlugin({
      // desde y el hacia
      // from , to
      patterns: [
        { from: 'src/assets/', to: 'assets/'}
      ]
    })
  ]
}