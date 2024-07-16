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
          <svg class="absolute inset-y-0 left-0 w-8 h-8 text-gray-500 ml-3 mt-3 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input type="text" class="border-8 border-green-800 bg-gray-100 p-3 pl-10 rounded-xl" v-model="searchQuery" @change="search()" placeholder="Transaction No./Name">
          </div>
          
          
          <!-- <DataTable 
            :isLoading="dataLoading" 
            :isInitialLoad="initialLoad" 
            :tableFilterData="tableFilter" 
            :tableHeaders="headers" 
            :tableData="tableData.data" 
            :tableOptions="options" 
            :pagination=pagination
            :showSearchbar="true"
            @onUpdateOptions="handleOptionsUpdate" 
            @onUpdatePage="handlePagination"
            @onUpdateSorting="handleSortingUpdate"
            @updateSearchQuery="handleSearchQueryUpdate"
            
          > -->

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
      <button v-if="index.index.status === 'For Payment'" class="bg-green-900 text-yellow-400  font-semibold mr-2 py-2 px-4 rounded flex items-center justify-center overflow-hidden whitespace-nowrap" style="width: 80px;" @click="Paymentaccept(index)">
        PAID
        </button>
      <button class="bg-green-900 text-yellow-400 font-semibold mr-2 py-2 px-4  rounded flex items-center justify-center overflow-hidden whitespace-nowrap" @click="viewRow(index)">
        VIEW
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
        <h1 class="mb-4 w-full">Request Details</h1>
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
  <ModalConfirmation :isOpen="isPaidModalOpen" iconType="warning" :lastORNumber="lastORNumber" >
    <template #title>
      <h1 class="text-lg font-bold">Confirm Payment</h1> 
      
    </template>

    <template #content>
      <h1 class="text-base">Are you sure you want to mark this request as paid?</h1>
      <br>
  
       <!-- Add the input field for OR Number -->
       <div class="mt-4 flex justify-between items-center">
    <label for="orNumber" class="block text-sm font-medium text-gray-700"> OR Number: {{ lastORNumber }}</label>
    <div class="relative">
    <input
  type="text"
  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-900 focus:border-green-900 sm:text-sm"
  v-model="cashierInput"
  :placeholder="nextORNumber"
  @input="filterNumbers"
        required
  
/>
    </div>
</div>

    </template>
    
    <template #footer>
      <button class="bg-green-900 text-yellow-400 font-semibold mr-2 py-2 px-4 rounded flex items-center justify-center overflow-hidden whitespace-nowrap" @click="confirmAction">
        Confirm
      </button>
      <button class="bg-red-900 text-yellow-400 font-semibold mr-2 py-2 px-4 rounded flex items-center justify-center overflow-hidden whitespace-nowrap" @click="closePaidModal">
        Cancel
      </button>
    </template>
  </ModalConfirmation>

     <Modal :isOpen="isModalOpen" iconType="warning">
<template #title>
  <h1 class="text-lg font-bold"></h1> 
  <button @click="closeViewModal" class="absolute top-2 right-2 text-white hover:text-gray-600">
  <i class="fas fa-times"></i>
</button>
</template>

      

 
<template #content v-if="selectedRow && selectedRow.index">
        <div class="grid grid-cols-2 gap-4 mt-4">
          
          <div class="flex flex-col">
            <p class="font-semibold text-black text-lg">Requested Document:</p>
            <p class="text-lg text-gray-800">{{ selectedRow.index.req_type }}</p>
          </div>
          <div class="flex flex-col">
            <p class="font-semibold text-black text-lg pl-6">Status:</p>
            <p class="text-lg text-gray-800 pl-6">{{ selectedRow.index.status }}</p>
          </div>

          
          <div class="flex flex-col">
            <p class="font-semibold text-black text-lg">Transaction No:</p>
            <p class="text-lg text-gray-800">{{ selectedRow.index.transaction_no }}</p>
          </div>
          <div class="flex flex-col">
            <p class="font-semibold text-black text-lg pl-6">Date Created:</p>
            <p class="text-lg text-gray-800 pl-6">{{ selectedRow.index.date_created }}</p>
          </div>

          
          <div class="flex flex-col">
            <p class="font-semibold text-black text-lg">Requestor</p>
            <p class="text-lg text-gray-800">{{ selectedRow.index.name }}</p>
          </div>
          <div class="flex flex-col">
            <p class="font-semibold text-black text-lg pl-6">Fund Code:</p>
            <p class="text-lg text-gray-800 pl-6">{{ selectedRow.index.fund_code_id }}</p>
          </div>
        </div>
      
    </template>

