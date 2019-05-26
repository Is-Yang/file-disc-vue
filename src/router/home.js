import Home from '../pages/Home'
import User from '../pages/User'
import Company from '../pages/Company'

export default [{
    path: '/home', // 首页
    component: Home
}, {
    path: '/company', // 公司
    component: Company
}, {
    path: '/user', // 我的
    component: User
}]