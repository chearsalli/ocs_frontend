'<template>

  
  <div class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
    <div class="py-12 px-14">
      
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
          <!-- <div class="flex justify-end my-2">
            <button
            class="bg-blue-700 hover:bg-grey text-small  text-grey-darkest text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" class="mr-2 fill-blue-500" fill="#fffff"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" fill="#ffffff"/></svg>
            <span>Filter</span>
          </button>
          </div> -->
       
          <!-- <div class="flex justify-end my-2">
            <button 
            class="bg-blue-700 hover:bg-grey text-small  text-grey-darkest text-white font-bold py-2 px-4 rounded inline-flex items-center"
            @click="openRequestAddDrawer()"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" class="mr-2 fill-blue-500" fill="#fffff"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" fill="#ffffff"/></svg>
            <span>Add</span>
          </button>
          </div> -->
          <!-- Search-bar -->
          <!-- <div class="search-bar">
            
            <input type="text" class="border-8 border-green-800 bg-gray-100 p-3 pl-10 " v-model="searchQuery" @change="search()" placeholder="Transaction No./Name">
            
          </div> -->
          
          <br>
          <!-- Search-bar -->
          <div class="search-bar relative">
          <!-- Search icon -->
          <svg class="absolute inset-y-0 left-0 w-8 h-8 text-gray-500 ml-3 mt-3 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <!-- Search input -->
          <input type="text" class="border-8 border-green-800 bg-gray-100 p-3 pl-10 rounded-xl" v-model="searchQuery" @change="search()" placeholder="Transaction No./Name">
          </div>
          
          <DataTable 
            :isLoading="dataLoading" 
            :isInitialLoad="initialLoad" 
            :tableFilterData="tableFilter" 
            :tableHeaders="headers" 
            :tableData="tableData.data" 
            :tableOptions="options" 
            :pagination=pagination
            @onUpdateOptions="handleOptionsUpdate" 
            @onUpdatePage="handlePagination"
            @onUpdateSorting="handleSortingUpdate"
          >


          
          <template #action="index">
  <div class="flex">
      <button class="bg-green-900 text-yellow-400 font-semibold mr-2 py-2 px-4  rounded flex items-center justify-center overflow-hidden whitespace-nowrap" style="width: 80px;" @click="Paymentaccept(index)">
           PAID
      </button>
      <button class="bg-green-900 text-yellow-400 font-semibold mr-2 py-2 px-4  rounded flex items-center justify-center overflow-hidden whitespace-nowrap" @click="viewRow(index)">
        VIEW
          <!-- <i class="fas fa-eye text-xl"></i>  -->
      </button>

      
  </div>
</template>   
            
            <template #active="index">
              <font-awesome-icon v-if="index.index.is_active" :icon="['fas', 'check']"  class="icon alt text-green-500"/>
              <font-awesome-icon v-else :icon="['fas', 'x']"  class="icon alt text-red-500"/>
            </template>
            <template #verified="index">
              <font-awesome-icon v-if="index.index.is_verified" :icon="['fas', 'check']"  class="icon alt text-green-500"/>
              <font-awesome-icon v-else :icon="['fas', 'x']"  class="icon alt text-red-500"/>
            </template>
              
            
          </DataTable>
        </div>
    </div>

    <Drawer 
      :isOpen="requestAddDrawer"
      width="w-1/2" 
      @close="requestAddDrawer = false" 
    >
      <template #content>
        <h1 class="text-xl">Add New Request</h1><br/>
            <PersonForm
              ref="addRequest"
              formMethod = 'Add'
              :editable = true
              @onSave="handleAddSave" 
              @onCancel="handleAddCancel" 
            />
      </template>
    </Drawer>
    <Drawer 
      :isOpen="requestViewDrawer"
      width="w-1/2" 
      @close="requestViewDrawer = false" 
    >
      <template #content>
        <h1 class="mb-4 w-full">Request Detail</h1>
            <PersonForm
              ref="viewRequest"
              formMethod = 'Edit'
              :editable = editableForm
              @onSave="handleUpdateSave" 
              @onCancel="handleCancel" 
              @changeEditable="handleMakeEditable"
              @onConfirm="handleConfirmation"
            />
      </template>
    </Drawer>

    
     <!-- Modal for Paid button -->
  <Modal :isOpen="isPaidModalOpen" iconType="warning" :lastORNumber="lastORNumber">
    <template #title>
      <h1 class="text-lg font-bold">Confirm Payment</h1> 
      
    </template>

    <template #content>
      <h1 class="text-base">Are you sure you want to mark this request as paid?</h1>
      <br>
      <h1 class="text-sm">Last OR Number: <span style="color: maroon;">{{ lastORNumber }}</span></h1>
    </template>
    
    <template #footer>
      <button class="bg-green-900 text-yellow-400 font-semibold mr-2 py-2 px-4 rounded flex items-center justify-center overflow-hidden whitespace-nowrap" @click="confirmAction">
        Confirm
      </button>
      <button class="bg-red-900 text-yellow-400 font-semibold mr-2 py-2 px-4 rounded flex items-center justify-center overflow-hidden whitespace-nowrap" @click="closePaidModal">
        Cancel
      </button>
    </template>
  </Modal>

     <Modal :isOpen="isModalOpen" iconType="warning">
