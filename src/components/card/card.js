import { DivComponent } from '../../common/div-component'
import './card.css'

export class Card extends DivComponent {
	constructor(appState, cardState) {
		super();
		this.appState = appState;
		this.cardState = cardState;
	};

	#add() {
		this.appState.favorites.push(this.cardState);
	};

	#delete() {
		this.appState.favorites = this.appState.favorites.filter(book => book.key !== this.cardState.key);
	};
	
	render() {
		this.el.classList.add('card');
		const existInFavorite = this.appState.favorites.find(book => {
			return book.key == this.cardState.key
		});
		this.el.innerHTML = `
				<div class="card__img">
						<img src="https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg" alt="Cover">
				</div>
				<div class="card__info">
						<p class="card__tag">${this.cardState.subject ? this.cardState.subject[0] : 'Неизвестно'}</p>
						<h3 class="card__title">${this.cardState.title}</h3>
						<p class="card__credit">${this.cardState.author_name ? this.cardState.author_name[0] : 'Неизвестно'}<p>
				</div>
				<div class="card__footer">
						<button class="card__favorite-button ${existInFavorite ? 'card__favorite-button--active' : ''}">
								<img src="src/static/${existInFavorite ? 'favorites.svg' : 'favorite-white.svg'}"
						</button>
				</div>
		`;
		const favButton = this.el.querySelector('.card__favorite-button');
		if(existInFavorite) {
			favButton.addEventListener('click', this.#delete.bind(this));
		} else {
			favButton.addEventListener('click', this.#add.bind(this));
		}

		return this.el;
	};
};