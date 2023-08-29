<script>
import axios from 'axios';
import AppLoader from './AppLoader.vue';
export default {
    name: 'AppMain',
    components:{
        AppLoader
    },
    
    data(){
        return{
            baseUrl: 'http://127.0.0.1:8000',
            projects: [],
            loading: true,
        }
    },
    created(){
        this.getProjects();
    },
    methods: {
        getProjects(){
            this.loading = true;

            axios.get(`${this.baseUrl}/api/projects`).then((response)=>{

                if(response.data.status){
                    this.projects = response.data.results;
                    this.loading =false;
                }
                else{

                }
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
    <AppLoader v-if="loading"/>
    <div v-else class="container">
        <div class="row">
            <div class="col-12 col-md-4" v-for="project in projects" :key="project.id">
                <div class="card m-1 h_max_card">
                    <div class="card-header">{{project.title}}</div>
                    <div class="card-image-top">
                        <img v-if="project.cover_image !== null" :src="`${baseUrl}/storage/${project.cover_image}`" class="img-fluid">
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