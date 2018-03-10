<template>
	<div class="alert">
		<div class="alert__shadow"></div>
		<div class="alert__box">
			<p>{{text}}</p>
			<button @click="confirm">确定</button>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    }
	},
	methods: {
		confirm () {
			this.$emit('confirm')
		}
	}
}
</script>

<style>
.alert {
	width: 100%;
}
.alert__shadow{
	position: fixed;
	width: 100%;
	top:0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.589);
}
.alert__box {
	position: absolute;
	top:50%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 80%;
	height: 120px;
	background: #fff;
	z-index: 10;
}
.alert__box p {
	height: 90px;
	line-height: 90px;
	text-align: center;
	color: rgb(46, 46, 46);
}
.alert__box button {
	display: block;
	width: 100%;
	height: 30px;
	border-top:1px solid #ccc;
	text-align: center;
	color: #f86a18;
}
</style>
