const state={
    
       ieat:{},
       ieatBoolean:false,
       ihealth:0,
       carList:null,
       nutrition:{
           "能量(千焦)":0,
           "蛋白质":0,
           "脂肪":0,
           "饱和脂肪酸":0,
           //"反式脂肪酸":0,
           "单不饱和脂肪酸":0,
           "多不饱和脂肪酸":0,
           "胆固醇":0,
           "碳水化合物":0,
           "糖":0,
           //"乳糖":0, 
           "膳食纤维":0,
           //"可溶性膳食纤维":0,
          // "不溶性膳食纤维":0,
           "钠":0,
           "维生素A":0, 
           //"维生素D":0,
           "维生素E":0,
           "维生素K":0,
           "维生素B1":0,
           "维生素B2":0,
           "维生素B6":0,
           "维生素B12":0,
           "维生素C":0,
           "烟酸":0,
           "叶酸":0, 
           //"泛酸":0,
           "生物素":0,
           //"胆碱":0,
           "磷":0,
           "钾":0, 
           "镁":0,
           "钙":0,
           "铁":0,
           "锌":0,
           "碘":0,
           "硒":0,
           "铜":0,
           //"氟":0,
           "锰":0,
           //"δ-E":0, 
           //"(β-γ)-E":0,
           //"α-E":0,
           "胡萝卜素":0,
           "脂肪酸":0,
           "灰分":0,
           "水分":0,
           "能量(千卡)":0    
       }
};

const actions={

};

const mutations={
    UP_IEAT(state,payload){
        state.ieat=payload.upEat;
        state.ihealth=payload.upHealth
        state.eated=payload.upeated
        //判断是否吃了
    },
    UP_NUTRITION(state,payload){
        state.nutrition=payload.nutrition;
        console.log("state.nutrition")
        console.log(state.nutrition)
    },
    UP_CARLIST(state,payload){
        state.carList=payload.carList
        console.log("state.carList")
        console.log(state.carList)
    }
};

export default{
    namespaced:true,
    state,
    actions,
    mutations
}