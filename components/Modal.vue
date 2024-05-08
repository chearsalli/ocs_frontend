<template>
<div v-if="isOpen"  class="relative z-10 transition-opacity" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!--
      Background backdrop, show/hide based on modal state.
      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
        <!--
          Modal panel, show/hide based on modal state.
          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
        <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div v-if="iconType === 'info'" class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <font-awesome-icon :icon="['fa', 'info']" class="icon alt text-blue-500"/>
              </div>
              <div v-if="iconType === 'warning'" class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <font-awesome-icon :icon="['fa', 'triangle-exclamation']" class="icon alt text-red-500"/>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900"><slot name="title" /></h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500"><slot name="content" /></p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <slot name="footer" />
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      props: {
          isOpen: {
              type: Boolean,
              default: false
          },
          iconType:{
            type: String,
            default: 'info'
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
          closeModal() {
              this.$emit("close");
          }
      },

     
  };
</script>
