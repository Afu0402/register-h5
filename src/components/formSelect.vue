
<template>
    <div class="form-select">
        <div @click="openSelect">
            <span class="form-select__input">{{value ? value : label}}</span>
            <span :class="selectName"></span>
        </div>
        <ul class="form-select__content" v-show="selectSwitch">
            <template v-if="selectList">
                <li 
                v-for="(item,index) in selectList" 
                :key="index" 
                :class="{'form-select__active': value === item}"
                @click="selected(item)">{{item}}</li>
            </template>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'form-select',
        data () {
            return {
                selectSwitch: false,
                value: ''
            }
        },
        props: {
            selectList: {
                type: Array
            },
            label: {
                type: [String,Number]
            }
        },
        computed: {
            selectName () {
                return this.selectSwitch? 'triangle-down' : 'triangle-up'
            }
        },
        methods: {
            openSelect () {
                this.selectSwitch = !this.selectSwitch
            },
            updataValue(value) {
                this.$emit('input', value)
            },
            selected(val) {
                this.value = val
                this.$emit('input', val)
                this.openSelect()
            }
        }
    }
</script>

<style>
    .form-select {
        box-sizing: border-box;
        position: relative;
        padding:0 12px;
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 35px;
        margin-bottom: 10px;
    }
    
    .form-select__input {
        display: inline-block;
        width: 80%;
        height: 100%;
        font-size: 14px;
        line-height: 35px;
        color: rgb(161, 161, 161);
    }
    .form-select>div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .triangle-up {
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 10px solid rgb(170, 170, 170);
        border-radius: 2px;
    }
    .triangle-down {
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 10px solid rgb(170, 170, 170);
        border-radius: 2px;
    }
    .form-select__content {
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        background: #fff;
        left: 0;
        top: 40px;
        border:1px solid #ccc;
        border-radius: 4px;
        color: rgb(156, 156, 156);
        overflow: hidden;
        z-index:1;
    }
    .form-select__content li {
        height: 26px;
        font-size: 14px;
        line-height: 26px;
        text-indent: 12px;
    }
    .form-select__active {
        color: #f86a18;;
    }
</style>
