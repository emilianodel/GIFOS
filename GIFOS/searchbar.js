// busqueda de GIFOS

const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const resultsEl = document.getElementById('results')
const searchButton = document.getElementById('search-btn')
const suggestionsList = document.querySelector('.autocom-box')
const searchIcon = document.getElementById('search_icon')
const buttonSearch = document.getElementById('close_bton')
const buttonReplace = document.getElementById('search_icon-one')
const searchName = document.getElementById('search_name')
const trending = document.getElementById('trending_div')
const viewMore = document.getElementById('viewMore')
const divLine = document.querySelector('.section_line')
const apikey = 'Cz88UUtdDqNvcBn8RJ1KjWIQon5hgFgG'
const fav_button = "/Images/icon-fav.svg"
const fav_button_active = "/Images/icon-fav-active.svg"
const down_button = "/Images/icon-download.svg"
const big_button = "/Images/icon-max-normal.svg"
const hover = document.querySelectorAll(".gifhover")
let offset = 1



searchForm.setAttribute("autocomplete","off")

searchForm.addEventListener('submit', function(event) {
    event.preventDefault()
    const q = searchInput.value
    
    search(q)
    
    
})

///if el objeto existe y es mayor a 1

function search(q) {

    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=12`
    
    fetch(path)
    .then(function(response) {
        return response.json() 
        
    }).then(function(json) {
    
      //Si el objeto existe
        searchForm.value = '';
        resultsEl.innerHTML = '';
        searchName.textContent = (q); //Muestra el nombre de lo que estemos buscando
        searchName.style.marginTop = "0px";
        searchName.style.marginBottom = "0px";
        trending.style.display ='initial';
        viewMore.style.display ='none';
        divLine.style.display= "none";
        
        json.data.forEach(function(obj) {
          
            console.log(obj)
              searchName.style.marginTop = "80px"
              searchName.style.marginBottom = "55px"
              trending.style.display ='none'
              viewMore.style.display ='initial'
              divLine.style.display= "inherit"  
              const url = obj.images.original.url
              const title = obj.title
              const username = obj.username
              const id = obj.id

             
              divFirst= document.createElement('div')
              imgGif = document.createElement('img')
              divHover = document.createElement('div')
              divHoverButtons = document.createElement('div')
              button_fav = document.createElement('button')
             
              img_fav = document.createElement('img')
              button_download = document.createElement('button')
              button_download.addEventListener('click', async function () {

                let a = document.createElement('a')
                let response = await fetch(url)
                let gif = await response.blob()
                a.download = 'Gif'
                a.href = window.URL.createObjectURL(gif)
                a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':')
                a.click()
              })

              img_download = document.createElement('img')
              button_bigger = document.createElement('button')
              img_bigger = document.createElement('img')
              divInfo = document.createElement('div')
              p_username = document.createElement('p')
              h4_title = document.createElement('h4')
              img_fav.setAttribute('class', "favtrial")
              var favorites = document.querySelectorAll('.favtrial')
              favorites.forEach(function(input) {
                input.addEventListener('click', e => {
                  input.setAttribute('src', `${fav_button_active}`)
                
                })
              
              })
              
              divFirst.setAttribute('class', "div_img")
              imgGif.setAttribute('src', `${url}`)
              imgGif.setAttribute('class', "item")
              divHover.setAttribute('class', "gifhover")
              divHoverButtons.setAttribute('class',"hover_buttons")
              button_fav.setAttribute('class', "all_buttons")
              button_fav.addEventListener('click', e => {
                const newFav = {
                  title: `${title}`,
                  username: `${username}`,
                  img: `${url}`,
                  id: `${id}`
                      }
                  favs.push(newFav)
                  window.localStorage.setItem('favorites', JSON.stringify(favs))
                 
                })
               
           

              
              img_fav.setAttribute('src', `${fav_button}`)
              button_download.setAttribute('class', "all_buttons")
              img_download.setAttribute('src', `${down_button}`)
              button_bigger.setAttribute('class', "all_buttons")
              button_bigger.addEventListener('click', e => {
                AgrandarGifos(`${url}`, `${title}`, `${username}`)
              })
              img_bigger.setAttribute('src', `${big_button}`)
              divInfo.setAttribute('class', "gif_info")
              p_username.textContent = `${username}`
              h4_title.textContent =`${title}`

              resultsEl.appendChild(divFirst)
              divFirst.appendChild(imgGif)
              divFirst.appendChild(divHover)
              divHover.appendChild(divHoverButtons)
              divHoverButtons.appendChild(button_bigger)
              button_bigger.appendChild(img_bigger)
             

              divHoverButtons.appendChild(button_download)
              button_download.appendChild(img_download)
              divHoverButtons.appendChild(button_fav)
              button_fav.appendChild(img_fav)
              

              divHover.appendChild(divInfo)
              divInfo.appendChild(p_username)
              divInfo.appendChild(h4_title) 
             
            
        }) 
       
        
    }).catch(function(err){
        console.log(err.message)
    })
  
};


let newDiv;
/**Maximizar gifo mobile */
function AgrandarGifosMobile(url, title, username) {
  if (window.matchMedia("(max-width: 899px)").matches) {
    fullGifos(url, title, username);
  }
};

/**Maximizar gifo desktop */
function AgrandarGifos(url, title, username) {
  if (window.matchMedia("(min-width: 900px)").matches) {
    fullGifos(url, title, username);
  }
};

function CerrarGifos() {
  document.body.removeChild(newDiv);
};

function fullGifos(url, title, username) {
  
  newDiv = document.createElement("div");
  newDiv.classList.add("new_div");
  newDiv.innerHTML = ` 
    <div class="bigger_gif">
            <button class="close_gif" onclick="CerrarGifos()">
              <i class="fa fa-times"></i>
            </button>
            <img src="${url}" alt="${title}" class="new_img">
            <div>
                <div class="bigger_text">
                    <p>${username}</p>
                    <h6>${title}</h6>
                </div>
                <div class="bigger_buttons">
                  <img src=${fav_button}>
                  <img src=${down_button}>
                </div>
            </div>
        </div>
    `;
  document.body.appendChild(newDiv);
};



          
//Ver mas resultados
viewMore.style.display ='none'
divLine.style.display = 'none'

viewMore.addEventListener("click", (e) => {
  e.preventDefault();
  moreResults();
 
});

//Renderizar 12 resultados mas
function moreResults() {
  const q = searchInput.value;
  offset += 12;
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=12&offset=${offset}`
    fetch(path)
    .then(function(response) {
        return response.json() 
    }).then(function(json) {

        //let resultsHTML = ''
        //searchForm.value = '';
        //resultsEl.innerHTML = '';

        json.data.forEach(function(obj) {

          const url = obj.images.original.url
          const title = obj.title
          const username = obj.username
          const download = obj.images.downsized.url

          divFirst= document.createElement('div')
          imgGif = document.createElement('img')
          divHover = document.createElement('div')
          divHoverButtons = document.createElement('div')
          button_fav = document.createElement('button')
          img_fav = document.createElement('img')
          button_download = document.createElement('button')
          img_download = document.createElement('img')
          button_bigger = document.createElement('button')
          img_bigger = document.createElement('img')
          divInfo = document.createElement('div')
          p_username = document.createElement('p')
          h4_title = document.createElement('h4')

          
          divFirst.setAttribute('class', "div_img")
          imgGif.setAttribute('src', `${url}`)
          imgGif.setAttribute('class', "item")
          divHover.setAttribute('class', "gifhover")
          divHoverButtons.setAttribute('class',"hover_buttons")
          button_fav.setAttribute('class', "all_buttons")
          button_fav.addEventListener('click', e => {
            const newFav = {
              title: `${title}`,
              username: `${username}`,
              img: `${url}`
                  }
              favs.push(newFav)
              window.localStorage.setItem('favorites', JSON.stringify(favs))
            })
           
          img_fav.setAttribute('src', `${fav_button}`)
          button_download.setAttribute('class', "all_buttons")
          img_download.setAttribute('src', `${down_button}`)
          button_bigger.setAttribute('class', "all_buttons")
          button_bigger.addEventListener('click', e => {
            AgrandarGifos(`${url}`, `${title}`, `${username}`)
          })
          img_bigger.setAttribute('src', `${big_button}`)
          divInfo.setAttribute('class', "gif_info")
          p_username.textContent = `${username}`
          h4_title.textContent =`${title}`

          resultsEl.appendChild(divFirst)
          divFirst.appendChild(imgGif)
          divFirst.appendChild(divHover)
          divHover.appendChild(divHoverButtons)
          divHoverButtons.appendChild(button_bigger)
          button_bigger.appendChild(img_bigger)
          divHoverButtons.appendChild(button_download)
          button_download.appendChild(img_download)
          divHoverButtons.appendChild(button_fav)
          button_fav.appendChild(img_fav)
          divHover.appendChild(divInfo)
          divInfo.appendChild(p_username)
          divInfo.appendChild(h4_title)  
            
        })
        
    }).catch(function(err){
        console.log(err.message)
    })
  
};
 



