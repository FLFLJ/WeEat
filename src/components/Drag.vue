<!-- 拖拽滑动 -->
<template>
  <div id="default_drag_comp"
    @click="goNext"
    @touchstart="down"
    @touchmove="move"
    @touchend="end"
  >
  666
  <slot></slot>
  </div>
</template>

<script>
export default {
  name: "defaultDrag",
  data() {
    return {
      flags: false,
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: ""
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    goNext() {
      this.$emit("goNext");
    },
    // 实现移动端拖拽
    down() {
      let default_drag_comp = document.querySelector("#default_drag_comp");//获取元素
      this.flags = true;//激活拖动状态
      this.maxW = document.body.clientWidth - default_drag_comp.offsetWidth;//设置可移动最大宽度
      this.maxH = document.body.clientHeight - default_drag_comp.offsetHeight;//设置可移动最大高度

    },
    move(event) {//拖动，参数event为拖动目标
      event.preventDefault();//取消内置默认动作
      let default_drag_comp = document.querySelector("#default_drag_comp");//获取元素
      if (this.flags) {//判断是否可拖动
        var touch;
        if (event.touches) {//目标的所有拖动对象
          touch = event.touches[0];
        } else {
          touch = event;
        }
        //禁止目标对象移出最大、最小范围
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        if (this.nx < 0) {
          this.nx = 0;
        } else if (this.nx > this.maxW) {
          this.nx = this.maxW;
        }

        if (this.ny < 0) {
          this.ny = 0;
        } else if (this.ny >= this.maxH) {
          this.ny = this.maxH;
        }
        //设置目标对象新的坐标
        default_drag_comp.style.left = this.nx + "px";
        default_drag_comp.style.top = this.ny + "px";
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
    end() {
      this.flags = false;
    }
  }
};
</script>
<style scoped lang="scss">
#default_drag_comp {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0 0 0.4rem 2px #d3d3d3;
  background: #CBA16B;
  position: fixed;
  z-index: 1000;
  top: 0rem;
  right: 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: #ffffff;
    font-size: 0.4rem;
  }
}
</style>