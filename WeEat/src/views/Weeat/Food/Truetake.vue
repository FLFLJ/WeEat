<template>
    <div class="main" :class="{turnright:fanzhuanboolean}">
		<div class="nonetake" v-if="!ieattrue">你还没选菜呢！小可爱！</div>
		<div id="mytake" v-if="ieattrue">
			<ul class="mytake">
				<li v-for="(item,index) in ieat" :key="index" :class="{toblack:changed==index}" @click="whatfoodshow(index)">
				{{item}}
				</li>
			</ul>
			<h5 class="fanzhuan" @click="fanzhuan($event)">转过去！</h5>
		</div>
		
        <div class="waterfull"  >
			<div class="v-waterfall-content" id="v-waterfall">
				<div id="default_drag_comp" @touchstart="down($event)" @touchmove="move($event)" @touchend="end($event,index)"  v-for="(img, index) in waterfallList" :key="index" class="v-waterfall-item" :style="{top:img.top+'px',left:img.left+'px',width:waterfallImgWidth+'px',height:img.height}" @click="toselect()">
					<router-link tag="section" :to="{path:'/weeat/selectfood/'+img.title+'/'+index}">
						<img :src="img.src" alt="">
						<p style="font-size: small;color: #666;margin: 4px;">{{img.title}}</p>
						<p style="font-size: x-small;color: #9e9e9e;margin: 4px;padding-bottom: 6px;">{{img.info}}</p>
					</router-link>
				</div>
			</div>
		</div>
		<div id="carBox" v-if="ieattrue">
			<div class="carBtn"  @click="carchange($event)">
				<section class="carBtn_section">
					<img v-if="!carList.length" src="/svg/购物车.svg" alt="">
					<img v-else src="/svg/购物车.svg" alt="" @click.stop="sendCar">		
				</section>
		    </div>
			<div class="foodcar">
				<div class="foodcar2" >
					<section class="foodcar3" v-if="carList.length">
						<ul v-for="(item, index) in carList" :key="index">
						<img :src="item.img">
						<p>{{item.title}}</p>
						</ul>
					</section>
					<section class="foodcar4" v-else>
						<p>暂未选菜！</p>
					</section>
				</div>
			</div>
		</div>
		
    </div>
</template>

