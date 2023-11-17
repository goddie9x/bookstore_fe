<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :colon="false"
    layout="vertical"
  >
    <div class="flex flex-col justify-center add_product">
      <a-form-model-item ref="name" label="Tên sách" prop="name">
        <a-input
          v-model="form.name"
          @blur="
            () => {
              $refs.name.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item ref="category" label="Thể loại" prop="category">
        <a-input
          v-model="form.category"
          @blur="
            () => {
              $refs.category.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item label="Mô tả" prop="description">
        <a-input v-model="form.description" type="textarea" :rows="4" />
      </a-form-model-item>
      <a-form-model-item
        label="Số lượng"
        prop="numberInStock"
        :rules="{
          required: true,
          message: 'Please input Activity Number',
          trigger: 'blur',
        }"
      >
        <a-input
          v-model="form.numberInStock"
        />
      </a-form-model-item>
        <!-- <a-form-model-item>
          <div>
            <a-button class="bg-blue text-white" @click="AddSize">
              Thêm
            </a-button>
            <a-button v-if="form.size.length > 1" class="bg-blue text-white" @click="DeleteSize">
              Xóa
            </a-button>
          </div>
        </a-form-model-item> -->
      <a-form-model-item label="Ảnh">
        <div class="mt-6">
          <div v-if="formDataIm.datas.length >0" class="grid grid-cols-8 gap-6">
            <img
              v-for="(item,index) in formDataIm.datas"
              :key="item"
              :src="item"
              alt="photo"
              class="w-full h-auto"
              @click="removeImage(index)"
            >
          </div>
          <div class="my-3">
            <label for="inputfile" class="cursor-pointer text-black">
              <span class="font-semibold">
                <i class="fa-regular fa-folder-open text-2xl" /> Chọn Ảnh
              </span>
              <input
                id="inputfile"
                type="file"
                accept=".jpeg,.jpg,.png,image/jpeg,image/png"
                aria-label="upload image button"
                placeholder="up"
                style="display:none"
                @change="selectFile"
              >
            </label>
          </div>

          <!-- <a-button type="primary" :class="formDataIm.datas.length >0 ? '' :'mt-4' " @click="cloudinary">
            UpLoad
          </a-button> -->
        </div>
      </a-form-model-item>
      <!-- <a-form-model-item label="Subject" prop="subject">
        <a-switch v-model="form.subject" :class="form.subject? 'bg-blue' : 'bg-[#ccc]'" />
        <span class="text-black ml-4">{{ form.subject ? 'Men' : 'Women' }}</span>
      </a-form-model-item> -->
      <div class="grid grid-cols-2 gap-7">
        <a-form-model-item ref="price" label="Giá bán" prop="price">
          <a-input
            v-model="form.price"
            addon-after="VND"
            @blur="
              () => {
                $refs.price.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item ref="originalPrice" label="Giá gốc" prop="originalPrice">
          <a-input
            v-model="form.originalPrice"
            addon-after="VND"
            @blur="
              () => {
                $refs.originalPrice.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
      </div>
      <a-form-model-item class="btn-create">
        <a-button type="primary" @click="onSubmit">
          Thêm
        </a-button>
      </a-form-model-item>
    </div>
  </a-form-model>
</template>
<script>
// import UpLoad from '@/components/admin/products/UpLoad.vue'
import { isValidCost } from '@/assets/validators.js'
export default {
  components: {
    // UpLoad
  },
  data () {
    return {
      // Arraysize: 1,
      formDataIm: {
        files: [],
        datas: []
      },
      other: '',
      form: {
        name: '',
        category: '',
        description: '',
        numberInStock: '',
        images: [],
        subject: false,
        price: '',
        originalPrice: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 100, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        category: [
          { required: true, message: 'Please input Activity category', trigger: 'blur' },
          { min: 3, max: 100, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        description: [{ required: true, message: 'Please input activity description', trigger: 'blur' }],
        // size: [{ required: true, message: 'Please input activity size', trigger: 'blur' }],
        price: [{
          required: true,
          trigger: 'blur',
          validator (rule, value, callback) {
            if (isValidCost(value)) {
              callback()
            } else {
              callback(new Error('Invalid price'))
            }
          }
        }],
        originalPrice: [{
          required: true,
          trigger: 'blur',
          validator (rule, value, callback) {
            if (isValidCost(value)) {
              callback()
            } else {
              callback(new Error('Invalid price'))
            }
          }
        }],
        images: [{ required: true, message: 'Please input activity images', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.submitdata(this.form)
          // alert('submit!')
          // setTimeout(() => {
          //   location.reload()
          // }, 2000)
          console.log(this.form)
          this.$toast.success('Thêm sách thành công', { timeout: 1500 })
          this.form.images = []
        } else {
          console.log('Lỗi!!')
          return false
        }
      })
    },
    async submitdata (form) {
      try {
        await this.cloudinary()
        await this.$api.product.addProduct(form)
      } catch (error) {
        console.log(error)
      }
    },
    // AddSize () {
    //   this.form.size.push({
    //     name: '',
    //     number: null
    //   })
    //   // this.Arraysize++
    // },
    // DeleteSize () {
    //   if (this.form.size.length > 1) {
    //     this.form.size.pop()
    //   }
    //   // this.Arraysize--
    // },

    // upload img
    removeImage (index) {
      this.formDataIm.datas.splice(index, 1)
      this.formDataIm.files.splice(index, 1)
      console.log('formData: ', this.formDataIm.datas)
      console.log('form: ', this.form.images)
    },
    async selectFile (e) {
      const file = e.target.files[0]
      this.formDataIm.files.push(file)
      /* Make sure file exists */
      if (!file) { return }

      /* create a reader */
      const readData = f => new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(f)
      })

      /* Read data */

      const data = await readData(file)
      this.formDataIm.datas.push(data)
      console.log(this.formDataIm.datas)

      /* upload the converted data */
    },
    async cloudinary () {
      console.log(this.formDataIm.datas)
      for (let i = 0; i < this.formDataIm.datas.length; i++) {
        await this.$cloudinary.upload(this.formDataIm.datas[i], {
          folder: 'Home/andshop',
          uploadPreset: 'bnmyktwk'
        }).then(res => this.form.images.push(res.url))
      }
    },
    resetForm () {
      this.formDataIm.datas = []
      this.formDataIm.files = []
    }
  }
}
</script>

<style lang="scss">
  .add_product{
    .ant-form-item{
        @apply flex flex-col
    }
    .ant-form-item-control-wrapper{
      @apply w-full
    }
    .ant-form-item-label{
      @apply text-grey_dark font-medium
    }
    .ant-form-item-label{
      @apply w-full
    }
    .ant-btn{
      @apply bg-[#25074d] lg:w-24 lg:h-9 hover:bg-blue focus:bg-blue hover:text-white focus:text-white
    }
  }
.btn-create{

  .ant-form-item-control{
      @apply flex justify-center ;
      .ant-btn{
        @apply lg:w-32 lg:h-11
      }
  }
}
</style>
