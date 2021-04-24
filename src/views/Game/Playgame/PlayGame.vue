<template>
    <div class="main">
        <div class="header" @click="togoback">退出游戏</div>
        <div id="thenprogress">
            

        </div>
        <div class="content"> 
            <div class="content_left">
                <img class="headimg" :src="$store.state.user.userHead" alt="小新">
                <div class="grade" id="gradeleft">
                    <strong class="bar" :style="{height:leftheight+'%'}">{{leftgrade}}%</strong>
                </div>
            </div>
            <div class="middle" v-if="topicAndanswer">
                <div class="topic">{{topicAndanswer.topic}}</div>
                <div class="fourAnswer">
                    <ul class="answer_li" v-for="(item,index) in answers" :key="index">
                        <li :id="'answer'+item.word" :class="[trueAnswer==item.word ? 'answerTrue' :'']" @click="WebSocketTest(item.word)">{{item.word}} {{item.answer}}</li>
                    </ul>
                </div>
            </div>
            <div class="content_right">
                <img class="headimg" :src="$store.state.user.game.otherHead" alt="小新">
                <div class="grade" id="graderight">
                    <strong class="bar" :style="{height:rightheight+'%'}">{{rightgrade}}%</strong>
                </div>
            </div>
        </div>
        <div id="manual">{{manual}}</div>
    </div>
    
</template>

