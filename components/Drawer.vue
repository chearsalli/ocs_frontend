<template>
    <nav
      class="flex fixed w-full items-center justify-between px-6 bg-transparent text-gray-700 z-10">
      <transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0">
      </transition>
      
   
      <aside
        class="transform top-16 right-0  bg-gray-100 fixed h-full shadow-md overflow-auto ease-in-out transition-all duration-300 z-10 p-10"
        :class=" [isOpen ? '-translate-x-0' : 'translate-x-full', width]"
    
        >
        <slot name="content">

        </slot>
      </aside>
  
    </nav>
  </template>
  
  <script>
  export default {
      props: {
          isOpen: {
              type: Boolean,
              default: false
          },
          width:{
            type: String,
            default: 'w-full'
          }
      },
      data() {
          return {
          }
      },

      watch: {
          isOpen: {
              immediate: true,
              handler(isOpen) {
                  if (process.client) {
                      if (isOpen) {
                          document.body.style.setProperty("overflow", "hidden");
                      }
                      else {
                          document.body.style.removeProperty("overflow");
                          this.$emit("close");
                      }
                  }
              },
          },
      },

      methods: {
          closeDrawer() {
              this.$emit("close");
          }
      },

     
  };
  </script>