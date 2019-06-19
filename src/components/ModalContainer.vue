<template>
  <div class="vmp__app">
    <transition-group name="vmp__transition">
      <div class="vmp__overlay"
        v-for="modal in modals"
        :key="modal.id"
        @close="modal.close">
        <div class="vmp">
          <a href="javascript:;" class="vmp__close-btn"
            @click.prevent="modal.dismiss()">
            &#x2715;
          </a>
          <component
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
          this.modals = this.modals.filter(currModal => currModal !== newModal);
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


        return promise;
      },
    },

    created() {
      this.$root.modalContainer = this;
    },
  };
</script>
