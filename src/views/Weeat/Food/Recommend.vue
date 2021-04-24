<template>
    <div>
        <div class="daysEat">
                <ul class="daysEat_Nav" v-if="navshow">
                    <li class="navItem" v-for="(item,index) in eatNav" :key="index">
                        {{item.name}}
                    </li>
                </ul>
                
                <div class="daysEat_Right" >
                    <div class="menuStyle">
                        <span class="menuStyle_span" v-for="item in menuStyleList" :key="item">
                            {{item}}
                        </span>
                    </div>
                    
                    <div id="menu">
                        <div class="menuContent">
                           <div v-for="(img, index) in waterfallList" :key="index" class="menuItem" :style="{top:img.top+'px',left:img.left+'px',width:waterfallImgWidth+'px',height:img.height}">
                                <img :src="img.src" alt="" >
						        <section class="FoodContent">
                                   <span class="FoodContentName" style="font-size: small;color: #666;">{{img.title}}</span> 
                                    <span><img src="/images/icon/rubbish.svg" class="deleteFood"/></span>
                                </section>
                                
                            </div> 
                        </div>
                        
                    </div>
                    <div class="price">
                        <section v-for="(item,index) in priceList" :key="index" class="nameAndPrice">
                                <span class="nameAndPrice_name">
                               {{item.name}}
                            </span> 
                            <span class="nameAndPrice_price">
                               {{item.price}}￥
                            </span> 
                           
                        </section>
                        
                    </div>
                    <div style="clear:both"></div>
                    <div class="allPrice">
                            <button class="allPrice_button">take</button>
                            <span class="allPrice_price">{{priceTotal}}￥</span>
                    </div>
                </div>
            </div>
    </div>
</template>


