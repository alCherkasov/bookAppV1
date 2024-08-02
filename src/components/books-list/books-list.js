import 'books-list.css'
import { DivComponent } from '../../common/div-component'
import { Card } from '../card/card'
import './../../static/global.css'

export class BooksList extends DivComponent {
	constructor(appState, parentState) {
		super();
		this.appState = appState;
		this.parentState = parentState;
	};
	render() {
		if(this.parentState.loading) {
			this.el.classList.add('books-list');
			this.el.innerHTML = `
				<div class="books-list__loader">Загрузка...</div>
			`;
		};
		this.el.classList.add('books-list');
		const cardGrid = document.createElement('div');
		cardGrid.classList.add('card-grid');
		this.el.append(cardGrid);
		for(const card of this.parentState.list) {
			cardGrid.append(new Card(this.appState, card).render());
		};
		return this.el;
	};
};