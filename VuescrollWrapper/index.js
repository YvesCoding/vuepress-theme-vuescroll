import vuescroll from 'vuescroll';
import vuescrollMix from './vuescroll-mix';
import store from './store';

let _ops = {
  bar: {
    background: '#3eaf7c'
  },
  rail: {
    gutterOfEnds: '60px'
  },
  scrollPanel: {
    scrollingX: false
  }
};

export default _ops;

export function registry({ Vue, router }, ops = _ops) {
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

  _ops = ops;
}
