export { default as Alert } from '../../components/Alert.vue'
export { default as CircSpinner } from '../../components/CircSpinner.vue'
export { default as DataTable } from '../../components/DataTable.vue'
export { default as Drawer } from '../../components/Drawer.vue'
export { default as Loader } from '../../components/Loader.vue'
export { default as Modal } from '../../components/Modal.vue'
export { default as NavBar } from '../../components/NavBar.vue'
export { default as NuxtLogo } from '../../components/NuxtLogo.vue'
export { default as PersonForm } from '../../components/PersonForm.vue'
export { default as ToggleSwitch } from '../../components/ToggleSwitch.vue'
export { default as Tutorial } from '../../components/Tutorial.vue'
export { default as ActivitylogTimeline } from '../../components/activitylogTimeline.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
