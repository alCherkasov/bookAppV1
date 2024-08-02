import { DivComponent } from '../../common/div-component'
import './header.css'

export class Header extends DivComponent {
	constructor(appState) {
		super();
		this.appState = appState;
	};

	render() {
		this.el.innerHTML = '';
		this.el.classList.add('header');
		this.el.innerHTML = `
			<div class="header__logo">
					<img src="src/static/logo.svg" alt="BookApp" />
			</div>
			<div class="header__menu">
					<a class="header__menu-link" href="#">
							<img src="src/static/search.svg" alt="Search" />
							Поиск книг
					</a>
					<a class="header__menu-link" href="#favorites">
							<img src="src/static/favorites.svg" alt="Favorite" />
							Избранное
							<div class="header__counter">
							${this.appState.favorites.length}
							</div>
					</a>
			</div>
		`;
		return this.el;
	};
};