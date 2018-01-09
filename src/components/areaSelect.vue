<template>
  <div class="areaSelect">
    <ul class="cityList">
      <li>
        <div class="citybox" @click="provinceAddressList = 1">
          <span>选择省</span>
          <input type="text" placeholder="请选择省" v-model="province" readonly>
          <img src="./img/next-yellow.png" alt="">
        </div>
      </li>
      <li>
        <div class="citybox" @click="cityAddressListshow()">
          <span>选择市</span>
          <input type="text" placeholder="请选择市" v-model="city" readonly>
          <img src="./img/next-yellow.png" alt="">
        </div>
      </li>
      <li>
        <div class="citybox" @click="areaAddressListshow()">
          <span>选择区</span>
          <input type="text" placeholder="请选择区" v-model="area" readonly>
          <img src="./img/next-yellow.png" alt="">
        </div>
      </li>
      <li>
        <div class="end">
          <div>详细地址</div>
          <textarea placeholder="请输入收件人的详细地址" v-model="detaileAddress"></textarea>
        </div>
      </li>
    </ul>
    <div class="provinceAddressList" v-show="provinceAddressList === 1" @click.stop="provinceAddressList = 0">
      <div class="listContainer" @click.stop="">
        <ul class="list">
          <li v-for="(item,index) in infoList" @click="selectedProvince(item.id)">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="cityAddressList" v-show="cityAddressList === 1" @click.stop="cityAddressList = 0">
      <div class="listContainer" @click.stop="">
        <ul class="list">
          <li @click="selectedCities(item2.id)" v-for="(item2,index) in cityList">{{item2.name}}</li>
        </ul>
      </div>
    </div>
    <div class="areaAddressList" v-show="areaAddressList === 1" @click.stop="areaAddressList = 0">
      <div class="listContainer" @click.stop="">
        <ul class="list">
          <li @click="selectedArea(item3.id)" v-for="(item3,index) in areaList">{{item3.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import addressInfo from './addressList'

  export default {
    name: "area-select",
    data() {
      return {
        infoList: [],         //实例创建时赋值，所有的地址信息
        cityList: [],         //选择省份后对应城市信息
        areaList: [],         //区县信息
        province: '',         //选择地址后，省份
        city: '',             //选择城市    市区
        area: '',             //区县        区县
        provinceAddressList: 0,       //维护省份列表显示隐藏
        cityAddressList: 0,           //维护城市列表显示隐藏
        areaAddressList: 0            //w维护区县列表显示隐藏
      }
    },
    methods: {
      selectedProvince(id) {
        this.cityList = [];
        for (var i = 0; i < this.infoList.length; i++) {
          if (id == this.infoList[i].id) {
            this.cityList = this.infoList[i].city;
            this.province = this.infoList[i].name;
            this.provinceAddressList = 0;
          }
        }
      },
      selectedCities(id) {
        this.areaList = [];
        for (var i = 0; i < this.cityList.length; i++) {
          if (id == this.cityList[i].id) {
            this.areaList = this.cityList[i].district;
            this.city = this.cityList[i].name;
            this.cityAddressList = 0;
          }
        }
      },
      selectedArea(id) {
        if (this.areaList.length <= 0) {
          this.cityList.push({name: '请选择市', id: -1});
        }
        for (var i = 0; i < this.areaList.length; i++) {
          if (id === this.areaList[i].id) {
            this.area = this.areaList[i].name;
            this.areaAddressList = 0;
          }
        }
      },
      cityAddressListshow() {
        if (this.cityList.length <= 0) {
          this.cityList.push({name: '请选择省份', id: -1});
          console.log(123)
        }
        this.cityAddressList = 1;
      },
      areaAddressListshow() {
        if (this.areaList.length <= 0) {
          this.areaList.push({name: '请选择市', id: -1});
          console.log(123)
        }
        this.areaAddressList = 1;
      }
    },
    created() {
      this.infoList = addressInfo.infoList;
    }
  }
</script>

<style scoped>
  /****************设置input狂默认样式*****************/
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #666;
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #666;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #666;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #666;
  }
  input {
    border: none;
    outline: none;
    color: #000;
  }

  /**********************选择框样式********************/
  .cityList {
    margin-top: 3.5%;
    width: 100%;
  }

  .cityList li {
    width: 100%;
    background-color: white;
  }

  .end {
    width: 100%;
    height: 20vh;
    padding: 3% 0 3% 3%;
    box-sizing: border-box;
  }

  .end textarea {
    width: 100%;
    height: 15vh;
    border: none;
    outline: none;
    font-size: 0.32rem;
    resize: none;
  }

  .citybox {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    flex-direction: row;
    height: 1.2rem;
    line-height: 1.2rem;
    width: 94%;
    border-bottom: 1px solid #eee;
    margin-left: 3%;
    box-sizing: border-box;
    position: relative;
  }

  .citybox img {
    width: 0.192rem;
    height: 0.352rem;
    position: absolute;
    right: 0;
    top: 50%;
    transform: transLateY(-50%);
  }

  .citybox input {
    text-align: right;
    font-size: 0.32rem;
    padding-right: 4%;
  }

  /**************地址选择*************/
  .provinceAddressList, .cityAddressList, .areaAddressList {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, .3);
    padding: 40% 10%;
  }

  .listContainer {
    width: 8rem;
    height: 40vh;
    margin: 0 auto;
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: 5px;
  }

  .list {
    width: 8.4rem;
    min-height: 40vh;
    background-color: #ffffff;
  }

  .list li {
    width: 100%;
    line-height: 0.8rem;
    font-size: 0.4rem;
    text-align: center;
    padding-right: 0.4rem;
  }

  .list li:hover {
    background-color: #ccc;
  }
</style>
