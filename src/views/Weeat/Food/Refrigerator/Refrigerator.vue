<template>
    <div>
        <div class="threeMain">
          <div id="three"></div>  
        </div>
        
    </div>
</template>

<script>
import * as THREE from 'three'
export default {
    data(){
        return{

        }
    },
    mounted(){
        this.toThree()
    },
    methods:{
        toThree(){
            //场景
            const scene = new THREE.Scene();
            //摄像
			const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
            //渲染
			const renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(0xFFFFFF, 1)
            //渲染宽高
			renderer.setSize( window.innerWidth, window.innerHeight/2 );
            //HTML创建
            document.getElementById("three").appendChild( renderer.domElement );
            //几何对象
			const geometry = new THREE.BoxGeometry();
            //几何对象材料
			const material = new THREE.MeshBasicMaterial( { color: 0x800000 } );
            //网格
			const cube = new THREE.Mesh( geometry, material );
            //网格添加到场景
			scene.add( cube );
            //摄像z位置
			camera.position.set(0,0,5)
            //动画
			const animate = function () {
				requestAnimationFrame( animate );

				//cube.rotation.x += 0.01;
				//cube.rotation.y += 0.01;

				renderer.render( scene, camera );
			};
            //启动
			animate();
        }
    }
}
</script>

<style lang="scss" scoped>
.threeMain{
    overflow-x: hidden;
border: 1px solid black;
text-align: center;
}
</style>