<template>
  <div class="flex min-h-full">
    <aside
      class="z-30 w-1/5 bg-gradient-to-b from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-full fixed overflow-y-scroll"
    >
      <div class="mt-10 border-b-2 border-gray-300 pb-2">
        <h2 class="text-center text-3xl">Available Brands</h2>
      </div>
      <template v-if="products.length && !isLoading">
        <nav class="flex mt-10">
          <ul class="w-full">
            <li
              class="text-lg"
              v-for="(brand, index) in Object.keys(productBrandCategory)"
              :key="index"
            >
              <router-link
                :to="`/brand/${brand}`"
                class="py-2 block px-2 w-full hover:bg-gray-100 hover:text-black hover:cursor-pointer"
              >
                {{ brand }}
              </router-link>
            </li>
          </ul>
        </nav>
      </template>
      <div v-if="isLoading" class="p-3 text-center">
        <p class="text-xl italic text-gray-400 font-medium">Loading...</p>
      </div>
      <div
        class="container mx-auto text-center"
        v-if="!products.length && !isLoading"
      >
        No data to display :)
      </div>
    </aside>
    <main class="w-4/5 h-screen ml-60">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Products from "./components/Products.vue";

export default {
  name: "App",
  components: {
    Products,
  },
  data() {
    return {
      products: [],
      isLoading: false,
      productBrandCategory: {},
    };
  },
  methods: {
    async fetchProducts() {
      this.isLoading = true;
      try {
        let response = await fetch("https://dummyjson.com/products");
        let data = await response.json();
        this.products = data.products;
        console.log(this.products);
        this.addProductCategory();
        useProductStore().$patch({
          products: data.products,
          error: "",
          productBrandCategory: this.productBrandCategory,
          isLoading: false,
        });
      } catch (err) {
        console.log("An error occured", err);
      } finally {
        this.isLoading = false;
      }
    },
    addProductCategory() {
      this.products.forEach((product) => {
        if (this.productBrandCategory[product.brand]) {
          this.productBrandCategory[product.brand].push(product);
          return;
        }
        this.productBrandCategory[product.brand] = [product];
      });
      console.log(this.productBrandCategory);

      localStorage.setItem("products", JSON.stringify(this.products));
      localStorage.setItem(
        "productBrandCategory",
        JSON.stringify(this.productBrandCategory)
      );
    },
  },
  mounted() {
    let existingProducts = JSON.parse(localStorage.getItem("products"));
    let existingProductBrandCategories = JSON.parse(
      localStorage.getItem("productBrandCategory")
    );

    if (existingProducts) {
      this.products = existingProducts;
    }

    if (existingProductBrandCategories) {
      this.productBrandCategory = existingProductBrandCategories;
      return;
    }
    this.fetchProducts();
  },
  unmounted() {
    window.addEventListener("close", () => {
      localStorage.removeItem("productBrandCategory");
      localStorage.removeItem("products");
    });
  },
};
</script>
