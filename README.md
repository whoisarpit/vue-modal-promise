# Vue Modal Promise
[![npm](https://img.shields.io/npm/v/vue-modal-promise.svg)](https://www.npmjs.com/package/vue-modal-promise) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A bare minimum library to open a promisified modal inside the current app.

## Installation

```bash
npm install --save vue-modal-promise
```

## Usage

The library can be used as a Component or as a Plugin.

### As a Plugin

To install plugin -

```js
import Vue from 'vue';
import ModalPromise from 'vue-modal-promise';

Vue.use(ModalPromise);
```

Then to open the modal

```js
const response = await this.$showModal({
  component: MyModalComponent,
  props: {
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
  }
});
```

### As a Component

In the app template -
```html
<modal-container ref="modalContainer"></modal-container>
```

In the app script -
```js
import { ModalContainer } from 'vue-modal-promise';
import { MyModalComponent } from './MyModalComponent.vue';

export default {
  components: {
    ModalContainer,
    ...
  },
  methods: {
    async openModal() {
      const response = await this.$refs.modalContainer.show({
        component: MyModalComponent,
        props: {
          text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        }
      });

      console.log('Response from modal', response);
    }
  },
  ...
};
```

If you need to call the modal from a component, a common usage pattern is -

```js
export default {
  created() {
    this.$on('showModal', modalObject => this.$refs.modalContainer.show(modalObject));
  },
  ...
};
```

Where you can emit the event `'showModal'` anywhere from a component which will bubble to the app,
and invoke this event listener.

## Component features

### Programmatically closing the modal from inside the component

To close the modal, inside the component, emit the event `'close'` -
```js
this.$emit('close', response);
```

### Closure Guard

Closure guard (`beforeModalClose`) is called before

```js
  methods: {
    ...
  },
  beforeModalClose(close) {
    if (!this.isDataUnsaved) {
      close(true);
    } else {
      window.alert('Please save the data before closing the modal');
    }
  },
  created() {
    ...
```

## Development

### Project setup
```bash
npm install
```

There's a simple demo packaged with the app. To run it -

```bash
npm run demo
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```
npm run lint
```

## License

[MIT](https://github.com/arpit9295/vue-weekly-schedule/blob/master/LICENSE.md)
