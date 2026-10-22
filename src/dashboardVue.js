import { createApp } from 'vue'
import { bootstrap } from './vueBootstrap.js'
import SearchBarWidget from './views/SearchBarWidget.vue'

document.addEventListener('DOMContentLoaded', () => {
	OCA.Dashboard.register('searchbardashboard-vue-widget', (el) => {
		const app = createApp(SearchBarWidget)
		bootstrap(app)
		app.mount(el)
	})
})