<script>
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios';
export default {
    name:'playgame',
    data(){
        return{
            topicAndanswer:null,
            answers:null,
            manual:null,
            allTheAnswer:null,
            answerLength:null,
            topicNun:0,
            leftheight:0,
            leftgrade:0,
            rightheight:0,
            rightgrade:0,
            trueAnswer:null,
            /*
            leftTurn:true,
            daoshu:null,
            trueAnswer:null,
            activeAnswer:null,
            daojishiNum:12,
            auto:true,
            autoProxy:null,
            autoTopicNum:0
            */

           autoNextTopicMaxNum:null,
           auto:true,
           topicEnd:false,
           wsText:"wait....",
           choiceEl:null,
           word:null,
           choiceIndex:null,
           ws:null,
           myturn:false
           
        }
    },
    mounted(){
    },
    activated(){
        //重置
        this.allTheAnswer=this.$store.state.user.topic
        this.reset()
    },
    deactivated(){
        this.ws.close()
    },
    methods:{
        reset(){
            let _this=this
            _this.topicAndanswer=_this.allTheAnswer[0].topicAndanswer
            _this.answers=_this.allTheAnswer[0].answers
            _this.manual=_this.topicAndanswer.manual
            _this.autoNextTopicMaxNum=parseInt(_this.topicAndanswer.autoNextTopicMaxNum) 
            _this.answerLength=Math.floor(100/_this.allTheAnswer.length)
            _this.wsGo()
            _this.autoNextTopic()
        },
        wsGo(){
            let _this=this
      if ("WebSocket" in window)
            {
               _this.ws = new WebSocket("ws://localhost:8081");
               _this.ws.onopen = function()
               {

                   console.log("Playgame ws开启中")
               };
                
               _this.ws.onmessage = function (res) 
               { 
                   var received_msg =JSON.parse(res.data).title ;
                  //alert("数据已接收...");
                  console.log("数据已接收:")
                  console.log(received_msg)
                  if(received_msg=="canLeave"){
                      _this.auto=false
                        setTimeout(()=>{
                        _this.leftheight=0
                    _this.leftgrade=0
                    _this.rightheight=0
                    _this.rightgrade=0
                        _this.$router.push('/game') 
                        },500)
                  }
                  if(received_msg=="canNextTopic"){
                      let word=_this.word
                      let index=_this.choiceIndex
                      let e=_this.choiceEl
                      _this.clickNextTopic(word,index,e)
                  }
                  if(received_msg=="A"||received_msg=="B"||received_msg=="C"||received_msg=="D")
                  {
                      _this.clickNextTopic(received_msg)
                  }
               };
                
               _this.ws.onclose = function()
               { 
                  console.log("Playgame ws关闭")
               };
            } 
            else
            {
               
            }
        },
        WebSocketTest(data)
         {
             if(data=="A"||data=="B"||data=="C"||data=="D"){
                 this.myturn=true
             }
             let massege={title:data}
            this.ws.send(JSON.stringify(massege));      
         },
        autoNextTopic(){
                this.auto=true
                console.log(this.topicAndanswer)
                NProgress.configure({ parent: '#thenprogress',showSpinner: false})
                let minNum=0.05
                let autoNextTopicActiveNum=this.autoNextTopicMaxNum
                NProgress.start()
                if(!this.auto){
                   NProgress.done() 
                }
                let countDownNum=setInterval(() => {
                    if(!this.auto){
                   NProgress.done() 
                                    }
                    NProgress.set(minNum/this.autoNextTopicMaxNum)
                    minNum+=0.05
                    autoNextTopicActiveNum-=0.05
                    if(autoNextTopicActiveNum<=0||!this.auto){
                        clearInterval(countDownNum)
                        NProgress.done()
                        if(this.auto){
                        this.topicNun+=1
                        if(this.topicNun<this.allTheAnswer.length){
                        this.topicAndanswer=this.allTheAnswer[this.topicNun].topicAndanswer
                        this.answers=this.allTheAnswer[this.topicNun].answers
                        this.manual=this.topicAndanswer.manual
                        this.autoNextTopicMaxNum=parseInt(this.topicAndanswer.autoNextTopicMaxNum)
                        console.log("this.autoTopic()")
                        this.autoNextTopic()   
                        }
                        else{
                            this.caculaGrade(this.leftgrade,this.rightgrade)
                        }
                        
                        }
                    }
                }, 50);
        },
        clickNextTopic(word){
            this.auto=false
            let targetEl=document.getElementById("answer"+word)
            //如果题目数小于所有题目数，题目数自加1
            if(this.topicNun<this.allTheAnswer.length-1){
              this.topicNun+=1  
            }
            else{
               this.topicNun=0 
            }
            //如果选项是答案
            if(word==this.topicAndanswer.answer){
                //目标选项背景变金色
                targetEl.style.background="gold"
                //分数条
                if(this.myturn){
                    if(this.leftheight>=70){
                    this.leftheight=100
                    }
                    else{
                    this.leftheight+=this.answerLength   
                    }
                    //分数
                    if(this.leftgrade>=70){
                        this.leftgrade=100
                    }
                    else{
                    this.leftgrade+=this.answerLength   
                    } 
                    this.myturn=false
                    }
                else{
                    if(this.rightheight>=70){
                    this.rightheight=100
                    }
                    else{
                    this.rightheight+=this.answerLength   
                    }
                    //分数
                    if(this.rightgrade>=70){
                        this.rightgrade=100
                    }
                    else{
                    this.rightgrade+=this.answerLength   
                    }  
                }
                
            }
            else{
                //目标选项不为答案，背景色变红
                 targetEl.style.background="red"
                 //选错后，显示正确答案
                 let answers=this.answers
                 for (let i = 0; i < answers.length; i++) {
                     if(answers[i].word==this.topicAndanswer.answer){
                         this.trueAnswer=answers[i].word
                     }
                 }
            }
            //下一题
            if(0<this.topicNun&&this.topicNun<this.allTheAnswer.length){
                let _this=this
                setTimeout(() => {
                    targetEl.style.background=""
                    this.trueAnswer=null
                    _this.topicAndanswer=_this.allTheAnswer[this.topicNun].topicAndanswer
                    _this.answers=_this.allTheAnswer[this.topicNun].answers
                    _this.manual=this.topicAndanswer.manual
                    this.autoNextTopicMaxNum=parseInt(this.topicAndanswer.autoNextTopicMaxNum) 
                    _this.autoNextTopic()
                    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                }, 3000);  
            }
            else{
                this.caculaGrade(this.leftgrade,this.rightgrade)
                let _this=this
                setTimeout(() => {
                    _this.trueAnswer=null
                    targetEl.style.background=""
                }, 5000);
                
            }
                 
        },
        caculaGrade(leftGrade,rightGrade){
            if(leftGrade>rightGrade){
                console.log("you win!")
            }
            else if(leftGrade==rightGrade){
                console.log("peace and love!")
            }
            else{
                console.log("you lose!")
            }
        },
        togoback(){
            this.WebSocketTest("canLeave")
            
        }
 
    },
}
</script>

<style lang="scss" scoped>
.main{
margin: 1rem;
}
.header{
    text-align: center;
}
.content{
    
    display: flex;
    text-align: center;
}
.content_left{
position: relative;
display: flex;
flex-direction: column;

}
.content_right{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.middle{
    flex: 1;
    
}
.headimg{
    display:block;
}



.headimg{
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
}
.grade{
    width: 2rem;
    height: 10rem;
    text-align: center;
}
.answer_li{
    margin: 1rem 0 0 1rem;
    font-size: 1rem;
}
.topic{
}
#gradeleft,#graderight
    {
         width:25px;
         height:200px;
         background-color:#fff;
         border:1px solid #ccc;
         position:relative; 
    }
    .bar
    {
        width: 100%;
        display:block;		
        font-family:arial;
        font-size:12px; 
        transition: all 2s;
    background: gold;
        color:#fff;       
        position:absolute;
        bottom:0;        
    }
    .answerTrue{
        background: gold;
    }
    .answerFalse{
    }
    .fourAnswer{
        
    }
    #thenprogress{
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        padding: 0.4rem 0 0.4rem 0;
    }
    #manual{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 50vh;
        width: 100%;
        display: flex;
        justify-content: flex-start;
    }
    .disable {
	pointer-events: none;
}
</style>