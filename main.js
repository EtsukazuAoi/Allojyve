var main = document.getElementById("main");
var apikey = "8738dbf792cba5abde36103dd3bc050e";
var baseurl = "https://api.themoviedb.org/3/";
var baseimg = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
var regex = /[^a-z\_\-\:,.& 0-9]/gi;
var savelocal = {};
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
    for(var i in list.results){
        var filminfo = list.results[i];
        html += "<div class='poster p_"+filminfo.id+"'><h4>"+filminfo.original_title+"</h4><img src='"+baseimg+filminfo.poster_path+"' alt='"+filminfo.original_title+"' /></div>";
        if(!savelocal[filminfo.id]){
            savelocal[filminfo.id] = {
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
    }
    html += "</div></div>";
    main.innerHTML += html;
}

async function lastfilm(){
    var html = "<div class='cat'><h2>Les derniers films sortis :</h2><div class=\"list\">";
    var list = await api("https://api.themoviedb.org/3/movie/now_playing?api_key="+apikey+"&language=fr&page=1&region=fr");
    for(var i in list.results){
        var filminfo = list.results[i];
        html += "<div class='poster p_"+filminfo.id+"'><h4>"+filminfo.original_title+"</h4><img src='"+baseimg+filminfo.poster_path+"' alt='"+filminfo.original_title+"' /></div>";
        if(!savelocal[filminfo.id]){
            savelocal[filminfo.id] = {
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
    }
    html += "</div></div>";
    main.innerHTML += html;
}

async function nextfilm(){
    var html = "<div class='cat'><h2>Les films à venir :</h2><div class=\"list\">";
    var list = await api("https://api.themoviedb.org/3/movie/upcoming?api_key="+apikey+"&language=fr&page=1&region=fr");
    for(var i in list.results){
        var filminfo = list.results[i];
        html += "<div class='poster p_"+filminfo.id+"'><h4>"+filminfo.original_title+"</h4><img src='"+baseimg+filminfo.poster_path+"' alt='"+filminfo.original_title+"' /></div>";
        if(!savelocal[filminfo.id]){
            savelocal[filminfo.id] = {
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
    }
    html += "</div></div>";
    main.innerHTML += html;
}

async function getTrailer(id){
    var url = baseurl+"movie/"+id+"/videos?language=fr&api_key="+apikey;
    var results = await api(url);
    if(results.results[0]){
        savelocal[id].trailer = results.results[0].key;
    }
    
}

function SelectPoster(id){
    var info = savelocal[id];
    var modal = document.getElementById("myModal");
    modal.children[0].children[0].children[1].innerHTML = info.original_title;
    modal.children[0].children[0].children[2].innerHTML = "";
    if(info.original_title.search(regex) != -1){
        modal.children[0].children[0].children[2].innerHTML = info.lang_title;
    }
    modal.children[0].children[1].innerHTML = "<div><img src='"+baseimg+info.img+"' /></div><div><p>Description:<br>"+info.descrition+"</p><p>Date de sortie:</br>"+info.date+"</p><p>note:</br>"+info.vote+"/10</p></div>";
    modal.style.display = "block";
}

var base = "<div id=\"navbar\"><img src=\"./charte graphique/allojyvé_logo.png\" alt=\"logo allojyvé\"></div>";
base += '<div id="myModal" class="modal"><div class="modal-content"><div class="modal-header"><span class="close">&times;</span><h3></h3><h5></h5></div><div class="modal-body"></div></div></div>';
main.innerHTML = base;
lastfilm();
topfilm();
nextfilm();

window.onclick = function(event) {
    if(event.target.className == "close"){
        document.getElementById("myModal").style.display = "none";
    }else if(event.target.parentElement){
        var parent = event.target.parentElement.classList;
        if(parent[0] == "poster"){
            var select = parent[1].split("_")[1];
            SelectPoster(select);
        }
    }
}