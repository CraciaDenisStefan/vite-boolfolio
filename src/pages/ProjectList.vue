<script>
import axios from 'axios';
import {store} from '../store.js'
import AppLoader from '../components/AppLoader.vue';
import ProjectCard from '../components/ProjectCard.vue';
export default {
    name: 'ProjectList',
    components:{
        AppLoader,
        ProjectCard,
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
                <ProjectCard :project="project" />
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