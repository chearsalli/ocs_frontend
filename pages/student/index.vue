<template>

  
    <div class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
      <div class="py-12 px-14">
        
          <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 ">

            <!-- <div class="flex justify-end my-2">
              <button
              class="bg-blue-700 hover:bg-grey text-small  text-grey-darkest text-white font-bold py-2 px-4 rounded inline-flex items-center"
              @click="openRequestAddDrawer()"
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" class="mr-2 fill-blue-500" fill="#fffff"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" fill="#ffffff"/></svg>
              <span>Request</span>
            </button>
            </div> -->



            


            <div class="flex justify-end my-2">
              <button 
              class="bg-blue-700 hover:bg-grey text-small  text-grey-darkest text-white font-bold py-2 px-4 rounded inline-flex items-center"
              @click="openRequestAddDrawer()"
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" hei  ght="11" viewBox="0 0 24 24" class="mr-2 fill-blue-500" fill="#fffff"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" fill="#ffffff"/></svg>
              <span>Add Request</span>
            </button>
            </div>

            <!-- Search-bar -->
            <!-- <div class="search-bar">
              <input type="text" class="border bg-gray-100 p-3" v-model="searchQuery" @change="search()" placeholder="Search">
            </div> -->
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
        <button class="bg-green-500 text-white p-2 rounded mr-2 flex items-center justify-center w-8 h-8" @click="viewRow(index)">
            <i class="fas fa-eye text-xl"></i> 
        </button>
        <button class="bg-red-500 text-white p-2 rounded flex items-center justify-center w-8 h-8 " @click="handleDelete(index)">
            <i class="fas fa-trash-alt text-xl"></i> 
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


  <Modal :isOpen="isModalOpen" iconType="warning">
  <template #title>
    <h1 class="text-lg font-bold">{{ modal.title }}</h1> 
  </template>
  
  <template #content v-if="selectedRow && selectedRow.index">
    <div>
  
      <p class="mt-4"><strong class="font-bold text-maroon text-lg">Requested Document:</strong> <span class="text-lg text-gray-800">{{ selectedRow.index.req_type }}</span></p>
      <p class="mt-1"><strong class="font-bold text-maroon text-lg">Status:</strong> <span class="text-lg text-gray-800">{{ selectedRow.index.status }}</span></p>
      <p class="mt-1"><strong class="font-bold text-maroon text-lg">Transaction No:</strong> <span class="text-lg text-gray-800">{{ selectedRow.index.transaction_no }}</span></p>
      <p class="mt-1"><strong class="font-bold text-maroon text-lg">Date Created:</strong> <span class="text-lg text-gray-800">{{ selectedRow.index.date_created }}</span></p>
      <p class="mt-1"><strong class="font-bold text-maroon text-lg">Processing Fee:</strong> <span class="text-lg text-gray-800">{{ selectedRow.index.processing_fee }}</span></p>
      <p class="mt-1"><strong class="font-bold text-maroon text-lg">Committed by:</strong> <span class="text-lg text-gray-800">{{ selectedRow.index.committed_by }}</span></p>
    </div>
  </template>
  
  <template #footer>
    <button @click="closeModal">Close</button>
  </template>
</Modal>


  </div>
</template>
  
  <script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
  // import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import '@fortawesome/fontawesome-free/css/all.css'
  import Modal from '@/components/Modal.vue';
  



  export default {
    components: {
      Modal,
  },

    name: 'IndexPage',
    data() {
      return {
        selectedRow: {},
        requestViewDrawer: false,
        requestAddDrawer: false,
        editableForm: false,
        isModalOpen: false,
        searchQuery: '',
        modal:{
          title:'REQUEST DETAILS ',
          content:'',
          description:''
        },
        headers: [
          {
            name: "req_type",
            sortable: true,
            label: "Summary"
          },
          {
            name: "transaction_no",
            sortable: true,
            label: "Transaction No"
          },
          {
            name: "processing_fee",
            sortable: true,
            label: "Processing Fee"
          },
          {
            name: "current_office",
            sortable: true,
            label: "Current Office"
          },
          {
            name: "status",
            sortable: true,
            label: "Status"
          },
          
          // {
          //   name: "active",
          //   sortable: false,
          //   label: "Active"
          // },
          // {
          //   name: "verified",
          //   sortable: false,
          //   label: "Verifed"
          // },
          {
            name: "action",
            sortable: false,
            label: "Action"
          }
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
        filterData: state => state.request.filters,
        tableData: state => state.request.data,
        pagination: state => state.request.data,
        dataLoading: state => state.request.loading,
        initialLoad: state => state.request.initialLoad,
        coursesData: state => state.request.data,
        tableFilterValues: state => state.request.filterValues,
      }),
      ...mapGetters({
        getTableData: "request/getTableData"
      }),
    },
    methods: {

      openModal() {
    this.isModalVisible = true;

    //   openModal(rowData) {
    //     console.log('Row data:', rowData); 
    //     this.modal.title = 'Request Details'; 
    //     this.modal.description = ''; 
  
  
    //     if (rowData && rowData.req_type && rowData.status && rowData.transaction_no && rowData.date_created && rowData.processing_fee && rowData.committed_by) {
    //         this.modal.description = `
    //         <p><strong>Requested Document:</strong> ${rowData.req_type}</p>
    //         <p><strong>Status:</strong> ${rowData.status}</p>
    //         <p><strong>Transaction No:</strong> ${rowData.transaction_no}</p>
    //         <p><strong>Date Created:</strong> ${rowData.date_created}</p>
    //         <p><strong>Processing Fee:</strong> ${rowData.processing_fee}</p>
    //         <p><strong>Committed by:</strong> ${rowData.committed_by}</p>
    // `;
    //     } else {
  
    //       this.modal.description = 'No details available for this request.';
    //     }
  
    //       this.isModalOpen = true; // Open the modal
        },

  
       closeModal() {
          this.isModalOpen = false;
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

      toggleRequestViewDrawer(index) {
      this.requestViewDrawer = !this.requestViewDrawer;
      this.index = index.index;
    },
      ...mapMutations({
        updateNumOfItems: 'request/UPDATE_NUM_OF_ITEMS',
        updateFilterValues: 'request/UPDATE_FILTER_VALUES',
        updateOrderValues: 'request/UPDATE_ORDER_VALUES',
        setTableModule: 'request/SET_MODULE'
      }),
      ...mapActions({
        getData: 'request/getDataList',
        createData: 'request/create',
        updateData: 'request/update',
        getFilters: 'request/getFilters'
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
              with_processing_fee: true,
              fields:[
                'id',
                'req_type',
                'transaction_no',
                'processing_fee',
                'current_office',
                'status',
                'is_verified',
                'is_active'
              ]
          }
        })
      },
      confirmAction(){
        this.$refs.viewRequest.clickSave()
        this.isModalOpen = false
      },
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
          req_type: index.index.req_type,
          transaction_no: index.index.transaction_no,
          processing_fee: index.index.processing_fee,
          current_office: index.index.current_office,
          status: index.index.status,

          is_verified: index.index.is_verified,
          is_active: index.index.is_active,
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
          req_type: '',
          // date_created: '',
          status: '',
          is_active: 1,
          is_verified: 0
        })
      },
      handleMakeEditable(){
        this.editableForm = !this.editableForm
      },

      
    },

    
  }

  </script> 

  