import fetch from 'isomorphic-fetch';

function getRandomInt(min,max) {
	return Math.floor( Math.random() * (max - min )) + min;
}
function fetchData( api ) {
	return fetch(api);
}

export function fetchCounter(callback) {

	fetchData('http://localhost:3000/api/counts')
	  .then( res => {
		  if ( res.status >= 400 ) {
			  console.log(res);
			  throw new Error('Bad request');
		  }
		  return res.json();
	  })
	  .then( data => {
		  console.log(data[0].value);
		  callback(data[0].value);
	  })
	  .catch( error => {
		  console.log(error);
		  throw error;
	  })


	// In the case of a real world API call,
	// you'll normally run into a Promise like this:
	// API.getUser().then(user=>callback(user));
}
