<template>
  <div class="container mx-auto">
    <div class="mt-5 border-b-2 p-6">
      <h1 class="text-center text-5xl font-medium">Available Products</h1>
    </div>
    <template v-if="products.length">
      <div
        class="products w-full flex flex-wrap justify-center items-center mt-10"
      >
        <div
          class="product-card w-1/4 border-gray-200 border-2 rounded-lg m-5 overflow-hidden"
          v-for="(product, index) in products"
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
                  >Rating: <span class="text-yellow-500">&starf;</span
                  >{{ product.rating }}</span
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
    <template v-else-if="error">
      <p>{{ error }}</p>
    </template>
    <template v-if="!isLoading && !products.length">
      <div class="p-6 flex justify-center w-4/5 mx-auto mt-9">
        <p class="text-center text-xl">
          Sorry, no product available at the moment, please try again later
        </p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Products",
  data() {
    return {
      products: [],
      error: "",
      isLoading: false,
    };
  },

  created() {
    this.products = JSON.parse(localStorage.getItem("products")) || [];
  },
};
</script>
