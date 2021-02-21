<template>
    <div class="main">
        <div class="routertowhere">
            <router-link class="routertowhere_list" tag="div" to="/weeat/food/recommend">推荐</router-link>
            <router-link class="routertowhere_list" tag="div" to="/weeat/food/truetake">菜单</router-link>  
        </div>
    <router-view/>
    </div>
</template>

<script>
//import { delete } from 'vue/types/umd'
export default {
    name:'Food',
    
}
</script>

<style lang="scss" scoped>
.routertowhere{display: flex;justify-content: flex-start;text-align: center;}
.routertowhere_list{flex:1;}
.router-link-active{
  background:cornflowerblue;
  color: white;
}
</style>