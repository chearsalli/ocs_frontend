import Vue from "vue"
// import axios from 'axios';


export const state = () => ({
    initialLoad: true,
    loading: false,
    numOfItems: 5,
    data: {},
    headers: [],
    filters: {},
    filterValues: [],
    order:{},
    lastORNumber: null,
    or_data: []
    // order_field: '',
    // order_type: ''
})

export const actions = {
    async getDataList ({ state, commit }, payload) {
        commit('GET_DATA_LIST_REQUEST')
        try {
            let tableParams = Object.assign(payload.data, state.filterValues)
            tableParams = Object.assign(tableParams, state.order)
            const data = await this.$axios.$get(`/cashier`, {params: tableParams})
            await commit('GET_DATA_LIST_SUCCESS', data.request)
        } catch (error) {
            if(error.response.status===422){  
                let errList = ``;
                const fields = Object.keys(error.response.data.errors)
                fields.forEach((field) => {
                const errorArr = error.response.data.errors[field]
                errorArr.forEach((errMess) => {
                    errList += `<li>${errMess}</li>`
                })
            })
                const errMessage = `Validation Error: ${errList}`
                await commit('alert/ERROR', errMessage, { root: true })
            }else{
                const errMessage = `Something went wrong while performing your request. Please contact administrator`
                await commit('alert/ERROR', errMessage, { root: true })
            }
            commit('GET_DATA_FAILED', error)
        }
    },
    async getDataByORNumber ({ state, commit }, payload) {
        commit('GET_DATA_LIST_REQUEST')
        try {
            const data = await this.$axios.$get(`/cashier`, {params: payload})
            await commit('GET_DATA_BY_OR_SUCCESS', data.request)
        } catch (error) {
            if(error.response.status===422){  
                let errList = ``;
                const fields = Object.keys(error.response.data.errors)
                fields.forEach((field) => {
                const errorArr = error.response.data.errors[field]
                errorArr.forEach((errMess) => {
                    errList += `<li>${errMess}</li>`
                })
            })
                const errMessage = `Validation Error: ${errList}`
                await commit('alert/ERROR', errMessage, { root: true })
            }else{
                const errMessage = `Something went wrong while performing your request. Please contact administrator`
                await commit('alert/ERROR', errMessage, { root: true })
            }
            commit('GET_DATA_FAILED', error)
        }
    },
    create ({ commit }, data) {
        commit('CREATE_DATA_REQUEST')
   
        return this.$axios.$post('/cashier', data)
        .then(function (response) {
            commit('alert/SUCCESS', 'Successfully created', { root: true })
            commit('CREATE_DATA_SUCCESS', response.data)
        })
        .catch((error) => {
            commit('alert/ERROR', 'Validation Error', { root: true })
            commit('CREATE_DATA_FAILED', error)
            return error.response
        })
    },
    update ({ commit }, data) {
        commit('UPDATE_DATA_REQUEST')
       
        return this.$axios.$put(`/cashier${data.id}`, data)
        .then(function (response) {
            commit('alert/SUCCESS', 'Successfully updated', { root: true })
            commit('UPDATE_DATA_SUCCESS', response.data)
        })
        .catch((error) => {
            commit('alert/ERROR', 'Validation Error', { root: true })
            commit('UPDATE_DATA_FAILED', error)
            return error.response
        })
    },
    async getFilters({ commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/cashier`, {params: payload.data})
            await commit('GET_FILTER_SUCCESS', {key: payload.data.column_name, filter:data.courses})
        } catch (error) {
            if(error.response.status===422){  
                let errList = ``;
                const fields = Object.keys(error.response.data.errors)
                fields.forEach((field) => {
                    const errorArr = error.response.data.errors[field]
                errorArr.forEach((errMess) => {
                    errList += `<li>${errMess}</li>`
                })
            })
                const errMessage = `Validation Error: ${errList}`
                await commit('alert/ERROR', errMessage, { root: true })
            }else{
                const errMessage = `Something went wrong while performing your request. Please contact administrator`
                await commit('alert/ERROR', errMessage, { root: true })
            }
            commit('GET_DATA_FAILED', error)
        }
    },

    async acceptPayment({ commit }, requestData) {
        commit('ACCEPT_REQUEST_PAYMENT');
        try {
            await this.$axios.$put(`/accept-update-cashier/${requestData}`);
            commit('ACCEPT_PAYMENT_SUCCESS', requestData);
        } catch (error) {
            commit('ACCEPT_PAYMENT_FAILED', error);
            throw error;
        }
    },

    // async markAsPaid({ commit }, requestData) {
    //     commit('MARK_AS_PAID_REQUEST');
    //     try {
    //         await this.$axios.$put(`/markAsPaid/${requestData.request_id}
    //         `, {
    //             or_number: requestData.or_number
               
                
    //         });
    //         commit('MARK_AS_PAID_SUCCESS', requestData);
    //     } catch (error) {
    //         commit('MARK_AS_PAID_FAILURE', error);
    //         throw error;
    //     }
    // },
   
    async markAsPaid({ commit }, requestData) {
        commit('MARK_AS_PAID_REQUEST');
        try {
            
            await this.$axios.$put(`/markAsPaid/${requestData.request_id}`, {
                id: requestData.request_id,
                or_number: requestData.or_number
            });
            commit('MARK_AS_PAID_SUCCESS', requestData);
        } catch (error) {
            commit('MARK_AS_PAID_FAILURE', error);
            throw error;
        }
    },
    async batchMarkAsPaid({ commit }, requestData) {
        commit('MARK_AS_PAID_REQUEST');
        
        try {
            
            await this.$axios.$put(`/batch-mark-as-paid`, {
                ids: requestData.ids,
                or_number: requestData.or_number
            });
            commit('MARK_AS_PAID_SUCCESS', requestData);
        } catch (error) {
            commit('MARK_AS_PAID_FAILURE', error);
            throw error;
        }
    },
   

    async fetchLastORNumber({ commit }) {
        try {
            
            const response = await this.$axios.$get('/lastORNumber');
            commit('SET_LAST_OR_NUMBER', response.lastORNumber);
        } catch (error) {
            console.error("Error fetching last OR number:", error); 
        }
    },


    
  
 
    // async saveORNumber({ commit }, orNumber) {
    //     try {
    //         const orNumberString = String(orNumber);
    //         const response = await this.$axios.$put('/save-or-number', { orNumber: orNumberString });
    //         console.log(response.message)
    //         commit('SAVE_OR_NUMBER', orNumber);
    
    //         return response 
    //     } catch (error) {
    //         console.error('Error:', error)
    //         throw error 
    //     }
    // },
    
      
    

    // async denyPayment({ commit }, requestData) {
    //     commit('DENY_REQUEST_PAYMENT');
    //     try {
           
    //         await this.$axios.$put(`/deny-update-cashier/${requestData}`);
    //         commit('DENY_PAYMENT_SUCCESS', requestData);
    //     } catch (error) {
    //         commit('DENY_PAYMENT_FAILED', error);
    //         throw error;
    //     }
    // },
}

export const mutations = {
    GET_DATA_LIST_REQUEST (state) {
        state.loading = true
    },
    GET_DATA_FAILED (state) {
        state.loading = false
    },
    GET_DATA_LIST_SUCCESS(state, data) {
        state.data = data
        state.loading = false
        state.initialLoad = false
    },
    GET_DATA_BY_OR_SUCCESS(state, data){
        state.or_data = data
        state.loading = false
        state.initialLoad = false
    },
    GET_FILTER_SUCCESS (state, data) {
        Vue.set(state.filters, data.key, data.filter)
        // state.loading = false
    },
    GET_DATA_LIST_FAILED (state, error) {
        state.data = error
    },
    UPDATE_NUM_OF_ITEMS(state, data) {
        state.numOfItems = data
    },
    UPDATE_FILTER_VALUES(state, data) {
        state.filterValues = data
    },
    UPDATE_ORDER_VALUES(state, data){
        state.order.order_field = data.order_field
        state.order.order_type = data.order_type
    },
    CREATE_DATA_REQUEST (state) {
        state.loading = true
    },
    CREATE_DATA_SUCCESS (state) {
        state.loading = false
    },
    CREATE_DATA_FAILED (state, error) {
        state.loading = false
    },
    UPDATE_DATA_REQUEST (state) {
        state.loading = true
    },
    UPDATE_DATA_SUCCESS (state) {
        state.loading = false
    },
    UPDATE_DATA_FAILED (state, error) {
        state.loading = false
    },
    ACCEPT_REQUEST_PAYMENT(state) {
        state.loading = true;
    },
    ACCEPT_PAYMENT_SUCCESS(state) {
        state.loading = false;
        
    },
    ACCEPT_PAYMENT_FAILED(state) {
        state.loading = false;
        
    },

    DENY_REQUEST_PAYMENT(state) {
        state.loading = true;
    },
    DENY_PAYMENT_SUCCESS(state) {
        state.loading = false;
        
    },
    DENY_PAYMENT_FAILED(state) {
        state.loading = false;
      
    },

    MARK_AS_PAID_REQUEST(state) {
        state.loading = true;
    },
    MARK_AS_PAID_SUCCESS(state, orNumber) {
        state.loading = false;
        state.currentORNumber = orNumber;
    },
    MARK_AS_PAID_FAILURE(state) {
        state.loading = false;
    },
    SET_LAST_OR_NUMBER(state, lastORNumber) {
        state.lastORNumber = lastORNumber;
      },
    SAVE_OR_NUMBER(state, orNumber) {
        state.orNumber = orNumber;
      },
    
   
    

   
    
}


export const getters = {
    
    getNumOfItems(state) {
        return state.numOfItems
    },
    getDataById: (state) => (id) => {
        if(state.data.data){
            return state.data.data.find(todo => todo.id === id)
        }
    },
    getTableData(state) {
        if(state.data.data){
            let coursesData = state.data.data.map((item) => {
                const temp = {
                    id: item.id,
                    transaction_no: item.transaction_no,
                    name: item.name,
                    request: item.request,
                    fund_code_id: item.fund_code_id,
                    status: item.status,
                    action: '',
                    details: item
                };
                return temp
            })


            const paginationData = {
                last_page: state.data.last_page,
                current_page: state.data.current_page,
            }


            coursesData = Object.assign(coursesData, paginationData)


            return coursesData
        }
    },
    mergedPaymentDetails(state) {
        // Check if state.or_data is an array and contains items
        if (!Array.isArray(state.or_data) || state.or_data.length === 0) {
          return {}; // Return an empty object if no or_data is present
        }
    
        // Use reduce to merge the data
        const merged = state.or_data.reduce((acc, transaction) => {
          // Merge the paymentDetails: add the current transaction's details
          acc.paymentDetails.push({
            // or_number: transaction.or_number,
            // collecting_officer: transaction.collecting_officer,
            // name: transaction.name
            fund_code_id: transaction.fund_code_id,
            req_type: transaction.req_type,
            processing_fee: transaction.total_processing_fee
          });
    
          // Ensure that fund_code, req_type, total_processing_fee are added only once
        //   if (!acc.fund_code) acc.fund_code = transaction.fund_code_id;
        //   if (!acc.req_type) acc.req_type = transaction.req_type;
        //   if (!acc.total_processing_fee) acc.total_processing_fee = transaction.total_processing_fee;
             if (!acc.name) acc.name = transaction.name;
             if (!acc.collecting_officer) acc.collecting_officer = transaction.collecting_officer;
             if (!acc.or_number) acc.or_number = transaction.or_number;
          // Accumulate the number of copies requested (sum across all transactions)
          acc.copies_req += transaction.copies_req;
          if(transaction.total_processing_fee) acc.total += Number(transaction.total_processing_fee);
          return acc;
        }, {
          paymentDetails: [],  // Initialize an empty array for paymentDetails
          fund_code: null,     // Initialize fund_code to null
          req_type: null,      // Initialize req_type to null
          total_processing_fee: null,  // Initialize total_processing_fee to null
          copies_req: 0,      
          total: 0  // Initialize copies_req to 0
        });
    
        // Return the merged result as a JSON object (not an array)
        return merged;
      }
  
}