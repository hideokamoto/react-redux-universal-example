import React , { Component } from 'react';
import conf from '../config';
import Helmet from 'react-helmet';

export default class RouterLayout extends Component {
	constructor(props,context) {
		super(props);
	}

	render() {
		const { siteRoot, search } = this.props;
		let titleTemplate = "%s | " + siteRoot.name;
		return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
				<Helmet
					htmlAttributes={{"lang": "ja"}}
					link={[
						{"rel": "stylesheet", "href": "https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en"},
						{"rel": "stylesheet", "href": "https://code.getmdl.io/1.1.3/material.grey-pink.min.css"},
						{"rel": "stylesheet", "href": "https://fonts.googleapis.com/icon?family=Material+Icons"}
					]}
					title={siteRoot.name}
					titleTemplate={titleTemplate}
					defaultTitle={siteRoot.name}
					meta={[
						{property: 'og:title', content: siteRoot.name},
						{property: 'description', content: siteRoot.description},
						{property: 'charset', content: 'utf-8'},
						{property: 'viewport', content: "width=device-width, initial-scale=1.0, minimum-scale=1.0"}
					]}
					style={[{
						"cssText": `
							img {
								max-width: 100%;
								height: auto;
							}
							a.mdl-card {
								text-decoration: none;
							}
							.no-bottom-padding {
								padding-bottom: 0;
							}
							.mdl-card__nomedia {
								margin-top: 0;
								margin-bottom: 0;
							}
							.mdl-card__media {
								overflow: hidden;
								max-height: 250px;
							}
							.content_text {
								max-width: 700px;
								margin: 0 auto;
							}
							.portfolio-header {
								background-color: #f5f5f5;
								border-bottom: 1px solid #ddd;
							}
							.portfolio-header .mdl-layout__header-row {
								padding: 0;
								-webkit-justify-content: center;
									-ms-flex-pack: center;
									justify-content: center;
							}
							.portfolio-navigation-row  .mdl-navigation {
								text-align: center;
								max-width: 900px;
								width: 100%;
							}
							.portfolio-navigation-row .mdl-navigation__link {
								-webkit-flex: 1;
									-ms-flex: 1;
									flex: 1;
								line-height: 42px;
							}
							.portfolio-max-width {
								max-width: 1024px;
								margin: auto;
							}
						`
					}]}
					script={[{
						"type": "application/ld+json",
						"innerHTML": `{
							"@context": 'http://schema.org',
							"@type": 'WebSite',
							"url": "${conf.domain}",
							"potentialAction": {
								"@type": 'SearchAction',
								"target": "${conf.domain}?s={query}",
								"query-input": 'required'
							}
						}`
					}]}
				/>
				<header className="mdl-layout__header mdl-layout__header--waterfall portfolio-header">
					<h1 className="mdl-layout__header-row portfolio-logo-row">
						<a className="mdl-layout__title" href={conf.pages.root}>
							<div className="portfolio-logo"></div>
							<span className="mdl-layout__title">{siteRoot.name}</span>
						</a>
					</h1>
					<div className="mdl-layout__header-row portfolio-navigation-row mdl-layout--large-screen-only">
						<nav className="mdl-navigation mdl-typography--body-1-force-preferred-font">
							<a className="mdl-navigation__link is-active" href={conf.pages.root}>TOP</a>
							<a className="mdl-navigation__link" href={conf.pages.about}>About</a>
							<a className="mdl-navigation__link" href={conf.pages.contribute}>Contribution</a>
							<form action={conf.pages.root}>
								<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded">
									<input className="mdl-textfield__input" type="text" placeholder="search keyword" name='s' defaultValue={search}/>
								</div>
							</form>
						</nav>
					</div>
				</header>
				<main clasName="mdl-layout__content">
					{this.props.children}
					<footer className="mdl-mini-footer">
						<div className="mdl-mini-footer__left-section">
							<h2 className="mdl-logo">
								{siteRoot.name}<br />
								<small>{siteRoot.description}</small>
							</h2>
						</div>
						<div className="mdl-mini-footer__right-section">
							<ul className="mdl-mini-footer__link-list">
								<li><a href={conf.pages.about}>About</a></li>
							</ul>
						</div>
					</footer>
				</main>
			</div>
		)
	}
}
