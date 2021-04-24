export default{
    path:'/game',
    component:()=>import('@/views/Game/Game.vue'),
    children:[
        {
            path:'playgame',
            component:()=>import('@/views/Game/Playgame/PlayGame.vue')
        }    
    ]
}