// Sugerencias

const searchSuggestion = async (q) => {
    const url = `https://api.giphy.com/v1/tags/related/${q}?api_key=${apikey}&limit=4`
    const response = await fetch(url)
    const json = await response.json()
    //console.log(json)
      
    return json
};
  

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
      i.setAttribute('class', 'fa fa-search')
    
    
    }) 
  };


searchInput.addEventListener('keyup', async () => {
    if (searchInput.value == "" ) {
      searchIcon.style.display = 'inline'
      buttonReplace.style.display = 'none'
      searchIcon.classList.remove('fa-times')
      const items = document.querySelectorAll('.autocom-box li')
      

      if (items) {
        for (let i = 0; i <items.length; i++) {
          items[i].remove()
        
        }

      }
      return
    }

    buttonReplace.style.display = 'inline'
    searchIcon.classList.add('fa-times')
  searchSuggestion(searchInput.value) //permite que el input reciba lo que estoy escribiendo en el searchbar
      .then(suggestions => {
        showSuggestions(suggestions.data)
        //console.log(suggestions)
    })
});

//buscar con el suggestion list
suggestionsList.addEventListener('click', (li) =>{
    searchInput.value = li.target.textContent;
    const q = searchInput.value 
    search(q)

    searchIcon.style.display = 'inline'
    buttonReplace.style.display = 'none'
    searchIcon.classList.remove('fa-times')
    document.querySelectorAll('.autocom-box')[0].style.display='none' //quita la lista
    
});


