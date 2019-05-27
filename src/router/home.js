import Home from '../pages/Home'
import User from '../pages/User'
import Company from '../pages/Company'
import Impower from '../pages/Impower'
import ImpowerHandle from '../pages/ImpowerHandle'

export default [{
    path: '/home', // 首页
    component: Home
}, {
    path: '/company', // 公司
    component: Company
}, {
    path: '/user', // 我的
    component: User
}, {
    path: '/impower',  // 授权
    component: Impower,
}, {
    path: '/impower/handle',  // 授权处理
    component: ImpowerHandle,
}]