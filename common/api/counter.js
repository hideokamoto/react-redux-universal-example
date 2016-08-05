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
		fetchPost( callback, params.slug );
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

function fetchPost( callback, slug ) {
	console.log(slug);
	var api = 'http://api.wp-app.org/wp-json/wp/v2/posts?slug=' + slug;
	fetchData(api)
	  .then( res => {
		  if ( res.status >= 400 ) {
			  console.log(res);
			  throw new Error('Bad request');
		  }
		  return res.json();
	  })
	  .then( data => {
		  if ( ! data[0] ) {
		  	throw new Error('Page not found');
		  }
		  returnData = {
			  posts: data
		  };
		  fetchRoot( callback, returnData );
	  })
	  .catch( error => {
		  returnData = {
			  posts: error
		  }
		  fetchRoot( callback, returnData );
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
