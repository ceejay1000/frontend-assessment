<template>
  <section>
    <div class="container">
      <div class="z-10 mt-5 border-b-2 p-6 relative">
        <h1 class="text-center text-5xl font-medium">
          {{ $route.params.brandName }}
        </h1>
        <RouterLink
          to="/"
          class="absolute top-2 left-20 py-2 px-4 rounded-md bg-gray-300 hover:bg-gray-400 transition-colors text-base"
        >
          <span>&lArr;</span>
          Back to products
        </RouterLink>
      </div>
      <div class="brand-statistics mt-6">
        <div class="flex justify-center">
          <h3 class="text-center text-2xl font-normal">Brand Statistics</h3>
        </div>
        <template v-if="Object.keys(productStats).length">
          <ul class="flex justify-evenly mt-3">
            <li
              v-for="(stats, index) in Object.keys(productStats)"
              :key="index"
            >
              <span class="italic text-gray-500 font-medium"
                >{{ stats }} :
                <span v-if="stats === 'Average Price'">$</span>

                <span v-if="stats === 'Average Rating'" class="text-yellow-500"
                  >&starf;
                </span>
              </span>
              <span>{{ productStats[stats] }}</span>
            </li>
          </ul>
        </template>
      </div>
      <template v-if="productBrand.length">
        <div
          class="products w-full flex flex-wrap justify-center items-center mt-10"
        >
          <div
            class="product-card w-1/4 border-gray-200 border-2 rounded-lg m-5 overflow-hidden"
            v-for="(product, index) in productBrand"
          >
            <div>
              <img
                :src="product.thumbnail"
                :alt="product.title"
                class="inline-block h-32 w-full object-cover object-center"
              />
              <div class="card-body mt-2">
                <h4 class="text-xl text-center">{{ product.title }}</h4>
                <div
                  class="product-info container mx-auto flex justify-center space-x-4 mt-2"
                >
                  <span>Price: ${{ product.price }}</span>
                  <span
                    >Rating: <span class="text-yellow-500">&starf; </span>
                    {{ product.rating }}</span
                  >
                </div>
              </div>
              <div class="card-footer flex justify-center py-1 mt-2">
                <RouterLink
                  class="bg-teal-400 px-6 py-1 font-medium rounded-md"
                  :to="`/products/${product.brand}/${product.title}`"
                >
                  Details
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: "BrandDetails",
  data() {
    return {
      productBrands: {},
      productBrand: [],
      brandName: "",
      productStats: {},
    };
  },
  methods: {
    getMatchedBrandName(brand) {
      let matchedBrand = Object.keys(this.productBrands).find(
        (brandName) => brandName === brand
      );
      this.productBrand = this.productBrands[matchedBrand];
      console.log(this.productBrand);
      console.log(brand);
    },
    getProductStats() {
      this.productStats["Average Price"] = (
        this.productBrand.reduce((total, product) => {
          return product.price + total;
        }, 0) / this.productBrand.length
      ).toFixed(2);
      this.productStats["Total Products"] = this.productBrand.length;
      this.productStats["Average Rating"] = (
        this.productBrand.reduce(
          (total, product) => product.rating + total,
          0
        ) / this.productBrand.length
      ).toFixed(2);
      console.log(this.productStats);
    },
  },
  mounted() {
    this.productBrands =
      JSON.parse(localStorage.getItem("productBrandCategory")) || {};
    this.getMatchedBrandName(this.$route.params.brandName);
    console.log(this.productBrand);
    this.getProductStats();
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        this.productBrands =
          JSON.parse(localStorage.getItem("productBrandCategory")) || {};
        this.getMatchedBrandName(this.$route.params.brandName);
        console.log(this.productBrand);
        this.brandName = this.$route.params["brandName"];
        this.getProductStats();
      }
    );
  },
};
</script>
