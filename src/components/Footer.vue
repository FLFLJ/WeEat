<template>
<div>
    <div class="footer0">
    <div class="footerBox0"> 
    <section v-for="(item,index) in footerList0" :key="index">
      <router-link tag="div" :to="{path:'/'+item.name}" >
      <img v-if="item.active" class="footerImage0" :src="'/svg/footer/'+item.name+'active.svg'" :alt="item.name">
      <img v-else class="footerImage0" :src="'/svg/footer/'+item.name+'.svg'" :alt="item.name">
      </router-link>
    </section>
    </div>
</div>
</div>

</template>
 
<script>
export default {
  data(){
    return{
      footerList0:[
        {name:"home",active:false},
        {name:"weeat",active:false},
        {name:"game",active:false},
        {name:"my",active:false},
        
      ],
      footerActiveName0:"home",
      myname:null,
      hiddenfooter:true
    }
  },
  mounted(){
    for (let i = 0; i < this.footerList0.length; i++) {
      if(this.$route.path.indexOf(this.footerList0[i].name)>0){
        this.footerList0[i].active=true
      }
      
    }

    if(this.hiddenfooter && this.footerList){
      for (let i = 0; i < this.footerList.length; i++) {
      if(this.$route.path.indexOf(this.footerList[i].name)>0){
        this.footerList[i].active=true
      }
      
    }
    }
    
  },
  activated(){
    
  },
  methods:{
    
    footeracliveone(index,name){
      for (let i = 0; i < this.footerList.length; i++) {
        this.footerList[i].active=false
      if(this.footerList[i].name==name){
        this.myname=name
      }
      
    }
    }
  }
    
}
</script>

<style lang="scss" scoped>
.footer0{border-top: 2px solid gray; position: fixed;left: 0;bottom: 0;width: 100%;background:white;z-index: 9999999;}
.footerImage0{
  width: 2rem;
  height: 1.4rem;
}
.footerBox0{display: flex;justify-content:center;align-items: center;}
.footerBox0 div{margin:0.5rem 1.2rem 0.5rem 1.2rem;}
.router-link-active{
  color: red;
}




</style>