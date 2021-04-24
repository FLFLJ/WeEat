<template>
<div>
  <div id="headerscroll"></div>
  <div id="weEat">
    <section class="weEat">
        
    </section>
  </div>

  <keep-alive include="Food">
  <router-view/>
  </keep-alive>
  <Footer :footerList="footerList" :footerActiveName="footerActiveName" :footerparentname="footerparentname"/>
</div>
</template>

<script>
import Footer from "@/components/Footer.vue"
  export default {
    data() {
      return {
        activeIndex:"today",
        headindex:0,
        //二级footer表单
        footerList:[
        {name:"food",active:false},
        {name:"chat",active:false},
        
        
      ],
      //二级footer表单活跃项
      footerActiveName:"food",
      //本路由名字
      footerparentname:"weeat",
      hiddenfooter:false
      };
      
    },
    components:{
      Footer
    },
    mounted(){
    
    },
    activated(){
      window.addEventListener("scroll",this.listenScroll)
      this.headindex=0
      //this.whoshow()
    },
    
    methods: {
      headactive(index){
        this.headindex=index
      },
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
      for (let i = 0; i < this.footerList.length; i++) {
        if(i==0){this.footerList[i].active=false}
        else{
          this.footerList[i].active=false
        }
        
        
      }
      window.removeEventListener("scroll",this.listenScroll)
    }
  }
</script>

<style lang="scss" scoped>
//#weEat{position: fixed;top: 0;left: 0;width: 100%;background: white;}
.el-menu{white-space: nowrap;overflow-x: scroll;}
::-webkit-scrollbar {display:none}
.footerImage{width:2rem}
.mySticky{position: fixed; top:0;left: 0;width:100%;background:white}
#weEat{background: white;z-index: 10000000000000000;}
.weEat{display: flex;justify-content: center;align-items: center;}
.weEat span{margin:0 0.5rem 0 0.5rem;font-size: 1rem;flex: 1;text-align: center;}
//.weEat span{float: left;padding: 0 1rem 0 0;}
</style>
