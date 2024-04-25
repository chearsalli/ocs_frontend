<template>
    <div>
    
    </div>
  </template>
  
  <script>
  export default {
    name: 'ViewRequest',
    methods: {
      async fetchRequestDetails() {
        try {
          // Fetch request details from API endpoint
          const response = await fetch(`/api/user_requests/${this.index.id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const requestData = await response.json();
          // Emit an event to notify the parent component to open the modal with the request details
          this.$emit('open-modal', requestData);
        } catch (error) {
          console.error('Error fetching request details:', error);
        }
      }
    },
    props: {
      index: Object
    }
  };
  </script>
  