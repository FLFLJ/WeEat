<template>
<div class="footer" v-if="hiddenfooter">
    <div class="footerBox"> 
    <section v-for="(item,index) in footerList" :key="index" @click="footeracliveone(index,item.name)" >
      <router-link tag="div" :to="{path:'/'+footerparentname+'/'+item.name}" >
      <img v-if="item.name==myname || item.active" class="footerImage" :src="'/svg/footer/'+item.name+'active.svg'" :alt="item.name">
      <img v-else class="footerImage" :src="'/svg/footer/'+item.name+'.svg'" :alt="item.name">
      </router-link>
    </section>
    </div>
</div>
</template>
 
<script>
export default {
  data(){
    return{
      myname:null,
      hiddenfooter:null
    }
  },
  props:[
    'footerList',
    'footerActiveName',
    'footerparentname'
  ],
  mounted(){
    this.hiddenfooter=this.$store.state.footer.hiddenfooter
    if(this.hiddenfooter){
      for (let i = 0; i < this.footerList.length; i++) {
      if(this.$route.path.indexOf(this.footerList[i].name)>0){
        this.footerList[i].active=true
      }
      
    }
    }
    
    
  },
  activated(){
    this.hiddenfooter=this.$store.state.footer.hiddenfooter
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
.footer{border-top: 2px solid gray;  position: fixed;left: 0;bottom: 2.8rem;width: 100%;background:white;z-index: 9999999;}
.footerImage{
  width: 2rem;
  height: 1.2rem;
}
.footerBox{display: flex;justify-content:center;align-items: center;}
.footerBox div{margin:0.5rem 1.2rem 0.5rem 1.2rem;}
.router-link-active{
  color: red;
}
</style>