<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="supports-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon iconfont icon-zuoyoujiantou"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon iconfont icon-zuoyoujiantou"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" class="" width="100%" height="100%">
    </div>
    <transition name="fade">
    <div v-show="detailShow" class="detail" @click="hideDetail" transition="fade">
      <div class="detail-wrapper clearFix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item, index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="iconfont icon-cha"></i>
      </div>
    </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from '../star/star.vue';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star
    }
  };
</script>
<style>
	.header {
    position: relative;
    color: #fff;
    overflow: hidden;
    background: rgba(7,17,27,0.5);
}
.header .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
}
.header .content-wrapper .avatar {
    display: inline-block;
    vertical-align: top;
}
.header .content-wrapper .content {
    display: inline-block;
    font-size: 14px;
    margin-left: 16px;
}
.header .content-wrapper .content .title {
    margin: 2px 0 8px 0;
}
.header .content-wrapper .content .description {
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
}
.header .content-wrapper .supports-count {
    position: absolute;
    right: 12px;
    bottom: 14px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 12px;
    background: rgba(0,0,0,0.2);
    text-align: content;
}
.header .content-wrapper .supports-count .count {
    font-size: 10px;
    vertical-align: top;
}
.header .content-wrapper .supports-count .icon {
    margin-left: 2px;
    line-height: 24px;
    font-size: 10px;
}
.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.icon-zuoyoujiantou:before {
    content: "\E600";
}
.header .bulletin-wrapper {
    position: relative;
    background-color: rgba(7,17,27,0.2);
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
}
.header .bulletin-wrapper .bulletin-title {
    display: inline-block;
    vertical-align: top;
    margin-top: 8px;
    width: 22px;
    height: 12px;
    /*background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAYCAYAAACBbx+6AAAAGXRFW…mwfhijuoqCMK9EMEw1zpR/keIm4psA4T78MAHZdVz8fggwAAhHLI5JzyRSAAAAAElFTkSuQmCC);*/
    background-size: 22px 12px;
    background-repeat: no-repeat;
}
.header .bulletin-wrapper .bulletin-text {
    vertical-align: top;
    margin: 0 4px;
    font-size: 10px;
}
.icon-zuoyoujiantou:before {
    content: "\E600";
}
.header .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
}
.header .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7,17,27,0.8);
    -webkit-backdrop-filter: blur(10px);
}

.fade-enter-active{
	animation: bounce-in .5s;
}
          
.fade-leave-active{
    animation: bounce-out .5s;
    }
      
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes bounce-out {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(0);
      }
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
.detail-wrapper {
    width: 100%;
    min-height: 100%;
}
.detail-wrapper .detail-main {
    margin-top: 64px;
    padding-bottom: 64px;
}
.detail-wrapper .detail-main .name {
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700px;
}
.detail-wrapper .detail-main .star-wrapper {
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
}
.star {
    font-size: 0px;
}
.star .star-item {
    display: inline-block;
    background-repeat: no-repeat;
}

.detail-wrapper .detail-main .title {
    width: 80%;
    display: -ms-flexbox;
    display: flex;
    margin: 28px auto 0 auto;
}
.detail-wrapper .detail-main .title .line {
    -ms-flex: 1;
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
}
.detail-wrapper .detail-main .title .text {
    padding: 0px 12px;
    font-size: 16px;
    font-weight: 700px;
}
.detail-wrapper .detail-main .title .line {
    -ms-flex: 1;
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
}
.detail-wrapper .detail-main .supports {
    width: 80%;
    margin: 22px auto;
}
.detail-wrapper .detail-main .supports .support-item {
    padding: 0 12px;
    font-size: 0px;
    margin-bottom: 12px;
}
reset.css:57
li {
    list-style: none;
}
.detail-wrapper .detail-main .supports .support-item .icon.decrease {
background-image: url('decrease_1@2x.png');
}
.detail-wrapper .detail-main .supports .support-item .icon.discount {
background-image: url('discount_1@2x.png');
}
.detail-wrapper .detail-main .supports .support-item .icon.special {
background-image: url('special_1@2x.png');
}
.detail-wrapper .detail-main .supports .support-item .icon.invoice {
background-image: url('invoice_1@2x.png');
}
.detail-wrapper .detail-main .supports .support-item .icon.guarantee {
background-image: url('guarantee_1@2x.png');
}
.detail-wrapper .detail-main .supports .support-item .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
}
.detail-wrapper .detail-main .supports .support-item .text {
    line-height: 12px;
    font-size: 12px;
    color: #fff;
}
.detail-wrapper .detail-main .title {
    width: 80%;
    display: -ms-flexbox;
    display: flex;
    margin: 28px auto 0 auto;
}
.detail-wrapper .detail-main .bulletin {
    width: 80%;
    height: 200px;
    margin: 22px auto;
}
.detail-wrapper .detail-main .bulletin .content {
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
}

.detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
}

@font-face {font-family: "iconfont";
  src: url('../../common/fonts/iconfont.eot?t=1481787488332'); /* IE9*/
  src: url('../../common/fonts/iconfont.eot?t=1481787488332#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('../../common/fonts/iconfont.woff?t=1481787488332') format('woff'), /* chrome, firefox */
    url('../../common/fonts/iconfont.ttf?t=1481787488332') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url('../../common/fonts/iconfont.svg?t=1481787488332#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-zuoyoujiantou:before { content: "\e600"; }

.icon-gouwuche:before { content: "\e601"; }

.icon-jian:before { content: "\e629"; }

.icon-aixin:before { content: "\e61f"; }

.icon-down:before { content: "\e603"; }

.icon-cha:before { content: "\e646"; }

.icon-jia:before { content: "\e622"; }

.icon-gou:before { content: "\e73d"; }

.icon-damuzhi:before { content: "\e607"; }

.icon-weibiaoti6-copy:before { content: "\e670"; }
.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
