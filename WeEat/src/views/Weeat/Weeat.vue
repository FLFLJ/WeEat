<template>
<div>
  <div id="headerscroll"></div>
  <div id="weEat">
    <section class="weEat">
        <router-link tag="span" to="/weeat/today">今日</router-link>
        <router-link tag="span" name="Food" to="/weeat/food">选菜</router-link>
        <router-link tag="span" to="/weeat/game">游戏</router-link>
        <router-link tag="span" to="/weeat/whenbuy">买的时候</router-link>
    </section>
  </div>

  <keep-alive include="Food">
  <router-view/>
  </keep-alive>
  <Footer/>
</div>
</template>

<script>
import Footer from "@/components/Footer.vue"
  export default {
    data() {
      return {
        activeIndex:"today"
      };
    },
    components:{
      Footer
    },
    mounted(){
    
    },
    activated(){
      window.addEventListener("scroll",this.listenScroll)
      //this.whoshow()
    },
    
    methods: {
      //导航下划线
     /* whoshow(){
        console.log("this.$route.query")
      let routeindex=this.$route.path
      this.activeIndex=routeindex.substring(routeindex.lastIndexOf('/')+1,routeindex.length)
      console.log(this.activeIndex)
      },
      handleSelect(key, keyPath) {
        this.whoshow()
      },
      */
      listenScroll(){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;  
    let offsetTop = document.querySelector('#weEat').offsetTop;
    if (scrollTop > 0) {
        document.querySelector('#weEat').className="mySticky"
     
    } 
     
    if(scrollTop <= 0){
         document.querySelector('#weEat').className=""
    }
      }
    },
    deactivated(){
      window.removeEventListener("scroll",this.listenScroll)
    }
  }
</script>

<style lang="scss" scoped>
//#weEat{position: fixed;top: 0;left: 0;width: 100%;background: white;}
.el-menu{white-space: nowrap;overflow-x: scroll;}
::-webkit-scrollbar {display:none}
.router-link-active{
  background:cornflowerblue;
  color: white;
}
.mySticky{position: fixed; top:0;left: 0;width:100%;background:white}
.weEat{display: flex;justify-content: center;align-items: center;}
.weEat span{margin:1rem 0.5rem 0.5rem 0.5rem;font-size: 1rem;flex: 1;text-align: center;}
//.weEat span{float: left;padding: 0 1rem 0 0;}
</style>
