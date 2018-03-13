<template>
  <div class="popup">
      <div class="popup-box" v-if="open">
				<slot></slot>
      </div>
      <div class="popup-shadow" @touchmove.prevent @click.prevent="clickShadow" v-if="open"></div>
  </div>
</template>
<script>
export default {
	props: {
		open: {
			type: Boolean
		}
	},
	methods: {
		clickShadow() {
			this.$emit('clickShadow')
		}
	}
}
</script>
<style>
.popup-box {
  box-sizing: border-box;
  padding-top:15px;
  background: #fff;
  height: 250px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.popup-shadow {
  background: rgba(0, 0, 0, 0.534);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
