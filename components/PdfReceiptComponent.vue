<template>
  <div>
    <vue-html2pdf
    :show-layout="false"
  :float-layout="true"
  :enable-download="false"
  :preview-modal="false"
  filename="receipt"
  :paginate-elements-by-height="1100"
  :pdf-quality="2"
  pdf-format="a4"
  pdf-orientation="portrait"
  pdf-content-width="800px"
  :manual-pagination="false"
  ref="html2Pdf"
  
  
  >
  <!-- @beforeDownload="beforeDownload($event)" -->
  <template #pdf-content>
    <div id="pdf-content" class="pdf-content">
  <h2 style="text-align: center;">Republic of the Philippines</h2>
  <h3 style="text-align: center;"><strong>UNIVERSITY OF THE PHILIPPINES LOS BAÑOS</strong></h3>
  <p style="text-align: center;">College, Los Baños, Laguna</p>
  <h3 style="text-align: center; margin-top: 40px;"><strong>OFFICIAL RECEIPT</strong></h3>

  
 
    <div class="flex justify-between" style="display: flex; justify-content: space-between;">
    <div>
      <p>Fund: <span class="underline underline-offset-4">{{ selectedRow.index.fund_code_id }}</span></p>
      <p>Payor: <span class="underline underline-offset-4">{{  selectedRow.index.name }}</span></p>
    </div>
    <div>
      <p class="text-right">No: <span class="underline underline-offset-4">{{ selectedRow.index.or_number }}</span></p>
      <p class="text-right">Date: <span class="underline underline-offset-4">{{ formattedDate }}</span></p>
    </div>
  </div>

  <table border="1" cellspacing="0" cellpadding="5" style="width: 100%; margin-top: 20px;">
    <thead>
      <tr>
        <th style="font-weight: bold; text-decoration: underline;">Nature of collection</th>
        <th style="font-weight: bold; text-decoration: underline;">Account Code</th>
        <th style="font-weight: bold; text-decoration: underline;">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align: center;">Nature 1</td>
        <td style="text-align: center;">Code 1</td>
        <td style="text-align: center;">{{ selectedRow.index.processing_fee }}</td>
      </tr>

      <tr style="height: 150px;"></tr>
      <tr>
        <td colspan="2" style="text-align: right; font-weight: bold;  padding-right: 60px;">TOTAL AMOUNT:</td>
        <td style="text-align: center; text-decoration: underline;">{{ selectedRow.index.total_processing_fee }}</td>
      </tr>

      
    </tbody>
  </table>

  
  <p><strong>Amount in words:</strong> <span style="text-decoration: underline;">{{ amountInWords(selectedRow.index.total_processing_fee) }}</span></p>

   <!-- Centered Image -->
   <div class="image-overlay" >
            <img src="https://i0.wp.com/cfa.upd.edu.ph/wp-content/uploads/2021/09/Black-UP-Logo.png?ssl=1" alt="Overlay Image" class="overlay-image" />
          </div>


<div class="mt-8 flex items-center">
  <p class="mb-0 font-bold mr-4">Mode of Payment:</p>
  <div class="flex items-center space-x-6">
    <label class="flex items-center">
      <input type="checkbox" class="mr-2 mt-4">
      <span>Cash</span>
    </label>
    <label class="flex items-center">
      <input type="checkbox" class="mr-2 mt-4">
      <span>Check</span>
    </label>
    <label class="flex items-center">
      <input type="checkbox" class="mr-2 mt-4">
      <span>ADA/Bank Payment</span>
    </label>
  </div>
</div>


<div class="mt-8 overflow-x-auto">
  <table class="w-full border border-collapse border-gray-900">
    <thead>
      <tr class="bg-white">
        <th class="font-bold py-2 px-4 border border-b-2 border-gray-800">Drawee</th>
        <th class="font-bold py-2 px-4 border border-b-2 border-gray-800">Number</th>
        <th class="font-bold py-2 px-4 border border-b-2 border-gray-800">Date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="py-4 px-4 border border-b-2 border-gray-700 text-center"></td>
        <td class="py-4 px-4 border border-b-2 border-gray-700 text-center"></td>
        <td class="py-4 px-4 border border-b-2 border-gray-700 text-center"></td>
      </tr>
      <tr>
        <td class="py-4 px-4 border border-b-2 border-gray-700 text-center"></td>
        <td class="py-4 px-4 border border-b-2 border-gray-700 text-center"></td>
        <td class="py-4 px-4 border border-b-2 border-gray-700 text-center"></td>
      </tr>
    </tbody>
  </table>
</div>




  <p style="margin-top: 10px; text-align: right;">Received the amount stated above. &nbsp;</p>
  <p class="ml-2" style="margin-top: 20px; text-align: right;">____________________ &nbsp; &nbsp; &nbsp;</p>
  <p class="ml-1 font-bold" style="text-align: right;">Collecting Officer  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>

  


</div>
</template>

    </vue-html2pdf>
    
  <!-- <VueHtml2pdf :manual-pagination="false" paginate-elements-by-height /> -->
  </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf';
import { toWords } from 'number-to-words';
// import JsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';



export default {
  components: {
    VueHtml2pdf
  },

  name: 'PdfReceiptComponent',
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
    // async beforeDownload ({ html2pdf, options, pdfContent }) {
    //       await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
    //           const totalPages = pdf.internal.getNumberOfPages()
    //           for (let i = 1; i <= totalPages; i++) {
    //               pdf.setPage(i)
    //               pdf.setFontSize(10)
    //               pdf.setTextColor(150)
    //               pdf.text('Page ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
    //           } 
    //       }).save()
    //   },


generatePdf() {
      try {
        const element = this.$refs.html2Pdf.$el.querySelector('#pdf-content');
        const opt = {
          margin: 0.5,
          filename: 'receipt.pdf',
          image: { type: 'jpeg', quality: 1.0 },
          html2canvas: { scale: 5 , useCORS: true},
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        };
        html2pdf()
          .set(opt)
          .from(element)
          .toPdf()
          .get('pdf')
          .then((pdf) => {
            const url = pdf.output('bloburl');
            window.open(url, '_blank');
          });
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
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
  position: relative;
    z-index: 1;
}



.image-overlay {
    /* Position the image behind the content */
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1; 
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .overlay-image {
    width: 90%;
    height: auto;
    object-fit: contain;
  }
</style>
