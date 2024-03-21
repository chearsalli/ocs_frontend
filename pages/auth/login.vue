<template>
    <div class="font-sans text-gray-900 antialiased">
      <div class="h-screen grid justify-items-center items-center">
        <div class="w-auto md:w-1/2 lg:w-1/3">
          <div class="py-4 px-8 bg-white shadow-lg rounded-lg mt-20 mb-4">
            <div class="flex justify-center -mt-16">
             <img src="/logo/uplb-logo.png" class="object-center" />
            </div>
            <div class="mt-5">
              <h2 class="text-gray-800 text-2xl font-semibold text-center tracking-normal">
                Welcome to the UPLB Service Request and Payment Verification System
              </h2>
              <p class="mt-5 text-gray-600 text-center">
               This app is currently in alpha phase.
             </p>
            </div>
            <div class="flex justify-center mt-4">
              <button class="bg-red-700 text-white py-2 px-4 rounded-sm" @click="login">
                Login with UPmail 
              </button>
            </div>
          </div>
          <div class="py-2 px-2 text-gray-500 text-center">
           <p> 
            For Mac Users, use Chrome Browser. Safari is not currently supported.
           </p> 
          </div>
        </div>
      </div>
    </div>
        
   
  </template>
  
  <script>
  export default {
    layout: "auth",
    methods: {
      login(message) {
        window.location.href = `${process.env.API_BASE_URL}/auth/google`;
      },
    },
  };
  </script>