<template>
  <div class="drink-water-container" v-loading="loading">
    <h1>
      {{title}}
    </h1>
    <p>每天需要喝<span class="hightlight"> 2000ML </span>的水</p>
    <p>从现在开始记录你每天的喝水数量吧！看看达没达标！</p>
    <!-- <div class="drink-water-user-name content-line">
      <span>请输入你的用户名：</span>
      <el-input v-model="userName" placeholder="请输入user name" class="user-name-content" prefix-icon="el-icon-tickets" size="mini" @blur="handleChangeName"></el-input>
    </div> -->
    <div class="drink-water-user-name content-line">
      <span>用户名：</span>
      <span class="underline">{{userName}}</span>
    </div>

    <div class="drink-water-cup-capacity content-line">
      <span>设置你的每杯水的容量：</span>
      <el-input-number v-model="cupCapacity" class="cup-capacity-number" :min="1" :max="2000" :step="10" @change="handleChangeCupCapacity" size="mini"></el-input-number>
      <span>ML</span>
    </div>
    <div class="water-container content-line">
      <div class="img-container">
        <img src="../assets/cup1.png" alt="" class="water-img">
      </div>
      <div class="water-right">
        <p class="today-drink">今天是： <span class="underline">{{today.CNtoday}}</span> </p>
        <p class="today-drink">今天已经喝了 <span class="underline">{{totalCupNumber}}</span>  杯</p>
        <p class="today-drink">总共 <span class="underline">{{totalDrinkWater}}</span>  ML</p>
        <p v-show="!reachStandard" class="today-drink">还差 <span class="hightlight underline">{{2000 - totalDrinkWater}}</span> ML</p>
        <p v-show="reachStandard" class="today-drink reach-standard">达标啦！</p>
        <div>
          <button class="add-cup-of-water cup-button" @click="addOneCupWater">喝一杯</button>
          <button class="sub-cup-of-water cup-button" @click="subOneCupWater">减一杯</button>
        </div>
      </div>
    </div>
    <el-dialog title="设置用户名" :visible.sync="isSetUserName" :before-close="handleUserNameClose" width="70%">
       <div class="drink-water-user-name content-line">
        <span>请输入你的用户名：</span>
        <el-input v-model="userName" placeholder="请输入user name" class="user-name-content" prefix-icon="el-icon-tickets" size="mini"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUserNameClose">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="70%"
      center>
      <span>请输入用户名!用户名不能为空！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tools from '../commom/tools'
const drinkDomain = 'http://localhost:9998/drinkwater'
const getUserDataAPI = '/getdata'
const initUserDataAPI = '/initdata'
const setUserDataApi = '/setdata'

