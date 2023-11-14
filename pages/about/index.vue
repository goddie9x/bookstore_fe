<template>
  <div class="flex flex-col">
    <header class="banner_single mb-10">
      <div class="flex justify-center absolute items-center w-full flex-col">
        <h2 class="text-white text-3xl font-semibold">
          About Us
        </h2>
        <span class="text-orange text-lg">
          <nuxt-link tag="span" class="text-white text-lg cursor-pointer" to="/">
            Home
          </nuxt-link>
          / About
        </span>
      </div>
    </header>
    <div class="my-20 grid sm:grid-cols-2 grid-cols-1 sm:px-14 px-8 gap-6">
      <div>
        <img src="@/static/imgAbout.jpg" alt="photo">
      </div>
      <div class="space-y-2">
        <h2 class="text-3xl text-black font-medium">
          ABOUT OUR ANDSHOP STORE
        </h2>
        <p class="text-2xl text-black font-normal">
          We believe that every project existing in digital world is a result of an idea and every idea has a cause.
        </p>
        <p class="text-lg  font-normal">
          For this reason, our each design serves an idea. Our strength in design is reflected by our name, our care for details. Our specialist won't be afraid to go extra miles just to approach near perfection.
          We don't require everything to be perfect, but we need them to be perfectly cared for.
        </p>
        <p class="text-lg  font-normal">
          That's a reason why we are willing to give contributions at best.
          Not a single detail is missed out under Billey's professional eyes. The amount of dedication and effort equals to the level of passion and determination. Get better, together as one. Proin eget tortor risus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur arcu erat, accumsan id imperdiet et,
          porttitor at sem. Quisque velit nisi, pretium ut lacinia in, elementum id enim.
        </p>
      </div>
    </div>

    <div class="bg-[#f6f6f6] flex flex-col mb-20 pt-20 pb-20 sm:px-14 px-8">
      <div class="flex justify-center flex-col w-full items-center space-y-2">
        <h2 class="text-3xl text-black font-medium">
          EXPERT TEAM
        </h2>
        <p class="text-lg  font-normal">
          Mauris luctus nisi sapien tristique dignissim ornare
        </p>
      </div>
      <div class="flex mt-5 justify-center mx-auto sm:space-x-8  space-x-4">
        <div class="w-36 flex justify-end">
          <img src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-9/52591436_720237038377890_7401268411050754048_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=QIeqF_zGBz4AX90yvQR&_nc_ht=scontent.fhan2-1.fna&oh=00_AfBCkIvM3eMBJXR0-_mt91k2OIW-nfa1-Ghmkv04QYnLvg&oe=63860FED" alt="photo">
        </div>
        <div class="flex flex-col space-y-2">
          <p class="text-2xl text-black font-medium">
            Đồng Văn Dương
          </p>
          <p class="text-lg">
            Be the first to establish a company
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

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
