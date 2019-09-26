export const FetchData = counter => fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes')
    .then(function(response) {
        const respJSON = response.json();
        return respJSON;
    }).then(function(respJSON) {
        const respJSONParsed = respJSON._embedded.episodes[counter];
        // console.log(counter);
        return respJSONParsed;
    }).catch((err) => {
        console.log("Fetch error: ", err);
    });