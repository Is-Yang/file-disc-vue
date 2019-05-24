import Vue from 'vue'
import Router from 'vue-router'

//引入子路由
import Login from './login'
import Home from './home'

Vue.use(Router)
const baseRouter = [{path: '/', redirect:"/login"}];

const router = new Router({
    routes: baseRouter.concat(Login, Home)
})

export default router