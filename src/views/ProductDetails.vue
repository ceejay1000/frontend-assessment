<template>
  <section class="product-details">
    <div class="container">
      <div class="product-info relative">
        <div class="mt-5 p-6">
          <RouterLink
            to="/"
            class="absolute top-2 left-16 py-2 px-4 rounded-md bg-gray-300 hover:bg-gray-400 transition-colors text-base"
          >
            <span>&lArr;</span>
            Back to products
          </RouterLink>
          <h1 class="text-center text-5xl font-medium">
            {{ title }}
          </h1>
        </div>
      </div>
      <div class="product-images flex justify-center flex-col items-center">
        <div class="flex items-start flex-col mb-10 self-start ml-44">
          <p class="text-lg">
            <span class="italic text-gray-700 mr-2">Category:</span>
            {{ product.category }}
          </p>
          <p class="text-lg">
            <span class="italic mr-2 text-gray-700">Price:</span>
            ${{ product.price }}
          </p>
          <p class="text-lg">
            <span class="italic mr-2 text-gray-700">Rating:</span>
            {{ product.rating }}
          </p>
          <p class="text-lg">
            <span class="italic mr-2 text-gray-700">Stock:</span>
            {{ product.stock }}
          </p>
          <p class="text-lg">
            <span class="italic mr-2 text-gray-700">Description:</span>
            {{ product.description }}
          </p>
        </div>
        <div
          class="grid grid-cols-3 gap-1 text-center justify-center w-4/5 mx-auto"
        >
          <img
            :src="image"
            v-for="(image, index) in product.images"
            :key="index"
            class="w-11/12 inline-block m-3"
            :alt="product.title"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProductDetails",
  data() {
    return {
      product: {},
      title: "",
      productBrands: [],
    };
  },
  methods: {
    getMatchedProduct(brandName, title) {
      let matchedBrandName = Object.keys(this.productBrands).find(
        (brand) => brand === brandName
      );
      this.product = this.productBrands[matchedBrandName].find(
        (product) => product.title === title
      );
      console.log(this.product);
      console.log(matchedBrandName);
    },
  },
  created() {
    this.productBrands =
      JSON.parse(localStorage.getItem("productBrandCategory")) || {};
    this.title = this.$route.params["title"];
    this.getMatchedProduct(this.$route.params.brand, this.$route.params.title);
    console.log(this.$route.params);
    console.log(this.productBrands);
  },
};
</script>
