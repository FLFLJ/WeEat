<template>
    <div>
        <div>
            <header class="header">
                <li>Markdown.com.cn</li>
                <li @click="fileclick" @mouseover="cursor($event)">
                    <span >文件</span> 
                    <ul v-if="filetrue">
                       <li>导出markdown</li>
                        <li>导入</li>
                    </ul>
                </li>
                <li>格式</li>
                <li>功能</li>
                <li> 排版主题</li>
                <li>代码主题</li>
            </header>
        </div>
        <div class="box">
            <div class="left">
                <div>
                    <textarea v-model="mytext" name="" id="lefttext" cols="100%" rows="100%"></textarea>
                </div>
            </div>
            <div class="right">
                <div id="right">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Meat',
   data() {
      return{
          filetrue:false,
          mytext:"",
          copytext:""
          } 
    
  },
  methods:{
      //点击显示下拉子元素
      fileclick(){
          this.filetrue=!this.filetrue
      },
      //鼠标经过光标变成白手指
      cursor(e){
          console.log(e)
          e.target.style.cursor="pointer"
          //e.style.cursor="pointer"
      }
  },
  mounted(){
      //分屏同步滚动
      let left=document.querySelector('.left')
      let right=document.querySelector('.right')
      let scale=(left.scrollHeight-left.clientHeight)/(right.scrollHeight-right.clientHeight)
      let flag=true
      left.addEventListener("mouseover",function(e){
          flag=false
          left.addEventListener("scroll",function(e){
              if(!flag){
                  right.scrollTop=left.scrollTop/scale
              }
          })
      })
      right.addEventListener("mouseover",function(e){
          flag=true
          right.addEventListener("scroll",function(e){
              if(flag){
                  left.scrollTop=right.scrollTop*scale
              }
          })
      })
     
     //数据同步
      let lefttext=document.getElementById("lefttext")
      lefttext.addEventListener("keyup",function(e){
        let event = e || window.event;
        let key = event.which || event.keyCode || event.charCode;
        if (key == 13) {
            //let lefttext=document.getElementById("lefttext").value
            let stringtext=JSON.stringify(lefttext.value)
            let righttext=document.getElementById("right")
            let textchild=document.createElement("p")
            
            righttext.appendChild(textchild)
            
            //let textchildtext=document.createTextNode("5")
            //textchild.appendChild(textchildtext)
           // righttext.appendChild(textchild)
        }
      })
     
     
     
     
     
     
     /* this.axios.post("/api3/food/foodclassUpdate",{
            foodclass:"番茄",
            food:[
                {
            "title":"番茄炒鸡蛋",
            "img":"/images/waterfullimg/fanqiechaodan.jpg"
        }
            ]
            }).then((res)=>{
                console.log(res)
                   this.totest=res.data.result
                   console.log(this.totest) 
				})*/
  }
  
}

</script>

<style lang="scss" scoped>
.header{display: flex;justify-content: center;}
.header li{ float: left;padding-right: 1rem;position: relative;}
.header li ul{position: absolute;left: 0;top: 1.5rem;background:red;}
.header li ul li{display: inline-block;white-space:nowrap;}





*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
.box{
    width: 1000px;
    overflow: hidden;
    margin:  auto;
}
.box .left,.box .right{
    width: 50%;
    height: 500px;
    float: left;
    padding: 0 20px;
    border: 1px solid #ccc;
    overflow-y: scroll;
    scrollbar-width: 0.1px;
}
.box .left::-webkit-scrollbar,.box .right::-webkit-scrollbar{
    width: 4px;
    height: 4px; 
}
.box .left::-webkit-scrollbar-thumb,.box .right::-webkit-scrollbar-thumb{
    border-radius: 10px;
            background: rgba(0,0,0,0.2);
}
.box .left::-webkit-scrollbar-track,.box .right::-webkit-scrollbar-track {
            border-radius: 0;
            background: rgba(0,0,0,0.1);

        }

.box p{
    white-space: nowrap;
}
.box textarea{width: 100%;padding: 0 0 0 0.1rem;}
</style>