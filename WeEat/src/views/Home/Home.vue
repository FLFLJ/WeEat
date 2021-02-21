<template>
  <div>
    <Header/>
    <Me/>
    <div class="que">
    <keep-alive>
    <router-view/>
    </keep-alive>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import Me from "@/views/Me/Me.vue"
export default {
  name:"Home",
  data(){
    return{

    }
  },
  components:{
    Header,
    Footer,
    Me
  }
  
}
</script>

<style lang="scss">
.que{margin:0 0 1rem 0;}
</style>
