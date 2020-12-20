let leftMenu = $(".leftMenu");
let rightMenu = $(".rightMenu")
let menu = $("#triggle")
let menu_item =$(".nav-item li")
let category="now_playing";
menu.click(function(){
let width= leftMenu.outerWidth();
    if(menu.attr("class") == "open")
    {
        menu.addClass("close");
        menu.removeClass("open")
        leftMenu.animate({"left":"0px"},1000)
        rightMenu.animate({"left":`${width}`},1000)
        for(let i=1 ; i<=menu_item.length;i++)
        {
            console.log($(`.item${i}`))
            $(`.item${i}`).animate({"paddingTop":"25px","opacity":"1"},i*100+1000)
        }
    }

    else
    {
        menu.addClass("open");
        menu.removeClass("close")

        leftMenu.animate({"left":`-${width}`},1000)
        rightMenu.animate({"left":"0px"},1000,function(){
            menu_item.animate({"paddingTop":"500px","opacity":"0"},1000)
        })
    }


})

let allMovies;
let moviesContainner = document.getElementById("movies-container")
let imgpath ="https://image.tmdb.org/t/p/w500";

function getMovies(category){
let req =new XMLHttpRequest;
req.open("GET",`https://api.themoviedb.org/3/movie/${category}?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&page=1`)
req.send();
req.onreadystatechange = function(){
    if(req.readyState == 4 && req.status ==200)
    {
        allMovies = JSON.parse(req.response).results;
        displayData()
    }
}
}
getMovies( category)



function displayData()
{
    let temp=""

    for(let i=0 ;i<allMovies.length;i++)
    {
        temp +=`
        <div class="col-md-4 mb-5">
        <div class="movie-item">
        <img src="${imgpath+allMovies[i].poster_path}" class="img-fluid">
        <div class="layer">
        <h3>${allMovies[i].title}</h3>
        <p>${allMovies[i].overview}</p>
        <p>${allMovies[i].vote_average}</p>
        <p>${allMovies[i].release_date}</p>

       </div>
        </div>
        </div>
        `
    }
    moviesContainner.innerHTML=temp;
}


let search= document.getElementById("search");
let searchResult= document.getElementById("searchResult");
let searchword = document.getElementById("searchByWord")
let menuItem = document.querySelectorAll(".nav-item a")

search.onkeyup = function()
{
    let word =search.value;

    let content ="";

    if (word == "")
    {
        return false
    }
 console.log(word)
    for(let i=0;i<allMovies.length;i++)
    {
        if(allMovies[i].title.toLowerCase().includes(word.toLowerCase())==true)
        {
            content +=`
            <div class="col-md-4 mb-5">
            <div class="movie-item">
            <img src="${imgpath+allMovies[i].poster_path}" class="img-fluid">
            <div class="layer">
            <h3>${allMovies[i].title}</h3>
            <p>${allMovies[i].overview}</p>
            <p>${allMovies[i].vote_average}</p>
            <p>${allMovies[i].release_date}</p>
    
           </div>
            </div>
            </div>`
        } 
    }
    searchResult.innerHTML=content;
}

searchword.onkeyup =function()
{
    let text = searchword.value;
    searchByWord(text)
}

function searchByWord(text)
{
    let req =new XMLHttpRequest;
req.open("GET",`https://api.themoviedb.org/3/search/movie?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&query=${text}&page=1&include_adult=false`)
req.send();
req.onreadystatechange = function(){
    if(req.readyState == 4 && req.status ==200)
    {
        allMovies = JSON.parse(req.response).results;
        displayData()
    }
}
}



/*menu*/

for(let i=0; i<menuItem.length; i++)
{
    menuItem[i].addEventListener("click",function(){
       category= this.getAttribute("moviesTitle")
        getMovies( category)
    })
}