<template>
  <div class="homemain">
    <Header/>
    <Family/>
    <Me/>
    <div class="que">
    <keep-alive>
    <router-view/>
    </keep-alive>
    </div>
    <Chat/>
    <Footer :footerList="footerList" :footerActiveName="footerActiveName" :footerparentname="footerparentname" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import Me from "@/views/Home/Me/Me.vue"
import Family from "@/views/Home/Family/Family.vue"
import Chat from "@/views/Home/Chat/Chat.vue"
export default {
  name:"Home",
  data(){
    return{
      //二级footer表单
        footerList:[
        {name:"check",active:false},
        
      ],
      //二级footer表单活跃项
      footerActiveName:"check",
      //本路由名字
      footerparentname:"home"

    }
  },
  components:{
    Header,
    Footer,
    Me,
    Chat,
    Family
  }
  
}
</script>

<style lang="scss">
.homemain{
  margin: 1rem;
}
.que{margin:0 0 1rem 0;}
</style>
