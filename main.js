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

selected.innerHTML = JSON.stringify(getfilm("550"));

function getfilm(id){
    var url = baseurl+"movie/"+id+"?language=fr&api_key="+apikey;
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        url = baseurl+"movie/"+id+"/watch/providers?language=fr&api_key="+apikey;
        var preview = null;
        fetch(url).then((resp2) => resp2.json()).then(function(data2) {
            for(var i in data2.results){
                if(data2.results[i].type == "Trailer" && data2.Results[i].site == "YouTube"){
                    preview = "https://www.youtube.com/watch?v="+data2.results[i].key;
                    console.log(preview)
                }
            }
        }).catch(function(error2) {
            return error2;
        });

        const resulta = {
            "original_title":data.original_title,
            "date":data.release_date,
            "img":"",
            "vote":data.vote_average,
            "overview":data.overview,
            "trailer":preview,
        };
        console.log(resulta)
        return resulta;
        
    }).catch(function(error) {
        return error;
    });
}