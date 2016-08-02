import fetch from 'isomorphic-fetch';

function getRandomInt(min,max) {
	return Math.floor( Math.random() * (max - min )) + min;
}
function fetchData( api ) {
	return fetch(api);
}
var returnData = [];
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
		  returnData = {
			  counts: data
		  };
		  fetchPosts( returnData, callback );
	  })
	  .catch( error => {
		  console.log(error);
		  throw error;
	  });
}

function fetchPosts( returnData, callback ) {
	fetchData('http://api.wp-app.org/wp-json/wp/v2/posts')
	  .then( res => {
		  if ( res.status >= 400 ) {
			  console.log(res);
			  throw new Error('Bad request');
		  }
		  return res.json();
	  })
	  .then( data => {
		  returnData = Object.assign( returnData, {posts: data } );
		  callback(returnData);
	  })
	  .catch( error => {
		  console.log(error);
		  throw error;
	  });

}
