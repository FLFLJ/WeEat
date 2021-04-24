<template>
    <div class="selectmain">
        <p class="back" @click="routerback">《</p>
        <video src="/data/video/乌鸡虫草花汤.mp4" autoplay="autoplay" loop="loop" width="100%" height="50%" controls="controls"></video>
        <div>
            <header>menulist</header>
            <ul class="menulist">
                <li>牛肉 x 1斤  45元</li>
                <li>黑豆 x 0.5斤  5元</li>
                <li>黄油 x 0.2斤  2元</li>
                <li>葱 x 0.01斤  0.5元</li>
                <li>姜 x 0.05斤  0.5元</li>
                <li>黑豆牛肉汤   共53元</li>
            </ul>
        </div>
        <div>藏单</div>
    </div>
</template>

<script>
export default {
    name:"Selectfood",
    data(){
        return{

        }
    },
    mounted(){
       
    },
    methods:{
        routerback(){
            this.$router.back(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
.back{width: 100%;background-color: red;}
.selectmain{display: flex;justify-content: center;flex-direction: column;align-items: center;}
.menulist{border: 0.1rem solid black;margin: 0.2rem 0 0 0;}
</style>