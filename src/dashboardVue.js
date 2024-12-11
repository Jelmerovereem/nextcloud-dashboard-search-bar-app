import { createApp } from 'vue';
import { initializeApp } from './vueBootstrap.js'; // Import the bootstrap function
import SearchBarWidget from './views/SearchBarWidget.vue';

document.addEventListener('DOMContentLoaded', () => {
	OCA.Dashboard.register('searchbardashboard-vue-widget', (el, { widget }) => {
		const app = createApp(SearchBarWidget, {
			title: widget.title,
		});

		initializeApp(app);

		app.mount(el);
	});
});
