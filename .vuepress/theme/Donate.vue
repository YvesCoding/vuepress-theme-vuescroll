<template>
  <div
    class="donate-box"
    :class="{active}"
    v-show="shouldShowDonate"
  >
    <div @click="active = !active">
      捐赠

    </div>
    <transition name="qrcode-box">
      <div
        class="qrcode-box"
        v-show="active"
      >
        <div class="qr-header">
          感谢您的捐赠
        </div>
        <div class="pic-container">
          <div class="per-box">
            <img
              src="https://github.com/wangyi7099/pictureCdn/blob/master/allPic/vuescroll/wechatpay.png?raw=true"
              alt=""
              srcset=""
            >
          </div>
          <div class="per-box">
            <img
              src="https://github.com/wangyi7099/pictureCdn/blob/master/allPic/vuescroll/alipay.jpg?raw=true"
              alt=""
              srcset=""
            >
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  watch: {
    $route() {
      this.setDonate();
    }
  },
  data() {
    return {
      active: false,
      shouldShowDonate: false
    };
  },
  methods: {
    setDonate() {
      this.shouldShowDonate =
        typeof window !== 'undefined' &&
        /zh/.test(location.pathname) &&
        !/demo/.test(location.pathname);
    }
  },
  mounted() {
    this.setDonate();
  },
  updated() {
    this.setDonate();
  }
};
</script>

<style lang="stylus">
.donate-box {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 44px;
  height: 44px;
  color: #46bd87;
  background-color: #fff;
  z-index: 9999;
  border: 1px solid #eee;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  line-height: 44px;
  transition: background 0.3s;
  user-select: none;

  &.active {
    color: #fff;
    background-color: #46bd87;
  }
}

.qr-header {
  line-height: 30px;
  height: 10%;
  font-size: 16px;
  color: #333333;
  text-align: center;
}

.qrcode-box {
  position: absolute;
  width: 550px;
  height: 300px;
  background: #FFFFFF;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  cursor: default;
  top: -25%;
  left: 100%;
  transform: translate(-100%, -100%);
  transition: opacity 0.3s;

  .pic-container {
    display: flex;
    height: 90%;
  }

  .per-box {
    flex: 1;
    padding: 5px 30px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.qrcode-box-enter {
  opacity: 0;
}

.qrcode-box-leave-to {
  opacity: 0;
}
</style>