<template #title>
  <h1 class="text-lg font-bold">{{ modal.title }}</h1> 
</template>

<template #content v-if="selectedRow && selectedRow.index">
  <div>
    <!-- Receipt content -->
    <div class="receipt-container max-w-md mx-auto p-4 border border-gray-300">
      <div class="text-center mb-4">
        
      </div>
      <div class="receipt-details">
        
          <p class="mt-4"><strong class="font-bold text-maroon text-lg">Requested Document:</strong> <span class="text-lg text-gray-800">{{ selectedRow.index.req_type }}</span></p>
          <p class="mt-1"><strong class="font-bold text-maroon text-lg">Status:</strong> <span class="text-lg text-gray-800">{{ selectedRow.index.status }}</span></p>
          <p class="mt-1"><strong class="font-bold text-maroon text-lg">Transaction No:</strong> <span class="text-lg text-gray-800">{{ selectedRow.index.transaction_no }}</span></p>
          <p class="mt-1"><strong class="font-bold text-maroon text-lg">Date Created:</strong> <span class="text-lg text-gray-800">{{ selectedRow.index.date_created }}</span></p>
          <p class="mt-1"><strong class="font-bold text-maroon text-lg">Requestor:</strong> <span class="text-lg text-gray-800">{{ selectedRow.index.name }}</span></p>
          <p class="mt-1"><strong class="font-bold text-maroon text-lg">Fund Code:</strong> <span class="text-lg text-gray-800">{{ selectedRow.index.fund_code_id }}</span></p>
          <p class="mt-1"><strong class="font-bold text-maroon text-lg">Committed by:</strong> <span class="text-lg text-gray-800">{{ selectedRow.index.committed_by }}</span></p>
            
      </div>
    </div>
  </div>
</template>

<template #footer>
  <button class="bg-green-900 text-yellow-400 font-semibold mr-2 py-2 px-4  rounded flex items-center justify-center overflow-hidden whitespace-nowrap" @click="closeViewModal">
    Close
  </button>
  <button class="bg-green-900 text-yellow-400 font-semibold mr-2 py-2 px-4  rounded flex items-center justify-center overflow-hidden whitespace-nowrap" @click="printReceipt">
    Print
  </button>
</template>
</Modal>

  </div>
  
  
</template>



<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import '@fortawesome/fontawesome-free/css/all.css'
// import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const converter = require('number-to-words');



