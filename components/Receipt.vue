<template>
    <div class="receipt-container">
      <div class="receipt">
        <div class="header">
          <p>Republic of the Philippines</p>
          <p>University of the Philippines</p>
          <p>College, Los Banos Laguna</p>
          <h2>Official Receipt</h2>
        </div>
        <div class="details">
          <div class="flex justify-between mb-4">
            <p>Fund:</p>
            <p class="font-bold">No: {{ transactionNo }}</p>
          </div>
          <div class="flex justify-between mb-4">
            <p>Payor:</p>
            <p class="font-bold">{{ requestor }}</p>
          </div>
          <div class="flex justify-between mb-4">
            <p>Date:</p>
            <p class="font-bold">{{ dateCreated }}</p>
          </div>
          <!-- Add more details as needed -->
        </div>
        <div class="total mt-8">
          <p>Total Amount: <span class="font-bold">{{ totalAmount }}</span></p>
          <p>Amount in words: <span class="font-bold">{{ amountInWords }}</span></p>
          <p>Mode of Payment: <span class="font-bold">{{ modeOfPayment }}</span></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      transactionNo: String,
      requestor: String,
      dateCreated: String,
      totalAmount: String,
      amountInWords: String,
      modeOfPayment: String
    }
  }
  </script>
  
  <style scoped>
  /* Add your Tailwind CSS styles here */
  .receipt-container {
    display: flex;
    justify-content: center;
  }
  
  .receipt {
    width: 80%;
    border: 1px solid #000;
    padding: 20px;
  }
  
  .header {
    text-align: center;
    font-weight: bold;
  }
  
  .details {
    margin-bottom: 20px;
  }
  
  .total {
    margin-top: 20px;
    text-align: right;
  }
  </style>
  