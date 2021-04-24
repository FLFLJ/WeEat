export default{
    path:'/home',
    component:()=>import('@/views/Home/Home.vue'),
    children:[
        {
            path:'check',
            component:()=>import('@/views/Home/Check.vue')
        }
    ]
}