export default {
  name: 'IndexPage',
  
  props: {
    lastORNumber: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isPaidModalOpen: false,
      requestViewDrawer: false,
      requestAddDrawer: false,
      editableForm: false,
      isModalOpen: false,
      selectedid: '',
      actionconfirm: '',
      // lastORNumber: '',
      searchQuery: '',
      modal:{
        title:'',
        content:''
      },
      headers: [
        {
          name: "id",
          sortable: true,
          label: "Id"
        },
        {
          
          name: "transaction_no",
          sortable: true,
          label: "Transaction No."
        },
        {
          name: "name",
          sortable: true,
          label: "Name"
        },
        {
          name: "req_type",
          sortable: true,
          label: "Request"
        },
        {
          name: "fund_code_id",
          sortable: true,
          label: "Fund Code"
        },
        {
          name: "actions",
          sortable: false,
          label: "Last Action"
        },
        {
          name: "action",
          sortable: true,
          label: "Action"
        },
       
        ],
      tableFilter: [
        {
          field: 'search',
          name: 'search',
          type: 'input',
          label: 'Search'
        },
        {
          field: 'search',
          name: 'search',
          type: 'input',
          label: 'Search'
        }
      
      ],
      // index: null,
      options: {
        page: 1,
        filters: {},
        numOfItems: 5
      }
    };
  },
  async fetch () {
    await this.updateFilterValues({}) // set the filter values to nothing every time a txn history is rendered
    await this.fetchTableData(this.options.page)
    await this.filters.forEach(filter => { // create the filter values that will be used for this txn history instance
        this.getFilters({ 
          link: this.module,
          data: {
              column_name: filter.field,
              distinct: 'true',
              order_type: 'ASC',
              order_field: filter.field
          }
        })
    });
  },
  computed: {

    ...mapState({
      filterData: state => state.cashier.filters,
      tableData: state => state.cashier.data,
      pagination: state => state.cashier.data,
      dataLoading: state => state.cashier.loading,
      initialLoad: state => state.cashier.initialLoad,
      coursesData: state => state.cashier.data,
      tableFilterValues: state => state.cashier.filterValues,
      lastORNumber: state => state.cashier.lastORNumber,
  
    }),
    ...mapGetters({
      getTableData: "cashier/getTableData"
    }),
  },

 
  mounted() {
  this.fetchLastORNumber();
},

  
  methods: {
    
    
    openPaidModal() {
      this.isPaidModalOpen = true;
    },
    closePaidModal() {
      this.isPaidModalOpen = false;
    },
    closeViewModal() {
      this.isModalOpen = false;
    },
     async lastOR() {
        await this.$store.dispatch('fetchLastORNumber');
    },
    
    
    ...mapActions(['markAsPaid']),

Paymentaccept(index) {
  this.isPaidModalOpen = true;
  this.modal.title = 'Confirm Payment';
  this.modal.content = 'Are you sure you want to mark this request as paid?';
  this.selectedIndex = index;

  
},


confirmAction() {
  this.isPaidModalOpen = false;
  const requestId = this.selectedIndex.index.id;
  
  this.markAsPaid(requestId)
    .then(() => {
      console.log('Request marked as paid successfully');
      this.isModalOpen = false;
      this.fetchTableData(1);
    })
    .catch(error => {
      console.error('Error marking request as paid:', error);
    });
},


    markAsPaid(id) {
    this.$store.dispatch('markAsPaid', { request_id: id })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
},
closeModal() {
        this.isPaidModalOpen = false;
      },

      
    printReceipt() {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF();

      // Get current date
  const currentDate = new Date();
  const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
      // Adding the header
  doc.setFontSize(16);
  doc.text('Republic of the Philippines', 105, 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.text('UNIVERSITY OF THE PHILIPPINES LOS BAÑOS', 105, 30, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.text('College, Los Baños, Laguna', 105, 40, { align: 'center' });

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIAL RECEIPT', 105, 60, { align: 'center' });

 
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fund: ${this.selectedRow.index.fund_code_id}`, 20, 80);
  doc.text(`No: ${this.selectedRow.index.or_number}`, 160, 80);

  
  doc.text('Payor:', 20, 90);
  doc.text(`Date: ${formattedDate}`, 160, 90);

  
  const tableColumns = ['Nature of collection', 'Account Code', 'Amount'];
  const tableRows = [
    ['Nature 1', 'Code 1', `${this.selectedRow.index.processing_fee}`],
   
  ];

 


  doc.autoTable({
    startY: 100,
    head: [tableColumns],
    body: tableRows,
    styles: { cellPadding: 3, fontSize: 10 },
    headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
  });

 
  const totalAmount = this.selectedRow.index.processing_fee;

  const finalY = doc.lastAutoTable.finalY + 10;
  doc.text(`Total Amount: ${totalAmount}`, 150, finalY);  

   // Adding Amount in words
  const totalAmountWords = converter.toWords(totalAmount);
  const capitalizedTotalAmountWords = totalAmountWords
    .split(' ') 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); 
  doc.text(`Amount in words: ${capitalizedTotalAmountWords}`, 20, finalY + 10); 

 // Adding Mode of Payment
const modeOfPaymentY = finalY + 30;
doc.setFont('helvetica', 'bold');
doc.text('Mode of Payment:', 20, modeOfPaymentY);

const checkboxY = modeOfPaymentY + 5;
const checkboxSize = 4;

const startX = 80; 
const spaceBetweenOptions = 30; 

// Draw checkboxes
doc.rect(startX - checkboxSize - 5, checkboxY - checkboxSize / 2, checkboxSize, checkboxSize);
doc.rect(startX + spaceBetweenOptions - checkboxSize - 5, checkboxY - checkboxSize / 2, checkboxSize, checkboxSize); 
doc.rect(startX + 2 * spaceBetweenOptions - checkboxSize - 5, checkboxY - checkboxSize / 2, checkboxSize, checkboxSize); 

doc.text('Cash', startX - checkboxSize, modeOfPaymentY + 5); 
doc.text('Check', startX + spaceBetweenOptions - checkboxSize, modeOfPaymentY + 5); 
doc.text('Bank', startX + 2 * spaceBetweenOptions - checkboxSize, modeOfPaymentY + 5); 


  
  const draweeTableColumns = ['Drawee', 'Bank Number', 'Date'];
  const draweeTableRows = [
    ['Bank 1', '123456', '2024-05-13'],
    ['', '', ''],
    ['', '', ''], 
  ];

  doc.autoTable({
    startY: checkboxY + 20,
    head: [draweeTableColumns],
    body: draweeTableRows,
    styles: { cellPadding: 3, fontSize: 10 },
    headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
    didDrawCell: (data) => {
      if (data.section === 'body' && data.row.index < draweeTableRows.length - 1) {
        const { cell } = data;
        const xPos = cell.x;
        const yPos = cell.y + cell.height;
        const cellWidth = cell.width;
        
        doc.line(xPos, yPos, xPos + cellWidth, yPos);
      }
    },
  });

  

const receivedTextY = doc.lastAutoTable.finalY + 10;
const receivedTextX = 125; // Adjust the x-coordinate to move it to the right
doc.text('Received the amount stated above.', receivedTextX, receivedTextY);

// Add signature line
const signatureLineY = receivedTextY + 5;
const signatureLineX = 50; // Adjust the x-coordinate to move it to the right
doc.line(signatureLineX, signatureLineY, 100, signatureLineY);


  // Add "Collecting Officer" text
  const officerTextY = signatureLineY + 10;
  doc.text('Collecting Officer', 105, officerTextY, { align: 'center' });
  // Save the PDF
  const docBlob = doc.output('blob');
  const url = URL.createObjectURL(docBlob);
  window.open(url);
}, 






viewRow(rowData) {
      try {
        console.log('Selected row data:', rowData);
        this.selectedRow = rowData; // Assign the entire rowData object
        console.log('SelectedRow:', this.selectedRow); 
        this.isModalOpen = true; 
      } catch (error) {
        console.error('Error fetching row details:', error);
      }
    },


    ...mapMutations({
      updateNumOfItems: 'cashier/UPDATE_NUM_OF_ITEMS',
      updateFilterValues: 'cashier/UPDATE_FILTER_VALUES',
      updateOrderValues: 'cashier/UPDATE_ORDER_VALUES',
      setTableModule: 'cashier/SET_MODULE'
    }),
    ...mapActions({
      getData: 'cashier/getDataList',
      createData: 'cashier/create',
      updateData: 'cashier/update',
      getFilters: 'cashier/getFilters',
      acceptPayment: 'cashier/acceptPayment',
      denyPayment: 'cashier/denyPayment',
      markAsPaid: 'cashier/markAsPaid',
      fetchLastORNumber: 'cashier/fetchLastORNumber',
    }),
    openDrawer(data) {
      this.showDrawer = true
      this.drawerData = data
    },
    handleConfirmation(action){
      this.isModalOpen = true
      this.modal.title = 'Confirm action'
      this.modal.content = `Are you sure you want to ${action} this item?`
    },
    fetchTableData(page) { // reusable function for getting the data to be displayed in txn history
      this.getData({
        link: this.module,
        data: {
            page,
            items: this.options.numOfItems,
            with_parent_name: true,
            with_user: true,
            with_fund_codes: true,
            // with_calculation: true,
            
            fields:[
              'id',
              'transaction_no',
              'name',
              'request',
              'fund_code_id',
              'last_action',
              'status',
              'is_active'
            ]
        }
      })
    },
    // confirmAction(){
    //   this.$refs.viewRequest.clickSave()
    //   this.isModalOpen = false
    // },
    search(){
      this.updateFilterValues({
        search : this.searchQuery
      })
      this.fetchTableData(1)
    },
    updateDrawer(index){
      this.requestViewDrawer = !this.requestViewDrawer
      if(index) {
        this.index = index.index
      } else {
        this.index = null
      }
      this.$refs.viewRequest.setDefault({
        id: index.index.id,
        transaction_no: index.index.transaction_no,
        name: index.index.name,
        request: index.index.request,
        fund_code_id: index.index.fund_code_id,
        status: index.index.status,
      })
      this.editableForm = false
    },
    handleOptionsUpdate(options) {
        this.options.numOfItems = options.numOfItems
        this.updateFilterValues(options.filters)
        this.fetchTableData(1)
    },
    handleSortingUpdate(order) {
        this.options.order_type = order.order_type
        this.options.order_field = order.order_field
        this.updateOrderValues(order)
        this.fetchTableData(1)
    },
    handlePagination(page) {
      this.fetchTableData(page)
    },
    async handleUpdateSave(data){
      await this.updateData(data)
      this.requestViewDrawer = await false
      this.fetchTableData(1)
    },
    handleCancel(){
      this.requestViewDrawer = false
      this.fetchTableData(1)
    },
    async handleAddSave(data){
      await this.createData(data)
      this.requestAddDrawer = await false
      this.fetchTableData(1)
    },
    handleAddCancel(){
      this.requestAddDrawer = false
    },
    openRequestAddDrawer(){
      this.requestAddDrawer = true
      this.$refs.addRequest.setDefault({
        id: null,
       transaction_no: '',
        name: '',
        request: '' ,
        fund_code_id: '',
        last_action: '',
        status: '',
        // is_active: 1,
        // is_verified: 0
      })
    },
    handleMakeEditable(){
      this.editableForm = !this.editableForm
    }
  },
}

</script> 