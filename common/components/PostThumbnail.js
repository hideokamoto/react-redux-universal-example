import React, { Component } from 'react';
import conf from '../config';

export default class PostThumbnail extends Component {
	render() {
		if ( this.props.embed['wp:featuredmedia'] ) {
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
