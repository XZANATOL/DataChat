const server = window.location.host
const channels = ["General"]
const collectionName = "xzanspace"
const channelSelect = document.querySelector(".channel")
channels.forEach((channel) => {
	channelSelect.innerHTML += `<option value="${channel}">${channel}</option>`
})
const loader = document.querySelector(".loader-wrapper")
const recordsSection = document.querySelector(".records")


let token = "";
async function getToken(updateUIBool){
	const creds = {
		"identity": "username",												// <--- Change This
		"password": "passowrd"												// <--- Change This
	}
	token = await fetch(`http://${server}/api/collections/users/auth-with-password`, {
		"method": "POST",
		"headers": {
			'Content-Type': 'application/json'
		},
		"body": JSON.stringify(creds)
	})
	.then((response) => response.json())
	if(updateUIBool){
		getRecords()
	}
}
async function getRecords(){
	const channel = document.querySelector(".channel").value
	recordsSection.innerHTML = ""
	recordsSection.classList.toggle("d-none")
	loader.classList.toggle("d-none")
	const url = `http://${server}/api/collections/${collectionName}/records?filter=(channel='${channel}')&perPage=1000`
	const records = await fetch(url, {
		"headers": {
			"Authorization": token.token
		}
	})
	.then((response) => response.json())


	updateUI(records.items, channel, true)
}
getToken(true)
setInterval(() => {getToken(false)}, 290000) // Update token every 290 secs
channelSelect.addEventListener("change", ()=>{getRecords()})


const textareaInput = document.querySelector(".input-text")
function updateUI(records, channel, newload){
	if(newload){ // True: If the call is coming from getRecords()
		textareaInput.placeholder = `Message #${channel}`
		loader.classList.toggle("d-none")
		recordsSection.classList.toggle("d-none")
	}
	records.forEach(async (record) => {
		let HTML = `<section class="record" id="${record.id}">`

		if (record.text){
			let textHTML = specialCharsProcessor(record.text)
			textHTML = urlsProcessor(textHTML)
			textHTML = codeProcessor(textHTML)
			HTML += `<span>${textHTML}</span>`
		}
		if (record.files){
			let filesHTML = filesProcessor(record.collectionId, record.id, record.files)
			HTML += filesHTML
		}
		
		const created = new Date(record.created)
		if(record.created == record.updated){
			HTML += `<span class="date">${created.toLocaleString()}</span>
		</section>`
		}else{
			const updated = new Date(record.updated)
			HTML += `<span class="date">${created.toLocaleString()} - ${updated.toLocaleString()}</span>
		</section>`
		}
		recordsSection.innerHTML += HTML
		// Scroll down to the lastest record
		setTimeout(() => {recordsSection.scroll({ top: recordsSection.scrollHeight, behavior: 'smooth' })}, 100);
	})
}
function specialCharsProcessor(text){
	const chars = [
		["&", "&amp;"],
		["<", "&lt;"],
		[">", "&gt;"],
		["\n", "<br>"],
		["\t", "&emsp;"]
	]
	chars.forEach((char) => {
		text = text.replaceAll(char[0], char[1])
	})
	return text
}
function urlsProcessor(text){
	const linksRE = /(https?:\/\/[^\s]+)/gi
	let matches = Array.from(text.matchAll(linksRE))
	matches.forEach((match) => {			// Process links
		text = text.replace(match[1], `<a href="${match[1]}" target="_blank">${match[1]}</a>`)
	})

	return text
}
function codeProcessor(text){
	const codeDelimiters = /```/
	let matches = Array.from(text.matchAll(new RegExp(codeDelimiters, "g")))
	if(matches){
		if(matches.length%2 != 0){ // For uneven delimiters
			matches.shift()
		}
		for(i of [...Array(matches.length).keys()]){
			if(i%2==0){
				text = text.replace(codeDelimiters, `<div class="codeBlock">`)
			}else{
				text = text.replace(codeDelimiters, `</div>`)
			}
		}

		let correctorWrapper = document.createElement("div")
		correctorWrapper.innerHTML = text
		let corrector = correctorWrapper.querySelector(".codeBlock")
		if (corrector && corrector.firstElementChild.tagName == "BR"){
			// Removes first <br> element for better UI	
			corrector.removeChild(corrector.firstElementChild)
		}
		return correctorWrapper.innerHTML
	}
	return text
}
function filesProcessor(collectionId, id, files) {
	const imgsRE = /(\.jpg|\.jpeg|\.png|\.gif)$/ig
	const link = `http://${server}/api/files/${collectionId}/${id}/${files}`
	let HTML;
	if(files.search(imgsRE) == -1){
		HTML = `<a class="files" href="${link}" target="_blank">
	<div class="files_svg">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
			<path d="M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z"/>
			<path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
		</svg>
	</div>
	<div class="files_text">
		<p>${files}</p>
	</div>
</a>
`
	}else{
		HTML = `<img src="${link}" title="${files}" class="files_img">`
	}

	return HTML
}


