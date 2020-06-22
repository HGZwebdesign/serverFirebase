import firebase from 'firebase'
import $ from '../../plugins/jquery-3.2.1.min'
import {initFirebase} from '../../lib/firebase'

const PATH = 'sushi'

export const sushiPage = () => {
	$(() => {
		console.log('Sushi time!')

		// Initialize Firebase

		initFirebase()

		// Create variables

		const form = $('form')
		const sushiListButton = $('#sushi-list-button')
		// const sushiAddButton = $('#sushi-add-button')
		const list = $('#sushi-list')

		/**
		 * -----------------------------------------------------------------------
		 *                           Function: show list of elements
		 * -----------------------------------------------------------------------
		 */

		const showList = () => {
			const ref = firebase.database().ref(PATH)

			ref.on(
				'value',
				resp => {
					list.empty()
					resp.forEach(e => {
						const element = $('<div>').attr('data-id', e.key)
						const title = $('<h2>')
							.text(e.val().name)
							.attr('contenteditable', 'false')
						const p = $('<p>')
							.text(e.val().description)
							.attr('contenteditable', 'false')

						const del = $('<button>', {class: 'delete'}).text('Delete')
						const edit = $('<button>', {class: 'edit'}).text('Edit')

						if (!e.val().editable) {
							del.attr('disabled', true)
							edit.attr('disabled', true)
						}

						element
							.append(del)
							.append(edit)
							.append(title)
							.append(p)
						list.append(element)
					})
				},
				error => {
					console.log('Error: ' + error.code)
				}
			)
		}

		// Button

		sushiListButton.on('click', () => {
			showList()
		})

		/**
		 * -----------------------------------------------------------------------
		 *                         Function: Add new element
		 * -----------------------------------------------------------------------
		 */
		const addElement = () => {
			const getName = $('#get-name').val()
			const getDescription = $('#get-description').val()
			// const getSize = $('#get-size').val();

			const ref2 = firebase.database().ref(PATH)

			ref2.push({
				name: getName,
				description: getDescription,
				size: 2,
				editable: true,
				id: firebase.database.ServerValue.TIMESTAMP,
			})

			showList()
		}

		// Button

		form.on('submit', e => {
			e.preventDefault()
			addElement()
		})

		/**
		 * -----------------------------------------------------------------------
		 *                       Function: Delete element
		 * -----------------------------------------------------------------------
		 */

		const deleteElement = id =>
			firebase
				.database()
				.ref(PATH)
				.child(id)
				.remove()

		// Button

		$('body').on('click', '.delete', function() {
			deleteElement(
				$(this)
					.parent()
					.data('id')
			)
		})

		/**
		 * -----------------------------------------------------------------------
		 *                          Function: Edit element
		 * -----------------------------------------------------------------------
		 */

		const editElement = element => {
			const title = element.find('h2').text()
			const p = element.find('p').text()

			const ref4 = firebase.database().ref(PATH + '/' + element.data('id'))
			ref4.update({name: title, description: p})

			showList()
		}

		// Button

		$('body').on('click', '.edit', function() {
			const element = $(this).parent()
			const title = element.find('h2')
			const p = element.find('p')

			if (title.attr('contenteditable') === 'false') {
				title.attr('contenteditable', true).addClass('highlighted')
				p.attr('contenteditable', true).addClass('highlighted')
				$(this).text('Save')
			} else {
				editElement(element)
				title.attr('contenteditable', false).removeClass('highlighted')
				p.attr('contenteditable', false).removeClass('highlighted')
				$(this).text('Edytuj')
			}
		})
	})
}
