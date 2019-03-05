<script>
import Vue from 'vue'

// custom text-field
// • we don't need what Vuetify propose
// • but we need custom styling (ex: done/state)

export default {
  name: `cc-text-field`,
  props: {
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    readonly(val) {
      if (val) return
      Vue.nextTick(() => this.$refs.input.focus())
    },
  },
  methods: {
    onInput($event) {
      let { value } = $event.target
      // <input type="number"> give back a string
      this.$emit(`input`, this.isNumber ? enforceNumber(value) : value)
    },
  },
}
</script>

<template lang="pug">
input.cc-text-field(
  type="text"
  :value="value"
  :name="name"
  :placeholder="placeholder"
  :readonly="readonly"
  :disabled="disabled"
  ref="input"
  @input="onInput"
)
</template>

<style lang="scss" scoped>
.cc-text-field {
  width: 100%;
  height: 100%;
  padding: 1em;

  &:focus:not([readonly]) {
    outline: 1px solid var(--v-primary-base);
    background: var(--v-primary-lighten5);
  }
  &:disabled {
    opacity: 0.5;
  }
}
</style>
