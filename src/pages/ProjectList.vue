<script>
import axios from 'axios';
import {store} from '../store.js'
import AppLoader from '../components/AppLoader.vue';
export default {
    name: 'ProjectList',
    components:{
        AppLoader
    },
    
    data(){
        return{
            store,
            projects: [],
            currentPage: 1,
            lastPage: null,

        }
    },
    created(){
        this.getProjects(1);
    },
    methods: {
        getProjects(num_page){
            this.store.loading = true;

            //  CHIAMATA SENZA PAGINAZIONE
            // axios.get(`${this.baseUrl}/api/projects`).then((response)=>{

            //     if(response.data.status){
            //         this.projects = response.data.results;
            //         this.loading =false;
            //     }
            //     else{

            //     }
            // })
             
            axios.get(`${this.store.baseUrl}/api/projects`,{ params: { page: num_page}}).then((response) =>{

                this.projects = response.data.results.data;
                this.currentPage = response.data.results.current_page;
                this.lastPage = response.data.results.last_page;
                this.store.loading = false;


            })
            


        },
        truncateText(text){
            if(text.length > 100){
                return text.substr(0,50) + '...'
            }

            return text;
        }
    },
    
}
</script>
<template lang="">
    <div class="container">
        <h1 class="text-center my-5">Progetti</h1>
    </div>
    <AppLoader v-if="store.loading"/>
    <div v-else class="container">
        <div class="row">
            <div class="col-12 col-md-4" v-for="project in projects" :key="project.id">
                <div class="card m-1 h_max_card">
                    <div class="card-header">{{project.title}}</div>
                    <div class="card-image-top">
                        <img v-if="project.cover_image !== null" :src="`${this.store.baseUrl}/storage/${project.cover_image}`" class="img-fluid">
                        <img v-else src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/No_immagine_disponibile.svg/300px-No_immagine_disponibile.svg.png" class="img-fluid">
                    </div>
                    <div class="card-body h_max">
                        <h6 class="mt-3">Tipologia:</h6>
                        <div>
                            <span class="text-success" v-if="project.type"><strong>{{project.type.name}}</strong></span>
                            <span v-else><em>Tipologia non assegnata</em> </span>
                        </div>
                        <h6 class="mt-3" >Tecnologie:</h6>
                        <div>
                            <span v-if="project.technologies.length > 0 "><a class="badge text-primary" href="#" v-for="technology in project.technologies" :key="technology.id">{{technology.name}}</a></span> 
                            <span v-else><em>Tecnologie non assegnate</em></span>
                        </div>
                        <h6 class="mt-3">Descrizione:</h6>
                         {{truncateText(project.description)}}
                    </div>
                    <div class="card-footer">
                        <a href="#">Apri</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="d-flex justify-content-center">
                <nav>
                <ul class="pagination">
                    <li :class="currentPage === 1 ? 'disabled' : ''">
                        <button class="page-link" @click="getProjects(currentPage - 1)">Precedente</button>
                    </li>
                    <li :class="currentPage === lastPage ? 'disabled' : ''">
                        <button class="page-link" @click="getProjects(currentPage + 1)">Successivo</button>
                    </li>
                </ul>
            </nav>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .h_max{
        max-height: 200px;
        overflow: hidden;
        &:hover{
            overflow: auto;
        }

    }
    .h_max_card{
        max-height:600px ;
    }
</style>