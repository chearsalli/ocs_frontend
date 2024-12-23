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
  <h2 style="text-align: center; "  :class="isPreview ? 'invisible' : ''">Republic of the Philippines</h2>
  <h3 style="text-align: center; font-size: 15px;"  :class="isPreview ? 'invisible' : ''"><strong>UNIVERSITY OF THE PHILIPPINES LOS BAÑOS</strong></h3>
  <p style="text-align: center; " :class="isPreview ? 'invisible' : ''">College, Los Baños, Laguna</p>
  <h3 style="text-align: center; margin-top: 17px; font-size: 15px;"  :class="isPreview ? 'invisible' : ''"><strong>OFFICIAL RECEIPT</strong></h3>

  

    <div class="flex mt-5" >
    <div class="w-7/12">
      <p class="  mb-4" :class="isPreview ? 'invisible' : ''">Fund: <span class="underline underline-offset-4"></span></p>
      <p><span :class="isPreview ? 'invisible' : ''">Payor:</span> <span class="underline underline-offset-4">{{ mergedPaymentDetails.name }}</span></p>
    </div>
    <div class="w-5/12">
      <p class="text-left  mb-4" :class="isPreview ? 'invisible' : ''"><span  >No:</span> <span class=" underline-offset-4">{{ selectedRow.or_number }}</span></p>
      <p class="text-left"><span  :class="isPreview ? 'invisible' : ''">Date:</span> <span class=" underline-offset-4">{{ formattedDate }}</span></p>
    </div>
  </div>
  
  <table cellspacing="0" cellpadding="5" style="width: 100%; margin-top: 15px; margin-left:5px;">
    <thead>
      <tr>
        <th style="font-weight: bold; text-decoration: underline; width:46%;" class="border"  :class="isPreview ? 'invisible' : ''">Nature of collection</th>
        <th style="font-weight: bold; text-decoration: underline; width:25%;" class="border"  :class="isPreview ? 'invisible' : ''">Account Code</th>
        <th style="font-weight: bold; text-decoration: underline; width:25%;" class="border"  :class="isPreview ? 'invisible' : ''">Amount</th>
      </tr>
    </thead>
    <tbody>
      <!-- <tr>
        <td style="text-align: center;">{{ selectedRow.index.req_type }}</td>
        <td style="text-align: center;">{{ selectedRow.index.fund_code_id }}</td>
        <td style="text-align: center;">{{ selectedRow.index.processing_fee }}</td>
      </tr> -->
      <tr  
            v-for="(row, rowIndex) in mergedPaymentDetails.paymentDetails" :key="rowIndex" scope="col" 
            class="px-6 py-3 cursor-pointer" 
          >
            <td style="text-align: center;" >{{ row.req_type }}</td>
            <td style="text-align: center;">{{ row.fund_code_id }}</td>
            <td style="text-align: center;">{{ row.processing_fee }}</td>
      </tr>
      <!-- <tr style="height: 125px;"></tr> -->
      <!-- <tr>
        <td colspan="2" style="text-align: right; font-weight: bold;  padding-right: 60px;">TOTAL AMOUNT:</td>
        <td style="text-align: center; text-decoration: underline;"></td>
      </tr> -->

      
    </tbody>
  </table>
  <!-- <div class="image-overlay" >
    <img src="https://i0.wp.com/cfa.upd.edu.ph/wp-content/uploads/2021/09/Black-UP-Logo.png?ssl=1" alt="Overlay Image" class="overlay-image" />
    </div> -->
  <div style="position: absolute; top:95mm" class="w-8/10">
    <div class="flex justify-end w-full">
      <p ><span  :class="isPreview ? 'invisible' : ''">TOTAL AMOUNT:</span> <span class="min-w-40 px-5 text-center ">{{ mergedPaymentDetails.total }}</span></p>
    </div>
    
    <p><strong  :class="isPreview ? 'invisible' : ''">Amount in words:</strong> 
      <span  v-if="mergedPaymentDetails.total" style="">{{ amountInWords(mergedPaymentDetails.total) }} Pesos only</span>
    </p>

    <!-- Centered Image -->
   


    <div class="mt-8 flex items-center"  :class="isPreview ? 'invisible' : ''">
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


    <div class="mt-2 overflow-x-auto"  :class="isPreview ? 'invisible' : ''">
    <table class="w-full border border-collapse border-gray-900">
    <thead>
      <tr class="bg-white">
        <th class="font-bold  px-3 border border-b-1 border-gray-800">Drawee</th>
        <th class="font-bold  px-3 border border-b-1 border-gray-800">Number</th>
        <th class="font-bold  px-3 border border-b-1 border-gray-800">Date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="py-2 px-4 border border-b-1 border-gray-700 text-center"></td>
        <td class="py-2 px-4 border border-b-1 border-gray-700 text-center"></td>
        <td class="py-2 px-4 border border-b-1 border-gray-700 text-center"></td>
      </tr>
      <tr>
        <td class="py-2 px-4 border border-b-1 border-gray-700 text-center"></td>
        <td class="py-2 px-4 border border-b-1 border-gray-700 text-center"></td>
        <td class="py-2 px-4 border border-b-1 border-gray-700 text-center"></td>
      </tr>
    </tbody>
    </table>
    </div>




    <!-- <p style="margin-top: 10px; text-align: right;">Received the amount stated above. &nbsp;</p>
    <p style=" text-align: center;" class="mt-5">{{ selectedRow.index.collecting_officer }}</p>
    <p class=" ml-2" style="margin-top: -10px; text-align: right;">____________________ &nbsp; &nbsp; &nbsp;</p>
    <p class="ml-1 font-bold" style="text-align: right;">Collecting Officer  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p> -->


    <div class="flex justify-end">
    <div class="text-center">
    <div  :class="isPreview ? 'invisible' : ''">Received the amount stated above.</div>
    <div class=" w-36 mt-10">{{ mergedPaymentDetails.collecting_officer }}</div> <!-- Signature Line -->
    <span class="block"  :class="isPreview ? 'invisible' : ''">Collecting Officer</span> <!-- Printed Name -->
    </div>
    </div>
  </div>


</div>
</template>

    </vue-html2pdf>
    
  <!-- <VueHtml2pdf :manual-pagination="false" paginate-elements-by-height /> -->
  </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf';
import {  mapGetters } from 'vuex'
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
    isPreview: {
      type: Boolean,
      required: true
    },
    selectedRow: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDate() {
      const date = new Date();
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    },
    ...mapGetters({
      mergedPaymentDetails: "cashier/mergedPaymentDetails"
    }),
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
          jsPDF: { unit: 'mm', format: [140, 180], orientation: 'portrait' },
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
  margin: 20px 50px 10px 50px;
  position: relative;
    z-index: 1;
    font-size: 12px;
  height: 170mm;
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

  .invisible {
  color: white; /* Hides text by changing its color to white */
  visibility: hidden; /* Alternatively, you can use this to hide text while keeping layout intact */
}

.transparent {
  opacity: 0; /* Makes the text transparent */
}
</style>
