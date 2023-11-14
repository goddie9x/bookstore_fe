<template>
  <div class="tab-profile">
    <a-tabs
      default-active-key="1"
      tab-position="left"
    >
      <a-tab-pane key="1">
        <span slot="tab"><i class="fa-solid fa-user pr-2" />ACCOUNT DETAILS</span>
        <Profile />
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab"><i class="fa-solid fa-chart-line pr-2" />STATISTICAL</span>

        <div class="flex flex-col text-center">
          <UserChart />
          <p class="text-black font-medium text-lg mt-4">
            Monthly spending statistics
          </p>
        </div>
      </a-tab-pane>
      <a-tab-pane key="3">
        <span slot="tab"><i class="fa-solid fa-user-pen pr-2" />EDIT ACCOUNT</span>

        <EditProfile />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import UserChart from './UserChart.vue'
import Profile from './Profile.vue'
import EditProfile from './EditProfile.vue'
export default {
  components: {
    Profile,
    EditProfile,
    UserChart
  },
  data () {
    return {
      mode: 'top'
    }
  },
  methods: {
    callback (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss">
.tab-profile{
    .ant-tabs-tab{
        @apply mr-3 font-medium flex border border-solid border-[#e0e0e0] w-64 text-black bg-white  rounded-sm
    }
    .ant-tabs .ant-tabs-left-bar .ant-tabs-tab {
        text-align: left;
    }
    .ant-tabs .ant-tabs-left-bar .ant-tabs-ink-bar{
        @apply w-0
    }
    .ant-tabs .ant-tabs-left-bar .ant-tabs-tab{
        @apply m-0  mr-3 py-3
    }
    .ant-tabs .ant-tabs-left-bar .ant-tabs-tab:hover{
      @apply bg-[#f79837] text-white   duration-300 transition-all ease-in-out delay-100
    }
    .ant-tabs-tab-active{
      @apply  bg-[#f79837] text-white
    }
}
</style>
