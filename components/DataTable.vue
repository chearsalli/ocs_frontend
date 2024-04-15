
<template>
    <div>


        <div class="my-8">
            <!-- <div class="flex items-center">
                <div class="w-full flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        <Filters :isLoading="isInitialLoad" :filter_headers="tableFilters" :filters="tableFilterData" @applyFilter="filterAction"/>
                    </div>

                </div>
            </div> -->
            <div v-if="!isInitialLoad && isLoading" class="rounded flex top-1/2  left-1/2  bg-white fixed border px-3 items-center shadow-md content-start justify-center">
                <CircSpinner :isLoading="isLoading" :size="'large'"/><div class="font-bold text-gray-500">Loading...</div>
            </div>
            <!-- <div  class="rounded flex top-1/2  left-1/2  bg-white fixed border py-1 px-3 items-center shadow-md content-start justify-center">
                <CircSpinner :isLoading=true :size="'large'"/>
                <div class="font-bold">Loading...</div>
            </div> -->
            <div v-if="!isInitialLoad" class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4">
                <table class="table-auto w-full items-center text-center rounded-full">
                    <thead>
                        <tr class="font-bold">
                            <td v-for="(header, headerIndex) in tableHeaders" :key="headerIndex" scope="col" class="px-6 py-3" @click="sort(header)">
                                <div class="flex content-start justify-center">
                                    {{header.label}}
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        class="my-2 w-3 h-3 transform ml-2"
                                        :class="[isSort(header.name), header.name===order.order_field ? '': 'invisible']"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512">
                                        <path
                                            fill="currentColor"
                                            d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                    </svg>
                                     
                                </div>
                                
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
                            <td v-for="(header, headerIndex) in tableHeaders" :key="headerIndex" class="px-2 py-3">
                                <!-- <div v-if="header == 'roles' || header == 'permissions'">
                                    <div v-if="row[header].length > 0" class="flex justify-center flex-wrap">
                                        <div v-for="(item, itemIndex) in row[header]" :key="itemIndex" class="m-1 p-1 bg-blue-200 rounded shadow hover:bg-blue-400 hover:text-white">
                                            {{item}}
                                        </div>
                                    </div>
                                    <div v-else>
                                        -- Empty --
                                    </div>
                                </div> -->
                                <div v-if="row[header.name]">
                                    {{row[header.name]}}
                                </div>
                                <div v-else>
                                    <slot :name="header.name" :index="row">

                                    </slot>
                                </div>
                            </td>
                        </tr>    
                    </tbody>
                </table>
                <div class="flex content-end justify-between">
                    <vs-pagination 
                        :total-pages="pagination.last_page" 
                        :current-page="pagination.current_page"
                        @change="changePage"
                    >
                    </vs-pagination> 
                    <div class="mr-7">
                        <label for="num-of-items" class="block text-xs text-gray-500">Rows per page</label>
                            <select id="num-of-items" v-model="numOfItems"   name="num-of-items" class="p-2 w-full">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                    </div>
                </div>

            </div>
            <Loader v-if="isInitialLoad && isLoading" :loaderType="'table'" :columnNum="4"/>
        </div>
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
        // tableFilters: {
        //     type: Array,
        //     default() {
        //         return []
        //     }
        // },
        tableFilterData: {
            type: Object,
            default() {
                return {}
            }
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
        pagination:{
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            searchQuery: '',
            page: 0,
            options: {
                numOfItems: 5,
                filters: {}
            },
            order:{
                order_type: '',
                order_field: '',
            },
            watcherValue: 0
        };
    },
    // components: {
    //     Loader,
    //     CircSpinner,
    //     Filters,
    //     GenericDrawer,
    // },
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
        }
    },
    methods: {
   
    
        filterAction(data) { // apply the filter from the filters component
            this.options.filters = data
            this.watcherValue++
        },
        changePage(page) { // change the page
            this.page = page
        },
        sort(header){
            // console.log('Current order:', this.order);
            if(header.sortable){
                if(this.order.order_field === header.name && this.order.order_type === 'ASC'){
                    this.order.order_type = 'DESC'
                }else{
                    this.order.order_type = 'ASC'
                }
                this.order.order_field = header.name
                // console.log('Updated order:', this.order);
                this.$emit('onUpdateSorting', this.order)
            }

        },
        isSort(fieldName){
            if(fieldName === this.order.order_field && this.order.order_type === 'ASC'){
                return '-rotate-180'
            }else if(fieldName === this.order.order_field && this.order.order_type === 'DESC'){
                return '-rotate-0'
            }else{
                return ''
            }
     
    }

    
    
  }
}
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
}

.search-bar input[type="text"] {
  width: 25%;
  padding: 10px;
  border: 1px solid maroon;
  border-radius: 5px;
  font-size: 18px;
}

.search-bar input[type="text"]::placeholder {
  color: maroon;
  opacity: 0.5;
  font-size: 18px;
}

/* table headers design */
.table-auto thead tr {
    background-color: #8d1436;
    color: white;
}

/* table rows */
.table-auto tbody tr {
    background-color: white;
    color: black;
    
    
}

/* table cells */
.table-auto td {
    padding: 5px;
}

/*hover effect */
.table-auto tbody tr:hover {
    background-color: #e3e3ee; 
}
</style>