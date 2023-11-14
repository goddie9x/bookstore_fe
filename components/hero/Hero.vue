<template>
  <div>
    <section id="banner_one">
      <div class="containers">
        <div class="row">
          <div class="col-lg-6 z-[2]">
            <div class="banner_text_one ">
              <h1 class="flipInX animate-[flipIn_3s_ease-in] delay-300">
                <span class="flipInX animate-[flipIn_3s_ease-in] delay-300" style="animation-duration: 2s; animation-delay: 0.5s;"></span>
              </h1> <h3></h3> <a class="theme-btn-one bg-blacks btn_md cursor-pointer" @click.prevent="searchSubject">Mua Ngay</a>
            </div>
          </div>
          <!-- <div class="col-lg-6">
            <div class="hero_img lg:animate-[slideInRight_2.8s_ease-in] delay-300 animate-[slideInRight_2s_ease-in]">
              <img src="@/static/banner/item.png" alt="img" class="slideInRight">
            </div>
          </div> -->
        </div>
      </div>
    </section>
    <sub-hero />
  </div>
</template>
<script>
import SubHero from '@/components/hero/SubHero.vue'
export default {
  components: {
    SubHero
  },
  methods: {
    searchSubject () {
      this.$router.replace({ path: '/search', query: { keyword: '' } })
    }
  }
}
</script>

<style lang="scss" scoped>
#banner_one {
  @apply lg:py-48 pt-14 pb-32 lg:bg-[top_left] bg-[center];
    background-image: url(@/static/banner/nen_sach.jpg);
    //padding-top: 150px;
    padding-bot: 10px;
    display: flex;
    align-items: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
    // z-index: 1;
}
.banner_text_one h1 span {
    display: block;
    color: #fff;
    font-weight: 700;
    // z-index: 1;
}
.banner_text_one h1 {
  @apply lg:text-[150px] lg:-mt-3 lg:leading-[150px] text-[54px] mt-16;
    // font-size: 68px;
    text-transform: uppercase;
    font-weight: 100;
    // line-height: 150px;
}
.banner_text_one h3 {
    text-transform: uppercase;
    font-weight: 500;
    color: #f3f3f3;
    font-size: 24px;
    margin-top:10px ;
}
.bg-blacks {
    transition: all .3s ease-in-out .1s;
    border: 1px solid #000;
}
.col-lg-6 {
    flex: 0 0 50%;
    max-width: 50%;
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
}
.containers{
  @apply lg:pb-20 ;
    width: 100%;
    max-width: 1440px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
.row{
     display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}

.banner_text_one{
  // font-size: 150px;
    text-transform: uppercase;
    font-weight: 100;
    // line-height: 150px;
}
.bg-blacks {
    transition: all .3s ease-in-out .1s;
    border: 1px solid #000;
    background-color: #000;
    color: #fff;
}
.bg-blacks:hover {
    color: #000;
    background-color: #fff;
    border: 1px solid #000;
}
.theme-btn-one {
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: inline-block;
    border-radius: 0;
}
.hero_img img {
    // top: -163px;
  @apply lg:top-[-163px] lg:right-0 lg:max-w-[90%] max-w-[170%];
    position: absolute;
    right: 40px;
    // z-index: 1;
}
.theme-btn-one {
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: inline-block;
    border-radius: 0;
}
.btn_md {
  @apply lg:px-9 lg:py-4 px-6 py-3;
    // padding: 16px 35px;
}
.banner_text_one a {
    margin-top: 30px;
}
</style>
