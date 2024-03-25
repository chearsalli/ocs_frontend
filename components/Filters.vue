<template>
    <div class="flex">
        {{ inputValue }}
        <div v-for="(filter, filterIndex) in filters" :key="filterIndex">
            <input type="text" v-if="filter.type === 'input'" @change="inputChange($event.target.value, filter.name)" class="p-3 mx-3 border rounded-xl" placeholder="Search..." />
        </div>
        <!-- <button class="bg-green-900 p-3 px-5 rounded-md text-white" >search</button> --> 
        <button class="flex items-center justify-center bg-green-900 p-3 rounded-xl text-white -ml-10">
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35a8 8 0 10-1.42 1.42L21 21z"/>
  </svg>
</button>


 
   
  
</div>
        

    

</template>
<script>
export default {
    props: {
        filters: {
            type: Array,
            default() {
                return []
            }
        },
    },
    data() {
        return {
            inputValue: {}
        }
    },
    methods:{
        inputChange(value,name){
            console.log(value)
            this.inputValue.search = value
        }
    }
}
</script>