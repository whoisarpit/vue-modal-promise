import './assets/index.scss';
import ModalContainer from './components/ModalContainer.vue';

const version = '0.2.4';

const install = (Vue) => {
  function getContainer(root) {
    if (!root.modalContainer) {
      const modalContainerEl = document.createElement('div');
      modalContainerEl.id = 'modal-container';

      root.$el.appendChild(modalContainerEl);

      new Vue({
        parent: root,
        render: h => h(ModalContainer),
      }).$mount(modalContainerEl);
    }

    return root.modalContainer;
  }

  Vue.mixin({
    methods: {
      $showModal(modalObject) {
        const container = getContainer(this.$root);
        return container.show(modalObject);
      },
    },
  });
};

const plugin = {
  install,
  version,
};

export default plugin;

export {
  plugin,
  ModalContainer,
  version,
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}
