<template>
    <div class="main0">
        <div id="peopleeat">
            <div class="nav">
             <span>附近的人在吃</span>
             <span>美食达人在直播</span>   
            </div>
            
            <ul class="saidItem" v-for="item in saids" :key="item.key"> 
                <div><img style="height:2rem" :src="item.ownerimg" alt=""></div>
                <div>
                <section>
                    <span>{{item.owner}}</span> 
                    <span class="foodcopy" @click="foodcopy(item.chatid)">{{item.copy}} copy</span>
                </section>  
                <section class="ownersay">
                    <p>{{item.ownersaid}}</p>
                    <div class="chatfood">
                        <p class="chatfood1" v-for="(item2,index) in item.ownerlist" :key="index">{{item2.food}}</p>
                    </div>

                </section>
                <div class="smallchatmain" v-if="idSearch.indexOf(item.chatid)<0">
                    <div class="smallchatmain1">
                       <section class="smallchat" v-for="(item3,index) in item.said" :key="index">
                        <img style="height:1.5rem" :src="item3.saerimg" alt="">
                        <span>{{item3.saer}}<br></span>
                        <span>{{item3.saidtext}}</span>
                    </section>
                     <div class="closemoresay" >
                        <span @click="idtrue(item.chatid)">关闭详细回复</span>
                        <span class="saytoowner" @click="inputtotrue(item.chatid)" > 点击评论 </span> 
                         </div>
                    </div>
                </div>
                <section v-else class="openmoresay"   >
                    <span @click="idtrue(item.chatid)">展开{{item.saidlenght}}条回复</span> 
                    <span class="saytoowner" @click="inputtotrue(item.chatid)" >点击评论</span>
                    </section>
                </div>  
            </ul>
        </div>
        <div v-if="inputsaytrue" >
            <div class="heiping" @click="inputtotrue()">777777777777777777</div>
            <section class="inputmain">
                <input required="required" autofocus  type="text" v-model="inputsay">
            <button @click="tosay">发送评论</button>
            </section>
            
        </div>
    </div>
</template>

<script>
import Drag from '../../../components/Drag.vue'
import Header from '../../../components/Header.vue'
export default {
  components: { Header, Drag },
    name:'Meat',
    data(){
        return{
            saids:[],
            idSearch:[],
            inputsay:"",
            inputsaytrue:false,
            clickChatId:""
        }
    },
    mounted(){
               document.body.scrollTop = 0
               document.documentElement.scrollTop = 0
               this.mysay()
    },
    activated(){
        
    },
    methods:{
        foodcopy(copyid){
            this.axios.post("/api3/chat/dailychatfoodcopy",{
                chatid:copyid,
            }).then((res)=>{
                this.mysay()
            })

        },
        inputtotrue(theId){
            this.inputsaytrue=!this.inputsaytrue
            this.clickChatId=theId

        },
        tosay(){
            this.inputsaytrue=!this.inputsaytrue
            this.axios.post("/api3/chat/dailychatupdate",{
                chatid:this.clickChatId,
                said:{
            saer :this.$store.state.chat.username,
            saidtext : this.inputsay,
            saerimg : this.$store.state.chat.userhead
        }
            }).then((res)=>{
                this.mysay()
            })
            this.inputsay=""
        },
        idtrue(id){
            let asd=this.idSearch.indexOf(id)
            if(asd>=0){
                this.idSearch.splice(asd,1)
            }
            else{
              this.idSearch.push(id)
            }
            

        },
        mysay(){
        this.axios.get("/api3/chat/dailychatget").then((res)=>{
            this.saids=res.data.result
            for (let i = 0; i < this.saids.length; i++) {
                let aaa=this.saids[i].chatid
                this.idSearch[i]=aaa
                
            }
        })
      }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;}
.nav span{padding: 0 2rem 0 0;}
#price{height: 300px;width: 100%;margin: 1rem 0 0 1rem;overflow: hidden;}
.peopleimg img{height: 2rem;}
.peopleeat{display: flex;flex-direction: column;justify-content: center;align-items: center;width: 50%;}
#peopleeat{margin: 1rem;font-size: 0.8rem;}
.peoplesay img{height: 1.5rem;}
.everypeople{margin: 0 0 2rem 0;}

.saidItem{margin: 1rem;display: flex;justify-content: center;flex-direction:row;position: relative;}
.chatfood{border: 1px solid black;justify-content: center;text-align: center;align-items: center;width: 10rem;margin: 0.2rem 0 0 2rem;white-space: nowrap;}
.chatfood1{padding: 0 1rem 0 0;opacity: 0.9;justify-content: center;overflow-x: scroll;}
.saytoowner{border: 1px solid black;border-radius: 10%;}
.ownersay{margin: 1rem 1rem 0 0;}
.smallchat{margin: 0.2rem 0 0.4rem 0;}
.inputmain{position: fixed;left: 0;bottom:2.8rem;width: 100%;height: 2.4rem; display: flex;z-index:100000}
.inputmain input{flex:5}
.inputmain button{flex:1}
.smallchat ,.closemoresay,.openmoresay{margin: 0.4rem;}
.saidItem{padding: 0.4rem;border-top: 1px solid black;}
.foodcopy{position: absolute;right: 0;top: 0;margin: 0.4rem 0.4rem 0 0;}
.heiping{position: fixed;left: 0;top: 0;height: 100%;width: 100%;background: black;opacity: 0.6;z-index:100}
</style>