<template>
    <div>
        <section>设置，消息</section>
        <section>头像，名字，粉丝，关注</section>
        <section>收藏，最近浏览，待评价</section>
        <div>当前用户:{{$store.state.user.name}}<a href="javascript:;" @click="handleToLogout">退出</a></div>
        <div v-if="$store.state.user.isAdmin">管理员身份<a href="/admin" target="_blank">进入管理后台</a></div>
        <div v-else>普通身份</div>
        <div>
            <input type="file" name="file" value="上传头像" @change="handleToUpload">
            <img type="file" name="file" value="上传头像" @change="handleToUpload" class="userHead" :src="$store.state.user.userHead">
        </div>
    </div>
</template>

<script>
import {messageBox} from '@/components/JS';
import axios from 'axios';
export default {
    name:"center",
    methods:{
    handleToLogout(){
        this.axios.get('/api3/users/logout').then((res)=>{
            var status=res.data.status;
            console.log(status)
            if(status===0){
                localStorage.removeItem('name');
                localStorage.removeItem('isAdmin');
                this.$store.commit('user/USER_NAME',{name:'',isAdmin:false,userHead:''})
                this.$router.push('/my/login')
            }
        })
    },
    handleToUpload(ev){
        var file=ev.target.files[0];
        var param=new FormData();
        param.append('file',file,file.name);
        var config={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        };
        this.axios.post('/api3/users/uploadUserHead',param,config).then((res)=>{
            var status=res.data.status;
            var This=this;
            if(status===0){
                messageBox({
                    title:'信息',
                    content:'上传头像成功',
                    ok:'确定',
                    handleOk(){
                        This.$store.commit('user/USER_NAME', { 
                        name:This.$store.state.user.name,
                        isAdmin:This.$store.state.user.isAdmin,
                        userHead:res.data.data.userHead+'?'+Math.random()
                     })
                    }

                })
            }
            else{
                messageBox({
                    title:'信息',
                    content:'上传头像失败',
                    ok:"确定"
                })
            }
        })
    }
    },
    beforeRouteEnter(to,from,next){
        axios.get('/api3/users/getUser').then((res)=>{
            let status=res.data.status;
            if(status===0){
                next(vm=>{
                    localStorage.setItem('name',res.data.data.username);
                    localStorage.setItem('isAdmin',res.data.data.isAdmin);
                    console.log("res.data.data.userHead")
                    console.log(res)
                    vm.$store.commit('user/USER_LOGIN',
                    {
                    username:res.data.data.username,
                    isAdmin:res.data.data.isAdmin,
                    userHead:res.data.data.userHead+'?'+Math.random(),
                    playerName:res.data.data.playerName,
                    playerId:res.data.data.playerId,
                    playLevel:res.data.data.playLevel,
                    })
                    
                })
            }
            else{
                next('/my/login')
            }
        })
    }
}
</script>

<style scoped>
.userHead{width: 100px;height: 100px;border-radius: 99%;overflow: hidden;}
</style>