<script>
import Drag from "@/components/Drag.vue"
import {messageBox} from '@/components/Newsbox/index.js'; 

	export default {
		name: "v-waterfall",
		data() {
			return {
				carListHidden:true,
				shangla:true,
				ieat:null,
				ieattrue:false,
				waterfallList: [],  
				imgArr: [
				],
				hadtaken:{},
				// waterfallImgWidth: 100,
				waterfallImgWidth: 0,// 每个盒子的宽度
				// waterfallImgCol: 5,// 瀑布流的列数
				waterfallImgCol: 3,// 瀑布流的列数
				waterfallImgRight: 0,// 每个盒子的右padding
				waterfallImgBottom: 10,// 每个盒子的下padding
				waterfallDeviationHeight: [],
				imgList:[],
				changed:'',
				hadfullimg:[],
				proxyimgArr:[],
				fanzhuanboolean:false,

				flags: false,
				position: { x: 88, y: 61 },//x为垂直导航的宽+小盒子一半宽，水平导航的y为61
				nx: "",
				ny: "",
				dx: "",
				dy: "",
				xPum: "",
				yPum: "",
				overbackL:0,
				overbackT:0,
				waitdelete:"",
				carList:[],//菜篮子
				timeOutLoading:null,
				BoxHidden:true
			}
		},
		components:{
			Drag
		},
		computed:{
		},
		created() {
		},
		mounted() {
			this.whatIeat();
			this.calculationWidth()
		},
		activated(){
		},
		watch:{
		},
		methods: {
			sendCar(){
				this.BoxHidden=false
				let carList=this.carList
				let This=this
				messageBox({
                        title:'发布菜单',
                        content:'确认发布菜单吗？',
                        ok:'确定',
						cancel:'取消',
						handleOk(){
							This.BoxHidden=false
							This.$store.commit("ieat/UP_CARLIST",{
					carList 
				})
							This.$router.push("/my")
                        },
						handleCancel(){
							This.BoxHidden=false
                }
						
                    })
			},
			carchange(e){
				this.carListHidden=!this.carListHidden
				let carBox=document.getElementById("carBox")
				if(this.carListHidden){
					carBox.className="tobottom"
				}
				else{
					carBox.className="totop"
				}

			},
			down(e) {
				console.log("按下啦")
				this.overbackL=e.target.parentElement.parentElement.style.left
				this.overbackT=e.target.parentElement.parentElement.style.top
				this.timeOutLoading=window.setTimeout(()=>{
					if(!this.flags){
				this.flags = true;//激活拖动状态
				e.target.parentElement.style.border="1px solid black"
				this.maxW = document.getElementById("v-waterfall").clientWidth - e.target.parentElement.offsetWidth;//设置可移动最大宽度
				this.maxH = document.getElementById("v-waterfall").clientHeight - e.target.parentElement.offsetHeight;//设置可移动最大高度	
				console.log("延迟啦")
				}
				},500)
				this.timeOutLoading
			},
			move(e) {
				if(!this.flags){
					console.log("清除")
					window.clearTimeout(this.timeOutLoading)
				}
				//拖动，参数event为拖动目标
			    //e.preventDefault();//取消内置默认动作
				if (this.flags) {//判断是否可拖动
					var touch;
					if (e.touches) {//目标的所有拖动对象
					touch = e.touches[0];
					}
					else {
					touch = e;
					}
					//禁止目标对象移出最大、最小范围
					this.nx = touch.clientX - this.position.x;
					this.ny = touch.clientY - this.position.y;
					if (this.nx < 0) {
					this.nx = 0;
					}
					else if (this.nx > this.maxW) {
					this.nx = this.maxW;
					}
					if (this.ny < 0) {
					this.ny = 0;
					}
					else if (this.ny >= this.maxH) {
					this.ny = this.maxH;
					}
					//设置目标对象新的坐标
					e.target.parentElement.parentElement.style.left = this.nx + "px";
					e.target.parentElement.parentElement.style.top = this.ny + "px";
					//阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
					document.addEventListener(
					"touchmove",
					function() {
						// event.preventDefault();
					},
					false
					);
				}
			},
			//鼠标释放时候的函数
			end(e,index) {
				if(!this.flags){
					console.log("清除")
					window.clearTimeout(this.timeOutLoading)
				}
				this.flags = false;
				//触底,元素消失，瀑布流列表刷新，菜篮子添加
				console.log("测试")
				console.log(e.target.parentElement.parentElement.style.top)
				console.log(this.overbackT)
				if(parseInt(e.target.parentElement.parentElement.style.top)-parseInt(this.overbackT)>=200||parseInt(e.target.parentElement.parentElement.style.top)>=this.maxH){
					let waitdelete=this.waitdelete
					let proxyimgArrwaitdelete=this.proxyimgArr[waitdelete]
					let targetHTML=e.target.parentElement.innerText
					let proxyimgArrIndex=[]
					for (let i = proxyimgArrwaitdelete.length-1; i >=0; i--) {
						if(proxyimgArrwaitdelete[i].title==targetHTML){
							proxyimgArrIndex.push(proxyimgArrwaitdelete[i])
							let feifei=this.proxyimgArr[waitdelete]
							for (let j = feifei.length-1; j >= 0; j--) {
								if(feifei[j].title==targetHTML){
									this.carList.push(feifei[j])
									this.proxyimgArr[waitdelete].splice(j,1)
								}
								
							}
						}
					}
					e.target.parentElement.remove()
				}
				else{
					e.target.parentElement.parentElement.style.left=this.overbackL
					e.target.parentElement.parentElement.style.top=this.overbackT
					e.target.parentElement.style.border=""
				}
			},
			toselect(){
			},
			fanzhuan(e){
				if(e.target.className=="fanzhuan"){
					this.fanzhuanboolean=!this.fanzhuanboolean
				}
			},
			whatIeat(){
				this.ieat=this.$store.state.ieat.ieat
				//初次挂载的时候，自动显示ieat的第一项对应图片
				let keysIeat=Object.keys(this.ieat)
				if(keysIeat.length>0){
					this.ieattrue=true
					this.whatfoodshow(keysIeat[0])
				}
			},
			whatfoodshow(index){
				this.waitdelete=index
					this.changed=index //使当前子导航拥有黑边框
					this.imgList=[]
					this.hadtaken[index]=index
					if(this.hadfullimg.indexOf(index)<0){
					this.axios.get("/api3/food/foodclassGet",{params: {
					foodclass:index
				}}).then((res)=>{
					this.imgArr=res.data.result.food
					this.hadfullimg.push(index)
					this.proxyimgArr[index]=this.imgArr
					this.calculationWidth();
					})		
					}
				else if(this.hadfullimg.indexOf(index)>=0){
					this.imgArr=this.proxyimgArr[index]
					this.calculationWidth();
				}		
			},
			//计算每个图片的宽度或者是列数
			calculationWidth() {
				let domWidth = document.getElementById("v-waterfall").clientWidth;
				if (!this.waterfallImgWidth && this.waterfallImgCol) {
					this.waterfallImgWidth = ((domWidth - (this.waterfallImgRight * this.waterfallImgCol))-39) / this.waterfallImgCol;//39是垂直导航的宽，可以变量化
				} else if (this.waterfallImgWidth && !this.waterfallImgCol) {
					this.waterfallImgCol = Math.floor(domWidth / (this.waterfallImgWidth + this.waterfallImgRight))
				}
				//初始化偏移高度数组
				this.waterfallDeviationHeight = new Array(this.waterfallImgCol);
				for (let i = 0; i < this.waterfallDeviationHeight.length; i++) {
					this.waterfallDeviationHeight[i] = 0;
				}
				this.imgPreloading()
			},
			//图片预加载
			imgPreloading() {
				this.waterfallList=[]
				for (let i = 0; i < this.imgArr.length; i++) {
					let aImg = new Image();
					aImg.src = this.imgArr[i].img;
					aImg.title=this.imgArr[i].title;
					aImg.onload  = (e) => {
						let imgData = {};
						imgData.height = this.waterfallImgWidth / aImg.width * aImg.height;
						imgData.src = aImg.src;
						imgData.title = aImg.title;// 说明文字（也可以自己写数组，或者封装json数据，都可以，但是前提是你会相关操作，这里不赘述）
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
			}
		}
	}
</script>
<style scoped lang="scss">
*{max-height: 100vh;}
body{overflow:hidden}
.baba div{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    }
.waterfull{
		width: 100%;
	}
	.v-waterfall-content {
		/* 主要 */
		width: 100%;height: 35rem;position: relative;
		/* 次要：设置滚动条，要求固定高度 */
		overflow-y: auto;
	}

	.v-waterfall-item {
		/* 主要 */
		position: absolute;
	}

	.v-waterfall-item img {
		/* 主要 */
		/* width: auto;height: auto; */
		width: 100%;height: auto;
		
	}
/*.mytake{display: flex; justify-content: center;}*/
.main{display: flex;overflow: hidden;}
.nonetake{
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%) skew(1deg,0);
	
}
.turnright{flex-direction:row-reverse}
.mytake{overflow-y:scroll;white-space: nowrap;}
::-webkit-scrollbar {display:none}
#mytake{position: relative}
.fanzhuan{position: absolute;left: 0;bottom: 3rem;}
#mytake li{padding: 0.2rem;text-align: center;}
.toblack{background-color:cornflowerblue;}
img{border-radius: 1rem;}

#default_drag_comp {
  //width: 0.8rem;
  //height: 0.8rem;
 // border-radius: 50%;
  //border: 2px solid #ffffff;
  //box-shadow: 0 0 0.4rem 2px #d3d3d3;
 // background: #CBA16B;
  //position: fixed;
  z-index: 100000;
  //top: 0rem;
 // right: 0rem;
  //display: flex;
  //justify-content: center;
  //align-items: center;
  
}
#carBox{height: 10rem;box-sizing: border-box; width: 100%; position: fixed;left: 0;bottom: 0;}
.tobottom{
	transform : translate(0, -0.01rem);
	transition-duration: 0.4s
}
.totop{
	transform : translate(0, 5.6rem);
	transition-duration: 0.4s
}
@keyframes mymove {
	0%   {bottom: 1rem;}
25%  {bottom: 2rem;}
50%  {bottom: 3rem;}
100% {bottom: 4rem;}
}
.foodcar{height: 100%;text-align: center;overflow-x: scroll;white-space: nowrap;box-sizing: border-box;background: white;}

