<template>
    <div>
		<div class="toloop">
			<img v-for="(item,index) in imagesList"  :style="{left:item.left+'px',top:item.top+'px',height:item.height+'px',width:item.width+'px',transform:'rotateY('+item.rotate+'deg)',animationFillMode:'forwards'}" :src="item.image" :key="index" alt="" @click="turnaroud(index,item.name,$event)">
		</div>
		
    </div>
</template>

<script>
import * as THREE from 'three'
export default {
    name:'Meat',
   data() {
      return{
          imagesList:[
			  {name:"left1",image:"/images/1.jpg",left:0,top:0,back:false,width:32,height:48,rotate:-60},
			  {name:"left2",image:"/images/2.jpg",left:54,top:20,back:false,width:32,height:48,rotate:-45},
			  {name:"middle",image:"/images/3.jpg",left:108,top:30,back:false,width:50,height:80,rotate:0},
			  {name:"right1",image:"/images/4.jpg",left:162,top:20,back:false,width:32,height:48,rotate:45},
			  {name:"right2",image:"/images/5.jpg",left:216,top:0,back:true,width:32,height:48,rotate:60},
			  {name:"back1",image:"/images/6.jpg",left:162,top:-30,back:true,width:32,height:48,rotate:-60},
			  {name:"back2",image:"/images/7.jpg",left:54,top:-30,back:true,width:32,height:48,rotate:60}
		  ]
          } 
    
  },
  methods:{
      toThree(){
          const scene=new THREE.Scene()
      },
	  turnaroud(index,name,e){
		  console.log("e")
		  console.log(index)
		  console.log(name)
		  let turnWidth=e.target.clientWidth
		  if(name=="left2"){
			for (let i = 0; i < this.imagesList.length; i++) {
				//反向
				if(this.imagesList[i].back){
					//反向操作
					//back2
					if(this.imagesList[i].left==162&&this.imagesList[i].back){
						let rightGo=setInterval(() => {
						this.imagesList[i].left-=4
						if(this.imagesList[i].left==54){
							clearInterval(rightGo)
						}
					}, 10);
					}
					else{
						//back1
						let rightGo=setInterval(() => {
						this.imagesList[i].left-=2
						if(this.imagesList[i].left==0||this.imagesList[i].left==162){
							clearInterval(rightGo)
						}
					}, 10);
					}
					
					//最左反向项back设置为正
					if(this.imagesList[i].left==0){
						this.imagesList[i].back=false
					}
				}
				//正向
				else{
					let rightGo=setInterval(() => {
						this.imagesList[i].left+=2
						if(this.imagesList[i].left==54||this.imagesList[i].left==108||this.imagesList[i].left==162||this.imagesList[i].left==216){
							clearInterval(rightGo)
						}
					}, 10);

					//最右正向取反
					if(this.imagesList[i].left==216){
						this.imagesList[i].back=true
					}
				}
				//中间项升高
				if(this.imagesList[i].left==108&&this.imagesList[i].back==false){
					this.imagesList[i].top=-30
					this.imagesList[i].width=50
					this.imagesList[i].height=80
				}
				else{
					this.imagesList[i].width=32
					this.imagesList[i].height=48
				}
				 if(this.imagesList[i].left<216 &&this.imagesList[i].back){
					
					this.imagesList[i].top=-30
				}
				else{
					//其他项正常高度
					this.imagesList[i].top=0
				}
				//重新取名
				if(this.imagesList[i].left==0){
					this.imagesList[i].name="left1"
				}
				if(this.imagesList[i].left==54&& !this.imagesList[i].back){
					this.imagesList[i].name="left2"

				}
				if(this.imagesList[i].left==108){
					this.imagesList[i].name="middle"
				}
				if(this.imagesList[i].left==162&& !this.imagesList[i].back){
					this.imagesList[i].name="right1"
				}
				if(this.imagesList[i].left==216){
					this.imagesList[i].name="right2"
				}
				if(this.imagesList[i].left==162&&this.imagesList[i].back){
					this.imagesList[i].name="back1"
				}
				if(this.imagesList[i].left==54&&this.imagesList[i].back){
					this.imagesList[i].name="back2"
				}
				  
		  }  
		  }
		  if(name=="left1"){
			for (let i = 0; i < this.imagesList.length; i++) {
				//反向
				if(this.imagesList[i].back){
					//反向操作
					if(this.imagesList[i].left==162&&this.imagesList[i].back){
						this.imagesList[i].left-=108
					}
					else{
						this.imagesList[i].left-=54
					}
					
					//最左反向项back设置为正
					if(this.imagesList[i].left==0){
						this.imagesList[i].back=false
					}
				}
				//正向
				else{
					this.imagesList[i].left+=54
					//最右正向取反
					if(this.imagesList[i].left==216){
						this.imagesList[i].back=true
					}
				}
				//中间项升高
				if(this.imagesList[i].left==108&&this.imagesList[i].back==false){
					this.imagesList[i].top=-30
					this.imagesList[i].width=50
					this.imagesList[i].height=80
				}
				else{
					this.imagesList[i].width=32
					this.imagesList[i].height=48
				}
				 if(this.imagesList[i].left<216 &&this.imagesList[i].back){
					
					this.imagesList[i].top=-30
				}
				else{
					//其他项正常高度
					this.imagesList[i].top=0
				}
				//重新取名
				if(this.imagesList[i].left==0){
					this.imagesList[i].name="left1"
				}
				if(this.imagesList[i].left==54&& !this.imagesList[i].back){
					this.imagesList[i].name="left2"

				}
				if(this.imagesList[i].left==108){
					this.imagesList[i].name="middle"
				}
				if(this.imagesList[i].left==162&& !this.imagesList[i].back){
					this.imagesList[i].name="right1"
				}
				if(this.imagesList[i].left==216){
					this.imagesList[i].name="right2"
				}
				if(this.imagesList[i].left==162&&this.imagesList[i].back){
					this.imagesList[i].name="back1"
				}
				if(this.imagesList[i].left==54&&this.imagesList[i].back){
					this.imagesList[i].name="back2"
				}
				  
		  }  
		  } 
	  }

  },
  mounted(){

  }
  
}

</script>

<style lang="scss" scoped>
.toloop{
	display: flex;
	justify-content: center;
	position: relative;
}
.toloop img{
	position: absolute;
	flex: 1;
	
}

</style>