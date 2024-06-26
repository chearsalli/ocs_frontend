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
            const data = await this.$axios.$get(`/admin/activity-logs`, {params: tableParams})
            await commit('GET_DATA_LIST_SUCCESS', data.activity_logs)
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
    
        return this.$axios.$post('/admin/activity-logs', data)
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
        
        return this.$axios.$put(`/admin/activity-logs/${data.id}`, data)
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
            const data = await this.$axios.$get(`/courses`, {params: payload.data})
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
}
  
export const mutations = {
    GET_DATA_LIST_REQUEST (state) {
        state.loading = true
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
    getTableData(state) {
        if(state.data.data){
            // let coursesData = state.data.data.map((item) => {
            //     const temp = {
            //         firstname: item.firstname, 
            //         middlename: item.middlename,
            //         lastname: item.lastname,
            //         sex: item.sex,
            //         dob: item.dob,
            //         civilstatus: item.civilstatus,
            //         action: '',
            //         details: item
            //     };
            //     return temp
            // })

            // const paginationData = {
            //     last_page: state.data.last_page,
            //     current_page: state.data.current_page,
            // }

            // coursesData = Object.assign(coursesData, paginationData)

            // return coursesData
            return state.data.data
        }
    }
}