<template>
<div>
    <div class="messageBox">
        <h2>{{title}}</h2>
        <p>{{content}}</p>
        <div>
            <div v-if="ok" @click="handleOk">{{ok}}</div>
            <div v-if="cancel" @click="handleCancel">{{cancel}}</div>
        </div>
    </div>
    <div id="shadow"></div>
</div>
</template>

<script>
export default {
    name:'MessageBox'
}
</script>

<style scoped>
.messageBox{width: 200px;height: 120px;border: 1px #ccc solid;border-radius: 4px;background: white;box-shadow: 3px 3px 3px 3px #ccc;position:absolute;left: 50%;top: 50%;margin: -60px 0 0 -100px;z-index: 100000000000000000000;}
.messageBox h2{text-align: center;line-height: 40px;font-size: 18px;}
.messageBox p{text-align: center;line-height: 40px;}
.messageBox > div{display:flex;position: absolute;bottom: 0;width: 100%;border-top: 1px #ccc solid;}
.messageBox > div div{flex:1;text-align: center;line-height: 30px;border-right: 1px #ccc solid;}
.messageBox > div div:last-child{border: none;}
#shadow{position: fixed;left: 0;top: 0;background: black;opacity: 0.6;height: 100vh;width: 100vw;z-index: 99999999;}
</style>