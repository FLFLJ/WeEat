export default{
    path:'/admin',
    component:()=>import('@/views/Admin'),
    children:[
        {
            path:'users',
            component:()=>import('@/views/Admin/users.vue')
        },
        {
            path:'topic',
            component:()=>import('@/views/Admin/topic.vue')
        },
        {
            path:'/admin',
            redirect:'users'
        }
    ]
}