<script>
//import { delete } from 'vue/types/umd'
export default {
    name:'Recomend',
    data(){
        return{
            navshow:true,
            menuStyleList:[
                '三日菜单',
                '有啥吃啥',
            ],
           
            carListHidden:true,
				shangla:true,
				ieat:null,
				ieattrue:false,
				waterfallList: [],  
				imgArr: [
                    {title:"菠菜上汤",img:"/images/waterfullimg/菠菜上汤.jpg",
                    nameAndfood:[{name:"菠菜",price:2}]
                    },
                    {title:"彩椒鸭掌",img:"/images/waterfullimg/彩椒鸭掌.jpg",
                    nameAndfood:[
                        {name:"彩椒",price:4},
                        {name:"鸭掌",price:16}]
                    },
                    {title:"地三鲜",img:"/images/waterfullimg/地三鲜.jpg",
                    nameAndfood:[
                        {name:"土豆",price:4},
                        {name:"茄子",price:5},
                        {name:"青椒",price:3}]},
                    {title:"豆芽炒鸭血",img:"/images/waterfullimg/豆芽炒鸭血.jpg",
                    nameAndfood:[
                        {name:"豆芽",price:1},
                        {name:"鸭血",price:4}]},
                    {title:"番茄炒蛋",img:"/images/waterfullimg/番茄炒蛋.jpg",
                    nameAndfood:[
                        {name:"番茄",price:3},
                        {name:"鸡蛋",price:2}]},
                    {title:"肥牛火锅",img:"/images/waterfullimg/肥牛火锅.jpg",
                    nameAndfood:[
                        {name:"肥牛",price:25}
                        ]},
                    
				],
				waterfallImgWidth: 0,// 每个盒子的宽度
				waterfallImgCol: 3,// 瀑布流的列数
				waterfallImgRight: 5,// 每个盒子的右padding
				waterfallImgBottom: 5,// 每个盒子的下padding
				

				
            eatNav:[
                {name:"省钱"},
                {name:"省时"},
                {name:"美味"},
                {name:"推荐"},
                {name:"性价比"},
                {name:"奇特"}
            ],
            priceList:[],
            priceTotal:0,
            foodList:[
                [
                    {title:"菠菜上汤",img:"/images/waterfullimg/菠菜上汤.jpg"},
                    {title:"彩椒鸭掌",img:"/images/waterfullimg/彩椒鸭掌.jpg"},
                    {title:"地三鲜",img:"/images/waterfullimg/地三鲜.jpg"},
                    {title:"豆芽炒鸭血",img:"/images/waterfullimg/豆芽炒鸭血.jpg"},
                    {title:"番茄炒蛋",img:"/images/waterfullimg/番茄炒蛋.jpg"},
                    {title:"肥牛火锅",img:"/images/waterfullimg/肥牛火锅.jpg"},
                    {title:"黑豆猪蹄汤",img:"/images/waterfullimg/黑豆猪蹄汤.jpg"},
                    {title:"金针菇番茄汤",img:"/images/waterfullimg/金针菇番茄汤.jpg"},
                    {title:"莲藕花生汤",img:"/images/waterfullimg/莲藕花生汤.jpg"},
                    {title:"牛骨仔黑豆汤",img:"/images/waterfullimg/牛骨仔黑豆汤.jpg"},
                    {title:"牛肉炒饭",img:"/images/waterfullimg/牛肉炒饭.jpg"},
                    {title:"沙姜章鱼",img:"/images/waterfullimg/沙姜章鱼.jpg"},
                    {title:"土豆炖鸡翅",img:"/images/waterfullimg/土豆炖鸡翅.jpg"},
                    {title:"乌鸡虫草花汤",img:"/images/waterfullimg/乌鸡虫草花汤.jpg"},
                    {title:"孜然羊肉",img:"/images/waterfullimg/孜然羊肉.jpg"}

                ]
                
            ],
            needFood:[
                {name:"马铃薯",price:5},
                {name:"姜",price:3},
                {name:"菠菜",price:5},
                {name:"鸭掌",price:20},
                {name:"牛肉丸",price:20},
                {name:"面条",price:5},
                {name:"马铃薯",price:5},
                {name:"姜",price:3},
                {name:"菠菜",price:5}
            ]
           
        }
    },
    mounted(){
       this.calculationWidth()
       this.priceShow()

    },
    methods:{
        
        calculationWidth() {
            //获取瀑布流发生容器可视宽度
            let domWidth = document.getElementById("menu").clientWidth;
            //如果没设置宽度而设置列数，设置宽度
            if (!this.waterfallImgWidth && this.waterfallImgCol) {
                this.waterfallImgWidth = ((domWidth - (this.waterfallImgRight * this.waterfallImgCol))) / this.waterfallImgCol;
            } 
            //如果没设置列数而设置宽度，设置列数
            else if (this.waterfallImgWidth && !this.waterfallImgCol) {
                this.waterfallImgCol = Math.floor(domWidth / (this.waterfallImgWidth + this.waterfallImgRight))
            }
            //设置用于高度监听的数组
            this.waterfallDeviationHeight = new Array(this.waterfallImgCol);
            for (let i = 0; i < this.waterfallDeviationHeight.length; i++) {
                this.waterfallDeviationHeight[i] = 0;
            }
            //图片预处理
            this.imgPreloading()
			},
			//图片预加载
        imgPreloading() {
            this.waterfallList=[]
            for (let i = 0; i < this.imgArr.length; i++) {
                let aImg = new Image();
                aImg.src = this.imgArr[i].img;
                aImg.title=this.imgArr[i].title;
                aImg.nameAndfood=this.imgArr[i].nameAndfood;
                aImg.onload  = (e) => {
                    let imgData = {};
                    imgData.height = this.waterfallImgWidth / aImg.width * aImg.height;
                    imgData.src = aImg.src;
                    imgData.title = aImg.title;
                    imgData.nameAndfood=aImg.nameAndfood// 说明文字（也可以自己写数组，或者封装json数据，都可以，但是前提是你会相关操作，这里不赘述）
                    //imgData.info = '详情说明：啦啦啦啦啦';// 说明文字
                    this.waterfallList.push(imgData);
                    
                    this.rankImg(imgData);
                }
            }
        },
        //瀑布流布局
        rankImg(imgData) {
            let {
                waterfallImgWidth,
                waterfallImgRight,
                waterfallImgBottom,
                waterfallDeviationHeight,
                waterfallImgCol
            } = this;
            let minIndex = this.filterMin();
            imgData.top = waterfallDeviationHeight[minIndex];
            imgData.left = minIndex * (waterfallImgRight + waterfallImgWidth);
            //waterfallDeviationHeight[minIndex] += imgData.height + waterfallImgBottom;// 不加文字的盒子高度
            waterfallDeviationHeight[minIndex] += imgData.height + waterfallImgBottom + 20;// 加了文字的盒子高度，留出文字的地方（这里设置56px）
        },
        /**
         * 找到最短的列并返回下标
         * @returns {number} 下标
         */
        filterMin() {
            const min = Math.min.apply(null, this.waterfallDeviationHeight);
            return this.waterfallDeviationHeight.indexOf(min);
        },
        priceShow(){
            console.log("priceshow")
            console.log(this.imgArr)
            let priceList=this.imgArr
            for (let i = 0; i < priceList.length; i++) {
                let priceListFood=priceList[i].nameAndfood
                for (let j = 0; j < priceListFood.length; j++) {
                
                    this.priceList.push(priceListFood[j])
                    this.priceTotal+=priceListFood[j].price
                    
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.daysEat{
    .daysEat_Nav{
        white-space: nowrap;
        display: flex;
        text-align: center;
        .navItem{
            flex:1
        }
        
    }
    .daysEat_Right{
        border:1px solid black;
        border-radius: 2%;
        margin: 1rem;
        #menu{
            margin: 0.4rem;
            overflow-y: scroll;
          .menuContent{
             width: 100%;height: 40vh;position: relative;
		/* 次要：设置滚动条，要求固定高度 */
        .menuItem{
            position: absolute;
            text-align: center;
             img{
                width: 100%;
                border-radius: 6%;
                        }
            }     
          }  
        } 
    }
    .price{
        border: 1px solid black;
        border-radius: 2%;
        display: flex;
        flex-wrap: wrap;
        margin: 0.6rem;
        .nameAndPrice{
            display: flex;
           white-space: nowrap;
            margin: 0.2rem 0.1rem 0 0.1rem;
            font-size: 0.8rem;
            .nameAndPrice_name{
            
            }
            .nameAndPrice_price{

            }
            
        }
    }
    .allPrice{
        text-align: center;
        display: flex;
        margin: 0.6rem;
        .allPrice_button{
            flex: 6;
        }
        .allPrice_price{
            flex: 1;
        }
        
    }
}

.menuStyle{
    display: flex;
    text-align: center;
    .menuStyle_span{
        flex: 1;
    }
}
.deleteFood{
    height: 0.8rem;
    width: 0.8rem;
    display:inline;
    
}
.FoodContent{
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.FoodContentName{
    flex: 5;
}
</style>