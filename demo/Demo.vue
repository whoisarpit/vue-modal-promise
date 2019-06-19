<template>
  <div>
    <div>
      <button @click="openModal">Open Modal</button>
    </div>
    <div style="margin-top: 20px">
      Modal is {{isOpen ? 'open' : 'closed'}}
    </div>
  </div>
</template>

<script>
  import DemoModal from './DemoModal.vue';

  export default {
    name: 'demo',
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
      async openModal() {
        this.isOpen = true;

        await this.$showModal({
          component: DemoModal,
        });

        this.isOpen = false;
      },
    },
  };
</script>
