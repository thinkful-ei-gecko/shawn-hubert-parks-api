/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable strict */


//https://developer.nps.gov/api/v1/parks?stateCode=co&limit=5&api_key=05k9MEhhbqhZkN9LEleXdVgUixCszymjr5lc3Vb3


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}







function getParks(query, maxResults=10) {
  const params = {
    stateCode: query,
    limit: maxResults,
    api_key: '05k9MEhhbqhZkN9LEleXdVgUixCszymjr5lc3Vb3'
  };
  const queryString = formatQueryParams(params);
  const url = 'https://developer.nps.gov/api/v1/parks' + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].latLong}</p>
      <p>${responseJson.data[i].url}</p>
      </li>`
    );}
  //display the results section  
  $('#results').removeClass('hidden');
}




function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);