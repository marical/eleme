<template>
	<div class="ratings">
  <div>
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
    </div>
    <split></split>
    <ratingselect  @increment="incrementTotal" :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
    <div class="rating-wrapper border-1px">
      <ul>
        <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
          <div class="avatar">
            <img :src="rating.avatar" alt="" width="28" height="28">
          </div>
          <div class="content">
            <h1 class="name">{{rating.username}}</h1>
            <div class="star-wrapper">
              <star :size="24" :score="rating.score"></star>
              <span class="delivery" v-show="rating.deliveryTime">
                {{rating.deliveryTime}}
              </span>
            </div>
            <p class="text">{{rating.text}}</p>
            <div class="recommend" v-show="rating.recommend &&rating.recommend.length">
              <i class="iconfont icon-damuzhi"></i>
              <span  class="item" v-for="item in rating.recommend" >{{item}}</span>
            </div>
            <div class="time">
              {{rating.rateTime | formatDate}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
	import BScroll from 'better-scroll';
  import star from '../star/star.vue';
  import split from '../split/split.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import {formatDate} from '../../common/js/date';
  import data from '../../common/json/data.json';
  const ALL = 2;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        showFlag: false,
        selectType: ALL,
        onlyContent: true
      };
    },
    created() {
      this.ratings = data.ratings;
      this.$nextTick(() => {
        console.log(this.$el);
        this.scroll = new BScroll(this.$el, {click: true});
      });
    },
    methods: {
      incrementTotal(type, data) {
        this[type] = data;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
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
      star,
      split,
      ratingselect
    }
  };
</script>

<style>
	

.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
}
.ratings .overview {
  display: -ms-flexbox;
  display: flex;
  padding: 18px 0 18px 18px;
}
.ratings .overview .overview-left {
  -ms-flex: 0 0 137px;
      flex: 0 0 137px;
  width: 137px;
  padding: 6px 0px;
  border-right: 1px solid rgba(7,17,27,0.1);
  text-align: center;
}
@media only screen and (max-width: 320px) {
.ratings .overview .overview-left {
    -ms-flex: 0 0 110px;
        flex: 0 0 110px;
    width: 110px;
}
}
.ratings .overview .overview-left .score {
  margin-bottom: 12px;
  line-height: 28px;
  font-size: 24px;
  color: #f90;
}
.ratings .overview .overview-left .title {
  margin-bottom: 8px;
  line-height: 12px;
  font-size: 12px;
  color: #07111b;
}
.ratings .overview .overview-left .rank {
  line-height: 10px;
  font-size: 12px;
  color: #93999f;
}
.ratings .overview .overview-right {
  -ms-flex: 1;
      flex: 1;
  padding: 6px 0 6px 24px;
}
@media only screen and (max-width: 320px) {
.ratings .overview .overview-right {
    padding-left: 6px;
}
}
.ratings .overview .overview-right .score-wrapper {
  line-height: 18px;
  margin-top: 8px;
  font-size: 0;
}
.ratings .overview .overview-right .score-wrapper .title {
  display: inline-block;
  vertical-align: top;
  line-height: 18px;
  font-size: 12px;
  color: #07111b;
}
.ratings .overview .overview-right .score-wrapper .star {
  display: inline-block;
  margin: 0 12px;
  vertical-align: top;
}
.ratings .overview .overview-right .score-wrapper .score {
  display: inline-block;
  vertical-align: top;
  line-height: 18px;
  font-size: 12px;
  color: #f90;
}
.ratings .overview .overview-right .delivery-wrapper {
  font-size: 0;
}
.ratings .overview .overview-right .delivery-wrapper .title {
  display: inline-block;
  vertical-align: top;
  line-height: 18px;
  font-size: 12px;
  color: #07111b;
}
.ratings .overview .overview-right .delivery-wrapper .delivery {
  display: inline-block;
  margin-left: 12px;
  vertical-align: top;
  line-height: 18px;
  font-size: 12px;
  color: #93999f;
}
.ratings .rating-wrapper {
  padding: 0 18px;
}
.ratings .rating-wrapper .rating-item {
  display: -ms-flexbox;
  display: flex;
  padding: 18px 0;
  position: relative;
}
.ratings .rating-wrapper .rating-item:after {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  border-top: 1px solid rgba(1,17,27,0.1);
  width: 100%;
  content: '';
}
.ratings .rating-wrapper .rating-item .avatar {
  -ms-flex: 0 0 28px;
      flex: 0 0 28px;
  width: 28px;
  margin-right: 12px;
}
.ratings .rating-wrapper .rating-item .avatar img {
  border-radius: 50%;
}
.ratings .rating-wrapper .rating-item .content {
  position: relative;
  -ms-flex: 1;
      flex: 1;
}
.ratings .rating-wrapper .rating-item .content .name {
  margin-bottom: 4px;
  line-height: 12px;
  font-weight: 700;
  font-size: 10px;
  color: #07111b;
}
.ratings .rating-wrapper .rating-item .content .star-wrapper {
  margin-bottom: 6px;
  font-size: 0;
}
.ratings .rating-wrapper .rating-item .content .star-wrapper .star {
  display: inline-block;
  margin-right: 16px;
  vertical-align: top;
}
.ratings .rating-wrapper .rating-item .content .star-wrapper .delivery {
  display: inline-block;
  vertical-align: top;
  font-size: 10px;
  line-height: 12px;
  color: #93999f;
}
.ratings .rating-wrapper .rating-item .content .text {
  line-height: 18px;
  color: #07111b;
  font-size: 12px;
  margin-bottom: 8px;
}
.ratings .rating-wrapper .rating-item .content .recommend {
  line-height: 16px;
  font-size: 0;
}
.ratings .rating-wrapper .rating-item .content .recommend .iconfont,
.ratings .rating-wrapper .rating-item .content .recommend .item {
  display: inline-block;
  margin: 0 8px 4px 0;
  font-size: 9px;
}
.ratings .rating-wrapper .rating-item .content .recommend .iconfont {
  color: #00a0dc;
}
.ratings .rating-wrapper .rating-item .content .recommend .item {
  padding: 0 6px;
  border: 1px solid rgba(7,17,27,0.1);
  border-radius: 1px;
  color: #93999f;
  background: #fff f;
}
.ratings .rating-wrapper .rating-item .content .time {
  position: absolute;
  top: 0;
  right: 0;
  line-height: 12px;
  font-size: 10px;
  color: #93999f;
}
.star .star-item.star-36 .star-item {
    width: 15px;
    height: 15px;
    margin-right: 3px;
    background-size: 15px 15px;
}
.star .star-item.star-36 .star-item.on {
	background-image: url('star36_on@3x.png');
}
.star .star-item.star-36 .star-item.half {
	background-image: url('star36_half@3x.png');
}
.star .star-item.star-36 .star-item.off {
background-image: url('star36_off@3x.png');
}
</style>