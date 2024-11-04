<template>
    <div class="card text-white m-2 position-relative" :style="{ backgroundColor: backgroundColor }">
        <div class="position-absolute top-0 start-0 m-2">
            <button @click="updateCard" class="btn btn-sm btn-light me-2">
                <i class="bi bi-pencil-fill"></i>
            </button>
            <button @click="deleteCard" class="btn btn-sm btn-danger">
                <i class="bi bi-trash-fill"></i>
            </button>
        </div>

        <div class="card-body text-center d-flex flex-column justify-content-evenly">
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text">{{ description }}</p>
            <a :href="formattedUrl" target="_blank" class="btn btn-light py-2"
                style="background-color: #6e1a1a3d;">Saiba mais</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "Card",
    props: {
        title: {
            required: true,
        },
        backgroundColor: {
            required: true,
        },
        description: {
            required: true,
        },
        url: {
            required: true,
        },
        cardId: {
            required: true
        },
    },
    
    computed: {
        formattedUrl() {
            return this.url.startsWith("http://") || this.url.startsWith("https://")
                ? this.url
                : `http://${this.url}`;
        },
    },
    methods: {
        updateCard() {
            this.$router.push({ name: 'Form', params: { cardId: this.cardId } })
        },
        async deleteCard() {
            try {
                const response = await fetch(`http://localhost:3000/api/cards/${this.cardId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    this.$toasted.show("Card excluído com sucesso!", { type: 'success' });
                    this.$emit("cardDeleted", this.cardId);
                } else {
                    this.$toasted.show("Erro ao excluir o card.", { type: 'error' });
                }
            } catch (error) {
                console.error("Erro ao excluir o card:", error);
                this.$toasted.show("Erro ao excluir o card.", { type: 'error' });
            }
        }
    },
};
</script>

<style scoped>
.card {
    border-radius: 15px;
    padding: 1.5rem;
    min-width: 200px;
    width: 30%;
    height: 50vh;
    transition: transform 0.3s;
}
.card:hover {
    transform: scale(1.05);
}
.card .btn {
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
}
.position-absolute {
    z-index: 1;
}
</style>
