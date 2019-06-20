'use strict';

import theRoutes from './routes.js'

const myRouter = new VueRouter({ routes: theRoutes })


var app = new Vue({
    el: '#app',
    template: `
        <main>
            <router-link to="/">Home</router-link>
            <router-view></router-view>
        </main>
    `,
    components: {
    },
    router: myRouter
})