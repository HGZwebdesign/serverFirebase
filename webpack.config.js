var path = require('path')

const outputDirectory = 'dist'
const LOCAL_PORT = 3000

module.exports = {
	entry: ['@babel/polyfill', './src/main.js'],
	output: {
		path: path.join(__dirname, outputDirectory),
		filename: 'bundle.js',
	},
	devServer: {
		inline: true,
		contentBase: './',
		port: LOCAL_PORT,
		// historyAPIFallback will redirect 404s to /index.html => fix a problem (works only for local dev-server) with "cannot GET /URL" error on refresh with React Router https://tylermcginnis.com/react-router-cannot-get-url-refresh/, ALTERNATIVE method (hack): HashRouter
		historyApiFallback: true,
	},
	watch: true,
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					// Compiles Sass to CSS
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
				loader: 'url-loader?limit=100000',
			},
		],
	},
}
