import './styles/index.scss'
import staticHtml from './modules/staticHtml.js'
import {sushiPage} from './modules/sushi.js'

const loadApp = () => {
	const element = document.createElement('div')
	element.innerHTML += staticHtml
	sushiPage()
	return element
}

export default loadApp
