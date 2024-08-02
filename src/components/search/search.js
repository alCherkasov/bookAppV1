import { DivComponent } from '../../common/div-component'
import './search.css'

export class Search extends DivComponent {
	constructor(state) {
		super();
		this.state = state;
	};
	render() {
		this.el.classList.add('search');
		this.el.innerHTML = `
				<div class="search__wrapper">
						<img class="search__search-icon" src="/src/static/search.svg" alt="">
						<input type="text" class="search__input" placeholder="Найти книгу или автора..." value="${this.state.searchQuery ? this.state.searchQuery : ''}">
				</div>
				<button type="" class="search__search-button">
						<img src="/src/static/search--white.svg" alt="Search">
				</button>
		`;
		const searchButton = this.el.querySelector('.search__search-button');
		const input = this.el.querySelector('.search__input');
		searchButton.addEventListener('click', this.search.bind(this));
		input.addEventListener('keydown', (event) => {
			if(event.code === 'Enter') this.search();
		})
		return this.el;
	};

	search() {
		const inputValue = this.el.querySelector('.search__input').value;
		this.state.searchQuery = inputValue;
	};
};