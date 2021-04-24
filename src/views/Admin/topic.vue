<template>
<div>
    <ul>
        <li> 题目:<input v-model="topicAndanswer.topic"></li>
        <li> 水平:<input v-model="playLevel"></li>
        <li>答案:<input  v-model="topicAndanswer.answer"></li>
        <li>答题时间:<input type="number" onkeyup="this.value=this.value.replace(/\D/g,'')" v-model="topicAndanswer.autoNextTopicMaxNum"></li>
        <li>知识:<input v-model="topicAndanswer.manual"></li>
        <li>A:<input v-model="answers[0].answer"></li>
        <li>B:<input v-model="answers[1].answer"></li>
        <li>C:<input v-model="answers[2].answer"></li>
        <li>D:<input v-model="answers[3].answer"></li>
        <button @click="createtopic()">提交</button>
    </ul>
   
</div>
</template>
<script>
export default {
    name:'topic',
    data(){
        return{
            topicAndanswer:{topic:null,answer:null,manual:null,autoNextTopicMaxNum:0},
                answers:[
                    {word:"A",answer:null},
                    {word:"B",answer:null},
                    {word:"C",answer:null},
                    {word:"D",answer:null}
                        ],
            playLevel:null
        }
    },
    methods:{
        createtopic(){
            let k=this.$store.state.user
            console.log("this.$store.state.user.game.playLevel")
            console.log(k)
            console.log("autoNextTopicMaxNum")
            console.log(this.topicAndanswer.autoNextTopicMaxNum)
            let aa=this.topicAndanswer.autoNextTopicMaxNum
            console.log(typeof aa)
            this.axios.post('/api3/topic/createtopic',{topicAndanswer:this.topicAndanswer,answers:this.answers,playLevel:this.playLevel}).then((res)=>{
                console.log(res)
            })
        }
    }
}
</script>

<style scoped>
  
</style>