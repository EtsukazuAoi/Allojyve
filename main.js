var selected = document.getElementById("main");
var apikey = "8738dbf792cba5abde36103dd3bc050e";
var baseurl = "https://api.themoviedb.org/3/";
var baseimg = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
const module = {};

function topfilm(){

}

function lastfilm(){

}

function nextfilm(){

}

var edit = getfilm("579741");
console.log(edit);
selected.innerHTML = JSON.stringify(edit);

function getfilm(id){
    var resulta = {};
    var preview = null;
    var url = baseurl+"movie/"+id+"?language=fr&api_key="+apikey;
    var url2 = baseurl+"movie/"+id+"/videos?language=fr&api_key="+apikey;
    // ---- get trailer list ---- //
    fetch(url2).then((resp2) => resp2.json()).then(function(data2) {
        if(!data2){
           alert("data empty") ;
        }
        for(var i in data2.results) {
                preview = "https://www.youtube.com/watch?v="+data2.results[i].key
                console.log(preview)
                //break;
        }
    });
    // ---- get movie ---- //
    fetch(url).then((resp) => resp.json()).then(function(data) {
        resulta = {
            "lang_title":data.title,
            "original_title":data.original_title,
            "date":data.release_date,
            "img":"",
            "vote":data.vote_average,
            "overview":data.overview,
            "trailer":preview
        };
    });
    if(resulta.lang_title){
        return resulta;
    }
}