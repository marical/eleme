<template>
<div class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>元
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite($event)">
          <i class="iconfont icon-aixin" :class="{'active':favorite}"></i>
          <span>{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item, index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="120">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <div class="title  border-1px">商家信息</div>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
	import star from '../star/star.vue';
  import split from '../split/split.vue';
  import BScroll from 'better-scroll';
  import {savaToLocal, loadFromlLocal} from '../../common/js/store';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split
    },
    data() {
      return {
        favorite: (() => {
          return loadFromlLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    created() {
      if (!this.picScroll) {
        if (this.seller.pics) {
          this.$nextTick(() => {
            let picWidth = 120;
            let margin = 6;
            let width = (picWidth + margin) * this.seller.pics.length - margin;
            this.$refs.picList.style.width = width + 'px';
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          });
        }
      } else {
        this.picScroll.refresh();
      }
      if (!this.scroll) {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$el, {click: true});
        });
      } else {
        this.scroll.refresh();
      }
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      _initScroll() {
      },
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        savaToLocal(this.seller.id, 'favorite', this.favorite);
      }
    }
  };
</script>

<style>
	
@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-aspect-ratio: 1.5) {
.border-1px::after {
    transform: scaleY(0.7);
}
}
@media (-webkit-min-device-pixel-ratio: 2), (min-device-aspect-ratio: 2) {
.border-1px::after {
    transform: scaleY(0.5);
}
}
body,
html {
  font-weight: 200px;
background-color
  font-family: 'PingFang SC', 'STHertiSC-Light', 'HelveTica-Light', Arial, sans-serif;
}
.clearFix {
  display: inline-block;
}
.clearFix:after {
  display: block;
  content: ".";
  height: 0;
  line-height: 0;
  clear: both;
  visibility: hidden;
}
.seller {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
}
.seller .overview {
  padding: 18px;
}
.seller .overview .title {
  margin-bottom: 8px;
  line-height: 14px;
  color: #07111b;
  font-size: 14px;
}
.seller .overview .desc {
  padding-bottom: 18px;
  font-size: 0;
  position: relative;
}
.seller .overview .desc:after {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  border-top: 1px solid rgba(7,17,27,0.1);
  width: 100%;
  content: '';
}
.seller .overview .desc .star {
  display: inline-block;
  vertical-align: top;
  margin-right: 8px;
}
.seller .overview .desc .text {
  display: inline-block;
  vertical-align: top;
  margin-right: 12px;
  line-height: 18px;
  font-size: 10px;
  color: #4d555d;
}
.seller .overview .remark {
  display: -ms-flexbox;
  display: flex;
  padding-top: 18px;
}
.seller .overview .remark .block {
  -ms-flex: 1;
      flex: 1;
  text-align: center;
  border-right: 1px solid rgba(7,17,27,0.1);
}
.seller .overview .remark .block:last-child {
  border: none;
}
.seller .overview .remark .block h2 {
  margin-bottom: 4px;
  line-height: 10px;
  font-size: 10px;
  color: #939995;
}
.seller .overview .remark .block .content {
  line-height: 24px;
  font-size: 10px;
  color: #07111b;
}
.seller .overview .remark .block .content .stress {
  font-size: 24px;
}
.seller .overview .favorite {
  position: absolute;
  right: 11px;
  top: 18px;
  width: 50px;
  text-align: center;
}
.seller .overview .favorite .iconfont {
  display: block;
  margin-bottom: 4px;
  line-height: 24px;
  font-size: 24px;
  width: 50px;
  color: #d4d6d9;
}
.seller .overview .favorite .iconfont.active {
  color: #f01414;
}
.seller .overview .favorite .text {
  line-height: 10px;
  font-size: 10px;
  color: #4d555d;
}
.seller .bulletin {
  padding: 18px 18px 0 18px;
}
.seller .bulletin .title {
  margin-bottom: 8px;
  line-height: 14px;
  color: #07111b;
  font-size: 14px;
}
.seller .bulletin .content-wrapper {
  padding: 0 12px 16px 1px;
  position: relative;
}
.seller .bulletin .content-wrapper:after {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  border-top: 1px solid rgba(7,17,27,0.1);
  width: 100%;
  content: '';
}
.seller .bulletin .content-wrapper .content {
  line-height: 24px;
  font-size: 12px color #f01414;
}
.seller .bulletin .supports .support-item {
  padding: 16px 12px;
  position: relative;
  font-size: 0;
}
.seller .bulletin .supports .support-item:after {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  border-top: 1px solid rgba(7,17,27,0.1);
  width: 100%;
  content: '';
}
.seller .bulletin .supports .support-item:last-child:after {
  display: none;
}
.seller .bulletin .supports .support-item .icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: top;
  margin-right: 6px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
}
.seller .bulletin .supports .support-item .icon.decrease {
	background-image: url('decrease_4@2x.png');
}
.seller .bulletin .supports .support-item .icon.discount {
	background-image: url('discount_4@2x.png');
}
.seller .bulletin .supports .support-item .icon.guarantee {
	background-image: url('guarantee_4@2x.png');
}
.seller .bulletin .supports .support-item .icon.invoice {
	background-image: url('invoice_4@2x.png');
}
.seller .bulletin .supports .support-item .icon.special {
	background-image: url('special_4@2x.png');
}
.seller .bulletin .supports .support-item .text {
    display: inline-block;
    font-size: 12px;
    line-height: 16px;
    color: #07111b;
}
.seller .pics {
    padding: 18px;
}
.seller .pics .title {
    margin-bottom: 12px;
    line-height: 14px;
    color: #07111b;
    font-size: 14px;
}
.seller .pics .pic-wrapper {
    width: 100%;
    overflow: hidden;
    white-space: nowrap /*不这行*/;
}
.seller .pics .pic-wrapper .pic-list {
    font-size: 0;
}
.seller .pics .pic-wrapper .pic-list .pic-item {
    display: inline-block;
    margin-right: 6px;
    width: 120px;
    height: 90px;
}
.seller .info {
    padding: 18px 18px 0 18px;
    color: #07111b;
}
.seller .info .title {
    padding-bottom: 12px;
    line-height: 14px;
    position: relative;
    font-size: 14px;
}
.seller .info .title:after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid rgba(7,17,27,0.1);
    width: 100%;
    content: '';
}
.seller .info .info-item {
    padding: 16px 12px;
    line-height: 16px;
    position: relative;
    font-size: 12px;
}
.seller .info .info-item:after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid rgba(7,17,27,0.1);
    width: 100%;
    content: '';
}
.seller .info ul .info-item:last-child:after{
	border: none;
}
</style>