//cancelar resultados
searchIcon.addEventListener ('click', (e) =>{
  searchInput.value = ""
  searchInput.placeholder = "Busca GIFOS y más"
  searchIcon.style.display = 'inline'
  buttonReplace.style.display = 'none'
  searchIcon.classList.remove('fa-times')
  document.querySelectorAll('.autocom-box')[0].style.display='none'
})

//Buscar con el icon
buttonReplace.addEventListener('click', function (event) {
  event.preventDefault()
  const a = searchInput.value
  search(a)

  searchIcon.style.display = 'inline'
  buttonReplace.style.display = 'none'
  searchIcon.classList.remove('fa-times')
  document.querySelectorAll('.autocom-box')[0].style.display='none'
});


//trending

const trending_topics = document.getElementById('trending_words')

const trendingGif = async (query) => {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=12`
  const response = await fetch(url)
  const json = await response.json()
  //console.log(json.data[0].images.original)
    
  return json
}

trendingGif ()
.then (json => {

  json.data.forEach(function(name) {

    
    const img = document.createElement('img')
    const img_button_one = document.createElement('img')
    const img_button_two = document.createElement('img')
    const img_button_three = document.createElement('img')
    const container = document.querySelector('.carousel-inner')
    const divGif = document.createElement('div')
    const divHover = document.createElement('div')
    const divInfo = document.createElement('div')
    const pusername = document.createElement('p')
    const htitle = document.createElement('h5')
    const button_one = document.createElement('button')
    const button_two = document.createElement('button')
    const button_three = document.createElement('button')
    button_one.classList.add('all_buttons_two')
    
    
    button_one.addEventListener('click', e => {
        const newFav = {
          title: name.title,
          username: name.username,
          img: name.images.original.url
              }
          favs.push(newFav)
          window.localStorage.setItem('favorites', JSON.stringify(favs))
        })
       
            
    button_two.classList.add('all_buttons_two')
    button_three.classList.add('all_buttons_two')
    
    divGif.classList.add('carousel-item')
    divHover.classList.add('gifhover_two')
    divInfo.classList.add('gifinfo_two')
    
   
    
    img.setAttribute('src', name.images.original.url)
    img.setAttribute('class', 'trending')
    img.setAttribute('alt', name.title)
    img_button_one.setAttribute('src', `${fav_button}`)
    img_button_two.setAttribute('src', `${down_button}`)
    img_button_three.setAttribute('src', `${big_button}`)
    
    button_three.addEventListener('click', e => {
      AgrandarGifos(name.images.original.url, name.title, name.username)
    })

    pusername.textContent = `${name.username}`
    htitle.textContent = `${name.title}`
    divGif.appendChild(img)
    container.appendChild(divGif)
    divGif.appendChild(divHover)
    divHover.appendChild(button_three)
    divHover.appendChild(button_two)
    divHover.appendChild(button_one)
    button_one.appendChild(img_button_one)
    button_two.appendChild(img_button_two)
    button_three.appendChild(img_button_three)
    divHover.appendChild(divInfo)
    divInfo.appendChild(pusername)
    divInfo.appendChild(htitle)
    
  }) 

  
});

// Trending words para buscar con click
const trendingGifSearch = async () => {
  const url = `https://api.giphy.com/v1/trending/searches?api_key=${apikey}`
  const response = await fetch(url)
  const json = await response.json()
  //console.log(json.data[0].images.original)

  
  return json
};

