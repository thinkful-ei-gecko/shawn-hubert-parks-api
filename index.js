/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable strict */

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function getParks(query, maxResults = 10) {
  const params = {
    stateCode: query,
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
      `<h3>${responseJson.data[i].fullName}</h3>
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
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);