<script>
export default {
    name: 'AppHeader',
    data(){
        return{
            logo: 'https://media.licdn.com/dms/image/D4E03AQFoIph97A61kA/profile-displayphoto-shrink_800_800/0/1689181792161?e=1697068800&v=beta&t=cfrfMFDG5zYhJxofVwqeeN8y_6K4STNUl8so1npTZB4',
            menuHeader:[
              {
                label: 'Home',
                routeName: 'home'
              },
              {
                label: 'Progetti',
                routeName: 'projects'
              }
            ]
          }
    }
}
</script>
<template lang="">

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
        <img class="rounded-circle" :src="logo" style="width: 100px">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" v-for="(menu, index) in menuHeader" :key="index">
            <router-link class="nav-link" :to="{name: menu.routeName}">{{menu.label}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>


</template>
<style lang="scss">
    
</style>