export default {
  name: 'DrinkWater',
  data () {
    return {
      title: 'You need drink WATER!',
      today: {},
      cupCapacity: 100,
      userName: '',
      totalDrinkWater: 0,
      totalCupNumber: 0,
      centerDialogVisible: false,
      isFirstUser: false,
      alertNewUser: false,
      loading: false,
      isSetUserName: true
    }
  },
  computed: {
    reachStandard () {
      if (this.totalDrinkWater >= 2000) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.today = tools.GetToday()
  },
  methods: {
    handleUserNameClose () {
      if (!this.userName) {
        this.$alert('请输入用户名', '警告', {
          confirmButtonText: '确定',
          center: true
        })
      } else {
        this.handleChangeName()
        this.isSetUserName = false
      }
    },
    handleChangeName () {
      console.log('change userName')
      this.loading = true
      this.$axios.get(drinkDomain + getUserDataAPI, {
        params: {
          username: this.userName,
          date: 'd' + this.today.date
        }
      }).then((data) => {
        this.loading = false
        console.log('get name data', data)
        if (data.data.data) {
          // 不是第一次
          let userData = data.data.data
          this.cupCapacity = userData.cup_capacity
          this.userName = userData.user_name
          this.totalDrinkWater = userData.total_drink_water
          this.totalCupNumber = userData.total_cup_number
        } else {
          this.isFirstUser = true
        }
      })
    },
    handleChangeCupCapacity () {
      console.log('change cupCapacity')
      console.log(this.cupCapacity)
    },
    addOneCupWater () {
      if (this.isFirstUser) {
        this.createNewUser()
      } else {
        this.setUserData('add')
      }
    },
    subOneCupWater () {
      if (this.isFirstUser) {
        this.createNewUser()
      } else {
        if (this.totalCupNumber === 0) {
          this.$alert('不能更少了哦', '警告', {
            confirmButtonText: '确定'
          })
        } else {
          this.setUserData('sub')
        }
      }
    },
    setUserData (operationType) {
      this.$axios.get(drinkDomain + setUserDataApi, {
        params: {
          username: this.userName,
          date: 'd' + this.today.date,
          cup_capacity: this.cupCapacity,
          operation_type: operationType
        }
      }).then((data) => {
        console.log('setUserData')
        console.log(data)
        if (operationType === 'add') {
          this.totalDrinkWater += this.cupCapacity
          this.totalCupNumber += 1
        } else if (operationType === 'sub') {
          console.log('sub')
          this.totalDrinkWater = data.data['d' + this.today.date].total_drink_water
          this.cupCapacity = data.data['d' + this.today.date].cup_capacity
          this.totalCupNumber -= 1
        }
      })
    },
    createNewUser () {
      this.$confirm('是否创建新的用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        showClose: false
      }).then(() => {
        this.$message({
          type: 'success',
          message: '创建新用户'
        })
        // 初始化
        this.$axios.get(drinkDomain + initUserDataAPI, {
          params: {
            username: this.userName,
            date: 'd' + this.today.date,
            cup_capacity: this.cupCapacity
          }
        }).then((data) => {
          this.isFirstUser = false
          this.totalDrinkWater += this.cupCapacity
          this.totalCupNumber += 1
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消创建'
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/stylus" lang="stylus">
.el-message-box {
    width: 70%;
}
.drink-water-container {
  margin: 0 auto;
  width: 50%;
  min-width: 400px;
  height: 100%;

  .hightlight {
    color: red;
    font-size: 20px;
  }

  .underline {
    text-decoration: underline;
    font-weight: bold;
  }

  .content-line {
    margin: 10px;
  }

  .drink-water-user-name {
    width 100%
    .user-name-content {
      width: 60%;
      // min-width 100px
    }
  }

  .drink-water-cup-capacity {
    .cup-capacity-number {
      width: 100px;
      max-width 200px
    }
  }

  .water-container {
    display: flex;
    width: 100%;
    text-align: left;

    .img-container {
      width: 30%;

      .water-img {
        margin-left: 20px;
        width: 100%;
      }
    }

    .water-right {
      flex: 1;
      margin: 10px 36px;

      .today-drink {
        margin-left: 10px;
      }

      .reach-standard {
        font-size: 20px;
        font-weight: bold;
        color: red;
      }

      .cup-button {
        position: relative;
        color: rgba(255, 255, 255, 1);
        text-decoration: none;
        background-color: rgba(219, 87, 5, 1);
        border: 1px solid rgba(219, 87, 5, 1);
        font-family: 'Yanone Kaffeesatz';
        font-weight: 700;
        font-size: 3em;
        display: block;
        padding: 4px;
        -webkit-border-radius: 8px;
        -moz-border-radius8px;
        border-radius: 8px;
        -webkit-box-shadow: 0px 9px 0px rgba(219, 31, 5, 1), 0px 9px 25px rgba(219, 31, 5, 1);
        -moz-box-shadow: 0px 9px 0px rgba(219, 31, 5, 1), 0px 9px 25px rgba(219, 31, 5, 1);
        box-shadow: 0px 9px 0px rgba(219, 31, 5, 1), 0px 9px 25px rgba(219, 31, 5, 1);
        margin: 20px auto;
        width: 160px;
        text-align: center;
        -webkit-transition: all 0.1s ease;
        -moz-transition: all 0.1s ease;
        -ms-transitionall: 0.1s ease;
        -o-transition: all 0.1s ease;
        transition: all 0.1s ease;
        user-selectnone;
        cursor: pointer;

        &:active {
          -webkit-box-shadow: 0px 3px 0px rgba(219, 31, 5, 1), 0px 3px 6px rgba(0, 0, 0, 0.9);
          -moz-box-shadow: 0px 3px 0px rgba(219, 31, 5, 1), 0px 3px 6px rgba(0, 0, 0, 0.9);
          box-shadow: 0px 3px 0px rgba(219, 31, 5, 1), 0px 3px 6px rgba(0, 0, 0, 0.9);
          position: relative;
          top: 6px;
        }

        &:focus {
          outline: none;
        }
      }

      .sub-cup-of-water {
        margin: 20px auto;
        width: 80px;
        font-size: 1rem;
        background-color: #7bbfea;
        border-color: #7bbfea;
        -webkit-box-shadow: 0px 9px 0px #33a3dc, 0px 9px 25px rgba(51, 163, 220, 0.7);
        -moz-box-shadow: 0px 9px 0px #33a3dc, 0px 9px 25px rgba(51, 163, 220, 0.7);
        box-shadow: 0px 9px 0px #33a3dc, 0px 9px 25px rgba(51, 163, 220, 0.7);

        &:active {
          -webkit-box-shadow: 0px 3px 0px #33a3dc, 0px 3px 6px rgba(0, 0, 0, 0.9);
          -moz-box-shadow: 0px 3px 0px #33a3dc, 0px 3px 6px rgba(0, 0, 0, 0.9);
          box-shadow: 0px 3px 0px #33a3dc, 0px 3px 6px rgba(0, 0, 0, 0.9);
          position: relative;
          top: 6px;
        }
      }
    }
  }

  .alert-new-user {
    width 50%
  }
}
</style>