<template #footer>
  <!-- <button class="bg-green-900 text-yellow-400 font-semibold mr-2 py-2 px-4  rounded flex items-center justify-center overflow-hidden whitespace-nowrap" @click="closeViewModal">
    Close
  </button> -->
  <button class="bg-green-900 text-yellow-400 font-semibold mr-2 py-2 px-4  rounded flex items-center justify-center overflow-hidden whitespace-nowrap" @click="generatePdf">
    Print
  </button>

  <PdfReceiptComponent ref="pdfComponent" :selectedRow="selectedRow" @generatePdf="generatePdf" />
  <!-- <PdfReceiptComponent ref="pdfComponent" :selectedRow="selectedRow"></PdfReceiptComponent> -->


</template>
</Modal>

  </div>
  
  
</template>



<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import '@fortawesome/fontawesome-free/css/all.css'
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// const converter = require('number-to-words');
import PdfReceiptComponent from '@/components/PdfReceiptComponent.vue';



export default {
  name: 'IndexPage',

  components: {
    PdfReceiptComponent
   
  },
  
  props: {
    // lastORNumber: {
    //   type: String,
    //   required: true
    // }
  },
  data() {
    return {
      isPaidModalOpen: false,
      requestViewDrawer: false,
      requestAddDrawer: false,
      editableForm: false,
      isModalOpen: false,
      selectedid: '',
      orNumber: '',
      cashierInput: '',
      currentORNumber: '',
      selectedRow: {},
      actionconfirm: '',
      // lastORNumber: '',
      cashierORNumbers: {}, // Object to store OR Numbers for each cashier
    loggedInCashier: '', // Currently logged-in cashier
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
          name: "status",
          sortable: true,
          label: "Status"
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
      saveLastORNumber: state => state.cashier.saveLastORNumber,
      
  
    }),


nextORNumber() {
  if (this.cashierInput === '') {
    const nextNumber = parseInt(this.lastORNumber) + 1; 
    return this.formatNumber(nextNumber, 7);
  } else {
    return this.cashierInput;
  }
},

    ...mapGetters({
      getTableData: "cashier/getTableData"
    }),
  },

 
  mounted() {
  this.fetchLastORNumber();
},

  
  methods: {

    
    filterNumbers(event) {
      this.cashierInput = event.target.value.replace(/\D/g, '');
    },
   
    formatNumber(number, length) {
      return number.toString().padStart(length, '0');
    },

    // async ORNumber() {

      
    //   console.log("id:", this.selectedRow)
    //   try {
        
    //     const orNumber = String(this.orNumber);
        
        
    //     await this.$axios.$put('/save-or-number', { orNumber });

        
    //     this.orNumber = '';

    //     console.log('OR number saved successfully');
    //   } catch (error) {
    //     console.error('Error saving OR number:', error);
    //   }
    // },
    


    

    generatePdf() {
      
        this.$refs.pdfComponent.generatePdf();
     
    },
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

async Paymentaccept(index) {
  await this.fetchLastORNumber().then(()=>{
    if(this.lastORNumber === null){
      this.cashierInput = ''
    }else{
      this.cashierInput = this.formatNumber(parseInt(this.lastORNumber) + 1, 7);
    }

  })
  if(index.index.status === 'Paid'){

    return;
  }
  this.isPaidModalOpen = await true;
  this.modal.title = await 'Confirm Payment';
  this.modal.content = await 'Are you sure you want to mark this request as paid?';
  this.selectedIndex = await index;

  
},


confirmAction() {
  this.isPaidModalOpen = false;
  const requestId = this.selectedIndex.index.id;
  
 
  this.markAsPaid( {request_id: requestId, or_number: this.cashierInput})
    .then(() => {
      console.log('Request marked as paid successfully');
      this.cashierInput = '';
      // this.ORNumber();
      this.isModalOpen = false;
      this.fetchTableData(1);
    })
    .catch(error => {
      console.error('Error marking request as paid:', error);
    });

  
},



    closeModal() {
        this.isPaidModalOpen = false;
      },

      
    

viewRow(rowData) {
      try {

        this.selectedRow = rowData; 
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
      saveORNumber: 'cashier/saveORNumber',
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
              'or_number',
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
