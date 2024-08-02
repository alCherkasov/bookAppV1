import onChange from 'on-change'
import { AbstractView } from '../../common/view'
import { BooksList } from '../../components/books-list/books-list'
import { Header } from '../../components/header/header'

export class FavoritesView extends AbstractView {
	constructor(appState) {
		super();
		this.appState = appState;
		this.appState = onChange(this.appState, this.appStateHook.bind(this));
		this.setTitle = 'Избранное';
	};

	appStateHook(path) {
		if(path === 'favorites') {
			this.render();
		};
	};

	destroy() {
		onChange.unsubscribe(this.appState);
	};

	render() {
		const favorites = document.createElement('div');
		favorites.classList.add('favorites');
		this.app.innerHTML = '';
		favorites.innerHTML = `
			<h2 class="books-list__title title">Избранные книги</h2>
		`;
		favorites.append(new BooksList(this.appState, {list: this.appState.favorites}).render());
		this.app.append(favorites);
		this.renderHeader();

	};

	renderHeader() {
		const header = new Header(this.appState).render();
		this.app.prepend(header);
	};
};