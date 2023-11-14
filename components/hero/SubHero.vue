<!-- <template>
  <div class="grid lg:grid-cols-3 grid-cols-1 g gap-8 px-4 mt-28 mb-16">
    <div class="grid grid-flow-row gap-6">
      <div class="relative overflow-hidden img-zoom-hover">
        <img src="@/static/hero/hero1.png" alt="hero photo">
        <div class="product_var_one_text">
          <h4 class="color_one text-2xl font-semibold">
            OUTERWEAR
          </h4>
          <h2 class="text text-3xl text-black font-bold">
            NEW
          </h2>
          <h4 class="text-2xl text-black font-semibold pb-4">
            COLLECTION
          </h4>
          <a class="cursor-pointer theme-btn-one bg-black text-white text-[1rem] btn_sm pt-1" @click.prevent="searchSubject">SHOP NOW</a>
        </div>
      </div>
      <div class="relative overflow-hidden img-zoom-hover">
        <img src="@/static/hero/hero2.png" alt="hero photo">
        <div class="product_var_one_text">
          <h4 class="color_one text-2xl font-semibold">
            SUMMER
          </h4>
          <h2 class="text text-3xl text-black font-bold">
            NEW
          </h2>
          <h4 class="text-2xl text-black font-semibold pb-4">
            COLLECTION
          </h4>
          <a class="cursor-pointer theme-btn-one bg-black text-white text-[1rem] btn_sm pt-1" @click.prevent="searchSubject">SHOP NOW</a>
        </div>
      </div>
    </div>
    <div>
      <div class="relative overflow-hidden img-zoom-hover">
        <img src="@/static/hero/hero3.png" alt="hero photo">
        <div class="product_text_mid">
          <h4 class="color_one text-3xl  font-bold">
            10% OFFER
          </h4>
          <h2 class="text text-2xl text-black font-semibold">
            NEW
          </h2>
          <h4 class="text-2xl text-black font-semibold pb-4">
            COLLECTION
          </h4>
          <a href="/shop" class="theme-btn-one bg-black text-white text-[1rem] btn_sm pt-1">SHOP NOW</a>
        </div>
      </div>
    </div>
    <div class=" grid-flow-row gap-6 lg:grid hidden ">
      <div class="relative overflow-hidden img-zoom-hover">
        <img src="@/static/hero/hero4.png" alt="hero photo">
        <div class="product_var_one_text">
          <h2 class="text text-3xl text-black font-bold">
            NEW
          </h2>
          <h4 class="text-2xl text-orange font-semibold pb-4">
            ARRIVALS
          </h4>
          <a class="cursor-pointer theme-btn-one bg-black text-white text-[1rem] btn_sm pt-1" @click.prevent="searchSubject">SHOP NOW</a>
        </div>
      </div>
      <div class="relative overflow-hidden img-zoom-hover">
        <img src="@/static/hero/hero5.png" alt="hero photo">
        <div class="product_var_one_text">
          <h2 class="text text-3xl text-black font-bold">
            HOT
          </h2>
          <h4 class="text-2xl text-orange font-semibold pb-4">
            COLLECTION
          </h4>
          <a class="cursor-pointer theme-btn-one bg-black text-white text-[1rem] btn_sm pt-1" @click.prevent="searchSubject">SHOP NOW</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    searchSubject () {
      this.$router.replace({ path: '/search', query: { keyword: '' } })
    }
  }
}
</script>
<style lang="scss">
.btn_sm{
    @apply py-[10px] px-4;
}
.img-zoom-hover img{
    transition: all .5s ease-out;
}
.img-zoom-hover:hover{
    img{
        @apply transition-all duration-500 ease-in scale-110;
    // transition: all .5s ease-in;
    // scale: 1.1;

    }
}
.btn_sm:hover{
    @apply text-black bg-white border-[1px] transition-all ease-in-out duration-200;
}
.product_var_one_text{
    @apply absolute left-10 pt-4 pb-5 px-5 w-1/2 top-1/2;
    transform: translateY(-55%);
}
.product_text_mid{
        @apply absolute left-10 pt-4 pb-5 px-5 w-1/2 top-1/2;
    transform: translateY(-20%);
}
.color_one{
    @apply text-orange
}
</style> -->
