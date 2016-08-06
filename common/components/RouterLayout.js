import React , { Component } from 'react';

export default class RouterLayout extends Component {
	constructor(props,context) {
		super(props);
	}

	render() {
		const { siteRoot } = this.props;
		return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
				<header className="mdl-layout__header mdl-layout__header--waterfall portfolio-header">
					<h1 className="mdl-layout__header-row portfolio-logo-row">
						<span className="mdl-layout__title">
							<div className="portfolio-logo"></div>
							<span className="mdl-layout__title">{siteRoot.name}</span>
						</span>
					</h1>
					<div className="mdl-layout__header-row portfolio-navigation-row mdl-layout--large-screen-only">
						<nav className="mdl-navigation mdl-typography--body-1-force-preferred-font">
							<a className="mdl-navigation__link is-active" href="/">TOP</a>
							<a className="mdl-navigation__link" href="about">About</a>
							<a className="mdl-navigation__link" href="contact">Contact</a>
						</nav>
					</div>
				</header>
				<main clasName="mdl-layout__content">
					{this.props.children}
					<div id='client' className="mdl-grid portfolio-max-width"></div>
					<footer className="mdl-mini-footer">
						<div className="mdl-mini-footer__left-section">
							<h2 className="mdl-logo">
								{siteRoot.name}<br />
								<small>{siteRoot.description}</small>
							</h2>
						</div>
						<div className="mdl-mini-footer__right-section">
							<ul className="mdl-mini-footer__link-list">
								<li><a href="about">About</a></li>
								<li><a href="contact">Contact</a></li>
							</ul>
						</div>
					</footer>
				</main>
			</div>
		)
	}
}
