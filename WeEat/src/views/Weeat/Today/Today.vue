<template>
    <div>
        <div id="main">
        <div id="price" >
        </div>
        <div id="peopleeat">
            附近的人在吃
            <ul class="saidItem" v-for="item in saids" :key="item.key"> 
                <div><img style="height:2rem" :src="item.ownerimg" alt=""></div>
                <div>
                <section>
                    <span>{{item.owner}}</span> 
                    <span class="foodcopy" @click="foodcopy(item.chatid)">{{item.copy}} copy</span>
                </section>  
                <section class="ownersay">
                    <p>{{item.ownersaid}}</p>
                    <div class="chatfood">
                        <p class="chatfood1" v-for="(item2,index) in item.ownerlist" :key="index">{{item2.food}}</p>
                    </div>

                </section>
                <div class="smallchatmain" v-if="idSearch.indexOf(item.chatid)<0">
                    <div class="smallchatmain1">
                       <section class="smallchat" v-for="(item3,index) in item.said" :key="index">
                        <img style="height:1.5rem" :src="item3.saerimg" alt="">
                        <span>{{item3.saer}}<br></span>
                        <span>{{item3.saidtext}}</span>
                    </section>
                     <div class="closemoresay" >
                        <span @click="idtrue(item.chatid)">关闭详细回复</span>
                        <span class="saytoowner" @click="inputtotrue(item.chatid)" > 点击评论 </span> 
                         </div>
                    </div>
                </div>
                <section v-else class="openmoresay"   >
                    <span @click="idtrue(item.chatid)">展开{{item.saidlenght}}条回复</span> 
                    <span class="saytoowner" @click="inputtotrue(item.chatid)" >点击评论</span>
                    </section>
                </div>
            </ul>
        </div>
        </div>
        <div v-if="inputsaytrue" >
            <div class="heiping" @click="inputtotrue()"></div>
            <section class="inputmain">
                <input required="required" autofocus  type="text" v-model="inputsay">
            <button @click="tosay">发送评论</button>
            </section>
            
        </div>
    </div>
</template>

<script>
import Drag from '../../../components/Drag.vue'
import Header from '../../../components/Header.vue'
export default {
  components: { Header, Drag },
    name:'Meat',
    data(){
        return{
            thePrice:[],
            theName:[],
            saids:[],
            idSearch:[],
            inputsay:"",
            inputsaytrue:false,
            clickChatId:""
        }
    },
    mounted(){
               this.priceShow()
               document.body.scrollTop = 0
               document.documentElement.scrollTop = 0
               this.mysay()
    },
    methods:{
        foodcopy(copyid){
            this.axios.post("/api3/chat/dailychatfoodcopy",{
                chatid:copyid,
            }).then((res)=>{
                console.log(res)
                this.mysay()
            })

        },
        inputtotrue(theId){
            this.inputsaytrue=!this.inputsaytrue
            this.clickChatId=theId

        },
        tosay(){
            this.inputsaytrue=!this.inputsaytrue
            this.axios.post("/api3/chat/dailychatupdate",{
                chatid:this.clickChatId,
                said:{
            saer :this.$store.state.chat.username,
            saidtext : this.inputsay,
            saerimg : this.$store.state.chat.userhead
        }
            }).then((res)=>{
                console.log(res)
                this.mysay()
            })
            this.inputsay=""
        },
        idtrue(id){
            console.log(id)
            let asd=this.idSearch.indexOf(id)
            if(asd>=0){
                this.idSearch.splice(asd,1)
                console.log("splice")
                console.log(this.idSearch)
            }
            else{
              this.idSearch.push(id)
            console.log("push")
                console.log(this.idSearch)  
            }
            

        },
        mysay(){
        this.axios.get("/api3/chat/dailychatget").then((res)=>{
            console.log("数据返回来")
            console.log(res.data)
            this.saids=res.data.result
            for (let i = 0; i < this.saids.length; i++) {
                let aaa=this.saids[i].chatid
                this.idSearch[i]=aaa
                
            }
            console.log(this.idSearch)
        })
      },
        priceShow(){
            this.axios.get("/data/price.json").then((res)=>{
                let resName=res.data.data
                for (let i = 0; i < resName.length; i++) {
                    this.theName.push(resName[i].name)
                    this.thePrice.push(resName[i].price)
                }
                var myChart = this.echarts.init(document.getElementById('price'));
                var labelRight = {position: 'right'};
                var option = {
                        title: {
                            text: '今日菜价',
                            sublink: 'http://e.weibo.com/1341556070/AjwF2AgQm'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            top: 80,
                            bottom: 30
                        },
                        xAxis: {
                            type: 'value',
                            position: 'top',
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed'
                                }
                            }
                        },
                        yAxis: {
                            type: 'category',
                            axisLine: {show: false},
                            axisLabel: {show: false},
                            axisTick: {show: false},
                            splitLine: {show: false},
                            data: this.theName
                        },
                        series: [
                            {
                                name: '涨跌',
                                type: 'bar',
                                itemStyle:{
                                    normal:{
                                        color: function(params) {

                            // build a color map as your need.

                            var colorList = [

                              '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',

                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',

                               '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'

                            ];

                            return colorList[params.dataIndex]

                        }
                                    },
                                },
                                stack: '总量',
                                label: {
                                    show: true,
                                    formatter: '{b}'
                                },
                                data: this.thePrice
                            }
                        ]
                        };
                        myChart.setOption(option);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#main{width: 100%;overflow: hidden;margin: 0 0 2rem 0;}
#price{height: 300px;width: 100%;margin: 1rem 0 0 1rem;overflow: hidden;}
.peopleimg img{height: 2rem;}
.peopleeat{border: 0.1rem solid black;display: flex;flex-direction: column;justify-content: center;align-items: center;width: 50%;}
#peopleeat{margin: 0 1rem 1rem 1rem;font-size: 0.8rem;}
.peoplesay img{height: 1.5rem;}
.everypeople{margin: 0 0 2rem 0;}

.saidItem{margin: 1rem;display: flex;justify-content: flex-start;flex-direction:row;position: relative;}
.chatfood{border: 1px solid black;justify-content: center;text-align: center;align-items: center;width: 10rem;margin: 0.2rem 0 0 2rem;white-space: nowrap;}
.chatfood1{padding: 0 1rem 0 0;opacity: 0.9;justify-content: center;overflow-x: scroll;}
.saytoowner{border: 1px solid black;border-radius: 10%;}
.ownersay{margin: 1rem 1rem 0 0;}
.smallchat{margin: 0.2rem 0 0.4rem 0;}
.inputmain{position: fixed;left: 0;bottom: 2rem;width: 100%;height: 2.4rem; display: flex;z-index:100000}
.inputmain input{flex:5}
.inputmain button{flex:1}
.smallchat ,.closemoresay,.openmoresay{margin: 0.4rem;}
.saidItem{padding: 0.4rem;border-top: 1px solid black;}
.foodcopy{position: absolute;right: 0;top: 0;margin: 0.4rem 0.4rem 0 0;}
.heiping{position: fixed;left: 0;top: 0;height: 100%;width: 100%;background: black;opacity: 0.6;z-index:100}
</style>