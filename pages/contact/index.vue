<template>
  <div class=" flex flex-col">
    <header class="banner_single mb-10">
      <div class="flex justify-center absolute items-center w-full flex-col">
        <h2 class="text-white text-3xl font-semibold">
          LIÊN HỆ
        </h2>
        <span class="text-orange text-lg">
          <nuxt-link tag="span" class="text-white text-lg cursor-pointer" to="/">
            TRANG CHỦ
          </nuxt-link>
          / LIÊN HỆ
        </span>
      </div>
    </header>
    <div class="sm:px-14  px-8 mt-16 mb-20 flex flex-col space-y-7">
      <div class="space-y-4">
        <h1 class="text-3xl font-medium">
          Contact Information
        </h1>
        <p class="text-[1rem]">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque,
          auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vestibulum ac diam sit amet quam vehicula elementum
          sed sit amet dui. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
          Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus magna justo, lacinia eget consectetur sed,
          convallis at tellus. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Curabitur arcu erat,
          accumsan id imperdiet et, porttitor at sem.
        </p>
      </div>
      <div class="grid sm:grid-cols-3 grid-cols-1">
        <div class="col-span-1 flex flex-col space-y-2 text-[1rem] text-black gap-7 sm:mb-0 mb-2">
          <div class="flex items-center">
            <i class="fa-solid fa-location-dot mr-4" />
            <p> 32, Choto Mirzapur, Ahsan Ahmed Road Khulna 9100, Bangladesh</p>
          </div>
          <div class="flex  items-center">
            <i class="fa-solid fa-phone mr-4" />
            <div>
              <p>+ 84 357 433 800    </p>
              <p>+ 84 888 686 868    </p>
            </div>
          </div>
          <div class="flex  items-center">
            <i class="fa-solid fa-envelope mr-4" />
            <div>
              <p>admin@gmail.com  </p>
              <p>Aelgbg@gmail.com</p>
            </div>
          </div>
        </div>
        <div class="col-span-2">
          <contact-form />
        </div>
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1132409229645!2d105.80123181473144!3d21.028154485998684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab424a50fff9%3A0xbe3a7f3670c0a45f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBHaWFvIHRow7RuZyBW4bqtbiB04bqjaQ!5e0!3m2!1svi!2s!4v1664627401325!5m2!1svi!2s"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="w-full h-[60vh]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ContactForm from '@/components/contact/ContactForm.vue'
export default {
  components: {
    ContactForm
  }
}
</script>

<style lang="scss">
    .banner_single{
      background-image: url('@/static/banner/background.jpg');
      position: relative;
      background-repeat: no-repeat;
      background-size: cover cover;
      padding: 100px 0 140px 0;
      width: 100%;
    }
  </style>
