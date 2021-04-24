<template>
    <div>
        <div class="search" @click="toSearch">
            <input type="text">
            <button>搜索</button>
        </div>
        
        <Recommend/>
        <div class="waterFull">瀑布流单独餐</div>
        <div class="bySelf">自己选食材</div>
        <Refrigerator/>        
    </div>
</template>

<script>
//import { delete } from 'vue/types/umd'
import Recommend from '@/views/Weeat/Food/Recommend.vue'
import Refrigerator from '@/views/Weeat/Food/Refrigerator/Refrigerator.vue'
export default {
    name:'Food',
    data(){
        return{

        }
    },
    components:{
        Recommend,
        Refrigerator
    },
    mounted(){},
    methods:{
        toSearch(){
            console.log("toSearch")
        },
        

    }
    
}
</script>

<style lang="scss" scoped>

.search{display: flex;align-items: center;justify-content: center;}
</style>