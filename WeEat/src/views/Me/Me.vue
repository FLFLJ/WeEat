<template>
  <div class="me">
    <HelloWorld/>
    
    <h2 v-for="(item,index) in me" :key="index" >
      <section class="me" v-if="item.count==ihealth">
      <img :src="item.svg" alt="Carnivores">
      <span >{{item.name}}</span>
      </section>
      </h2>
    <section class="eated" v-if="eated">
      <h3>战绩：</h3>
    <ul >
      <li class="meName" v-for="(item,index) in ieat" :key="index">
        <p>{{item}}</p>
      </li>
    </ul>
    </section>

    <section class="que" v-if="nutrition.length">
      <h3>缺少</h3>
      <div id="nutrition">
        <ul class="nutrition" v-for="item in nutrition" :key="item.key">
        <span v-for="item1 in item" :key="item1">{{item1}}</span>
        </ul>
      </div>
    </section>
    <section id="report">
      <p>report</p>
      <ul>
        <span>动脉粥样硬化，心脑血管疾病，记忆力下降</span>
        <span></span>
      </ul>
    </section>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Me',
  data(){
    return{
      ieat:{},
      ieatBoolean:false,
      ihealth:"",
      me:[],
      nutrition:[],
      eated:0
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
    this.axios.get('/data/suggest/me.json').then((res)=>{
      
      this.me=res.data.data
    })

    if(this.eated==0){
      this.ieat=this.$store.state.ieat.ieat
      this.eated=this.$store.state.ieat.eated
    }
    console.log(this.ieat)
    this.ihealth=this.$store.state.ieat.ihealth
    let selectNutrition=this.$store.state.ieat.nutrition
    let Okey=Object.keys(selectNutrition)
    let proxy2=[]
    for(let i=0;i<37;i++){
        if(selectNutrition[Okey[i]]<=0){
      proxy2.push(Okey[i])
    }
        
    }
     localStorage.setItem("que",JSON.stringify(proxy2))
     for (let i = 0; i < (proxy2.length*20); i++) {
         this.nutrition.push(proxy2.splice(0,2))      
     }
    
    
    /*for(let i=0;i<this.nutrition.length;i++){
      if(this.nutrition[])
    }*/
  },
  computed:{
    
  }
}
</script>
<style lang="scss" scoped>
.me{margin: 1rem 0 1rem 0; display: flex;justify-content: center;align-items: center;flex-direction: column;}
.vue_logo{height:8rem}
.meName {float: left;padding: 0 1rem 0 0;}
.que,.eated{display: flex;justify-content: center;align-items: center;flex-direction: column;text-align: center;}
.eated ul{margin: 0 0 0 1rem;}
.nutrition { border: 0.01rem  solid black;display: flex;justify-content:space-between;}
.nutrition span {padding: 0 0.5rem 0 0.5rem;}
#report{margin:0 0 1rem 0;text-align: center;}
</style>