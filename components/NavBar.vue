<template>
  <div>
    <nav
      class="flex fixed w-full items-center justify-between px-6 h-16 bg-white text-gray-700 border-b border-gray-200 z-20">
      <!-- START HEADER -->
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center">
          <button class="mr-2" aria-label="Open Menu" @click="drawer">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-8 h-8">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div class="m-auto md:mx-4">
            <img src="/logo/uplb-official-logo.png" class="h-12 w-auto" alt="UPLB Logo" />
          </div>
          <h1 class="font-semibold text-xl hidden md:flex items-center">
            
          </h1>
        </div>
        <div class="flex items-center">
          <NuxtLink to='/personal-info' class="md:mr-4">
            <div class="flex items-center">
              <div class="m-auto px-3">
                <!-- <img
                  src="/logos/no-picture.png"
                  class="h-8 w-auto"
                  alt="User Picture" /> -->
              </div>
              <h1 v-if="$auth.user" class="font-semibold text-lg hidden md:flex items-center">
                {{ $auth.user.name }}
              </h1>
            </div>
          </NuxtLink>
          <div class="relative inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block cursor-pointer"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" @click="isSettingOpen = !isSettingOpen">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
            <ul v-if="isSettingOpen" class="absolute z-10 right-0 bg-white pt-0 border mt-5 mr-15">
              <li class="block py-2 px-10 hover:bg-blue-200 cursor-pointer">Settings</li>
              <li class="block py-2 px-10 hover:bg-red-500 hover:text-white cursor-pointer" @click="logout" >Logout</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- END HEADER -->
      <transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0">
        <div
          v-show="isOpen"
          class="z-10 fixed inset-0 transition-opacity"
          @keydown.esc="isOpen = false"
          >
          <div
          class="absolute inset-0 bg-black opacity-0"
          tabindex="0"
          @click="isOpen = false;"
            ></div>
        </div>
      </transition>
      <aside
        class="transform top-16 left-0 w-64 bg-white fixed h-full shadow-md overflow-auto ease-in-out transition-all duration-300 z-10"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
        <span
          class="flex items-center p-4 hover:bg-gray-300 hover:text-red-700"
          @click="isOpen = false"
          ><span class="mr-2">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6">
              <path
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </span>
          <NuxtLink to='/'>Dashboard</NuxtLink>
        </span>
        <span
          class="flex items-center p-4 hover:bg-gray-300 hover:text-red-700"
          @click="isOpen = false"
          ><span class="mr-2">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6">
              <path
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </span>
          <NuxtLink to='/organizations'>Organizations</NuxtLink>
        </span>
        <span
          class="flex items-center p-4 hover:bg-gray-300 hover:text-red-700"
          @click="isOpen = false"
          ><span class="mr-2">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6">
              <path
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </span>
          <NuxtLink to='/ocs_staff'>OCS Staff</NuxtLink>
        </span>
        <span
          class="flex items-center p-4 hover:bg-gray-300 hover:text-red-700"
          @click="isOpen = false"
          ><span class="mr-2">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6">
              <path
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </span>

          <NuxtLink to='/request'>Request</NuxtLink>
        </span>
        <span
          class="flex items-center p-4 hover:bg-gray-300 hover:text-red-700"
          @click="isOpen = false"
          ><span class="mr-2">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6">
              <path
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </span>
          <NuxtLink to='/facilities'>Facilities</NuxtLink>
        </span>
          <!-- END DASHBOARD -->

      </aside>
        <Alert/>
    </nav>
  </div>
  
  </template>
  
  <script>
  import {  mapActions } from 'vuex'
  import Alert from './Alert.vue';
  export default {
      components: { Alert },

      data() {
          return {
              isOpen: false,
              isSettingOpen: false,
              isFacultyOpen: false,
              isStudentOpen: false,
              isAdminOpen: false,
              isSuperAdminOpen: false,
              isAcademicCatalogOpen: false,
              isPlanOfCourseworkOpen: false
          };
      },
      fetch() {
        if(this.isAdmin) {this.getAdminTag()}
      },
      computed: {
          // ...mapState({
          //     adminTags: state => state.maTable.adminTags
          // }),
          // isFaculty() {
          //   if(this.$auth.user.roles) {
          //     const roles = this.$auth.user.roles;
          //     return roles.find(el => el.name === "faculty") ? true : false;
          //   } else {
          //     return false
          //   }
          // },
          // isStudent() {
          //   if(this.$auth.user.roles) {
          //     const roles = this.$auth.user.roles;
          //     return roles.find(el => el.name === "student") ? true : false;
          //   } else {
          //     return false
          //   }
          // },
          // isAdmin() {
          //   if(this.$auth.user.roles) {
          //     const roles = this.$auth.user.roles;
          //     return roles.find(el => el.name === "admin") ? true : false;
          //   } else {
          //     return false
          //   }
          // },
          // isSuperAdmin() {
          //   if(this.$auth.user.roles) {
          //     const roles = this.$auth.user.roles;
          //     return roles.find(el => el.name === "super_admin") ? true : false;
          //   } else {
          //     return false
          //   }
          // },
      },
      watch: {
          isOpen: {
              immediate: true,
              handler(isOpen) {
                  if (process.client) {
                      if (isOpen)
                          document.body.style.setProperty("overflow", "hidden");
                      else
                          document.body.style.removeProperty("overflow");
                  }
              },
          },
      },
      mounted() {
          document.addEventListener("keydown", (e) => {
              if (e.keyCode === 27 && this.isOpen)
                  this.isOpen = false;
          });
      },
      methods: {
          ...mapActions({
              getAdminTag: "maTable/checkTags"
          }),
          drawer() {
              this.isOpen = !this.isOpen;
          },
          async logout() {
              await this.$auth.logout();
              await this.$router.push("/auth/login");
          },
      },
      
  };
  </script>
  <style>
    [data-tooltip-title]:hover:after {
        opacity: 1;
        transition: all 0.1s ease 0.5s;
        visibility: visible;
    }
    [data-tooltip-title]:after {
        content: attr(data-tooltip-title);
        background-color: #010101bb;
        color: #ffffff;
        font-size: 11px;
        font-weight: 400;
        position: absolute;
        padding: 1px 5px 2px 5px;
        bottom: -1.6em;
        left: 100%;
        white-space: nowrap;
        box-shadow: 1px 1px 3px #010101bb;
        opacity: 0;
        border: 1px solid #010101bb;
        border-radius: 4px;
        z-index: 99999;
        visibility: hidden;
    }
    [data-tooltip-title] {
        position: relative;
    }
  </style>