<template>
    <div>
        <h2>List of Supplier</h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in SupplierList" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                </tr>
            </tbody>
        </table>
        
        <div class="pagination">
            <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 0">Previous</button>
            <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
            <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages - 1">Next</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { SupplierResponse, SuppliersApiResponse } from '../../models/supplier';
import { SupplierService } from '../../services/SupplierService';

const SupplierList = ref<SupplierResponse[]>([]);
const currentPage = ref(0);
const totalPages = ref(0);

const fetchSuppliers = async (page: number) => {
    try {
        const response: SuppliersApiResponse = await SupplierService.getAllSupplier(page, 2);
        SupplierList.value = response.content;
        totalPages.value = response.totalPages; // Cập nhật tổng số trang
        console.log(SupplierList.value);
    } catch (error) {
        console.error("Error fetching supplier:", error);
        SupplierList.value = [];
    }
};

const goToPage = (page: number) => {
    if (page < 0 || page >= totalPages.value) return; // Kiểm tra ranh giới
    currentPage.value = page;
    fetchSuppliers(page); // Gọi lại dữ liệu cho trang mới
};

onMounted(() => {
    fetchSuppliers(currentPage.value); // Tải dữ liệu cho trang đầu tiên
});
</script>

<style scoped>
.pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.pagination button {
    margin: 0 10px;
}
</style>