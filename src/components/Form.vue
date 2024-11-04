<template>
    <div :class="['modal-overlay', isDarkMode ? 'bg-dark' : 'bg-light']" v-if="showModal">
        <div class="modal-dialog">
            <div :class="['modal-content', isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark']">
                <div class="modal-header">
                    <h5 class="modal-title">{{ isUpdateMode ? 'Editar Card' : 'Novo Card' }}</h5>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <label for="title" class="form-label">Título</label>
                            <input type="text" class="form-control" id="title" v-model="formData.title" required />
                        </div>
                        <div class="mb-3">
                            <label for="backgroundColor" class="form-label">Cor de Fundo</label>
                            <input type="text" class="form-control" id="backgroundColor" v-model="formData.backgroundColor" required />
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Descrição</label>
                            <textarea class="form-control" id="description" rows="3" v-model="formData.description" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="url" class="form-label">URL</label>
                            <input type="url" class="form-control" id="url" v-model="formData.url" required />
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-secondary me-2" @click="closeModal">Cancelar</button>
                            <button type="submit" class="btn btn-primary">{{ isUpdateMode ? 'Atualizar Card' : 'Adicionar Card' }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Form',
    data() {
        return {
            showModal: true,
            formData: {
                title: '',
                backgroundColor: '',
                description: '',
                url: ''
            },
            isDarkMode: this.$route.query.isDarkMode,
            isUpdateMode: false,
        };
    },
    created() {
        const cardId = this.$route.params.cardId;
        if (cardId) {
            this.isUpdateMode = true;
            this.loadCardData(cardId);
        }
    },
    methods: {
        async loadCardData(cardId) {
            try {
                const response = await fetch(`http://localhost:3000/api/cards/${cardId}`);
                if (response.ok) {
                    const data = await response.json();
                    this.formData = {
                        title: data.title,
                        backgroundColor: data.backgroundColor,
                        description: data.description,
                        url: data.url
                    };
                } else {
                    console.error('Erro ao carregar o card.');
                }
            } catch (error) {
                console.error('Erro ao carregar o card:', error);
            }
        },
        async submitForm() {
            const cardId = this.$route.params.cardId;
            const url = `http://localhost:3000/api/cards/${cardId ? cardId : ''}`;
            const method = cardId ? 'PUT' : 'POST';

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.formData)
                });

                if (response.ok) {
                    this.$router.push({ name: 'Home' });
                } else {
                    alert('Erro ao salvar o card');
                }
            } catch (error) {
                console.error('Erro ao salvar o card:', error);
                alert('Erro ao salvar o card');
            }
        },
        closeModal() {
            this.$router.push({ name: 'Home' });
        }
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
    width: 100%;
    max-width: 500px;
}

.btn-close-white {
    filter: invert(1);
}
</style>
