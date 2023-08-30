<script>
import {store} from '../store.js'

export default {
    name: 'ProjectCard',
    props:{
        project: Object
    },
    data(){
        return{
            store,
        }
    },
    created(){

    },
    methods: {
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

</template>
<style lang="">
    
</style>