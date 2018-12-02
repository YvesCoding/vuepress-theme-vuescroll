<template>
    <component :is="current" class="__vs-layout" ref="vs" :ops="ops" :style="windowSize" @handle-scroll-complete="hSC" @handle-scroll="handleScroll">
        <Layout>
        </Layout>
    </component>
</template>

<script>
import Vue from 'vue';
import store from './transformed/store';
import baseOpts from './transformed/index';
import Layout from './.vuepress/theme/Layout';

export default {
  components: { Layout },
  data() {
    return {
      ops: baseOpts.ops,
      windowSize: {}
    };
  },
  computed: {
    current() {
      let currentComp;
      switch (baseOpts.mode) {
        case 'slide':
          currentComp = 'vs-slide';
          break;
        case 'native':
          currentComp = 'vs-native';
          break;
        default:
          currentComp = 'vue-scroll';
          break;
      }

      return currentComp;
    }
  },
  mounted() {
    window.addEventListener('resize', this.setContainerSize);

    this.setContainerSize();

    const vs = this.$refs['vs'];
    window.vs = vs;

    let y;
    let hash = this.$route.hash;
    if (!hash) {
      y = 0;
    } else {
      y = document.querySelector(hash).offsetTop;
    }
    setTimeout(() => {
      vs.scrollTo({
        y
      });
    }, 500);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setContainerSize);
  },
  methods: {
    setContainerSize() {
      this.windowSize = {
        height: window.innerHeight + 'px',
        width: '100%'
      };
    },
    handleScroll(vertical) {
      this.handleVueScroll(vertical.scrollTop);
    },
    hSC() {
      store.specifyAuthor = null;
    }
  }
};
</script>

<style>
@import '~vuescroll/dist/vuescroll.css';
.__vs-layout > .__rail-is-vertical {
  z-index: 999;
}
.__vs-layout > .__rail-is-vertical .__bar-is-vertical::before {
  content: '';
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: 10px;
  -webkit-animation: ant-progress-active 2.4s cubic-bezier(0.23, 1, 0.32, 1)
    infinite;
  animation: ant-progress-active 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite;
}
@-webkit-keyframes ant-progress-active {
  0% {
    opacity: 0.1;
    height: 0;
  }
  20% {
    opacity: 0.5;
    height: 0;
  }
  100% {
    opacity: 0;
    height: 100%;
  }
}
@keyframes ant-progress-active {
  0% {
    opacity: 0.1;
    height: 0;
  }
  20% {
    opacity: 0.5;
    height: 0;
  }
  100% {
    opacity: 0;
    height: 100%;
  }
}
</style>
