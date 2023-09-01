<script>
import axios from 'axios';
import { store } from '../store';
import AppLoader from './AppLoader.vue';

export default {
    name: 'AskForm',
    components:{
        AppLoader,
    },
    data() {
        return {
            store,
            name: '',
            surname:'',
            email: '',
            content: '',
            status: false,
            loading: false,
            errors: {},
        }
    },
    methods: {
        sendForm() {
            this.loading = true;

            const data = {

                name: this.name,
                surname: this.surname,
                email: this.email,
                content: this.content,

            };

            this.errors = {};

            axios.post(`${this.store.baseUrl}/api/contacts`, data).then((response) => {
                this.status = response.data.status;
                if (!this.status) {
                    this.errors = response.data.errors;


                } else {
                    
                    this.name = '';
                    this.surname = '';
                    this.email = '';
                    this.content = '';
                   
                }

                this.loading = false;
            });
        }
    },
}
</script>
<template>
    <div class="col-12 my-5">
        <div class="row p-5">
            <div class="col-12">
                <h2 class="text-center">Contattaci</h2>
            </div>
            <div class="col-12">
                <form @submit.prevent="sendForm()" class="row">
                    <div class="col-12 col-md-6 my-3">
                        <label class="control-label">Nome</label>
                        <input type="text" name="name" id="name" placeholder="Inserisci il tuo nome " v-model="name" class="form-control" :class="errors.name ? 'is-invalid' : ''" >
                        <span  v-for="(error, index) in errors.name" :key="index" class="text-danger">{{ error }}</span>
                    </div>
                    <div class="col-12 col-md-6 my-3">
                        <label class="control-label">Cognome</label>
                        <input type="text" name="surname" id="surname" placeholder="Inserisci  il tuo cognome" v-model="surname" class="form-control" :class="errors.surname ? 'is-invalid' : ''" >
                        <span v-for="(error, index) in errors.surname" :key="index" class="text-danger">{{ error }}</span>
                    </div>
                    <div class="col-12 col-md-6 my-3">
                        <label class="control-label">Email</label>
                        <input type="mail" name="email" id="email" placeholder="Inserisci la tua email" v-model="email" class="form-control" :class="errors.email ? 'is-invalid' : ''" >
                        <span v-for="(error, index) in errors.email" :key="index" class="text-danger">{{ error }}</span>
                    </div>
                    <div class="col-12 my-3">
                        <label class="control-label">Contenuto</label>
                        <textarea name="content" id="content" placeholder="Inserisci il messaggio" v-model="content" class="form-control" :class="errors.content ? 'is-invalid' : ''"  ></textarea>
                        <span v-for="(error, index) in errors.content" :key="index" class="text-danger">{{ error }}</span>
                    </div>
                    <div class="col-12 text-center my-3">
                        <button type="submit" class="btn btn-success" :disabled="loading">{{ loading ? 'Invio in corso' : 'Invia' }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style lang="scss">

</style>