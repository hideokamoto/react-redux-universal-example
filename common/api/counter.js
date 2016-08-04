import fetch from 'isomorphic-fetch';

function getRandomInt(min,max) {
	return Math.floor( Math.random() * (max - min )) + min;
}
function fetchData( api ) {
	return fetch(api);
}
var returnData = [];
export function fetchApi( params, callback) {
	console.log(params);
	if ( ! params.slug ) {
		console.log('this is root page');
		fetchRoot( callback );
	} else {
		console.log('this is child page');
		fetchPosts( callback );
	}
}

function fetchCounter( callback ) {
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
		  fetchRoot( returnData, callback );
	  })
	  .catch( error => {
		  console.log(error);
		  callback(false);
	  });
}

function fetchPosts( callback ) {
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
		  fetchRoot( callback, returnData );
	  })
	  .catch( error => {
		  console.log(error);
		  throw error;
	  });
}

function fetchRoot( callback, returnData = {} ) {
	fetchData('http://api.wp-app.org/wp-json/')
	  .then( res => {
		  if ( res.status >= 400 ) {
			  console.log(res);
			  throw new Error('Bad request');
		  }
		  return res.json();
	  })
	  .then( data => {
		  returnData = Object.assign( returnData, { siteRoot: data } );
		  callback( returnData, callback );
	  })
	  .catch( error => {
		  console.log(error);
		  throw error;
	  });
}
