var selected = document.getElementById("main");
var apikey = "8738dbf792cba5abde36103dd3bc050e";
var baseurl = "https://api.themoviedb.org/3/";
var baseimg = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";

async function api(url) {
    let response = await fetch(url);
    if (response.ok) {
        let data = await response.json();
        return data;
    } else { 
        console.log("error");
    }
}

function topfilm(){
    var list = await api("https://api.themoviedb.org/3/movie/now_playing?api_key="+apikey+"&language=fr&page=1&region=fr");
    for(var i in list.results){
        
    }
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
        "img":"",
        "vote":filminfo.vote_average,
        "overview":filminfo.overview,
        "trailer":"https://www.youtube.com/watch?v="+trailer.results[0].key
    };
    return resulta;
}