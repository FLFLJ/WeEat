<template>
        <div id="main">
            <div class="all">
            <section class="header">
                <div class="header_image">
                   <img class="me" src="/images/土豆侠.jpg" alt="">
                   <p> 土豆侠</p> 
                </div>
                
            </section>
            <section class="details">
                <div class="Glory">
                    <span>LV.6段</span>
                    <span>广东省第7</span>
                    <span>海鲜霸主</span>
                </div>
                <div class="Record">
                    <section>
                       <img src="/images/章鱼哥.jpg" alt=""> 
                       <p>章鱼</p>
                    </section>
                    <section>
                       <img src="/images/肯德基.jpg" alt=""> 
                       <p>名餐馆</p>
                    </section>
                    <section>
                       <img src="/images/外卖.jpg" alt=""> 
                       <p>外卖战</p>
                    </section>
                    <section>
                       <img src="/images/皮皮虾.jpg" alt=""> 
                       <p>皮皮虾</p>
                    </section>
                </div>
                <div class="house">
                    <section class="house1">
                        <div class="learn">知识学习</div>
                        <div class="play">快速匹配</div>
                    </section>
                </div>
            </section>
           </div>
        </div>    
</template>

<script>
export default {
    name:"Game"
}
</script>


<style lang="scss" scoped>
.all{display: flex;align-items:flex-start;}
.details div{margin: 0.2rem 0 0.2rem 0;}
.header{display: flex;align-items:flex-start;}
.header_image{text-align: center;}
img{height: 8rem;}
.learn{background: lawngreen;border: 1px solid black;border-radius: 6%;}
.play{background:cornflowerblue;border: 1px solid black;border-radius: 6%;}
.Glory span{padding:0 0.4rem 0 0.4rem}
.details{display: flex;flex-direction: column;}
.Record{display: flex;align-items:flex-start;}
.Record p{font-size: 0.6rem;text-align: center;padding: 0 0.2rem 0 0.2rem;}
.Record img{height: 2.4rem;border-radius: 60%;}

</style>

