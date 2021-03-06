import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [{
    path: '/',
    name: 'indexMain',
    meta: { title: '首页' },
    component: () =>
        import('../components/IndexMain.vue'),
},
{
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () =>
        import('../components/Login.vue'),
},
// {
//     path: '/other', // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
//     name: 'other',
//     meta: { title: '单独的路由' },
//     component: () => import('../views/Other.vue'),
// },
{
    path: '/404',
    name: '404',
    meta: { title: '404' },
    component: () =>
        import('../components/404.vue'),
},
{ path: '/index', redirect: '/' },
]

// 本地所有的页面 需要配合后台返回的数据生成页面
export const asyncRoutes = {
    home: {
        path: 'home',
        name: 'home',
        meta: { title: '主页' },
        component: () =>
            import('../views/home/Home.vue'),
    },

    activityTable: {
        path: 'activities', // 在url上显示的
        name: 'activityTable', // 唯一标识此路由
        meta: { title: '活动列表' },
        component: () =>
            import('../views/activity/Activities.vue'),
    },

    courseTable: {
        path: 'courses',
        name: 'courseTable',
        meta: { title: '课程列表' },
        component: () =>
            import('../views/course/course.vue'),
    },
    addCourse: {
        path: 'addCourse',
        name: 'addCourse',
        meta: { title: '添加课程' },
        component: () =>
            import('../views/course/addCourse.vue'),
    },
    updateCourse: {
        path: '/updateCourse/:courseId',
        name: 'updateCourse',
        meta: { title: '修改课程' },
        component: () =>
            import('../views/course/updateCourse.vue'),
    },

    queryOrder: {
        path: 'queryOrder',
        name: 'queryOrder',
        meta: { title: '订单查询' },
        component: () =>
            import('../views/order/queryOrder.vue'),
    },

    password: {
        path: 'password',
        name: 'password',
        meta: { title: '修改密码' },
        component: () =>
            import('../views/merchant/Password.vue'),
    },
    msg: {
        path: 'msg',
        name: 'msg',
        meta: { title: '通知消息' },
        component: () =>
            import('../views/merchant/Msg.vue'),
    },
    userinfo: {
        path: 'userinfo',
        name: 'userinfo',
        meta: { title: '用户信息' },
        component: () =>
            import('../views/merchant/UserInfo.vue'),
    },
}

const createRouter = () => new Router({
    routes: commonRoutes,
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router