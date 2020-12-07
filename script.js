'use strict';



function generateArtistsListItem(artistsItem) {
    console.log("generateArtistsListItem() ran");
    
    const artistsName = artistsItem[1].fullName;
  
    return `
    <li>
      <h3>${artistsName}</h3>
    </li>`
  }



function generateArtistsListString(artistsJSON) {
    const artistsListString = Object.entries(artistsJSON.data)
      .map(artistsItem => generateArtistsListItem(artistsItem));
  
    return artistsListString.join('');
  }



function displayArtists(artistsJSON) {
    console.log(responseJSON);
    $('#results-list').empty();
    
    const statesSelected = $('#js-search-state').val()
    $('#js-state-names').text(statesSelected.toUpperCase());

    const citySelected = $('#js-search-city').val();
    $('#js-city-names').text(citySelected.toUpperCase());
  
    const artistsList = generateArtistsListString(artistsJSON);
    $('#js-artists-list').append(artistsList);


    $('#results').removeClass('hidden');
  }

  

function formatQueryParameters(params) {;
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURI(params[key])}`); 
    return queryItems.join('&');
  }


function getArtists(searchState, searchCity, searchRadius) {
    const apiKey = 'M8Qs44pmUP412bWt4G6lSsggwpHoPUcA';
    const endpointURL = 'https://app.ticketmaster.com/discovery/v2/events';
    const params = {
        api_key : apiKey,
        stateCode: searchState,
        city: searchCity,
        radius: searchRadius
    };

        const queryString = formatQueryParameters(params);
        const url = `${endpointURL}?${queryString}`;

        console.log(queryString);


        fetch(url)
        .then(
        response => {
        if (response.ok) {
            return response.json();
         }
        throw new Error(response.statusText);
        })
        .then(
        responseJSON => displayArtists(responseJSON)
        )
        .catch(
        error => {
            alert("fetch response failed")
            $('#results').addClass('hidden');
            $('#js-error-message').text(`${error.message}`);
        }
        );
}




function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchState = $('js-search-state').val();
        const searchCity = $('js-search-city').val();
        const searchRadius = $('js-search-radius').val();
        getArtists(searchState, searchCity, searchRadius);
    });
}


$(watchForm);