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
                    <button class="bg-green-500 text-white p-2 rounded mr-2 flex items-center justify-center w-8 h-8"   @click="toggleRequestViewDrawer(index)">
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

      
      

    <Modal
      :isOpen="isModalOpen"
      iconType="warning"
    >
      <template slot="title">
        {{ modal.title }}
      </template>
      <template slot="content">
        {{ modal.content }}
      </template>
      <template slot="footer">
        <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" @click="confirmAction()">Confirm</button>
        <button type="button"  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="isModalOpen=false">Cancel</button>
      </template>
    </Modal>
      
    </div>
    
  </template>
  
  <script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
  // import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import '@fortawesome/fontawesome-free/css/all.css'
  // import ViewRequest from '~/components/ViewRequest.vue';



  export default {
  //   components: {
  //     ViewRequest
  // },

    name: 'IndexPage',
    data() {
      return {
        requestViewDrawer: false,
        requestAddDrawer: false,
        editableForm: false,
        isModalOpen: false,
        searchQuery: '',
        modal:{
          title:'',
          content:''
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

  