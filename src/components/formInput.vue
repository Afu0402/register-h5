
<template>
    <div class="form-input">
        <input type="text" :value="value" :placeholder="placeholder" @input="updataValue($event.target.value)">
    </div>
</template>

<script>
    export default {
        name: 'form-input',
        props: {
            value: {
                type: [String, Number]
            },
            placeholder: {
                type: [String, Number]
            }
        },
        methods: {
            updataValue(value) {
                this.$emit('input', value)
            }
        }
    }
</script>

<style>
    .form-input {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 35px;
    }
    
    .form-input input {
        width: 100%;
        height: 100%;
        font-size: 14px;
        text-indent: 12px;
        color: rgb(156, 156, 156);
    }
    
    .form-input input::-webkit-input-placeholder {
        color: rgb(161, 161, 161);
    }
</style>
