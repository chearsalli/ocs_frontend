<template>
    <div
      class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
      <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
        <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
          <h2 class="text-2xl leading-7 font-semibold">
           PERSONAL INFORMATION
          </h2>
          <p class="mt-3 text-gray-600">
            Welcome to the new UPLB Master Data Management System! <br/> <br/> 
            Please be informed that this system is still under continuous development.
            So if you encounter any problems, errors, or bugs please send us an email at dx.uplb@up.edu.ph to alert us about its existence. <br/> <br/> 
            The following are the modules that are currently working: Persons and Organization Master data.
          </p>

          <div>

            {{ $moment().format('MMMM Do YYYY h:mm:ss a') }}
          </div>

        </div>
    </div>
    </div>

  </template>

<script lang="ts">
export default {
  name: 'IndexPage',
  data() {
    return {
      openStudentView: false,
    };
  },
}
</script>