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
</style>
