import './components/books-list/books-list.css'
import './static/global.css'
import { FavoritesView } from './views/favorites/favorites'
import { MainView } from './views/main/main'

class App {
	routes = [
		{path: '', view: MainView},
		{path: '#favorites', view: FavoritesView}
	];
	appState = {
		favorites: []
	};
	constructor() {
		window.addEventListener('hashchange', this.route.bind(this));
		this.route();
	}

	route() {
		if(this.currentView) {
			this.currentView.destroy();
			console.log(this.currentView.destroy)
		};
		const view = this.routes.find(route => route.path === location.hash).view;
		console.log(view)
		this.currentView = new view(this.appState);
		this.currentView.render();

	};
};

new App();


