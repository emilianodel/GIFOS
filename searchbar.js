// busqueda de GIFOS

const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const resultsEl = document.getElementById('results')
const searchButton = document.getElementById('search-btn')
const suggestionsList = document.querySelector('.autocom-box')
const apikey = 'Cz88UUtdDqNvcBn8RJ1KjWIQon5hgFgG'


searchForm.setAttribute("autocomplete","off")

searchForm.addEventListener('submit', function(event) {
    event.preventDefault()
    const q = searchInput.value
    search(q)

})
        
function search(q) {
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=12`
    fetch(path)
    .then(function(response) {
        return response.json() 
    }).then(function(json) {
         console.log(json.data.images)
        let resultsHTML = ''

        json.data.forEach(function(obj) {
            console.log(obj)
            const url = obj.images.original.url
            const title = obj.title
            resultsHTML += `<img class="item" src="${url}" alt="${title}">`
    
        })
            
        resultsEl.innerHTML = resultsHTML
    }).catch(function(err){
        console.log(err.message)
    })

};

// Sugerencias

const searchSuggestion = async (q) => {
    const url = `https://api.giphy.com/v1/tags/related/${q}?api_key=${apikey}&limit=4`
    const response = await fetch(url)
    console.log(response)
    const json = await response.json()
    /*console.log(json)*/
      
    return json
}
  

const showSuggestions = suggestions => {
    const items = document.querySelectorAll('.autocom-box li')
    if (items) {  
        // busca en todo el array y luego los borra
      for (let i = 0; i < items.length; i++) {
        items[i].remove()
        document.querySelectorAll('.autocom-box')[0].style.display='initial' //display el UL
      }
    } 
    suggestions.forEach(suggest => {
      const item = document.createElement('li')
      const i = document.createElement('i')
      item.textContent = suggest.name; // trae el nombre de los gif
      suggestionsList.appendChild(item)
      item.appendChild(i)
      i.setAttribute('class', 'fas fa-search')
    
      
    
    }) 
  }

searchInput.addEventListener('keyup', async () => {
    searchSuggestion(searchInput.value) //permite que el input reciba lo que estoy escribiendo en el searchbar
      .then(suggestions => {
        showSuggestions(suggestions.data)
        console.log(suggestions)
    })
})

//buscar con un search bar

suggestionsList.addEventListener('click', (li) =>{
    
    searchInput.value = li.target.textContent;
    const q = searchInput.value 
    search(q)
    document.querySelectorAll('.autocom-box')[0].style.display='none' //quita el UL
});

//suggestionsList.addEventListener('click',search)
