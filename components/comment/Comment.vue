<template>
  <div class="flex flex-col">
    <h2 class="text-black text-2xl font-medium">
      ĐÁNH GIÁ SÁCH
    </h2>
    <hr class="mb-3">
    <div class="mt-5 w-full max-h-96 flex flex-col overflow-y-auto">
      <div v-for="(item,index ) in comments" :key="index" class="w-full shadow flex px-10 space-x-5 py-4 relative">
        <div class="logo_comment">
          <i v-if="!item.user.avatar" class="fa-solid fa-user text-black text-xl" />
          <img v-else :src="item.user.avatar" alt="photo" class="w-[32px]">
        </div>
        <div class="detail_comment flex flex-col">
          <h2 class="text-black font-medium text-[1rem] mt-1">
            {{ item.author }}
          </h2>
          <p class="text-black font-normal text-[1rem]">
            {{ item.createdAt }}
          </p>
          <a-rate :default-value="Math.round(item.rating / 0.5) * 0.5" allow-half :disabled="true" />
          <p class="text-black font-normal text-[1rem]">
            {{ item.comment }}
          </p>
        </div>
        <div v-if="canEdit(item.user._id)"  class="absolute right-10 top-1/2">
          <button class="w-24 py-2 bg-red hover:opacity-80 text-white rounded-md font-normal" @click="deleteComment(item._id)">
            <i class="fa-solid fa-trash mr-1" />
            XÓA
          </button>
        </div>
      </div>
      <p v-if="comments.length<1" class="text-black text-[1rem] font-normal mx-10">
        Hiện tại chưa có đáng giá nào.      </p>
    </div>
    <div class=" mt-10 shadow rounded-xl">
      <div class="flex flex-col px-10 py-5">
        <a-form-model
          ref="ruleForm"
          :model="formComment"
          :rules="rules"
        >
          <a-form-model-item prop="comment">
            <a-input v-model="formComment.comment" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }" />
          </a-form-model-item>
          <a-form-model-item prop="valueRating">
            <a-rate v-model="formComment.rating" />
          </a-form-model-item>
          <a-button class="bg-[#25074d] text-white" @click="onSubmit">
            Bình Luận
          </a-button>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      value: '',
      currentUser: {},
      comments: [],
      formComment: {
        comment: '',
        rating: 4
      },
      rules: {
        comment: [{ required: true, message: 'Please write something to comment', trigger: 'blur' }]
      }
    }
  },
  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    }
  },
  mounted () {
    this.getCurrentUser()
    this.getCommentByProduct()
  },
  methods: {
    async getCommentByProduct () {
      const restData = await this.$api.comment.getComments(this.$route.params.id)
      const formatDate = []
      formatDate.push(...restData.comments)
      this.comments = formatDate.map(comment => ({
        ...comment,
        createdAt: moment(comment.createdAt).format('YYYY/MM/DD hh:mm')
      }))
    },
    async getCurrentUser () {
      this.currentUser = await JSON.parse(localStorage.getItem('info'))
    },
    canEdit (userId) {
      console.log(userId)
      return this.$store.getters.isAdmin || this.currentUser?._id === userId
    },
    onSubmit () {
      if (this.isUserLoggedIn) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.userComment()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$store.commit('showLoginModal', true)
      }
    },
    async userComment () {
      try {
        const token = localStorage.getItem('token')
        const userData = await this.$api.auth.secret(token)
        const { _id, username } = { ...userData.data }

        const formatData = {
          user: _id,
          author: username,
          comment: this.formComment.comment,
          product: this.$route.params.id,
          rating: this.formComment.rating
        }
        await this.$api.comment.addComment(formatData)
        await this.getCommentByProduct()
        this.formComment.comment = ''
      } catch (error) {
        console.log(error)
      }
    },
    async deleteComment (commentId) {
      try {
        await this.$api.comment.deleteComment(commentId)
        this.$toast.success('Xóa thành công', { timeout: 1500 })
        this.getCommentByProduct()
      } catch (error) {
        this.$toast.error('Xóa thất bại', { timeout: 1500 })
      }
    }
  }

}
</script>
