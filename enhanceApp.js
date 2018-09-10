import vuescroll from 'vuescroll';
import vuescrollMix from './VuescrollWrapper/vuescroll-mix';
import store from './VuescrollWrapper/store';

export default ({ Vue, router }) => {
  Vue.use(vuescroll);
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
