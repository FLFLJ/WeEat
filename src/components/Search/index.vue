<template>
    <div class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" style="width=100%" v-model="message">
            </div>
        </div>
        <div class="search_result">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <li v-for="item in movieList" :key="item.id">
                    <div class="img"><img :src="item.img"></div>
                    <div class="info">
                        <p><span>{{item.nm}}</span><span>{{item.sc}}</span></p>
                        <p>{{item.enm}}</p>
                        <p>{{item.cat}}</p>
                        <p>{{item.rt}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'Search',
    data(){
        return{
            message:"",
            movieList:[]
        }
    },
    methods:{
        cancelRequest(){
            if(typeof this.source==='function'){
                this.source('请求终止')
            }
        }
    },
    watch:{
        message(newVal){
            var first_newVal=newVal.substr(0,1);
            var that=this;
            var cityId=this.$store.state.city.id;
            this.cancelRequest();
            this.axios.get("/data/searchList-"+cityId+first_newVal+".json",{
                cancelToken: new this.axios.CancelToken(function(c){
                   that.source=c; 
            })
            }).then((res)=>{
            var msg=res.data.msg;
            console.log(res);
            if(msg==="ok"){
                this.movieList=res.data.data.movies.list;
            }
        }).catch((err)=>{
            if(this.axios.isCancel(err)){
                console.log('Rquest canceled',err.message);
            }
            else{
                console.log(err);
            }
        });
    }
}
    /*watch:{
        message(newVal){
            this.axios.get('/data/searchList-'+toupper(newVal)+'.json').then((res)=>{
                var msg=res.data.msg;
                var movies=res.data.data.movies;
                if(msg&&movies){
                    this.movieList=res.data.data.movies.list;
                }
            });
        }
    }*/
}
</script>
<style scoped>
</style>