trendingGifSearch ()
.then (json => {
  json.data.forEach(function(trendings) {
   
    //const trending_topics = document.getElementById('trending_words')
    trending_topics.innerHTML = `<p class ="trendingwords"> ${json.data[0]}<p/>, 
                                  <p class ="trendingwords"> ${json.data[1]}<p/>,
                                  <p class ="trendingwords"> ${json.data[2]}<p/>,
                                  <p class ="trendingwords"> ${json.data[3]}<p/>` 

    let topics_links = document.getElementsByClassName("trendingwords");
    for (let i = 0; i < topics_links.length; i++) {
      topics_links[i].addEventListener('click', function(e) {
        searchInput.value = json.data[i]
        search(json.data[i])
        
      })
    }  
  })
});



// slider de trending gifos

let carouselDistance = 0
const carouselGifWidth = 250

  
  const carouselNext = e => {
    e.preventDefault()
    if (carouselDistance == -3500) return;
    
    const carouselItem = document.querySelectorAll('.carousel-item')
    const newTranslateX = carouselDistance - carouselGifWidth
    for (let i = 0; i < carouselItem.length; i++) {
      carouselItem[i].style.transform = `translateX(${newTranslateX}px)`
    }
    carouselDistance = newTranslateX
  }
  
  const carouselPrev = e => {
    e.preventDefault()
    if (carouselDistance == 0) return;

    const carouselItem = document.querySelectorAll('.carousel-item')
    const newTranslateX = carouselDistance + carouselGifWidth
    for (let i = 0; i < carouselItem.length; i++) {
      carouselItem[i].style.transform = `translateX(${newTranslateX}px)`
    }
    carouselDistance = newTranslateX
  }

const btnPrev = document.querySelector('.carousel-prev')
const btnNext = document.querySelector('.carousel-next')
btnNext.addEventListener('click', carouselNext)
btnPrev.addEventListener('click', carouselPrev)

//Favoritos

const persistFavs = JSON.parse(window.localStorage.getItem('favorites')) || []
let favs = []

const div_fav = document.querySelector(".gifos_fav")
const div_fav_two = document.querySelector(".fav_text_img")

if(persistFavs.length > 0) {
  favs = persistFavs
  div_fav_two.style.display ='none'
  
} else {
  div_fav_two.style.display ='inherit'
};
 
