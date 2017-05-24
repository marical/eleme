<template>
  <transition name="fade">
    <div v-show="showFlag" class="food">
      <div class="fond-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="iconfont icon-weibiaoti6-copy"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating"> 好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartControl-wrapper">
            <cartControl :food="food"></cartControl>
          </div>
          <transition name="buy">
            <div class="buy" @click.stop.prevent="addFirst($event)" v-show="!food.count || food.count === 0">
              加入购物车
            </div>
          </transition>
        </div>
        <split></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @increment="incrementTotal" :select-type="selectType" :only-content="onlyContent" :desc="desc"
                        :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType, rating.text)" class="rating-item border-1px"
                  v-for="rating in food.ratings">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img width="12" height="12" :src=rating.avatar alt="" class="avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <i class="iconfont"
                     :class="{'icon-damuzhi':rating.rateType === 0,'icon-down':rating.rateType === 1,}"></i>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || food.ratings.length === 0"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartControl from '../cartControl/cartControl.vue';
  import split from '../split/split.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import Vue from 'vue';
  import {formatDate} from '../../common/js/date';
  const ALL = 2;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$el, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      incrementTotal(type, data) {
        this[type] = data;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      cartControl,
      ratingselect,
      split
    }
  };
</script>
<style>
.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background: #fff;
}
.food.fade-enter-active,
.food.fade-leave-active {
  transition: all 0.2s linear;
  transform: translate3d(0, 0, 0);
}
.food.fade-enter,
.food.fade-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.food .image-header {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
}
.food .image-header img {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
.food .image-header .back {
  position: absolute;
  top: 10px;
  left: 0;
}
.food .image-header .back .iconfont {
  display: block;
  padding: 10px;
  font-size: 20px;
  color: #fff;
}
.food .content {
  position: relative;
  padding: 18px;
}
.food .content .title {
  line-height: 14px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #07111b;
}
.food .content .detail {
  margin-bottom: 18px;
  line-height: 10px;
  font-size: 0;
  height: 10px;
}
.food .content .detail .sell-count,
.food .content .detail .rating {
  font-size: 10px;
  display: inline-block;
  color: #93999f;
}
.food .content .detail .sell-count {
  margin-right: 12px;
}
.food .content .price {
  font-weight: 700px;
  line-height: 24px;
}
.food .content .price .now {
  margin-right: 8px;
  font-size: 14px;
  color: #f01414;
}
.food .content .price .old {
  font-size: 10px;
  color: #93999f;
  text-decoration: line-through;
}
.food .content .cartControl-wrapper {
  position: absolute;
  right: 12px;
  bottom: 12px;
}
.food .content .buy {
  position: absolute;
  right: 18px;
  bottom: 18px;
  z-index: 10;
  height: 24px;
  line-height: 24px;
  padding: 0 12px;
  box-sizing: border-box;
  border-radius: 12px;
  font-size: 10px;
  color: #fff;
  background: #00a0dc;
}
.food .content .buy.buy-enter-active,
.food .content .buy.buy-leave-active {
  transition: all 0.2s;
  opacity: 0;
}
.food .content .buy.buy-enter,
.food .content .buy.buy-leave-active {
  opacity: 0;
}
.food .info {
  padding: 18px;
}
.food .info .title {
  line-height: 14px;
  margin-bottom: 6px;
  font-size: 14px;
  color: #07111b;
}
.food .info .text {
  font-size: 12px;
  line-height: 24px;
  padding: 0 8px;
  color: #4d555d;
}
.food .rating {
  padding-top: 18px;
}
.food .rating .title {
  line-height: 14px;
  margin-left: 18px;
  font-size: 14px;
  color: #07111b;
}
.food .rating .rating-wrapper {
  padding: 0 18px;
}
.food .rating .rating-wrapper .rating-item {
  position: relative;
  padding: 16px 0;
  position: relative;
}
.food .rating .rating-wrapper .rating-item:after {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  border-top: 1px solid rgba(1,17,27,0.1);
  width: 100%;
  content: '';
}
.food .rating .rating-wrapper .rating-item .user {
  position: absolute;
  right: 0;
  top: 16px;
  font-size: 0;
  line-height: 12px;
}
.food .rating .rating-wrapper .rating-item .user .name {
  display: inline-block;
  vertical-align: top;
  font-size: 10px;
  color: #93999f;
  margin-right: 6px;
}
.food .rating .rating-wrapper .rating-item .user .avatar {
  border-radius: 50%;
}
.food .rating .rating-wrapper .rating-item .time {
  margin-bottom: 6px;
  line-height: 12px;
  font-size: 10px;
  color: #93999f;
}
.food .rating .rating-wrapper .rating-item .text {
  line-height: 16px;
  font-size: 12px;
  color: #07111b;
}
.food .rating .rating-wrapper .rating-item .text .iconfont {
  margin-right: 4px;
  line-height: 16px;
  font-size: 12px;
}
.food .rating .rating-wrapper .rating-item .text .icon-damuzhi {
  color: #00a0dc;
}
.food .rating .rating-wrapper .rating-item .text .icon-down {
  color: #93999f;
}
.food .rating .rating-wrapper .no-rating {
  padding: 16px 0;
  font-size: 12px;
  color: #93999f;
}
.icon-weibiaoti6-copy:before {
    content: "\E670";
}
</style>
