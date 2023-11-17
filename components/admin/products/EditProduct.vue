<template>
  <div>
    <a-modal
      v-model="visible"
      title="Edit Product"
      :footer="null"
      class="modal_edit"
      width="1000"
      @ok="handleOk"
    >
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
          <a-form-model-item label="Ảnh">
            <div class="mt-6">
              <div v-if="form.images.length >0" class="grid grid-cols-8 gap-6">
                <div
                  v-for="(item,index) in form.images"
                  :key="item"
                  class="flex justify-center edit_image relative"
                >
                  <img
                    :src="item"
                    alt="photo"
                    class="w-full h-auto"
                  >
                  <i class="fa-solid fa-trash absolute top-1/2 text-white hidden cursor-pointer" @click="removeImage(index)" />
                </div>
              </div>
              <div v-if="formDataIm.datas.length>0" class="grid grid-cols-8 gap-6 mt-1 ">
                <div
                  v-for="(item,index) in formDataIm.datas"
                  :key="item"
                  class="flex justify-center edit_image relative"
                >
                  <img
                    :src="item"
                    alt="photo"
                    class="w-full h-auto"
                  >
                  <i class="fa-solid fa-trash absolute top-1/2 text-white hidden cursor-pointer" @click="removeImageData(index)" />
                </div>
              </div>
              <div class="my-3">
                <label for="inputfile" class="cursor-pointer text-black">
                  <span class="font-semibold">
                    <i class="fa-regular fa-folder-open text-2xl" /> Choose Image
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
              Lưu
            </a-button>
          </a-form-model-item>
        </div>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import { isValidCost } from '@/assets/validators.js'
export default {
  props: {
    product: {
      type: Object,
      default: () => {

      }
    }
  },
  data () {
    return {
      visible: false,
      formDataIm: {
        files: [],
        datas: []
      },
      imagesDelete: [],
      other: '',
      form: {
        _id: '',
        name: '',
        category: '',
        description: '',
        numberInStock: '',
        images: [],
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
        // number: [{ required: true, message: 'Please input activity number', trigger: 'blur' }],
        images: [{ required: true, message: 'Please input activity images', trigger: 'blur' }]

      }
    }
  },
  watch: {
    product () {
      console.log('change')
      this.form = { ...this.product }
      console.log('iamges: ', this.form.images)
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    },
    onSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.submitdata(this.form, this.imagesDelete)
          // console.log('imageDelte : ', this.imagesDelete)
          // console.log('form : ', this.form)
        } else {
          console.log('error submit!!')
          // this.$toast.error('Error system 0', { setTimeout: 1500 })
          return false
        }
      })
    },
    async submitdata (formData, imagesDelete) {
      try {
        await this.cloudinary()
        await this.$api.product.editProduct({ formData, imagesDelete })
        this.$toast.success('Lưu thành công', { timeout: 1500 })
        setTimeout(() => {
          location.reload()
        }, 1000)
      } catch (error) {
        // console.log(error)
        this.$toast.error('Lỗi', { setTimeout: 1500 })
      }
    },
    AddSize () {
      this.form.sizes.push({
        name: '',
        number: null
      })
      // this.Arraysize++
    },
    DeleteSize () {
      if (this.form.sizes.length > 1) {
        this.form.sizes.pop()
      }
      // this.Arraysize--
    },
    async editProduct (formData, imagesDelete) {
      try {
        await this.$api.product.editProduct({ formData, imagesDelete })
        this.$toast.success('Successful product repair', { timeout: 1500 })
      } catch (error) {
        // this.$toast.error('error system', { setTimeout: 1500 })
        console.log(error)
      }
    },
    // upload img
    removeImage (index) {
      const imgDelete = this.form.images.splice(index, 1)
      let str = ''
      let str2 = ''
      imgDelete.forEach((item) => {
        str = item.split('andshop/')
        str2 = str[1].split('.')
        this.imagesDelete.push(str2[0])
        // console.log(str)
      })
      console.log('img delete: ', imgDelete)
      console.log('Id delete: ', this.imagesDelete)
    },
    removeImageData (index) {
      this.formDataIm.datas.splice(index, 1)
      this.formDataIm.files.splice(index, 1)
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
      console.log(this.formDataIm)
      // this.form.images.push(data)

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
.modal_edit{
    .ant-modal{
        @apply top-0 w-1/2
    }
}

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
.edit_image:hover{
  @apply bg-white/30 ;
      i{
          @apply block transition-all
      }
}
.edit_image{
  i:hover{
      @apply text-red transition-all
  }
}
</style>
