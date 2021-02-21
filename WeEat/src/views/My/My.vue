<template>
  <div class="my">
      <div @click="routerBack()">回去</div>
        <div class="main">
          <section class="list" v-for="item in carList" :key="item.title">
            <section class="leftList">
              <img :src="item.img" style="height:4rem" alt="item.title">
              <li>{{item.title}}</li>
            </section>
            <section class="rightList" >
              <ul v-for="item2 in item.list" :key="item2.name">
                <li>{{item2.name}}*{{item2.weight}}</li>
              </ul>
            </section>
        </section>
      </div>
      <div class="send">
        <div>
          <textarea v-model="said" name="" id="" cols="30%" rows="2"></textarea>
          <button @click="mysay">发布</button>
          <p>说些什么吧</p>
        </div>

      </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue"
export default {
    name:'My',
    data(){
      return{
        carList:null,
        carList2:null,
        said:""
      }
    },
    components:{
        Footer
    },
    methods:{
      routerBack(){
        this.$router.go(-1)
      },
      mysay(){

      }
    },
    activated(){
      this.carList=this.$store.state.ieat.carList
      console.log("carList")
      console.log(this.carList)
    },
    mounted(){
      
      /*this.axios.post("/api3/chat/dailychatsave",
        {
    ownerlist : [ 
        {
            title : "鸡公煲",
            title:"地三鲜"
        }
    ],
    chatid : "777",
    owner : "瑜",
    ownerimg : "/svg/me/meinv.svg",
    ownersaid : "一起吃啊",
}
        
        ).then((res)=>{
          let ress=res.data
          console.log(ress)
        })*/
     
      
    }
}
</script>

<style lang="scss" scoped>
.main{display: flex;flex-direction: column;}
.list{display: flex;text-align: center;margin: 0 0 1rem 0;}
</style>