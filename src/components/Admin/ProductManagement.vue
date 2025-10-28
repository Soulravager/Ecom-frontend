<template>
  <section class="p-4 md:p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl md:text-3xl font-bold text-indigo-700 mb-6 text-center">
      Product Management
    </h1>
    <div
      class="flex flex-col md:flex-row justify-between items-center mb-6 gap-3"
    >
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name or description..."
        class="w-full md:w-1/2 border border-gray-300 text-black rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
      />

      <button
        @click="openAddModal"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
      >
        + Add Product
      </button>
    </div>
    <div class="bg-white shadow-md rounded-xl p-4 md:p-6 overflow-x-auto">
      <table class="min-w-full border border-gray-200 text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 text-left border">Name</th>
            <th class="p-2 text-left border">Description</th>
            <th class="p-2 text-left border">Price</th>
            <th class="p-2 text-left border">Stock</th>
            <th class="p-2 text-center border">Image</th>
            <th class="p-2 text-center border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in filteredProducts"
            :key="product.id"
            class="hover:bg-gray-50 text-gray-700"
          >
            <td class="p-2 border font-medium">{{ product.name }}</td>
            <td class="p-2 border">{{ product.description }}</td>
            <td class="p-2 border">₹ {{ product.price }}</td>
            <td class="p-2 border text-center">{{ product.stock }}</td>
            <td class="p-2 border text-center">
              <img
                v-if="product.image"
                :src="product.image"
                alt="Product"
                class="w-16 h-16 object-cover rounded-lg mx-auto"
              />
            </td>
            <td class="p-2 border text-center space-x-2">
              <button
                @click="editProduct(product)"
                class="px-3 py-1 rounded-lg bg-yellow-500 text-white text-xs hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                @click="confirmDelete(product.id)"
                class="px-3 py-1 rounded-lg bg-red-600 text-white text-xs hover:bg-red-700 transition"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="filteredProducts.length === 0 && isAdmin"
        class="text-center py-6 text-gray-500 text-sm"
      >
        No matching products found.
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          @click="closeModal"
          class="absolute top-3 right-3 text-gray-900 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 class="text-xl font-bold text-gray-800 mb-4 text-center">
          {{ isEditing ? "Update Product" : "Add Product" }}
        </h2>

        <form
          @submit.prevent="isEditing ? updateProduct() : addProduct()"
          class="space-y-4"
        >
          <div>
            <label class="block text-gray-700 font-medium mb-1"
              >Product Name</label
            >
            <input
              v-model="form.name"
              type="text"
              class="w-full border rounded-lg p-2 text-gray-950 focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-1"
              >Description</label
            >
            <textarea
              v-model="form.description"
              class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 text-gray-950"
              placeholder="Enter description"
              rows="3"
              required
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 font-medium mb-1">Price</label>
              <input
                v-model="form.price"
                type="number"
                class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 text-gray-950"
                required
              />
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-1">Stock</label>
              <input
                v-model="form.stock"
                type="number"
                class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 text-gray-950"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-1">Image</label>
            <input
              type="file"
              @change="onFileChange"
              class="w-full border rounded-lg p-2 text-gray-950"
            />
          </div>

          <div v-if="form.imagePreview" class="mt-2 text-center">
            <img
              :src="form.imagePreview"
              alt="Preview"
              class="h-32 w-auto mx-auto rounded-lg shadow"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
          >
            {{ isEditing ? "Update Product" : "Add Product" }}
          </button>
        </form>
      </div>
    </div>

    <BaseModal
      :show="showDeleteModal"
      :title="modalTitle"
      :message="modalMessage"
      :confirmText="confirmText"
      closeText="Close"
      @close="closeModalPopup"
      @confirm="handleConfirmDelete"
    >
      <template #actions>
        <div class="flex justify-center gap-4">
          <button
            v-if="confirmText"
            @click="handleConfirmDelete"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
          >
            {{ confirmText }}
          </button>
          <button
            @click="closeModalPopup"
            class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg text-sm"
          >
            Close
          </button>
        </div>
      </template>
    </BaseModal>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "/src/api/axios.js";
import BaseModal from "../../components/common/ModelPopup.vue";
import useModal from "../../components/common/ModelPopup.js";

const loading = ref(true);
const products = ref([]);
const isAdmin = ref(true);
const showModal = ref(false);
const isEditing = ref(false);
const editId = ref(null);
const searchQuery = ref("");

const {
  showModal: showDeleteModal,
  modalTitle,
  modalMessage,
  confirmText,
  openModal,
  closeModal: closeModalPopup,
} = useModal();

const form = ref({
  name: "",
  description: "",
  price: "",
  stock: "",
  imageFile: null,
  imagePreview: null,
});

const fetchProducts = async () => {
  loading.value = true;
  try {
    const res = await api.get("/products");
    products.value = res.data || [];
  } finally {
    loading.value = false;
  }
};

const addProduct = async () => {
  try {
    const fd = new FormData();
    fd.append("name", form.value.name);
    fd.append("description", form.value.description);
    fd.append("price", form.value.price);
    fd.append("stock", form.value.stock);
    if (form.value.imageFile) fd.append("image", form.value.imageFile);

    await api.post("/products", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    closeModal();
    fetchProducts();
  } catch (err) {}
};

const editProduct = (product) => {
  isEditing.value = true;
  editId.value = product.id;
  form.value = {
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    imageFile: null,
    imagePreview: product.image,
  };
  showModal.value = true;
};

const updateProduct = async () => {
  try {
    const fd = new FormData();
    fd.append("name", form.value.name);
    fd.append("description", form.value.description);
    fd.append("price", form.value.price);
    fd.append("stock", form.value.stock);
    if (form.value.imageFile) fd.append("image", form.value.imageFile);

    await api.post(`/products/${editId.value}?_method=PUT`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    closeModal();
    fetchProducts();
  } catch (err) {}
};

const productIdToDelete = ref(null);

const confirmDelete = (id) => {
  productIdToDelete.value = id;
  openModal(
    "Delete Product?",
    "Are you sure you want to delete this product?",
    "Yes"
  );
};

const handleConfirmDelete = async () => {
  if (!productIdToDelete.value) return;
  try {
    await api.delete(`/products/${productIdToDelete.value}`);
    products.value = products.value.filter(
      (p) => p.id !== productIdToDelete.value
    );
    closeModalPopup();
  } catch (err) {
    closeModalPopup();
  }
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.imageFile = file;
    form.value.imagePreview = URL.createObjectURL(file);
  }
};

const openAddModal = () => {
  resetForm();
  showModal.value = true;
};
const closeModal = () => {
  resetForm();
  showModal.value = false;
};
const resetForm = () => {
  form.value = {
    name: "",
    description: "",
    price: "",
    stock: "",
    imageFile: null,
    imagePreview: null,
  };
  isEditing.value = false;
  editId.value = null;
};

const filteredProducts = computed(() => {
  const q = searchQuery.value.toLowerCase();
  return products.value.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
});

onMounted(fetchProducts);
</script>

<style scoped>
::-webkit-scrollbar {
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 8px;
}
</style>
