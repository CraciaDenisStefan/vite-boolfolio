<script>
import axios from 'axios';
import { store } from '../store.js'
import AppLoader from '../components/AppLoader.vue';

export default {
    name:'SingleProject',
    components:{
        AppLoader,
    },
    data(){
        return{
            store,
            project: null,
        }
    },
    created(){
        this.getSingleProject();
    },
    methods:{
        getSingleProject(){
            this.store.loading = true;
            axios.get(`${this.store.baseUrl}/api/projects/${this.$route.params.title}`).then((response) =>{
                if(response.data.status){
                    this.project = response.data.project;
                    this.store.loading = false;
                }
                else{
                    this.$router.push({ name: 'not-found' });
                    
                }

            })
        }
    }
}
</script>
<template >

       <AppLoader v-if="store.loading" />
       <div v-else>
           <div class="container">
                <div class="row mt-5">
                    <div class="col-12">
                        <h1>{{ project.title }}</h1>
                        <div class="col-3">
                            <img v-if="project.cover_image !== null" :src="`${this.store.baseUrl}/storage/${project.cover_image}`" class="img-fluid">
                            <img v-else src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/No_immagine_disponibile.svg/300px-No_immagine_disponibile.svg.png" class="img-fluid">
                        </div>
                        <div>
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
                                {{project.description}}
                            </div>
                            <div class="mt-5">
                                <router-link class="btn btn-primary" :to="{name: 'projects' }">Torna alla lista </router-link>
                            </div>
                        </div>
                </div>
           </div>
       </div>
  
</template>
<style lang="scss">
    
</style>