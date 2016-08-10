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
		if ( ! params.pageNo ) {
			params.pageNo = 0;
		}
		fetchPostList( callback, params.pageNo );
	} else {
		console.log('this is child page');
		fetchPost( callback, params.slug );
	}
}

function fetchPostList( callback, pageNo = 0 ) {
	var api =  conf.api + 'wp/v2/posts?';
	if ( pageNo ) {
		api += 'page=' + pageNo;
	}
	api += '&_embed';
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
			  posts: data,
			  pageNo: pageNo
		  };
		  fetchRoot( callback, returnData );
	  })
	  .catch( error => {
		  returnData = {
			  posts: error,
			  pageNo: pageNo
		  }
		  fetchRoot( callback, returnData );
	  });
}

function fetchPost( callback, slug ) {
	var path = '';
	if ( 'about' === slug || 'contributing-to-wordpress' === slug ) {
		path = 'pages';
	} else {
		path = 'posts';
	}
	var api =  conf.api + 'wp/v2/' + path + '?slug=' + slug + '&_embed';
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
