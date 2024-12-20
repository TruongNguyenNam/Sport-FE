<!-- Start of Selection -->
<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên sản phẩm</th>
                    <th>Mô tả</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Loại thể thao</th>
                    <th>Thông số kỹ thuật</th>
                    <th>Tags</th>
                    <th>Hình ảnh</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in listProduct" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.stockQuantity }}</td>
                    <td>{{ product.sportType }}</td>
                    <td>{{ product.material }}</td>
                    <td>{{ product.size }}</td>
                    <td>{{ product.color }}</td>
                    <td>{{ product.sku }}</td>
                    <td>{{ product.supplierName }}</td>
                    <td>{{ product.categoryName }}</td>
                    <td>
                        <div v-for="sport in product.sportTypeName" :key="sport">
                            {{ sport }}
                        </div>
                    </td>
                    <td>
                        <div v-for="spec in product.productSpecificationOptionResponses" 
                             :key="spec.id" 
                             class="specification-item">
                            <strong>{{ spec.specificationName }}:</strong> {{ spec.value }}
                        </div>
                    </td>
                    <td>
                        <div v-for="tag in product.tagName" :key="tag">
                            {{ tag }}
                        </div>
                    </td>
                    <td>
                        <img v-for="url in product.ImageUrl" 
                             :key="url" 
                             :src="url" 
                             alt="Product image"
                             class="product-image">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ProductService } from '../../services/ProductService';
import type { ProductResponse } from '../../models/product';

const listProduct = ref<ProductResponse[]>([]);

onMounted(async () => {
    const page = 8;
    const size = 2;
    try {
        const response = await ProductService.getAllProducts(page, size);
        listProduct.value = response.content;
    } catch (error) {
        console.error("Error fetching products:", error);
        listProduct.value = [];
    }
});
</script>

<style scoped>
.specification-item {
    margin: 4px 0;
}

.product-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin: 2px;
}
</style>
