var selected = document.getElementById("main");
var apikey = "8738dbf792cba5abde36103dd3bc050e";
var baseurl = "https://api.themoviedb.org/3/";
var baseimg = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
var maindiv = "";
var regex = /[^a-z 0-9]/gi;
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
    var html = "<h2>List des dernier sortie :</h2><div class=\"list\">";
    var list = await api("https://api.themoviedb.org/3/movie/now_playing?api_key="+apikey+"&language=fr&page=1&region=fr");
    for(var i in list.results){
		var title = list.results[i].title
        var Otitle = list.results[i].original_title;
        if(Otitle.search(regex) != -1){
            Otitle = title;
        }
        html += "<div><h3>"+Otitle+"</h3><img src='"+baseimg+list.results[i].poster_path+"' alt='"+Otitle+"' /></div>";
    }
    html += "</div>";
    maindiv += html;
}

function lastfilm(){

}

function nextfilm(){

}

async function getfilm(id){
    var url = baseurl+"movie/"+id+"?language=fr&api_key="+apikey;
    var url2 = baseurl+"movie/"+id+"/videos?language=fr&api_key="+apikey;

    var filminfo = await api(url);
    var trailer = await api(url2);
    console.log(filminfo);
    console.log(trailer);
    resulta = {
        "lang_title":filminfo.title,
        "original_title":filminfo.original_title,
        "date":filminfo.release_date,
        "img":filminfo.poster_path,
        "vote":filminfo.vote_average,
        "overview":filminfo.overview,
        "trailer":"https://www.youtube.com/watch?v="+trailer.results[0].key
    };
    return resulta;
}

//async function main(){
    var topbar = '<div id="navbar"><img src="./charte graphique/allojyvé_logo.png" alt="logo allojyvé"></div>';
    maindiv += topbar;
    topfilm();
    selected.innerHTML = maindiv;
//}

//main();