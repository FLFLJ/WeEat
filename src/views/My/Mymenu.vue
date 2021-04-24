<template>
  <div class="my">
      <div>
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
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue"
import axios from 'axios'
export default {
    name:'My',
    data(){
      return{
        carList:null,
        carList2:null,
        said:"",
        logined:false
      }
    },
    components:{
        Footer,
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
    },
    mounted(){
		    
    },
	beforeRouteEnter(to,from,next){
		axios.get('/api3/users/getUser').then((res)=>{
			console.log("462")
			let status=res.data.status
			console.log(status)
			if(status===0){
				next((vm)=>{
					console.log("已经登录")
				})
			}
			else{
				next('/my/login')
			}
		})
		}   
}
</script>

<style lang="scss" scoped>
.main{display: flex;flex-direction: column;}
.list{display: flex;text-align: center;margin: 0 0 1rem 0;}

</style>