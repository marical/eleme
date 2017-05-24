<template>
  <div class="cartControl">
    <transition name="fade">
        <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
          <transition name="inner">
          <span class="inner iconfont icon-jian"></span>
          </transition>
        </div>
    </transition>
    <span class="cart-count" v-show="food.count > 0 ">
      {{food.count}}
    </span>
    <span class="iconfont icon-jia cart-add" @click.stop.prevent="addCart($event)"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
//        event.srcElement.outerHTML
        this.$emit('increment', event.target); // 子组件通过 $emit触发父组件的方法 increment   还
      },
      decreaseCart(event) {
        if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
        this.food.count--;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">

.cartControl {
  font-size: 0;
}
.cartControl .cart-decrease,
.cartControl .cart-add {
  display: inline-block;
  padding: 4px 6px 6px 6px;
}
.cartControl .cart-decrease.fade-enter-active,
.cartControl .cart-add.fade-enter-active,
.cartControl .cart-decrease.fade-leave-active,
.cartControl .cart-add.fade-leave-active {
  transition: all 0.4s linear;
}
.cartControl .cart-decrease.fade-enter,
.cartControl .cart-add.fade-enter,
.cartControl .cart-decrease.fade-leave-active,
.cartControl .cart-add.fade-leave-active {
  opacity: 0;
  transform: translate3d(24px, 0, 0);
}
.cartControl .cart-decrease .inner,
.cartControl .cart-add .inner {
  display: inline-block;
  line-height: 24px;
  font-size: 24px;
  vertical-align: top;
  color: #00a0dc;
}
.cartControl .cart-decrease .inner.inner-enter-active,
.cartControl .cart-add .inner.inner-enter-active,
.cartControl .cart-decrease .inner.inner-leave-active,
.cartControl .cart-add .inner.inner-leave-active {
  transition: all 0.4s linear;
  transform: rotate(0);
}
.cartControl .cart-decrease .inner.inner-enter,
.cartControl .cart-add .inner.inner-enter,
.cartControl .cart-decrease .inner.inner-leave-active,
.cartControl .cart-add .inner.inner-leave-active {
  opacity: 0;
  transform: rotate(180deg);
}
.cartControl .cart-count {
  display: inline-block;
  font-size: 10px;
  line-height: 24px;
  width: 12px;
  vertical-align: top;
  padding-top: 6px;
  text-align: center;
  color: #93999f;
}
.cartControl .cart-add {
  display: inline-block;
  padding: 6px;
  line-height: 24px;
  font-size: 24px;
  vertical-align: top;
  color: #00a0dc;
}

</style>
