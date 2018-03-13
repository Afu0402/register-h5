
<template>
	<div class="form-area " :class="{'form-input--fcous': focus}">
		<textarea rows="3" @focus="handlefocus" @blur="focus = false" type="text" :value="value" :disabled="disabled" :placeholder="placeholder" @input="updataValue($event.target.value)">
		</textarea>
	</div>
</template>

<script>
export default {
  name: 'form-input',
  data () {
    return {
      focus: false
    }
  },
  props: {
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: [String, Number]
    },
    disabled: {
      type: null
    }
  },
  methods: {
    updataValue(value) {
      this.$emit('input', value)
    },
    handlefocus() {
      this.focus = true
    }
  }
}
</script>

<style>
.form-area {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid rgb(240, 240, 240);
  border-radius: 4px;
  height: 80px;
  background: #fff;
}
.form-input--fcous {
  border-color: #f86a18;
}
.form-area textarea {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 14px;
  text-indent: 12px;
  color: rgb(90, 90, 90);
}
textarea:disabled{
    -webkit-text-fill-color: #000;
    -webkit-opacity: 1;
    color: #000;
}
.form-input input::-webkit-input-placeholder {
  color: rgb(90, 90, 90);
}
</style>
