import vuescroll from 'vuescroll';
import vsNative from 'vuescroll/dist/vuescroll-native';
import vsSilde from 'vuescroll/dist/vuescroll-slide';
import vuescrollMix from './transformed/vuescroll-mix';
import store from './transformed/store';

export default ({ Vue, router }) => {
  Vue.use(vuescroll);
  Vue.use(vsNative, {
    name: 'vs-native'
  });
  Vue.use(vsSilde, {
    name: 'vs-slide'
  });
  Vue.mixin(vuescrollMix);

  router.afterEach((to, from) => {
    if (!Vue.prototype.$isServer) {
      if (window.vs && !store.disableScrollBehavior) {
        let y;
        if (!to.hash) {
          y = 0;
        } else {
          y = document.querySelector(to.hash).offsetTop;
        }
        window.vs.scrollTo({
          y
        });
        store.specifyAuthor = to.hash;
      }
    }
  });
};
