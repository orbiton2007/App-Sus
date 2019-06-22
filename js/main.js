'use strict';
import appHeader from '../js/global/cmps/app-header.cmp.js'
import theRoutes from './routes.js'

const myRouter = new VueRouter({ routes: theRoutes })


var app = new Vue({
    el: '#app',
    template: `
        <main>
            <app-header></app-header>
            
            <router-view></router-view>
        </main>
    `,
    components: {
        appHeader
    },
    router: myRouter
})