import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/HomePage.vue';
import ProjectList from './pages/ProjectList.vue';
import SingleProject from './pages/SingleProject.vue';
import NotFound from './pages/NotFound.vue';
import AboutUs from './pages/AboutUs.vue';

const router = createRouter({

    history: createWebHistory(),

    routes: [
        {
            path:'/',
            name: 'home',
            component: HomePage,
        },
        {
            path:'/projects',
            name: 'projects',
            component: ProjectList,
        },
        {
            path:'/project/:title',
            name: 'single-project',
            component: SingleProject,
        },
        {
            path: '/about-us',
            name: 'about-us',
            component: AboutUs,
        },
        {
            path:'/pagina-non-trovata',
            name: 'not-found',
            component: NotFound,
        },
        {
            path:'/:catchAll(.*)',
            redirect: '/pagina-non-trovata'
        },
    ]

});

export { router }