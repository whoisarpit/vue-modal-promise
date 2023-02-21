<template>
  <div class="vmp__app">
    <transition-group name="vmp__transition">
      <div class="vmp__overlay"
        v-for="(modal, index) in modals"
        :key="modal.id"
        @close="modal.close">
        <div class="vmp">
          <a href="javascript:;"
            class="vmp__close-btn"
            @click.prevent="closeModal(index)">
            &#x2715;
          </a>
          <component ref="modals"
            @close="modal.close"
            @dismiss="modal.dismiss"
            :is="modal.component"
            v-bind="modal.props"></component>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
  const openClass = 'vmp__root--modal-open';

  export default {
    data() {
      return {
        modals: [],
        count: 0,
      };
    },
    methods: {
      show(modal) {
        if (!modal) {
          throw new Error('Modal Object not found');
        }
        const newModal = { ...modal };
        newModal.isPersistent = typeof modal.isPersistent !== 'undefined' ? Boolean(modal.isPersistent) : true;
        newModal.showModal = true;
        newModal.id = this.count;

        this.count += 1;

        newModal.destroy = () => {
          newModal.showModal = false;
          this.modals = this.modals.filter((currModal) => currModal !== newModal);
        };

        // TODO: Add error handling everywhere and reject
        const promise = new Promise((resolve) => {
          newModal.close = (data) => {
            resolve(data);
            newModal.destroy();
          };
          newModal.dismiss = (err) => {
            // const error = err || new Error('Dialog closed without any input');
            resolve(err);
            newModal.destroy();
          };
        });

        newModal.checkState = (state) => {
          if (state === false) {
            newModal.dismiss();
          }
        };

        this.modals.push(newModal);

        if (this.modals.length === 1) {
          this.$root.$el.classList.add(openClass);
        }

        return promise;
      },

      async closeModal(index) {
        if (this.$refs.modals[index].$options.beforeModalClose) {
          const self = this;
          const currentRef = this.$refs.modals[index];
          currentRef.$options.beforeModalClose.call(currentRef, (returnVal) => {
            self.modals[index].close(returnVal);
          });
        } else {
          this.modals[index].close();
        }
        if (index === 0) {
          this.$root.$el.classList.remove(openClass);
        }
      },
    },

    created() {
      this.$root.modalContainer = this;
    },
  };
</script>
