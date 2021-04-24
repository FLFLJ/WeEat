<template>
    <div class="recommendmain">
        <ul id="suggest" >
            <div v-if="realque">
                <p>缺少的食物</p>
                <li class="myque" :class="{foodTake:isName.indexOf(item.name)>=0}" aria-disabled="" v-for="(item,index) in queList" :key="index" @click="takeFood(item,index)">
                    <section>
                    <img :src="item.img" alt="">
                    <span>{{item.detail}}</span>
                    </section>
                </li>
            </div>
            <div>
                <p>冬</p>
                <li class="normal" :class="{foodTake:isName.indexOf(item.name)>=0}" v-for="(item,index) in suggestList" :key="index" @click="takeFood(item,index)">
                    <section>
                    <img :src="item.img" alt="">
                    <span>{{item.detail}}</span>
                    </section>
                </li>
            </div>
            <div>
                <p>我喜爱的</p>
                <li class="mylove" :class="{foodTake:isName.indexOf(item.name)>=0}" v-for="(item,index) in loveList" :key="index" @click="takeFood(item,index)">
                    <section>
                    <img :src="item.img" alt="">
                    <span>{{item.detail}}</span>
                    </section>
                </li>
            </div>
        </ul>
    </div>
    
    
</template>


<script>
//import { delete } from 'vue/types/umd'
export default {
    name:'Recomend',
    data(){
        return{
            suggestList:null,
            loveList:null,
            iEat:{},
            iHealth:0,
            nutri:{},
            queList:[],
            realque:false,
            isName:[],
            eated:0
        }
    },
    mounted(){
        this.axios.get("/data/suggest/suggest.json").then((res)=>{
            this.suggestList=res.data.suggest
            this.loveList=res.data.loveList
            let queque=res.data.queList
            let que=JSON.parse(localStorage.getItem("que"))
            if(que.length>0){
                let quetrue="que"
            for (let h = 0; h < que.length; h++) {

            for(let i=0;i<queque.length;i++){

            let ko=Object.keys(queque[i].nutrition)
            for(let j=0;j<ko.length;j++){
                if(Object.keys(queque[i].nutrition[j])==que[h]&&!queque[i].que){
                    this.queList.push(queque[i])
                    queque[i].que=true
                    if(this.queList){
                        this.realque=true
                    }
                }
                       }
                    }
                }
            }
        })
       
    },
    methods:{
        takeFood(item,index){
            if(this.isName.indexOf(item.name)<0){
            this.isName.push(item.name)
            this.iHealth+=item.class
            this.iEat[item.name]=item.name
            this.eated+=1
            }
            else{
                let delee=this.isName.indexOf(item.name)
                this.isName.splice(delee,1)
                this.iHealth-=item.class
                delete this.iEat[item.name]
                this.eated-=1
            }
            let upEat=this.iEat
            let upHealth=this.iHealth
            let upeated=this.eated
            this.$store.commit('ieat/UP_IEAT',{
                upEat,
                upHealth,
                upeated
                }
            )
            
            let nutrition={}
            nutrition=this.$store.state.ieat.nutrition
            let itemNutri=item.nutrition
            //遍历item的营养表
            for (let i = 0; i < itemNutri.length; i++) {
                //item营养表键名指代
                let nutriKey=Object.keys(itemNutri[i])
                //item营养表
                let itemtrue=itemNutri[i]
                if(this.isName.indexOf(item.name)<0)
                {
                    nutrition[nutriKey]-=itemtrue[nutriKey]
                }
                else if(this.isName.indexOf(item.name)>=0){
                   nutrition[nutriKey]+=itemtrue[nutriKey]
                }
            }
            this.$store.commit('ieat/UP_NUTRITION',{
                nutrition}
            )
            
        },
        spiderClickk(){
        }
        /*Eated(item,index){
            let normal=document.getElementById("normal");
            if(normal.childNodes[index].style.border=="1px solid black"){
            normal.childNodes[index].style.border="none"
            this.iHealth-=item.class
            delete this.iEat[item.name]
            }
            else{
                this.iHealth+=item.class
                this.iEat[item.name]=item.name
                normal.childNodes[index].style.border="1px solid black"
            }
            let ifborder=normal.childNodes[index].style.border
            let upEat=this.iEat
            let upHealth=this.iHealth
            this.$store.commit('ieat/UP_IEAT',{
                upEat,
                upHealth,
                }
            )
            
            let nutrition={}
            nutrition=this.$store.state.ieat.nutrition
            let itemNutri=item.nutrition
            for (let i = 0; i < itemNutri.length; i++) {
                let nutriKey=Object.keys(itemNutri[i])
                let itentrue=itemNutri[i]
                
                if(ifborder!="1px solid black")
                {
                    nutrition[nutriKey]-=itentrue[nutriKey]
                }
                else if(ifborder="1px solid black"){
                   nutrition[nutriKey]+=itentrue[nutriKey]
                }
            }
            this.$store.commit('ieat/UP_NUTRITION',{
                nutrition}
            )
        }*/
    }
}
</script>

<style lang="scss" scoped>
*{font-size: 0.8rem;}
.recommendmain{
    margin: 1rem;
}
.foodTake{border-bottom:0.2rem solid red;box-sizing: border-box;}
#suggest{display: flex;justify-content: center;align-items: center;flex-direction: column;}
#suggest li{float: left;}
#suggest section{display: flex;justify-content: center;align-items: center;flex-direction: column;margin: 0 0.2rem 0 0.2rem;}
#suggest p{text-align: center;}
.router-link-active{
  border-bottom: 0.15rem solid red;
}
</style>