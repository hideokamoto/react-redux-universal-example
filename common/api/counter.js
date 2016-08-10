import fetch from 'isomorphic-fetch';
import conf from '../config';


function fetchData( api ) {
	return fetch(api);
}

var returnData = [];
export function fetchApi( params, query, callback ) {
	if ( ! params.slug ) {
		if ( ! params.pageNo ) {
			params.pageNo = 0;
		}
		fetchPostList( callback, params.pageNo, query );
	} else {
		fetchPost( callback, params.slug );
	}
}

function fetchPostList( callback, pageNo = 0, query = { s: false } ) {
	var api =  conf.api + 'wp/v2/posts?';
	if ( pageNo ) {
		var no = parseInt( pageNo ) + 1;
		api += 'page=' + no;
	}
	if ( query.s ) {
		api += '&search=' + query.s;
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
			  pageNo: pageNo,
			  search: query.s
		  };
		  fetchRoot( callback, returnData );
	  })
	  .catch( error => {
		  returnData = {
			  posts: error,
			  pageNo: pageNo,
			  search: query.s
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
