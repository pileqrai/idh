import jQuery from 'jquery';
import rootTemplate from './templates/root.hbs';
import EMPLOYEE_DATA from './employee-data';
import Swiper from 'swiper';
import './index.scss';

window.$ = jQuery;
window.jQuery = jQuery;

(function ($) {
	const $root = $('#root');
	const employees = EMPLOYEE_DATA.map((employee, index) => {
		return Object.assign(employee, {
			id: index,
			email: `employee.${index}@somedomain.com`,
			avatar: `https://placeimg.com/300/300/people?id=${index}`
		});
	});
	let initialSlide = 0;
	let showSwiper = false;

	const render = () => {
		$root.html(rootTemplate({employees, showSwiper}));
		if (showSwiper) {
			var mySwiper = new Swiper ('.swiper-container', {
				direction: 'horizontal',
				loop: true,
				initialSlide,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});

			$($root).on('click', '.swiper-button-close',null,  () => {
				mySwiper.destroy();
				showSwiper = false;
				render();
			});
		}

		$('.employee').each((index,el) => {
			$(el).click(() => {
				showSwiper = true;
				initialSlide = $(el).data('employeeId');
				render();
			});
		});
	};

	render();
})(jQuery);