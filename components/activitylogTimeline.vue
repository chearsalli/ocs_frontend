<template>
    <div class="p-1 mt-1 mb-6">
    <h1 class="text-lg text-center font-semibold mb-6">Activity Log</h1>
    <!-- <div class="container">
      <div class="flex flex-col md:grid grid-cols-12 text-gray-50">
        <div class="flex md:contents" v-for="(item, itemIndex) in activityLogData" :key="itemIndex" >
          <div class="col-start-2 col-end-4 mr-10 md:mx-auto relative">
            <div class="h-full w-6 flex items-center justify-center">
              <div class="h-full w-1 bg-green-500 pointer-events-none"></div>
            </div>
            <div class="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
              <font-awesome-icon v-if="item.event === 'created'" :icon="['fas', 'plus']" class="icon alt" />
              <font-awesome-icon v-if="item.event === 'updated'" :icon="['fas', 'pencil']" class="icon alt" />
            </div>
          </div>
          <div class="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
            <h3 class="font-semibold text-lg mb-1  "><span class="capitalize">{{ item.event }}</span><span class="text-sm">-{{ $moment(item.updated_at).format('MMMM Do YYYY, h:mm a') }}</span> </h3>  
            <p class="leading-tight text-justify">
                {{ item.causer  }}
            </p>
            <div v-if="item.event === 'updated'">
                <div 
              class="text-xs text-left"
                v-for="(itemsAtt,attIndex) in Object.keys(item.properties.attributes)" :key="attIndex"
              >
                <span class="font-bold capitalize">
                  {{ itemsAtt.replace(/_/g, " ") }}:
                </span>
                {{ item.properties.old[itemsAtt] }}
                {{ item.properties.old[itemsAtt] }} <font-awesome-icon :icon="['fas', 'arrow-right']" class="icon alt"/> {{ item.properties.old[itemsAtt] }}
            
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="container">
      <div class="flex flex-col md:grid grid-cols-12 text-gray-700">
        <div class="flex md:contents divide-y" v-for="(item, itemIndex) in activityLogData" :key="itemIndex" >
          <div class="col-start-2 col-end-4 mr-10 md:mx-auto relative">
            <div class="h-full w-6 flex items-center justify-center">
              <div class="h-full w-1 bg-gray-400 pointer-events-none"></div>
            </div>
            <div class="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-400 shadow text-center">
              <font-awesome-icon v-if="item.event === 'created'" :icon="['fas', 'plus']" class="icon alt text-white" />
              <font-awesome-icon v-if="item.event === 'updated'" :icon="['fas', 'pencil']" class="icon alt text-white" />
            </div>
          </div>
          <div class="col-start-4 col-end-12 p-1 rounded-xl my-1 mr-auto w-full">
            <h3 class="font-semibold text-lg mb-1  "><span class="capitalize">{{ item.event }}</span><span class="text-sm">-{{ $moment(item.updated_at).format('MMMM Do YYYY, h:mm a') }}</span> </h3>  
            <p class="leading-tight text-justify">
                {{ item.causer  }}
            </p>
            <div v-if="item.event === 'updated'">
                <div 
              class="text-xs text-left"
                v-for="(itemsAtt,attIndex) in Object.keys(item.properties.attributes)" :key="attIndex"
              >
                <span class="font-bold capitalize">
                  {{ itemsAtt.replace(/_/g, " ") }}:
                </span>
                {{ item.properties.old[itemsAtt] }} <font-awesome-icon :icon="['fas', 'arrow-right']" class="icon alt"/> {{ item.properties.attributes[itemsAtt] }}
            
              </div>
            </div>
          </div>
        </div>
      </div>
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
        activityLogData: {
            type: Array,
            default() {
                return []
            }
        },
    },
    data() {
        return {

        };
    },

}
</script>