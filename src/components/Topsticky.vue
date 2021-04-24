<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"Topsticky",
    data(){
        return{

        }
    },
    props:[
        "topstickyid",
        "topsticky",
    ],
    activated(){
      window.addEventListener("scroll",this.listenScroll)
      //this.whoshow()
    },
    methods:{
        listenScroll(){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let topstickyid=this.topstickyid
        let topsticky=this.topsticky
    if (scrollTop >= topsticky) {
        document.getElementById(topstickyid).className="mySticky"
        document.getElementById(topstickyid).style.top=topsticky+"px"
     
    } 
     
    if(scrollTop <= topsticky){
         document.getElementById(topstickyid).className=""
    }
      }
    },
    deactivated(){
      window.removeEventListener("scroll",this.listenScroll)
    }
}
</script>


<style lang="scss" scoped>
.mySticky{position: fixed;left: 0;width:100%;background:white}
</style>