.foodcar2 ul{padding:0 1rem 0 0;}
.foodcar3{display: flex;margin: 0.1rem 0 0 0;}
.foodcar4{text-align: center;margin: 2rem 1rem 0 1rem;}
.foodcar img{height: 4rem;}
.Box{margin: 0;padding: 0;background-color: cornflowerblue;border: none;}
//.carBtn{background: green;z-index: 1000000000000;}
.carBtn_section{background:cornflowerblue;text-align: center;}
//.carBtn section{display: flex;justify-content: center;align-items: center ;}
/*
.foodcar{
	background: white;
	width: 375px;
	height: 8rem;
	position: absolute;
	left: 0;
	bottom: 0;
	box-sizing: border-box;
	overflow-x: scroll;
	white-space: nowrap;
	text-align: center;
	display: flex;
}
.foodcarHidden{
	z-index: 10000000;
	background: white;
	position: absolute;
	left: 0;
	bottom: 0;
	box-sizing: border-box;
	overflow-x: scroll;
	white-space: nowrap;
	text-align: center;
	display: flex;
}
.foodcar2{
	display: flex;justify-content: center;align-items: center;
}
.foodcar3{display: flex;justify-content: center;align-items: center;text-align: center;}
.foodcar2 ul{
padding:0 1rem 0 0;
}
.foodcar li{
	padding: 0 10rem 0 0;
}
.foodcar img{height: 4rem;}
.foodcar{width: 100%;}
*/
</style>