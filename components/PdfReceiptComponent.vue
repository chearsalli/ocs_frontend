<template>
    <div>
      <vue-html2pdf
        ref="html2Pdf"
        :show-layout="true"
        :enable-download="true"
        filename="receipt.pdf"
        pdf-quality="2"
        pdf-format="a4"
      >
        <template #pdf-content>
          <div class="pdf-content">
            <h2 style="text-align: center;">Republic of the Philippines</h2>
            <h3 style="text-align: center;">UNIVERSITY OF THE PHILIPPINES LOS BAÑOS</h3>
            <p style="text-align: center;">College, Los Baños, Laguna</p>
            <h3 style="text-align: center; margin-top: 40px;">OFFICIAL RECEIPT</h3>
  
            <p>Fund: {{ selectedRow.index.fund_code_id }}</p>
            <p style="text-align: right;">No: {{ selectedRow.index.or_number }}</p>
            <p>Payor:</p>
            <p style="text-align: right;">Date: {{ formattedDate }}</p>
  
            <table border="1" cellspacing="0" cellpadding="5" style="width: 100%; margin-top: 20px;">
              <thead>
                <tr>
                  <th>Nature of collection</th>
                  <th>Account Code</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nature 1</td>
                  <td>Code 1</td>
                  <td>{{ selectedRow.index.processing_fee }}</td>
                </tr>
              </tbody>
            </table>
  
            <p style="text-align: right; margin-top: 20px;">Total Amount: {{ selectedRow.index.processing_fee }}</p>
            <p>Amount in words: {{ amountInWords(selectedRow.index.processing_fee) }}</p>
  
            <p style="margin-top: 40px;"><strong>Mode of Payment:</strong></p>
            <p>
              <input type="checkbox"> Cash
              <input type="checkbox"> Check
              <input type="checkbox"> Bank
            </p>
  
            <table border="1" cellspacing="0" cellpadding="5" style="width: 100%; margin-top: 20px;">
              <thead>
                <tr>
                  <th>Drawee</th>
                  <th>Bank Number</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bank 1</td>
                  <td>123456</td>
                  <td>2024-05-13</td>
                </tr>
                <tr>
                  <td colspan="3">&nbsp;</td>
                </tr>
                <tr>
                  <td colspan="3">&nbsp;</td>
                </tr>
              </tbody>
            </table>
  
            <p style="margin-top: 20px; text-align: right;">Received the amount stated above.</p>
            <p style="margin-top: 40px;">____________________</p>
            <p style="text-align: center;">Collecting Officer</p>
          </div>
        </template>
      </vue-html2pdf>
    </div>
  </template>
  
  <script>
 import VueHtml2pdf from 'vue-html2pdf';
  import { toWords } from 'number-to-words';
  
  export default {
    components: {
      VueHtml2pdf
    },
    props: {
      selectedRow: {
        type: Object,
        required: true
      }
    },
    computed: {
      formattedDate() {
        const date = new Date();
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      }
    },
    methods: {
      printReceipt() {
        this.$refs.html2Pdf.generatePdf();
      },
      amountInWords(amount) {
        const words = toWords(amount);
        return words.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      }
    }
  };
  </script>
  
  <style scoped>
  .pdf-content {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  </style>
  