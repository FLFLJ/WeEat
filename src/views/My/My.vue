<template>
  <div id="my">
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Footer from '../../components/Footer.vue'
export default {
    name:'My',
    data(){
      return{
       
      }
    },
    components:{
        Footer
    },
    methods:{
     
    },
    activated(){
    },
    mounted(){         
    }
}
</script>

<style lang="scss" scoped>
*{
  margin: 0.2rem;
}
</style>