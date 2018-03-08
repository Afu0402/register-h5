<template>
  <div class="result">
    <div class="resutl__main">
      <h3 class="result__title">《2018小学生综合素养测评》</h3>
      <div class="result__wrap">
        <p class="result__succeed">报名成功</p>
        <p class="result__hint">请下载注考证自行打印</p>
        <div class="result__voucher"></div>
        <button class="button">保存准考证到相册</button>
        <hr/>
        <div class="result__grade">
          <div class="result__pass">
            <span>你的综合素养测评结果为：</span>
            <button class="result__tag">通过</button>
          </div>
          <div class="result__content">
            <span>成绩:</span>
            <span>A</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  
</script>

<style>
  .result {
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    overflow: auto;
  }
  
  .resutl__main {
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  
  .result__title {
    background: #ccc;
    color: #535353;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    height: 30px;
  }
  .result__wrap {
    padding: 12px;
  }
  .result__hint {
    font-size: 14px;
    color: rgb(71, 71, 71);
  }
  .result__voucher {
    width: 100%;
    height: 130px;
    background: #ccc;
  }
  .result__succeed {
    margin:3px 0 15px 0;
    font-size: 36px;
    color: #4f9e08;
    text-align: center;
  }
  .result__succeed::before {
    content: '';
    display: inline-block;
    position: relative;
    top: 15px;
    right: 10px;
    width: 60px;
    height: 60px;
    background: url("./succeed.png") no-repeat;
    background-size: cover;
  }
  .button {
    display: block;
    margin: 12px auto;
    padding:8px 10px;
    background: #eb7b16;
    color: #fff;
    border-radius:20px;
  }
  .result__pass {
    font-size: 14px;
    color: rgb(95, 95, 95);
  }
  .result__tag {
    padding:2px 4px;
    border-radius: 8px;
    color: #fff;
    background: #4f9e08;
  }
  .result__content {
    height: 110px;
    color: rgb(95, 95, 95);
    text-align: center;
    line-height: 110px;
  }
  .result__content span:nth-child(2) {
    font-size:70px;
    color: #4f9e08;
  }
  .result__content span:nth-child(1) {
    position: relative;
    top: -20px;
    right: 20px;
  }
</style>
