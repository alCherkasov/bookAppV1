import onChange from 'on-change'
import { AbstractView } from '../../common/view'
import { BooksList } from '../../components/books-list/books-list'
import { Header } from '../../components/header/header'
import { Search } from '../../components/search/search'

export class MainView extends AbstractView {
	state = {
		list: [],
		numFound: 0,
		loading: false,
		searchQuery: undefined,
		offset: 0
	};
	constructor(appState) {
		super();
		this.appState = appState;
		this.appState = onChange(this.appState, this.appStateHook.bind(this));
		this.state = onChange(this.state, this.stateHook.bind(this));
		this.setTitle('Поиск книг');
	};

	appStateHook(path) {
		if(path === 'favorites') {
			this.render();

		};
	};

	async loadList(query, offset) {
		const response = await fetch(`https://openlibrary.org/search.json?q=${query}&offset=${offset}`);
		return response.json();
	}

	async stateHook(path) {
		if(path === 'searchQuery') {
			this.state.loading = true;
			const data = await this.loadList(this.state.searchQuery, this.state.offset);
			this.state.loading = false;
			this.state.numFound = data.numFound;
			this.state.list = data.docs;
		};
		if(path === 'loading' || path === 'list') {
			this.render();
		}
	};

	destroy() {
		onChange.unsubscribe(this.appState);
		onChange.unsubscribe(this.state);
	};

	render() {
		const main = document.createElement('div');
		main.classList.add('main');
		main.innerHTML = `
			<h2 class="books-list__title title">Найдено книг - ${this.state.numFound}</h2>
		`;
		main.append(new Search(this.state).render());
		main.append(new BooksList(this.appState, this.state).render());
		this.app.innerHTML = '';
		this.app.append(main);
		this.renderHeader();
	};

	renderHeader() {
		const header = new Header(this.appState).render();
		this.app.prepend(header);
	};
	
};