<!-- <template>
	<div class="checkbox-slider">
		<input type="checkbox" v-model="checked" @change="onChange" id="checkbox">
		<label for="checkbox" class="slider"></label>
		<label for="checkbox"></label>
	</div>
</template>




<script setup>
import Vue from 'vue'

export default {
	
	props: {
		defaultChecked: {
			type: Boolean, default: false
		}
	}


    data () {
		return {
			Checked: this.defaultChecked
		}
},

methods: {
		onChange () {
			this.$emit('input', this.checked)
		}
}
}

</script> -->