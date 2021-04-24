const state={
    username:window.localStorage.getItem('name')||'',
    isAdmin:window.localStorage.getItem('isAdmin')||false,
    userHead:'',
    login:false,
    topic:null,
    game:{
        playerName:null,
        playerId:null,
        playLevel:null,
        otherHead:null,
    }


};

const actions={

};

const mutations={
    USER_NAME(state,payload){
        state.name=payload.name;
        state.isAdmin=payload.isAdmin;
        state.userHead=payload.userHead;

    },
    USER_LOGIN(state,payload){
        state.username=payload.username
        state.isAdmin=payload.isAdmin
        state.userHead=payload.userHead
        state.game.playerName=payload.playerName;
        state.game.playerId=payload.playerId;
        state.game.playLevel=payload.playLevel;

    },
    GAME_HEAD(state,payload){
        let proxyHead=Object.keys(payload.otherHead)
        console.log("let proxyHead=Object.keys(payload.otherHead)")
        console.log(proxyHead) 
        for (let i = 0; i < proxyHead.length; i++) {
            if(proxyHead[i]!=state.userHead){
                state.game.otherHead=proxyHead[i]
            }
            
        }
    },
    GAME_TOPIC(state,payload){
        state.topic=payload.topic
        console.log("state.topic")
        console.log(state.topic)
    }

};

export default{
    namespaced:true,
    state,
    actions,
    mutations
}