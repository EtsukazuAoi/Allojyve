var main = document.getElementById("main");
var apikey = "8738dbf792cba5abde36103dd3bc050e";
var baseurl = "https://api.themoviedb.org/3/";
var baseimg = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
var regex = /[^a-z\_\-\:,.&'" 0-9]/gi;
var filmlist = {};
var firststart = false;
var filmsave = JSON.parse(localStorage.getItem("filmsave") || "{}");
if(filmsave.length > 0) {
    firststart = true;
}
var newfilm = 0;
function datetofr(dates){
    var d = dates.split("-");
    return d[2]+"/"+d[1]+"/"+d[0];
}

async function api(url) {
    let response = await fetch(url);
    if (response.ok) {
        let data = await response.json();
        return data;
    } else { 
        console.log("error");
    }
}

async function topfilm(){
    var html = "<div class='cat'><h2>Les films les plus populaires :</h2><div class=\"list\">";
    var list = await api("https://api.themoviedb.org/3/movie/popular?api_key="+apikey+"&language=fr&page=1&region=fr");
    var list2 = await api("https://api.themoviedb.org/3/movie/popular?api_key="+apikey+"&language=fr&page=2&region=fr")
    for(var i in list2.results){
        list.results[Math.floor(i)+20] = list2.results[i];
    }
    // list.results.concat(list2.results);
    for(var i in list.results){
        var filminfo = list.results[i];
        if(!filmlist[filminfo.id]){
            html += "<div class='poster p_"+filminfo.id+"'><h4>"+filminfo.original_title+"</h4>";
            if(!filmsave[filminfo.id] && firststart == false){
                html += '<div class="ribbon"><span>news</span></div>';
            }
            html += "<img src='"+baseimg+filminfo.poster_path+"' alt='"+filminfo.original_title+"' /></div>";
            filmlist[filminfo.id] = {
                "lang_title":filminfo.title,
                "original_title":filminfo.original_title,
                "date":filminfo.release_date,
                "img":filminfo.poster_path,
                "vote":filminfo.vote_average,
                "descrition":filminfo.overview,
                "trailer":null
            };
            getTrailer(filminfo.id);
        }
        if(!filmsave[filminfo.id]){
            filmsave[filminfo.id] = true;
            if(firststart == false ){
                newfilm++;
            }
        }
    }
    html += "</div></div>";
    localStorage.setItem("filmsave",JSON.stringify(filmsave));
    main.innerHTML += html;
}

async function lastfilm(){
    var html = "<div class='cat'><h2>Les derniers films sortis :</h2><div class=\"list\">";
    var list = await api("https://api.themoviedb.org/3/movie/now_playing?api_key="+apikey+"&language=fr&page=1&region=fr");
    var list2 = await api("https://api.themoviedb.org/3/movie/now_playing?api_key="+apikey+"&language=fr&page=2&region=fr")
    for(var i in list2.results){
        list.results[Math.floor(i)+20] = list2.results[i];
    }
    for(var i in list.results){
        var filminfo = list.results[i];
        html += "<div class='poster p_"+filminfo.id+"'><h4>"+filminfo.original_title+"</h4>";
        if(!filmsave[filminfo.id] && firststart == false){
            html += '<div class="ribbon"><span>news</span></div>';
        }
        html += "<img src='"+baseimg+filminfo.poster_path+"' alt='"+filminfo.original_title+"' /></div>";
        if(!filmlist[filminfo.id]){
            filmlist[filminfo.id] = {
                "lang_title":filminfo.title,
                "original_title":filminfo.original_title,
                "date":filminfo.release_date,
                "img":filminfo.poster_path,
                "vote":filminfo.vote_average,
                "descrition":filminfo.overview,
                "trailer":null
            };
            getTrailer(filminfo.id);
        }
        if(!filmsave[filminfo.id]){
            filmsave[filminfo.id] = true;
            if(firststart == false){
                newfilm++;
            }
        }
    }
    html += "</div></div>";
    localStorage.setItem("filmsave",JSON.stringify(filmsave));
    main.innerHTML += html;
    // if(newfilm > 0 && newfilm < 50){
    //     var modal = document.getElementById("myModal");
    //     modal.children[0].children[0].children[1].innerHTML = "Il y eu "+newfilm+" nouveaux films depuis votre dernière visite";
    //     modal.children[0].children[1].innerHTML = "";
    //     modal.style.display = "block";
    // }
}

async function nextfilm(){
    var html = "<div class='cat'><h2>Les films à venir :</h2><div class=\"list\">";
    var list = await api("https://api.themoviedb.org/3/movie/upcoming?api_key="+apikey+"&language=fr&page=1&region=fr");
    var list2 = await api("https://api.themoviedb.org/3/movie/upcoming?api_key="+apikey+"&language=fr&page=2&region=fr")
    for(var i in list2.results){
        list.results[Math.floor(i)+20] = list2.results[i];
    }
    for(var i in list.results){
        var filminfo = list.results[i];
        html += "<div class='poster p_"+filminfo.id+"'><h4>"+filminfo.original_title+"</h4>";
        if(!filmsave[filminfo.id] && firststart == false){
            html += '<div class="ribbon"><span>news</span></div>';
        }
        html += "<img src='"+baseimg+filminfo.poster_path+"' alt='"+filminfo.original_title+"' /></div>";
        if(!filmlist[filminfo.id]){
            filmlist[filminfo.id] = {
                "lang_title":filminfo.title,
                "original_title":filminfo.original_title,
                "date":filminfo.release_date,
                "img":filminfo.poster_path,
                "vote":filminfo.vote_average,
                "descrition":filminfo.overview,
                "trailer":null
            };
            getTrailer(filminfo.id);
        }
        if(!filmsave[filminfo.id]){
            filmsave[filminfo.id] = true;
            if(firststart == false){
                newfilm++;
            }
        }
    }
    html += "</div></div>";
    localStorage.setItem("filmsave",JSON.stringify(filmsave));
    main.innerHTML += html;
    if(newfilm > 0 && newfilm < 50){
        var modal = document.getElementById("myModal");
        modal.children[0].children[0].children[1].innerHTML = "Il y eu "+newfilm+" nouveaux films depuis votre dernière visite";
        modal.children[0].children[1].innerHTML = "";
        modal.style.display = "block";
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
async function getTrailer(id){
    var url = baseurl+"movie/"+id+"/videos?language=fr&api_key="+apikey;
    var results = await api(url);
    if(results.results[0]){
        var random = getRandomInt(results.results.length);
        filmlist[id].trailer = results.results[random].key;
    }
    
}

function SelectPoster(id){
    var info = filmlist[id];
    var modal = document.getElementById("myModal");
    modal.children[0].children[0].children[1].innerHTML = info.original_title;
    modal.children[0].children[0].children[2].innerHTML = "";
    if(info.original_title.search(regex) != -1){
        modal.children[0].children[0].children[2].innerHTML = info.lang_title;
    }
    var modalbody = "<div><img src='"+baseimg+info.img+"' /></div><div><p>Description:<br>"+info.descrition+"</p><p>Date de sortie:</br>"+datetofr(info.date)+"</p><p>note:</br>"+info.vote+"/10</p>";
    if(info.trailer != null){
        modalbody += '<iframe src="https://www.youtube.com/embed/'+info.trailer+'" allowfullscreen></iframe>';
    }
    modalbody += "</div>";
    modal.children[0].children[1].innerHTML = modalbody;
    modal.style.display = "block";
}

var base = "<div id=\"navbar\"><img src=\"./charte_graphique/allojyvé_logo.png\" alt=\"logo allojyvé\"></div>";
base += '<div id="myModal" class="modal"><div class="modal-content"><div class="modal-header"><span class="close">&times;</span><h3></h3><h5></h5></div><div class="modal-body"></div></div></div>';
main.innerHTML = base;
lastfilm();
topfilm();
nextfilm();

//console.log(window.devicePixelRatio);
window.onclick = function(event) {
    if(event.target.className == "close"){
        document.getElementById("myModal").style.display = "none";
        document.getElementById("myModal").children[0].children[1].innerHTML = "";
    }else if(event.target.parentElement){
        var parent = event.target.parentElement.classList;
        if(parent[0] == "poster"){
            var select = parent[1].split("_")[1];
            SelectPoster(select);
        }
    }else{
        console.log(event.target);
    }
}
