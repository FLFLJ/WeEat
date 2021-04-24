<template>
  <div class="main">
    <div class="LeftAndRightcolor">
     <div class="LeftAndRight">
       <div class="LeftAndRight1"> 
         <HelloWorld/>
         <div class="myHead" @click="myTrend($event)">
           <div class="me" v-for="(item,index) in me" :key="index">
            <div v-if="item.count==ihealth">
              <section class="me_section">
              <span><img class="me_image" :src="item.svg" alt="Carnivores"></span>
              <span class="me_name">{{item.name}}</span>
              </section>
            </div>
          </div>
         </div>
          <div class="myfuture" v-if="myTrendBoolean">
            <div class="myfutureEvery" v-for="(item,index) in headTrend" :key="index">
              <img :src="item.img" alt="">
              <span>{{item.text}}</span>
            </div>
          </div>
          <div v-else class="the_right">
            <section class="eated" v-if="eated">
              <h3>饮食习惯</h3>
              <ul class="eated_head">
                <li class="me_name" v-for="(item,index) in ieat" :key="index">
                  <p class="hadEated">{{item}}</p>
                </li>
              </ul>
            </section>
            <section class="que" v-if="nutrition.length" @click="nutrictionShow">
              <h3>营养缺少</h3>
              <div :class="[nutritionShow? 'nutritionShow':'head_nutrition']" >
                <ul class="nutrition" v-for="item in nutrition" :key="item.key">
                <span v-for="item1 in item" :key="item1">{{item1}}</span>
                </ul>
              </div>
            </section>
          </div>
       </div>
       <div class="report">
        <h3>未来预测</h3>
          <ul>
            <span>动脉粥样硬化，心脑血管疾病，记忆力下降</span>
            <span></span>
          </ul>
        </div>  
      </div> 
    </div>
    
    
    
    <div id="main">
        <div id="price" >
        </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Me',
  data(){
    return{
      ieat:{},
      ieatBoolean:false,
      ihealth:"",
      me:[],
      nutrition:[],
      eated:0,
      thePrice:[],
      theName:[],
      nutritionShow:false,
      myTrendBoolean:false,
      headTrend:[
        {img:"/svg/me/clown.svg",text:"这个人太挑食，成为人人嘲笑的小丑"},
        {img:"/svg/me/cool.svg",text:"这个人饮食均匀"},
        {img:"/svg/me/fo.svg",text:"这个人是素食主义者，从不吃肉"},
        {img:"/svg/me/zhu.svg",text:"这个人吃肉太多，身材严重变形"},
      ]
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
    this.axios.get('/data/suggest/me.json').then((res)=>{
      let me=res.data.data
      for(let item of me){
        if(item.count==this.ihealth){
          this.me.push(item)
        }
      }
    })
    if(this.eated==0){
      this.ieat=this.$store.state.ieat.ieat
      this.eated=this.$store.state.ieat.eated
    }
    this.ihealth=this.$store.state.ieat.ihealth
    let selectNutrition=this.$store.state.ieat.nutrition
    let Okey=Object.keys(selectNutrition)
    let proxy2=[]
    for(let i=0;i<37;i++){
        if(selectNutrition[Okey[i]]<=0){
      proxy2.push(Okey[i])
    }  
    }
     localStorage.setItem("que",JSON.stringify(proxy2))
     for (let i = 0; i < (proxy2.length*20); i++) {
         this.nutrition.push(proxy2.splice(0,2))      
     }
    this.priceShow()
  },
  methods:{
    myTrend(e){
      console.log(e.target.width)
      this.myTrendBoolean=!this.myTrendBoolean
    },
    nutrictionShow(){
      this.nutritionShow=!this.nutritionShow
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
  },
  computed:{
    
  }
}
</script>
<style lang="scss" scoped>
#main{border: 1px solid black;border-radius: 6%;width: 100%;overflow: hidden;margin: 0 0 2rem 0;text-align: center;}
#price{border: 1px solid black;border-radius: 6%;height: 300px;margin: 0.6rem;overflow: hidden;}

.main{
  margin: 1rem;
  .LeftAndRightcolor{
    background-color: black;
    border-top: 1px solid black;
    border-radius: 6%;
    .LeftAndRight{
      margin: 0.2rem 0.1rem 1rem 0.1rem;
      padding: 0.6rem;
      border:1px solid black;
      border-radius: 6%;
      background-color: white;
    display: flex;
    flex-direction: column;
    .LeftAndRight1{
      display: flex;
      .myHead{
        flex: 1;
      margin: 2rem 1rem 0 0;
      .me_section{
        text-align: center;
        .me_image{
          text-align: center;
          height: 5rem;
        }
         .me_name{
          text-align: center; 
          
        }
        
      }
       
      }
    
    .the_right{
      flex:4;
      margin: 0 0 0 1rem;
      overflow: scroll;
      .eated{
        display: flex;justify-content: center;align-items: center;flex-direction: column;text-align: center;
        .eated_head{
          display: flex;
          justify-content: center;
         .me_name{
          text-align: center;
          .hadEated{
            padding:0 0.2rem 0 0.2rem
          }
        }   
        }
      }
      .que{
        overflow-y: scroll;
        display: flex;justify-content: center;align-items: center;flex-direction: column;text-align: center;
        .head_nutrition{
          height: 8rem;
          overflow-y: scroll;
          z-index: 10000;
        .nutrition{
          border: 0.01rem  solid black;
          display: flex;
          justify-content:space-between;
          margin: 0 0.5rem 0 0.5rem;
          span{margin: 0 0.2rem 0 0.2rem;}
        }  
        }
      }
    }
    }
  }
  }
  
  .report{
    margin:0 0 1rem 0;text-align: center;
  }
  
}
.nutritionShow{
          
          z-index: 10000;
        .nutrition{
          border: 0.01rem  solid black;
          display: flex;
          justify-content:space-between;
          margin: 0 0.5rem 0 0.5rem;
          span{margin: 0 0.2rem 0 0.2rem;}
        }  
}
.myfuture{flex: 5;}
.myfuture img{
 height: 2.2rem;
}
.myfutureEvery span{
  overflow: scroll;
  font-size: 1rem;
  text-align: center;
}




</style>