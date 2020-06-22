const rawHtml = `
	<div>
		<form action="index.html" method="post">
			<button id="sushi-list-button" type="button" name="button">
				Load sushi list
			</button>
			<button id="sushi-add-button" type="submit" name="button">
				Add sushi</button
			><br />
		
			<input
				id="get-name"
				type="text"
				name="get-name"
				value=""
				placeholder="insert sushi name"
			/><br />
			<input
				id="get-description"
				type="textarea"
				name="get-description"
				value=""
				placeholder="insert sushi description"
			/>
		</form

		<div>
			<div id="sushi-list" />
		</div>
	</div>
`

export default rawHtml
