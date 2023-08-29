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
        }
    },
    
}
</script>
<template lang="">
    <div class="container">
        provadsafa
        <AppLoader />
    </div>
</template>
<style lang="scss">
    
</style>