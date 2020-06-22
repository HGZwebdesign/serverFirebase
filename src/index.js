import loadApp from './App.js'

let element = loadApp() // Store the element to re-render on App changes
document.body.append(element)

if (module.hot) {
	module.hot.accept('./App.js', () => {
		console.log('Modules: updated and accepted!')
		document.body.removeChild(element)
		element = loadApp()
		document.body.append(element)
	})
}
