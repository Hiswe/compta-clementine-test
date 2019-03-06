<script>
// custom “clementine” checkbox

export default {
  name: `cc-checkbox`,
  props: {
    value: {
      default: false,
      type: Boolean,
    },
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
    },
  },
  computed: {
    htmlFor() {
      return this.id || this.name
    },
  },
  methods: {
    onChange($event) {
      const { checked } = $event.target
      this.$emit(`input`, checked)
    },
  },
}
</script>

<template lang="pug">
label.cc-checkbox(
  :for="htmlFor"
)
  input.cc-checkbox__input(
    :checked="value"
    :id="htmlFor"
    :name="name"
    type="checkbox"
    @change="onChange"
  )
  svg.cc-checkbox__icon(
    width="40"
    height="40"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
  )
    path(d="M26.015,11.82c-7.115,0 -12.984,5.943 -12.984,13.205c0,7.263 5.795,13.205 12.984,13.205c7.19,0 12.985,-5.942 12.985,-13.205c-0.073,-7.262 -5.795,-13.205 -12.985,-13.205Zm-13.791,13.205c0,-2.641 0.734,-5.208 2.054,-7.189c-0.807,-0.22 -1.687,-0.44 -2.568,-0.44c-4.915,0 -8.803,4.035 -8.803,9.023c0,4.988 3.888,9.023 8.803,9.023c1.541,0 3.008,-0.44 4.182,-1.027c-2.348,-2.421 -3.668,-5.722 -3.668,-9.39Zm-7.913,1.957c-0.859,-4.27 1.196,-6.118 3.734,-7.475c-2.439,1.765 -3.401,4.429 -3.734,7.475Zm11.426,-2.198c-1.129,-5.61 1.57,-8.038 4.905,-9.822c-3.449,2.393 -4.724,5.896 -4.905,9.822Zm-14.737,-9.222c0,0 3.668,-3.008 7.042,1.76c0,0 -3.667,2.348 -7.042,-1.76Zm19.514,-3.448c0.44,-1.907 2.861,-10.124 18.339,-10.344c0,0 -1.467,6.309 -10.637,9.39c-0.44,-0.073 -0.807,-0.073 -1.1,-0.146c3.008,-1.394 5.648,-3.889 6.089,-4.475c-2.641,2.054 -9.39,4.621 -10.564,4.768c-0.073,0 -0.073,0 -0.147,0.073c-0.66,0.22 -1.32,0.514 -1.98,0.734Z")

</template>

<style lang="scss" scoped>
.cc-checkbox__input {
  border: 0 !important;
  clip: rect(0 0 0 0) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
}
.cc-checkbox__icon {
  fill: var(--v-primary-lighten3);
}
.cc-checkbox__icon {
  transition: fill 0.25s;
}
.cc-checkbox__input:checked ~ .cc-checkbox__icon {
  fill: var(--v-primary-base);
}
</style>
