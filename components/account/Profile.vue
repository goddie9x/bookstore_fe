<template>
  <div class="wrapper">
    <div class="left justify-center">
      <img v-if="avatar" :src="avatar" alt="user" width="200" class="mx-auto">
      <img v-else src="@/static/default.png" alt="user" width="200" class="mx-auto">
      <h4 class="text-white font-medium text-lg">
        {{ userInfo.username }}
      </h4>
      <p class="text-white">
        BOOKSTORE
      </p>
    </div>
    <div class="right">
      <div class="info">
        <h3 class="font-medium text-lg">
          Information
        </h3>
        <div class="info_data">
          <div class="data">
            <h4 class="font-medium text-lg">
              Email
            </h4>
            <p>
              {{ userInfo.email }}
            </p>
          </div>
          <div class="data">
            <h4 class="font-medium text-lg">
              Phone
            </h4>
            <p>0001-213-998761</p>
          </div>
        </div>
      </div>

      <div class="projects">
        <h3 class="text-lg font-medium">
          Dependence
        </h3>
        <div class="projects_data">
          <div class="data">
            <h4 class="font-medium text-lg">
              Status
            </h4>
            <p>Real account confirmed.</p>
          </div>
          <div class="data">
            <h4 class="font-medium text-lg">
              Join Date
            </h4>
            <p>{{ forMatDate(userInfo.createdAt) }}</p>
          </div>
        </div>
      </div>

      <div class="social_media">
        <ul>
          <li><a href="#"><i class="fab fa-facebook-f" /></a></li>
          <li><a href="#"><i class="fab fa-twitter" /></a></li>
          <li><a href="#"><i class="fab fa-instagram" /></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    avatar () {
      return this.$store.getters.avatar
    }
  },
  mounted () {
    if (localStorage.getItem('info')) {
      this.infouser()
    }
  },
  methods: {
    infouser () {
      const userInfo = JSON.parse(localStorage.getItem('info'))
      this.userInfo = userInfo
    },
    forMatDate (a) {
      return moment(a).format('YYYY-MM-DD')
    }
  }
}
</script>

  <style>
  .wrapper{
    display: flex;
    box-shadow: 0 1px 20px 0 rgba(69,90,100,.08);
  }

  .wrapper .left{
    width: 35%;
    background: linear-gradient(to right,#f79837,#efd7c7);
    padding: 30px 25px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    text-align: center;
    color: #fff;
  }

  .wrapper .left img{
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .wrapper .left h4{
    margin-bottom: 10px;
  }

  .wrapper .left p{
    font-size: 14px;
  }

  .wrapper .right{
    width: 65%;
    background: #fff;
    padding: 30px 25px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .wrapper .right .info,
  .wrapper .right .projects{
    margin-bottom: 25px;
  }

  .wrapper .right .info h3,
  .wrapper .right .projects h3{
      margin-bottom: 15px;
      padding-bottom: 5px;
      border-bottom: 1px solid #e0e0e0;
      color: #353c4e;
    text-transform: uppercase;
    letter-spacing: 5px;
  }

  .wrapper .right .info_data,
  .wrapper .right .projects_data{
    display: flex;
    justify-content: space-between;
  }

  .wrapper .right .info_data .data,
  .wrapper .right .projects_data .data{
    width: 45%;
  }

  .wrapper .right .info_data .data h4,
  .wrapper .right .projects_data .data h4{
      color: #353c4e;
      margin-bottom: 5px;
  }

  .wrapper .right .info_data .data p,
  .wrapper .right .projects_data .data p{
    font-size: 14px;
    margin-bottom: 10px;
    color: #919aa3;
  }

  .wrapper .social_media ul{
    display: flex;
  }

  .wrapper .social_media ul li{
    width: 45px;
    height: 45px;
    background: linear-gradient(to right,#f79837,#efd7c7);
    margin-right: 10px;
    border-radius: 5px;
    text-align: center;
    line-height: 45px;
  }

  .wrapper .social_media ul li a{
    color :#fff;
    display: block;
    font-size: 18px;
  }
  </style>
