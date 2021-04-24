<template>
    <div>
        <div id="Family">
            <div class="Family_border">
                <h4 class="family_head">家庭菜单</h4>
                <section class="familyMemberAndMenu">
                    <div class="family_member">
                        <ul v-for="(item,index) in memberList" :key="index" @click="memberSay(index)">
                            <li class="member">
                                <img class="family_img" :src="item.img" alt="item.name">
                                <span class="member_name">{{item.name}}</span>
                                <span class="member_say" v-if="memberActive==index" >{{item.say}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="familyMenu">
                        <li class="familyMenu_li" v-for="(item,index) in familyMenu" :key="index">
                        <span>{{item.name}}</span>
                        </li>   
                    </div>
                    
                </section>
                
                <section class="familyMenu_List">
                    <div class="materials">
                        <div class="material" v-for="(item,index) in materials" :key="index">
                                <span>{{item.name}}*{{item.price}}</span>
                        </div> 
                    </div>
                    <div class="total_Price">共:{{totalPrice}}元</div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Family',
    data(){
        return{
            memberActive:null,
            sayManul:false,
            memberList:[
                {name:"小极",say:"辛苦了",img:"/svg/me/clown.svg"},
                {name:"爸记",say:"最重要有营养最重要有营养最重要有营养最重要有营养",img:"/svg/me/cool.svg"},
                {name:"妈记",say:"简简单单又一餐",img:"/svg/me/fo.svg"},
                {name:"小创",say:"我随便，都可以",img:"/svg/me/owl.svg"},
                {name:"小贤",say:"汉堡，杯面、零食！",img:"/svg/me/zhu.svg"},
              
            ],
            totalPrice:0,
            materials:[],
            materialsProxy:[],
            familyMenu:[
                    {name:"菠菜上汤",img:"/images/waterfullimg/菠菜上汤.jpg",nav:[{a:1}],
                    materials:[{name:"菠菜",price:2}]
                    },
                    {name:"彩椒鸭掌",img:"/images/waterfullimg/彩椒鸭掌.jpg",
                    materials:[
                        {name:"彩椒",price:4},
                        {name:"鸭掌",price:16}]
                    },
                    {name:"地三鲜",img:"/images/waterfullimg/地三鲜.jpg",
                    materials:[
                        {name:"土豆",price:4},
                        {name:"茄子",price:5},
                        {name:"青椒",price:3}]},
                    {name:"豆芽炒鸭血",img:"/images/waterfullimg/豆芽炒鸭血.jpg",
                    materials:[
                        {name:"豆芽",price:1},
                        {name:"鸭血",price:4}]},
                    {name:"番茄炒蛋",img:"/images/waterfullimg/番茄炒蛋.jpg",
                    materials:[
                        {name:"番茄",price:3},
                        {name:"鸡蛋",price:2}]},
                    {name:"肥牛火锅",img:"/images/waterfullimg/肥牛火锅.jpg",
                    materials:[
                        {name:"肥牛",price:25},
                        {name:"肥牛",price:25},
                        {name:"肥牛",price:25}
                        ]}
            ],
            loopSay:null
        }
    },
    activated(){
        this.sayAuto()
    },
    mounted(){
        let familyMenu=this.familyMenu
        for (let i = 0; i < familyMenu.length; i++) {
            
            for (let j = 0; j < familyMenu[i].materials.length; j++) {
                this.totalPrice+=familyMenu[i].materials[j].price
               this.materials.push(familyMenu[i].materials[j])
               
   
            }
        }
    },
    methods:{
        sayAuto(index){
            let _this=this
            _this.sayManul=false
            let activeNum=0
            if(index){
                activeNum=index+1
            }
            this.loopSay=setInterval(()=>{
                console.log("loop")
                if(_this.sayManul||activeNum==_this.memberList.length){
                    clearInterval(this.loopSay)
                    console.log("loop clear")
                }
                _this.memberActive=activeNum
                activeNum+=1
                
            },3500)
        },
        memberSay(index){
            clearInterval(this.loopSay)
            this.memberActive=index
            this.sayAuto(index)
        }
    },
    deactivated(){
        this.sayManul=true
        console.log("离开")
    }
}
</script>

<style lang="scss" scoped>
#Family{
    border-top: 3px solid black;
    border-radius: 6%;
    margin: 1rem;
}
.familyMemberAndMenu{
display: flex;
margin: 0.6rem;


}
.familyMenu{
border: 1px solid black;
border-radius: 6%;
margin: 0 1rem 0 1rem;
flex:1;
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
align-items: center;
li{
    flex:1
}
/*
text-align: center;
flex: 1;
margin: 0 0 0 1rem;
overflow-y: scroll;
display: flex;
white-space: nowrap;
flex-direction:column;
*/

}
.family_member{
    display: flex;
    flex-direction: column;
    
}
.familyMenu_List{
    
    
}
.materials{
    border: 1px solid black;
    display: flex;
    flex-wrap: wrap;
    margin: 1rem;
    padding: 0.2rem;
    
}
.material{
    display: flex;
    white-space: nowrap;
    padding: 0 0.2rem 0 0.2rem;
    margin: 0.1rem;
    }
    .family_head{
        text-align: center;
    }
.family_img{
    height: 2rem;
}
.member_say{
    position:absolute;
    left: 4rem;
    top: 1.2rem;
    width: 58vw;
    background: gold;
    border: 1px solid black;
    font-size: 1rem;
}
.member{
    position: relative;
    
}
.member_name{
    font-size: 0.6rem;
}

.familyMenu_li{
    display: inline;

}
.total_Price{
    text-align: center;
}
.Family_border{
    border: 2px solid black;
    border-radius: 6%;
}
</style>