import Vue from "vue"
// import * as Vue from 'vue'


export const state = () => ({
    initialLoad: true,
    loading: false,
    numOfItems: 5,
    data: {},
    headers: [],
    filters: {},
    filterValues: [],
    order:{}
    // order_field: '',
    // order_type: ''
})

export const actions = {
    async getDataList ({ state, commit }, payload) {
        commit('GET_DATA_LIST_REQUEST')
        try {
            let tableParams = Object.assign(payload.data, state.filterValues)
            tableParams = Object.assign(tableParams, state.order)
            const data = await this.$axios.$get(`/ocs_view`, {params: tableParams})
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
   
        return this.$axios.$post('/ocs_view', data)
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
    // update ({ commit }, data) {
    //     commit('UPDATE_DATA_REQUEST')
       
    //     return this.$axios.$put(`/ocs_view${data.id}`, data)
    //     .then(function (response) {
    //         commit('alert/SUCCESS', 'Successfully updated', { root: true })
    //         commit('UPDATE_DATA_SUCCESS', response.data)
    //     })
    //     .catch((error) => {
    //         commit('alert/ERROR', 'Validation Error', { root: true })
    //         commit('UPDATE_DATA_FAILED', error)
    //         return error.response
    //     })
    // },

    update({ commit }, data) {
        console.log("Request Data:", data); // Check if data object is received correctly
        commit('UPDATE_DATA_REQUEST');
       
        return this.$axios.$put(`/ocs_view/${data.id}`, data)
            .then(function (response) {
                console.log("Update Response:", response); // Check the response from the API
                commit('alert/SUCCESS', 'Successfully updated', { root: true });
                commit('UPDATE_DATA_SUCCESS', response.data);
            })
            .catch((error) => {
                console.error('Update Error:', error); // Log any errors that occur
                commit('alert/ERROR', 'Validation Error', { root: true });
                commit('UPDATE_DATA_FAILED', error);
                return error.response;
            });
    },
    
    
    async getFilters({ commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/ocs_view`, {params: payload.data})
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

    async acceptServiceRequest({ commit }, requestId) {
        commit('ACCEPT_REQUEST_REQUEST');
        try {
            // Make API call to update status of service request to "Accepted"
            await this.$axios.$put(`/ocs_view/${requestId}/accept`);
            commit('ACCEPT_REQUEST_SUCCESS', requestId);
        } catch (error) {
            commit('ACCEPT_REQUEST_FAILED', error);
            throw error;
        }
    },

    async denyServiceRequest({ commit }, requestId) {
        commit('DENY_REQUEST_REQUEST');
        try {
            // Make API call to update status of service request to "Denied"
            await this.$axios.$put(`/ocs_view/${requestId}/deny`);
            commit('DENY_REQUEST_SUCCESS', requestId);
        } catch (error) {
            commit('DENY_REQUEST_FAILED', error);
            throw error;
        }
    },
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
                    transaction_no: item.transaction_no,
                    name: item.name,
                    request: item.request,
                    target_date: item.target_date,
                    date_created: item.date_created,
                    remaining_days: item.remaining_days + " " + 'Business' + " " + 'days',
                    committed_by: item.committed_by,
                    status: item.status,
                    processing_fee: "PhP" + " " + item.processing_fee + ".00",
                    req_type: item.req_type,
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
