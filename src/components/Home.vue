<template>
    <div :class="{ 'bg-dark text-white': isDarkMode, 'bg-light text-dark': !isDarkMode }" class="vh-100">
        <nav class="navbar navbar-expand-lg" :class="isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'" style="height: 10%;">
            <div class="container">
                <div class="ml-auto d-flex align-items-center" style="width: 15%;">
                    search
                </div>
                <div class="mx-auto" style="width: 70%;">
                    <h1 class="navbar-text">Vue Cards</h1>
                </div>
                <div class="ml-auto d-flex align-items-center" style="width: 15%;">
                    <div class="buttons h-">
                        <button @click="toggleTheme" class="btn btn-outline-secondary" title="Alternar tema">
                            <i :class="isDarkMode ? 'bi bi-sun-fill' : 'bi bi-moon-fill'"></i>
                        </button>
                        <button  @click="goToForm" class="btn btn-primary mr-2" title="Adicionar novo card">
                            <i class="bi bi-plus-lg"></i> Novo
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        <div id="container-cards" class="d-flex justify-content-center align-items-center p-0" style="height: 90%;">
            <button @click="scrollLeft" class="btn btn-primary">←</button>
            <div class="overflow-x-hidden h-full p-3 overflow-hidden" ref="cardContainer">
                <div class="row d-flex flex-nowrap">
                    <Card
                        v-for="(card, index) in cards"
                        :key="index"
                        :cardId="card._id"
                        :title="card.title"
                        :backgroundColor="card.backgroundColor"
                        :description="card.description"
                        :url="card.url"
                        @cardDeleted="removeCard"
                    />
                </div>
            </div>
            <button @click="scrollRight" class="btn btn-primary">→</button>
        </div>
    </div>
</template>

<script>
import Card from "./Card.vue";
export default {
    name: "Home",
    components: {
        Card,
    },
    data() {
        return {
            isDarkMode: true,
            cards: [],
        };
    },
    methods: {
        toggleTheme() {
            this.isDarkMode = !this.isDarkMode;
        },
        async fetchCards() {
            try {
                const response = await fetch("http://localhost:3000/api/cards");
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status} ${response.statusText}`);
                }
                this.cards = await response.json();
            } catch (error) {
                console.error("Erro ao buscar cards:", error);
            }
        },
        removeCard(id) {
            this.cards = this.cards.filter(card => card._id !== id);
        },
        goToForm() {
            this.$router.push({ 
                name: 'Form', 
                query: { isDarkMode: this.isDarkMode } 
            });
        },
        scrollLeft() {
            this.$refs.cardContainer.scrollBy({ left: -300, behavior: 'smooth' });
        },
        scrollRight() {
            this.$refs.cardContainer.scrollBy({ left: 300, behavior: 'smooth' });
        },
    },
    mounted() {
        this.fetchCards();
    },
};
</script>

<style scoped>
.navbar-text {
    font-size: 1.5rem;
    font-weight: bold;
}
.min-vh-100 {
    min-height: 100vh;
}
.buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
#container-cards > * {
    margin: 0px 10px ;
}
</style>
