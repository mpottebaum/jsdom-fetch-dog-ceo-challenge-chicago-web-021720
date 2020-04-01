console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", function() {
    getDogImages()
    getDogBreeds()
})

function getDogImages() {
    let container = document.getElementById("dog-image-container")
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(resp => resp.json())
        .then(function(json) {
            json["message"].forEach(function(img) {
                let imgTag = document.createElement("img")
                imgTag.src = img
                container.appendChild(imgTag)
            })
        })
}

function getDogBreeds() {
    let ul = document.getElementById("dog-breeds")
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(resp => resp.json())
        .then(function(json) {
            for (const key in json["message"]) {
                let li = document.createElement("li")
                li.innerHTML = key
                ul.appendChild(li)
            }
        })
        .then(filterBreeds)
    ul.addEventListener("click", function(event) {
        event.target.style.color = "red"
    })
}

function filterBreeds() {
    let ul = document.getElementById("dog-breeds")
    let breeds = Array.from(document.querySelectorAll("li"))
    let select = document.getElementById("breed-dropdown")
    select.addEventListener("change", function(event) {
        let updatedBreeds = Array.from(document.querySelectorAll("li"))
        updatedBreeds.forEach(element => ul.removeChild(element))
        let filteredBreeds = breeds.filter(element => element.innerHTML[0] === event.target.value)
        filteredBreeds.forEach(element => ul.appendChild(element))
    })
}