for (var i = 0; i < persistFavs.length; i++) {
  const title = persistFavs[i].title
  const url = persistFavs[i].img
  const username = persistFavs[i].username
  const id = persistFavs[i].id
  
  divFav = document.createElement('div')
  imgFav = document.createElement('img')
  divHover = document.createElement('div')
  divButtons = document.createElement('div')
  divFavInfo = document.createElement('div')
  button_fav_one = document.createElement('button')
  button_fav_one.addEventListener('click', e => {
    
    /*if (id == id) {
      persistFavs.splice(i, 1)
      i = persistFavs.length
     
    }*/

    /*let arrayAux = []
    arrayAux = JSON.parse('favorites')
    let index = arrayAux.indexOF(persistFavs)
    arrayAux.splice(index, 1)

    let favoritesGifos = JSON.stringify(arrayAux)
    localStorage.setItem('favorites', favoritesGifos)*/
    //window.localStorage.setItem('favorites', JSON.stringify(favs))
    window.localStorage.removeItem('favorites')
  })
  /*button_fav_one.setAttribute('class', "removeGifos")
  var remove_gifos = document.querySelectorAll(".removeGifos")
  remove_gifos.forEach(function(remove){
    remove.addEventListener('click', e => {
      let array = []
      array = JSON.parse(persistFavs)
      let index = array.indexOf()
      array.splice(index,1)
     
    })*/
  /*button_fav_one.addEventListener('click', e => {
   
      
    })*/
  button_fav_two = document.createElement('button')
  button_fav_three = document.createElement('button')
  img_fav_one = document.createElement('img')
  img_fav_two = document.createElement('img')
  img_fav_three = document.createElement('img')
  favUsername = document.createElement('p')
  favTitle = document.createElement('h8')

  imgFav.setAttribute('src', `${url}`)
  imgFav.setAttribute('alt', `${title}`)
  imgFav.classList.add('fav_images')
  divFav.classList.add('div_fav')
  divHover.classList.add('div_fav_hover')
  divButtons.classList.add('div_fav_buttons')
  divFavInfo.classList.add('div_fav_info')
  button_fav_one.classList.add('all_fav_buttons')
  button_fav_two.classList.add('all_fav_buttons')
  button_fav_three.classList.add('all_fav_buttons')
  button_fav_three.addEventListener('click', e => {
    AgrandarGifos(`${url}`,`${title}`, `${username}`)
  })
  img_fav_one.setAttribute('src', `${fav_button_active }`)
  img_fav_two.setAttribute('src', `${down_button}`)
  img_fav_three.setAttribute('src', `${big_button}`)
  favUsername.textContent = `${username}`
  favTitle.textContent = `${title}`
  div_fav.appendChild(divFav)
  divFav.appendChild(imgFav)
  divFav.appendChild(divHover)
  divHover.appendChild(divButtons)

  divButtons.appendChild(button_fav_three)
  divButtons.appendChild(button_fav_two)
  divButtons.appendChild(button_fav_one)
  button_fav_one.appendChild(img_fav_one)
   button_fav_two.appendChild(img_fav_two)
  button_fav_three.appendChild(img_fav_three)
 
 
  divHover.appendChild(divFavInfo)
  divFavInfo.appendChild(favUsername)
  divFavInfo.appendChild(favTitle)

};



  /*const div_fav = document.querySelector(".gifos_fav")
trendingGif ()
.then(json => {
  json.data.forEach(function(fav) {
    let button_one = document.getElementById("favorit")

      button_one.addEventListener('click', e => {
        const newFav = {
          title: fav.title,
          username: fav.username,
          img: fav.images.original.url
              }
          favs.push(newFav)
          window.localStorage.setItem('favorites', JSON.stringify(favs))
          var x =  localStorage.getItem("favorites")
          div_fav.innerHTML = x

      })

   
    
  })
  
});*/


/*button_fav.addEventListener('click', e => {
  const newFav = {
    title: obj.title,
    username: obj.username,
    img: obj.images.original.url
        }
      favs.push(newFav)
    window.localStorage.setItem('favorites', JSON.stringify(favs))
    document.querySelector('.gifos_fav').innerHTML += favs;
      })
*/

/*fav_button.addEventListener('click', e => {
  const newFav = {
    title: fav.title,
    username: fav.username,
    img: fav.images.original.url
  });
  favs.push(newFav)
  window.localStorage.setItem('favorites', JSON.stringify(favs)) 

//let offsetSearch = 1

/*const addFav = search => {
  const newFav = {
    title: obj.title,
    id: obj.id,
    img: obj.images.original.url
  }
  favs.push(newFav)
  window.localStorage.setItem('favorites', JSON.stringify(favs))
}*/

/*const showGifs = obj => {
  console.log(obj)
  if (obj.length < 1) {
    document.querySelector('.no-results').style.display = 'block'
    return;
  }

  obj.forEach(gif => {
    console.log(gif)

    const isExist = favs.filter( fav => fav.id === gif.id )

    const imgFav = document.createElement('img')

    if (isExist.length > 0 ) {
      divFav.classList.add('active')
    }

    divActions.appendChild(divFav)

    fav_button.addEventListener('click', () => {
      addFav(gif)
    })

    resultsContainer.appendChild(div)
  })
}*/














// get favorites from local storage or empty array
/*var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
// add class 'fav' to each favorite
favorites.forEach(function(favorite) {
  //document.getElementById(favorite).className = 'fav';
});
// register click event listener

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  document.querySelectorAll('.all_buttons').addEventListener('click', function(e) {
    var id = e.target.id,
        item = e.target,  
        index = favorites.indexOf(id);
    // return if target doesn't have an id (shouldn't happen)
    if (!id) return;
    // item is not favorite
    if (index == -1) {
      favorites.push(id);
      item.className = 'fav';
    // item is already favorite
    } else {
      favorites.splice(index, 1);
      item.className = '';
    }
    // store array in local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  });
  
});*/




