<template>
  <div class="donate-box" :class="{ active }" v-show="shouldShowDonate">
    <div @click="active = !active" style="padding:0 5px">捐赠支持作者！</div>
    <transition name="qrcode-box">
      <div class="qrcode-box" v-show="active">
        <h2 class="qr-header">
          <div class="header-innter">
            项目的发展离不开你的支持，请作者喝杯咖啡吧 ☕！感谢！
            <div style="margin-top: 10px">
              <a href="https://github.com/wangyi7099/donate/blob/master/History.md" target="_blank">
                捐赠列表
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  width="15"
                  height="15"
                  class="icon outbound"
                >
                  <path
                    fill="currentColor"
                    d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
                  />
                  <polygon
                    fill="currentColor"
                    points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </h2>

        <div class="pic-container">
          <div class="per-box">
            <img src="./wechatpay.png" alt srcset />
          </div>
          <div class="per-box">
            <img src="./alipay.jpg" alt srcset />
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
        typeof window !== "undefined" &&
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
  height: 20%;
  font-size: 16px;
  color: #333333;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.qrcode-box {
  overflow: hidden;
  position: absolute;
  width: 550px;
  height: 360px;
  background: #FFFFFF;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  cursor: default;
  top: -25%;
  left: 100%;
  transform: translate(-100%, -100%);
  transition: transform 0.3s;
  transform-origin: bottom right;
  transform: translate(-100%, -100%) scale(1);

  .pic-container {
    display: flex;
    height: 70%;
  }

  .per-box {
    flex: 1;
    padding: 0 30px 5px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.qrcode-box-enter {
  transform: translate(-100%, -100%) scale(0);
}

.qrcode-box-leave-to {
  transform: translate(-100%, -100%) scale(0);
}
</style>
