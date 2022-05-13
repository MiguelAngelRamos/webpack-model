const HtmlWebPackPlugin  = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// minificar css en producción
const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    clean: true,
    filename: 'main.[contenthash].js' // para que el archivo js tambien hash

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
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  optimization: {
    // Esta sección se utiliza vamos a generar la compilación a producción
    minimize: true,
    minimizer: [
      new CssMinimizer(),
      new Terser(),
    ]
  },
  plugins: [
    new HtmlWebPackPlugin ({
      title: 'Mi Webpack App',
      filename: 'index.html', // con esto le podemos cambiar el nombre al html
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css', // main.css
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