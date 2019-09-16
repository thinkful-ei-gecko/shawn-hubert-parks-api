/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable strict */

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    console.log(queryItems.join('&'));
  return queryItems.join('&');
}

function getParks(searchTerm1, searchTerm2, maxResults = 10) {

    //stateCode1: searchTerm1,
    //stateCode2: searchTerm2,
    //stateList: ,

  const params = {
    stateCode: `${searchTerm1}, ${searchTerm2}`,
    limit: maxResults,
    api_key: '05k9MEhhbqhZkN9LEleXdVgUixCszymjr5lc3Vb3'
  };
  const queryString = formatQueryParams(params);
  const url = 'https://developer.nps.gov/api/v1/parks' + '?' + queryString;

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
  console.log(responseJson);
  $('#results-list').empty();
  $('#results-list').append('<h2>Search results:</h2>');

  for (let i = 0; i < responseJson.data.length; i++) {
    $('#results-list').append(
      `<h3>${responseJson.data[i].fullName}: ${responseJson.data[i].states}</h3>
      <li>${responseJson.data[i].description}</li><br>
      <li>${responseJson.data[i].latLong}</li><br>
      <li><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></li><br>`
    );
  }
  $('#results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm1 = $('#js-search-term-1').val();
    const searchTerm2 = $('#js-search-term-2').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm1, searchTerm2, maxResults);
  });
}

$(watchForm);