function fileInput(obj){
	const input = obj.querySelector("input")
	input.value = ""
}
function upload(){
	const channel = document.querySelector(".channel").value
	const text = textareaInput.value
	const filesInput = document.querySelector(".icon-wrapper").querySelector("input")
	let files = Array.from(filesInput.files)
	let send = false
	
	let data = new FormData()
	data.append("channel", channel)

	let http = new XMLHttpRequest()
	const url = `http://${server}/api/collections/${collectionName}/records`
	http.open("POST", url, true)
	http.setRequestHeader("Authorization", token.token)
	http.onreadystatechange = () => {
	    if(http.readyState == 4 && http.status == 200){
	        let response = JSON.parse(http.responseText)
	        if("code" in response){
	        	console.log(response)
	        }else{
	        	updateUI([response], channel, false)
	        }
	    }
	}
	
	if(text != ""){
		data.append("text", text)
		textareaInput.value = ""
		send = true
	}
	if(files.length > 0){
		data.append("files", files[0])
		files.shift()
		send = true
	}

	if(send){
		http.send(data)
	}

	if(files.length > 0){
		files.forEach((file) => {
			data = new FormData()
			data.append("channel", channel)
			data.append("files", file)
			let http_file = new XMLHttpRequest()
			http_file.open("POST", url, true)
			http_file.setRequestHeader("Authorization", token.token)
			http_file.onreadystatechange = () => {
			    if(http_file.readyState == 4 && http_file.status == 200){
			        let response = JSON.parse(http_file.responseText)
			        if("code" in response){
			        	console.log(response)
			        }else{
			        	updateUI([response], channel, false)
			        }
			    }
			}
			http_file.send(data)
		})
	}
	filesInput.value = ""
}


async function deleteRecrod(element){
	const url = `http://${server}/api/collections/${collectionName}/records/${element.id}`
	const res = await fetch(url, {
		"method": "DELETE",
		"headers": {
			"Authorization": token.token
		}
	})
	.then((response) => {
		if(response.status != 204){
			alert("Couldn't delete record!")
		}else{
			element.remove()
			alert("record deleted successfully!")
		}
	})
}


textareaInput.addEventListener("input", () => {
	textareaInput.style.height = (textareaInput.scrollHeight) + "px";
})
textareaInput.addEventListener("focus", () => {
	textareaInput.style.height = (textareaInput.scrollHeight) + "px";
})
textareaInput.addEventListener("focusout", () => {
	textareaInput.style.height = "34px";
})


document.addEventListener("click", (e) => {
	if(e.target.classList.contains("codeBlock") && e.detail == 3){
		let r = document.createRange()
		r.selectNode(e.target)
		window.getSelection().removeAllRanges() // Making sure nothing else is selected
		window.getSelection().addRange(r)
	}
})
document.addEventListener("dblclick", (e) =>{
	if(e.target.classList.contains("record")){
		deleteRecrod(e.target)
	}
})
document.addEventListener("keydown", (e) => {
	const element = document.activeElement
	if(element.type == "textarea" && e.key === "Tab"){
		e.preventDefault()
		const cursorPosition = element.selectionStart
		const cursorEndPosition = element.selectionEnd

		element.value = element.value.substring(0, cursorPosition) +
						"\t" +
						element.value.substring(cursorEndPosition)
		element.selectionStart = cursorPosition + 1
		element.selectionEnd = cursorEndPosition + 1
	}
})


// Desktop Options
if(window.screen.width >= 1024){
	// Keyboard shortcuts
	const submit = document.querySelector("#submit")
	document.addEventListener("keydown", (e) => {
		if (!e.shiftKey && e.key == "Enter"){
			e.preventDefault()
			submit.click()
		}

		else if (e.ctrlKey && e.shiftKey && e.key == "F"){
			e.preventDefault()
			document.querySelector(".icon-wrapper").click()
		}

		else if (e.ctrlKey && e.shiftKey && e.key == "M"){
			e.preventDefault()
			textareaInput.focus()
		}
	})

	// Drag & Drop
	document.addEventListener("dragover", (e) => {
		e.preventDefault()
	})
	document.addEventListener("dragleave", (e) => {
		e.preventDefault()
	})
	document.addEventListener("drop", (e) => {
		e.preventDefault()
		const filesInput = document.querySelector(".icon-wrapper").querySelector("input")
		filesInput.files = e.dataTransfer.files
	})
}
