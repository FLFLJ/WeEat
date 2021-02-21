<template>
<div class="footer">
    <div class="footerBox"> 
    <router-link tag="div" to="/home">
    <h4>Home</h4>
    </router-link>
    <router-link tag="div" to="/weeat">
    <h4>WeEat</h4>
    </router-link>
    <router-link tag="div" to="/my">
    <h4>My</h4>
    </router-link>
    </div>
</div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.footer{border-top: 1px solid black; position: fixed;left: 0;bottom: 0;width: 100%;background:white;z-index: 9999999;}
.footerBox{display: flex;justify-content:center;align-items: center;}
.footerBox div{margin:0.5rem 1.2rem 0.5rem 1.2rem;}
.router-link-active{
  background:cornflowerblue;
  color: white;
}
</style>