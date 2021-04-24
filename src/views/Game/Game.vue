<template>
        <div id="main">
            <div class="all">
            <section class="header">
                <div class="header_image">
                   <img class="me" :src="$store.state.user.userHead" alt="">
                   <p> {{$store.state.user.username}}</p> 
                </div>
                
            </section>
            <section class="details">
                <div class="Glory">
                    <span>LV.{{$store.state.user.game.playLevel}}段</span>
                    <span>广东省第7</span>
                    <span>海鲜霸主</span>
                </div>
                <div class="Record">
                    <section>
                       <img src="/images/章鱼哥.jpg" alt=""> 
                       <p>章鱼</p>
                    </section>
                    <section>
                       <img src="/images/肯德基.jpg" alt=""> 
                       <p>名餐馆</p>
                    </section>
                    <section>
                       <img src="/images/外卖.jpg" alt=""> 
                       <p>外卖战</p>
                    </section>
                    <section>
                       <img src="/images/皮皮虾.jpg" alt=""> 
                       <p>皮皮虾</p>
                    </section>
                </div>
                
            </section>
            
           </div>
           <div class="house" >
                <section class="house1">
                    <div class="learn" @click="toLeran"><img class="learnImg" src="svg/game/learn.svg" alt=""><p>学习</p> </div>
                    <div class="play" @click="toPlayGame"><img  class="warImg" src="svg/game/war.svg" alt=""><p>答题</p> </div>
                    <div class="learn" @click="toLeran"><img class="learnImg" src="svg/game/chongwu.svg" alt=""><p>宠物</p> </div>
                    <div class="play" @click="toPlayGame"><img  class="warImg" src="svg/game/caiyuan.svg" alt=""><p>菜园</p> </div>
                </section>
            </div>
           <router-view/>
    <el-table
    v-if="loading"
    v-loading="loading"
    v-loading.fullscreen.lock="true"
    :element-loading-text="loadingsucced?'匹配成功, '+countDown+' 秒后进入游戏':'匹配中...'"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%;z-index: 100000000;">
    </el-table>
    <p v-if="loading" class="cancelMatch" @click="cancelMatch">
        <span class="countDown" v-if="!nexting">取消匹配</span>
    </p>
     
           <Footer/>
        </div>    
</template>

<script>
import Footer from "@/components/Footer.vue"

export default {
  name:"Game",
  data(){
    return{
        wsText:'wait...',
        hisName:null,
        myname:null,
        ws:null,
        loading: false,
        countDown:5,
        nexting:false,
        loadingsucced:false,
        playerName:null,
        playerId:null,
        playerLevel:null,
        playerHead:null
        
    }
  },
  mounted(){ 
  },
  activated(){
      let game=this.$store.state.user.game
      this.playerName=game.playerName
      this.playerId=game.playerId
      this.playLevel=game.playLevel
      this.userHead=this.$store.state.user.userHead
      this.countDown=5
      this.wsGo()
  },
  deactivated(){
      this.ws.close()
  },
  methods:{
      cancelMatch(){
          let _this=this
          this.loading=false 
          let massege={
              title:"cancelmatch"
          }
          this.ws.send(JSON.stringify(massege))
          this.axios.post('api3/game/playgamecancel',{playLevel:_this.playLevel,playerId:_this.playerId,playerName:_this.playerName}).then((res)=>{
                        console.log(res)
                        })

      },
      wsGo(){
          let _this=this
      if ("WebSocket" in window)
            {
               _this.ws = new WebSocket("ws://localhost:8081");
               _this.ws.onopen = function()
               {

                   console.log("ws开启中")
               };
                
               _this.ws.onmessage = function (evt) 
               { 
                   console.log("evtevtevtevtevtevtevtevtevtevtevt")
                    console.log(evt)
                   console.log(JSON.parse(evt.data))
                   if(JSON.parse(evt.data).usersHead){
                       let usersHead=JSON.parse(evt.data).usersHead
                       _this.$store.commit('user/GAME_HEAD',{otherHead:usersHead})
                   }
                   var received_msg =JSON.parse(evt.data).title ;
                   let topic=JSON.parse(evt.data).topic
                   console.log("topic")
                   console.log(topic)
                   _this.$store.commit('user/GAME_TOPIC',{topic})
                  //alert("数据已接收...");
                  _this.wsText=received_msg
                  console.log("数据已接收:")
                  console.log(received_msg)
                  if(received_msg=="canGo"){
                      console.log("进入路由啊")
                      _this.nexting=true
                      _this.loadingsucced=true
                      let nextRouter=setInterval(()=>{
                          _this.countDown-=1
                          if(_this.countDown<=0){
                              clearInterval(nextRouter)
                              _this.loading=false
                              _this.nexting=false
                              _this.loadingsucced=false
                          _this.$router.push('/playgame/'+_this.playerId)
                          }
                      },1000)

                  }
               };
                
               _this.ws.onclose = function()
               { 
                  console.log("ws关闭")
               };
            } 
            else
            {
               
            }
      },
      WebSocketTest(wsText)
         {      
           this.ws.send(wsText);      
         },
      toLeran(){},
      toPlayGame(){
          let _this=this
          let match={
              title:"match",
              userHead:this.$store.state.user.userHead,
              playLevel:this.$store.state.user.game.playLevel
          }
          this.WebSocketTest(JSON.stringify(match))
          console.log("匹配中...")
          this.loading=true
          this.axios.post('api3/game/playgamematch',{playLevel:_this.playLevel,playerId:_this.playerId,playerName:_this.playerName,userHead:_this.userHead}).then((res)=>{
                        console.log("res")
                        console.log(res)
                         //this.hisName=res.data.result.name
                         //this.myname=this.$store.state.user.name
                        })

          
      }
  },
  components:{
      Footer
  }
  
}
</script>

<style lang="scss">
.all{display: flex;align-items:flex-start;margin: 1rem;}
.details div{margin: 0.2rem 0 0.2rem 0;}
.header{display: flex;align-items:flex-start;margin: 0 1rem 0 0;}
.header_image{text-align: center;}
.learn {}

.play {}
.Glory span{padding:0 0.4rem 0 0.4rem}
.details{display: flex;flex-direction: column;}
.Record{display: flex;align-items:flex-start;}
.Record p{font-size: 0.6rem;text-align: center;padding: 0 0.2rem 0 0.2rem;}
.Record img{height: 2.4rem;border-radius: 60%;}
.house1{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
    text-align: center;
    div{flex:1}
    
}
.learnImg{
    text-align: center;
    height: 1.2rem;
    padding: 0.2rem;
}
.warImg{
    text-align: center;
    height: 1.8rem;
    padding: 0.2rem;
}
.me{
    height: 6rem;
    width: 6rem;
    border-radius: 50%;
}
.house1 div{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: center;
    padding: 0 0.4rem 0 0.4rem;
}
.loadingBackground{
    
}
.cancelMatch{
    position: fixed;
    left: 42vw;
    top: 54vh;
    z-index: 100000000;
    color:cornflowerblue;
    text-align: center;
    /*.countDown{
        margin:0 0 0 2rem;
    }*/
}

</style>