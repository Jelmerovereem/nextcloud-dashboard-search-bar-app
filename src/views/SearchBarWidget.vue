<template>
    <div class="search-engine-widget">
        <form @submit.prevent="performSearch">
            <div class="search-container">
                <NcTextField type="search"
                    :label="t('dashboardsearchbar', 'Search')"
                    :model-value="searchQuery"
                    @update:model-value="fetchSuggestions">
                </NcTextField>
                <NcButton @click="performSearch" variant="primary">
                    <template #icon>
                        <Magnify />
                    </template>
                </NcButton>
            </div>
        </form>

        <ul v-if="suggestions.length" class="suggestions-list">
            <NcListItem v-for="suggestion in suggestions" :key="suggestion" compact :name="suggestion"
                @click="useSuggestion(suggestion)">
            </NcListItem>
        </ul>
    </div>
</template>

<script>
import axios from '@nextcloud/axios';
import NcButton from '@nextcloud/vue/components/NcButton'
import NcTextField from '@nextcloud/vue/components/NcTextField'
import NcListItem from '@nextcloud/vue/components/NcListItem'
import Magnify from 'vue-material-design-icons/Magnify.vue'

import { generateUrl } from '@nextcloud/router'

export default {
    name: "SearchBarWidget",

    components: {
        NcButton,
        NcTextField,
        NcListItem,
        Magnify
    },

    data() {
        return {
            searchQuery: '',
            suggestions: []
        };
    },

    methods: {
        performSearch() {
            const duckDuckGoUrl = `https://duckduckgo.com/?q=${encodeURIComponent(this.searchQuery)}`;
            window.open(duckDuckGoUrl, "_blank");
        },

        async fetchSuggestions(query) {
            this.searchQuery = query;
            if (this.searchQuery.length > 2) {
                try {
                    const response = await axios.get(generateUrl("/apps/dashboardsearchbar/suggestions"), {
                        params: { query: this.searchQuery }
                    });
                    this.suggestions = response.data.map(suggestion => suggestion.phrase);
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                    this.suggestions = [];
                }
            } else {
                this.suggestions = [];
            }
        },


        useSuggestion(suggestion) {
            this.searchQuery = suggestion;
            this.suggestions = [];
            this.performSearch();
        }
    }
};
</script>

<style scoped lang="scss">
.search-container {
    display: flex;
    align-items: center;
    gap: 4px;
}

.suggestions-list {
    list-style-type: none;
    padding: 0;
    margin-top: 10px;
}
</style>
