<template>
  <div class="activity-list">
    <div class="activity-item">
      <div class="activity-img" @click="toIntro">
        <img src="./banner.png" alt="">
      </div>
      <button class="activity-button">结果查询</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toIntro() {
      this.$router.push('/intro')
    }
  }
}
</script>

<style>
  .activity-list {
    box-sizing: border-box;
    width: 100%;
    padding: 15px;
  }
  
  .activity-item {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid #ccc;
    padding: 4px;
  }
  
  .activity-img {
    padding: 39.87% 0 0 0;
    position: relative;
  }
  
  .activity-img>img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  
  .activity-button {
    display: block;
    margin: 4px auto 0;
    width: 180px;
    height: 30px;
    background: #f86a18;
    color: #fff;
    border-radius: 90px;
  }
</style>
