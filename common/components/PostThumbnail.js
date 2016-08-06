import React, { Component } from 'react';

export default class PostThumbnail extends Component {
	isset( data ){
		if( data === "" || data === null || data === undefined ){
			return false;
		}else{
			return true;
		}
	}
	render() {
		if ( this.isset( this.props.embed ) && this.isset( this.props.embed['wp:featuredmedia'] ) ) {
			if ( this.props.embed['wp:featuredmedia'][0]["media_details"]["sizes"]["full"] ) {
				let thumbnail = this.props.embed['wp:featuredmedia'][0]["media_details"]["sizes"]["full"]["source_url"];
				return (
					<div className="mdl-card__media">
						<img className="article-image" src={thumbnail} border="0" alt="" />
					</div>
				);
			}
		}
		return (
			<hr className="mdl-card__nomedia"/>
		);
	}
}
