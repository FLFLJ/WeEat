export default{
    path:'/playgame/:ids',
    component:()=>import('@/views/Game/Playgame/PlayGame.vue'),
    children:[
        /*
        {
            path:'playgame',
            component:()=>import('@/views/Game/Playgame/PlayGame.vue')
        }
        */
        
    ]
 
}