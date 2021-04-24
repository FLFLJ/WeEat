const state={
    footerName:"home",
    hiddenfooter:true
};

const actions={

};

const mutations={
    
    UP_FOOTERNAME(state,payload){
        state.footerName=payload;
        console.log("state.footerName")
        console.log(state.footerName)
    },
    UP_HIDDENFOOTER(state,payload){
        state.hiddenfooter=!state.hiddenfooter;
        console.log("state.hiddenfooter")
        console.log(state.hiddenfooter)
        
    },
    /*
    UP_USERHEAD(state,payload){
        
    },
    UP_CARLIST(state,payload){
       
    }*/
};

export default{
    namespaced:true,
    state,
    actions,
    mutations
}