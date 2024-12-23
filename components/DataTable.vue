<template>
    <div class="bg-white rounded-lg p-8 mt-2">
      <div class="my-8">
        <!-- Loading indicator -->
        <div v-if="!isInitialLoad && isLoading" class="rounded flex top-1/2 left-1/2 bg-white fixed border px-3 items-center shadow-md content-start justify-center">
          <CircSpinner :isLoading="isLoading" :size="'large'" />
          <div class="font-bold text-gray-500">Loading...</div>
        </div>
    
        <!-- Main content -->
        <div v-if="!isInitialLoad" class="bg-red-900 overflow-auto shadow-xl sm:rounded-lg mb-4 p-4">
          <!-- Table -->
          <table class="table-auto w-full text-center bg-white rounded-lg">
            <!-- Table headers -->
            <thead class="border-red-900 h-11 bg-red-900 text-white border-8 rounded-lg">
              <tr class="font-bold">
                <!-- Conditionally render the checkbox column -->
                <td v-if="showCheckbox" class="px-6 py-3 cursor-pointer">
                  <!-- <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" /> -->
                </td>
                <td v-for="(header, headerIndex) in tableHeaders" :key="headerIndex" scope="col" class="px-6 py-3 cursor-pointer" @click="sort(header)">
                  <div class="flex justify-center">
                    {{ header.label }}
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      class="my-2 w-3 h-3 transform ml-2"
                      :class="[isSort(header.name), header.name === order.order_field ? '' : 'invisible']"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                      ></path>
                    </svg>
                  </div>
                </td>
              </tr>
            </thead>
            <!-- Table body -->
            <tbody>
              <tr v-for="(row, rowIndex) in tableData" :key="rowIndex" 
                  :class="[
                    'bg-white  h-11',
                    rowIndex === 0 ? 'rounded-t-lg' : '',
                    rowIndex === tableData.length - 1 ? 'rounded-b-lg' : ''
                  ]">
                <!-- Conditionally render the checkbox column -->
                <td v-if="showCheckbox" class="px-2 py-3">
                  <input type="checkbox" v-model="selectedRows" :value="row" :disabled="disabledList.includes(row.id)"/>
                </td>
                <td v-for="(header, headerIndex) in tableHeaders" :key="headerIndex" class="px-2 py-3">
                  <div v-if="row[header.name]">
                    {{ row[header.name] }}
                  </div>
                  <div v-else>
                    <slot :name="header.name" :index="row"></slot>
                  </div>
                </td>
              </tr>    
            </tbody>
          </table>
        </div>
  
        <div class="flex content-end justify-between">
          <vs-pagination 
            :total-pages="pagination.last_page" 
            :current-page="pagination.current_page"
            @change="changePage"
          >
          </vs-pagination> 
          <div class="mr-7">
            <label for="num-of-items" class="block text-xs text-gray-500">Rows per page</label>
            <select id="num-of-items" v-model="numOfItems" name="num-of-items" class="p-2 w-full">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>
  
      <!-- Loader -->
      <Loader v-if="isInitialLoad && isLoading" :loaderType="'table'" :columnNum="4"/>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isLoading: {
        type: Boolean
      },
      isInitialLoad: {
        type: Boolean
      },
      tableHeaders: {
        type: Array,
        default() {
          return []
        }
      },
      tableData: {
        type: Array,
        default() {
          return []
        }
      },
      pagination: {
        type: Object,
        default() {
          return {}
        }
      },
      showCheckbox: {  // New prop to control checkbox visibility
        type: Boolean,
        default: false
      },
      disabledList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        selectedRows: [],  // Track selected rows by their IDs
        selectAll: false,  // Track "Select All" checkbox state
        searchQuery: '',
        page: 0,
        options: {
          numOfItems: 5,
          filters: {}
        },
        order: {
          order_type: '',
          order_field: '',
        },
        watcherValue: 0
      };
    },
    computed: {
      numOfItems: {
        get() {
          return this.options.numOfItems
        },
        set(value) {
          this.options.numOfItems = value
          this.watcherValue++
        }
      }
    },
    watch: {
      watcherValue(newVal, oldVal) {
        this.$emit('onUpdateOptions', this.options)
      },
      page(newVal, oldVal) {
        this.$emit('onUpdatePage', this.page)
      },
      order(newVal, oldVal) {
        this.$emit('onUpdateSorting', this.order)
      },
      selectAll(newVal) {
        if (newVal) {
          this.selectedRows = this.tableData.map(row => row.id);  // Select all rows
        } else {
          this.selectedRows = [];  // Deselect all rows
        }
      },
      selectedRows(newVal) {
        this.$emit('updateSelectedRows', newVal);
        }
    },
    methods: {
      filterAction(data) {
        this.options.filters = data
        this.watcherValue++
      },
      changePage(page) {
        this.page = page
      },
      sort(header) {
        if (header.sortable) {
          if (this.order.order_field === header.name && this.order.order_type === 'ASC') {
            this.order.order_type = 'DESC'
          } else {
            this.order.order_type = 'ASC'
          }
          this.order.order_field = header.name
          this.$emit('onUpdateSorting', this.order)
        }
      },
      isSort(fieldName) {
        if (fieldName === this.order.order_field && this.order.order_type === 'ASC') {
          return '-rotate-180'
        } else if (fieldName === this.order.order_field && this.order.order_type === 'DESC') {
          return '-rotate-0'
        } else {
          return ''
        }
      },
      toggleSelectAll() {
        if (this.selectAll) {
          this.selectedRows = this.tableData.map(row => row.id);  // Select all rows
        } else {
          this.selectedRows = [];  // Deselect all rows
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Optional styling for table rows */
  .table-auto tbody tr {
    background-color: white;
    color: black;
  }
  
  .table-auto td {
    padding: 5px;
  }
  
  .table-auto tbody tr:hover {
    background-color: #e3e3ee; 
  }
  </style>