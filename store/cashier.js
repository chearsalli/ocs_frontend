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
    lastORNumber: null
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

    async markAsPaid({ commit }, requestData) {
        commit('MARK_AS_PAID_REQUEST');
        try {
            await this.$axios.$put(`/markAsPaid/${requestData}`);
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
    MARK_AS_PAID_SUCCESS(state) {
        state.loading = false;
    },
    MARK_AS_PAID_FAILURE(state) {
        state.loading = false;
    },
    SET_LAST_OR_NUMBER(state, lastORNumber) {
        console.log("Setting last OR number:", lastORNumber); // Log the last OR number being set
        state.lastORNumber = lastORNumber;
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
    }
}
