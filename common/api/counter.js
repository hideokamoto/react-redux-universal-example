import fetch from 'isomorphic-fetch';
import conf from '../config';

function getRandomInt(min,max) {
	return Math.floor( Math.random() * (max - min )) + min;
}
function fetchData( api ) {
	return fetch(api);
}

var returnData = [];
export function fetchApi( params, callback ) {
	if ( ! params.slug ) {
		console.log('this is root page');
		fetchPostList( callback );
	} else {
		console.log('this is child page');
		fetchPost( callback, params.slug );
	}
}

function fetchPostList( callback ) {
	var api =  conf.api + 'wp/v2/posts' + '?_embed';
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

function fetchPost( callback, slug ) {
	var api =  conf.api + 'wp/v2/posts?slug=' + slug;
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
	fetchData( conf.api )
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
