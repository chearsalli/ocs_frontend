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
              :tableData="getTableData" 
              :tableOptions="options" 
              :pagination=pagination
              @onUpdateOptions="handleOptionsUpdate" 
              @onUpdatePage="handlePagination"
              @onUpdateSorting="handleSortingUpdate"
            >

            <template #action="index">
    <div class="flex">
      <button class="bg-green-900 text-yellow-400 font-semibold mr-2 py-2 px-4 rounded flex items-center justify-center overflow-hidden whitespace-nowrap" style="width: 80px;" @click="Requestaccept(index)">
    ACCEPT
</button>

<button class="bg-red-900 text-white font-semibold py-2 px-4 rounded flex items-center justify-center overflow-hidden whitespace-nowrap" style="width: 80px;" @click="Requestdeny(index)">
    DENY
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
        <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" @click="confirmAction(actionconfirm)">Confirm</button>
        <button type="button"  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="isModalOpen=false">Cancel</button>
      </template>
    </Modal>
      
    </div>
    
  </template>
  
  <script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
//  import axios from 'vuex'

  export default {
    name: 'IndexPage',
    data() {
      return {
        
        requestViewDrawer: false,
        requestAddDrawer: false,
        editableForm: false,
        isModalOpen: false,
        selectedid: '',
        actionconfirm: '',
        searchQuery: '',
        modal:{
          title:'',
          content:''
        },
        headers: [
        {
            name: "id",
            sortable: true,
            label: "id"
          },
          // {
          //   name: "transaction_no",
          //   sortable: true,
          //   label: "Transaction No."
          // },
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
            name: "target_date",
            sortable: true,
            label: "Target Date"
          },
          {
            name: "remaining_days",
            sortable: true,
            label: "Remaining"
          },
        
          {
            name: "processing_fee",
            sortable: true,
            label: "Processing Fee"
          },
          {
            name: "committed_by",
            sortable: true,
            label: "Committed by"
          },
          {
            name: "status",
            sortable: true,
            label: "Status"
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
        filterData: state => state.ocs_staff.filters,
        tableData: state => state.ocs_staff.data,
        pagination: state => state.ocs_staff.data,
        dataLoading: state => state.ocs_staff.loading,
        initialLoad: state => state.ocs_staff.initialLoad,
        coursesData: state => state.ocs_staff.data,
        tableFilterValues: state => state.ocs_staff.filterValues,
      }),
      ...mapGetters({
        getTableData: "ocs_staff/getTableData"
      }),
    },
    methods: {



Requestaccept(index) {

            this.isModalOpen = true;
            this.modal.title = 'Confirm this Request';
            this.modal.content = 'This will accept this request permanently. You cannot undo this action.';
            this.selectedid = index.index.id;
            this.actionconfirm = 'accept'; 
            

},


 Requestdeny(index) {

            this.isModalOpen = true;
            this.modal.title = 'Deny this Request';
            this.modal.content = 'This will deny this request permanently. You cannot undo this action.';
            this.selectedid = index.index.id;
            this.actionconfirm = 'deny'; 
},
 
confirmAction(actionconfirm){
     
        if (actionconfirm === 'accept') {
      this.acceptRequest(this.selectedid);
      console.log('Request Accepted');
    } else if (actionconfirm === 'deny') {
      this.denyRequest(this.selectedid);
      console.log('Request Denied');
    }
    this.isModalOpen = false;
    this.fetchTableData(1);

      },


      ...mapMutations({
        updateNumOfItems: 'ocs_staff/UPDATE_NUM_OF_ITEMS',
        updateFilterValues: 'ocs_staff/UPDATE_FILTER_VALUES',
        updateOrderValues: 'ocs_staff/UPDATE_ORDER_VALUES',
        setTableModule: 'ocs_staff/SET_MODULE'
      }),
      ...mapActions({
        getData: 'ocs_staff/getDataList',
        createData: 'ocs_staff/create',
        updateData: 'ocs_staff/update',
        getFilters: 'ocs_staff/getFilters',
        acceptRequest: 'ocs_staff/acceptRequest',
        denyRequest: 'ocs_staff/denyRequest',
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
              with_calculation: true,
              fields:[
                'id',
                'transaction_no',
                'name',
                'request',
                'target_date',
                'remaining_days',
                'committed by',
                'status',
                'is_active'
              ]
          }
        })
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
          transaction_no: index.index.transaction_no,
          name: index.index.name,
          request: index.index.request,
          target_date: index.index. target_date,
          remaining: index.index.remaining,
          committed_by: index.index.committed_by,
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
          target_date: '',
          remaining: '',
          committed_by: '',
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

