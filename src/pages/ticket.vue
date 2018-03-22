<template>
    <div class="ticket">
        <img :src="imgUrl" alt="">
        <span>长按上方准考证图片保存并自行打印</span>
    </div>
</template>

<script>
export default {
    created() {
        console.log(this.$route.query)
    },
    computed: {
        imgUrl() {
            return this.$route.query.url;
        }
    }
}
</script>
<style>
.ticket {
    position: relative;
    /* height: 100%; */
    padding-top: 135%;
    
}
.ticket img {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
}
.ticket span {
    position: absolute;
    top: 59vw;
    left: 13vw;
    color: red;
    font-size: 13px;
}
</style>


