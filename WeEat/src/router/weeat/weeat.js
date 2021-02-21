export default{
    path:'/weeat',
    name:"weeat",
    component:()=>import('@/views/Weeat/Weeat.vue'),
    children:[
        
        {
            path:'food',
            component:()=>import('@/views/Weeat/Food/Food.vue'),
            children:[
                {
                    path:'recommend',
                    component:()=>import('@/views/Weeat/Food/Recommend.vue'),
                },
                {
                    path:'truetake',
                    component:()=>import('@/views/Weeat/Food/Truetake.vue'),                     
                },
                {
                    path:'/weeat/food',
                    redirect:'/weeat/food/recommend'
                },
            ]
        },
        {
            path:'today',
            component:()=>import('@/views/Weeat/Today/Today.vue')
        },
        {
            path:'game',
            component:()=>import('@/views/Weeat/Game/Game.vue')
        },
        {
            path:'whenbuy',
            component:()=>import('@/views/Weeat/Whenbuy/Whenbuy.vue')
        },
        {
            path:'/weeat',
            redirect:'/weeat/today'
        },
        {
            path:'selectfood/:foodname/:id',
            component:()=>import('@/views/Weeat/Truetake/Selectfood.vue')
        }
        
    ]

}