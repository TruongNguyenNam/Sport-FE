<template>
    <div>
        <form @submit.prevent = 'handleAdd'>
            <div class="row">
                <div class="col">
                    <input type="text" v-model="product.name" class="form-control" placeholder="Tên sản phẩm" style="width: 600px;">
                </div>
                <div class="col">
                    <input type="text" v-model="product.description" class="form-control" placeholder="Mô tả" style="width: 600px;">
                </div>
                <div class="col">
                    <input type="number" v-model="product.price" class="form-control" placeholder="Giá" style="width: 600px;">
                </div>
                <div class="col">
                    <input type="number" v-model="product.stockQuantity" class="form-control" placeholder="Số lượng" style="width: 600px;">
                </div>
                <div class="col">
                    <input type="text" v-model="product.sportType" class="form-control" placeholder="Loại thể thao" style="width: 600px;">
                </div>
                <div class="col">
                    <input type="text" v-model="product.material" class="form-control" placeholder="Chất liệu" style="width: 600px;">
                </div>
                <div class="col">
                    <input type="text" v-model="product.size" class="form-control" placeholder="Kích thước" style="width: 600px;">
                </div>
                <div class="col">
                    <input type="text" v-model="product.color" class="form-control" placeholder="Màu sắc" style="width: 600px;">
                </div>
                <div class="col">
                    <select v-model="product.categoryId" class="form-control" style="width: 600px;">
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>
                <div class="col">
                    <select v-model="product.supplierId" class="form-control" style="width: 600px;">
                        <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
                            {{ supplier.name }}
                        </option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100px;">add</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ProductService } from '../../services/ProductService';
import { CategoryService } from '../../services/CategoryService';
import { SupplierService } from '../../services/SupplierService';
import type { ProductRequest } from '../../models/product';
import { reactive, ref, onMounted } from 'vue';
import type { CategoryResponse } from '../../models/category';
import type { SupplierResponse } from '../../models/supplier';

const product = reactive<ProductRequest>({
 name: '',
 description: '',
 price: 0,
 stockQuantity: 0,
 sportType: '',
 material: '',
 size: '',
 color: '',
 sku: '', // Thêm trường SKU
 supplierId: 0,
 categoryId: 0,
 sportTypeId: [], // Thêm trường sportTypeId
 tagId: [], // Thêm trường tagId
 productSpecificationOptions: [], // Thêm trường productSpecificationOptions
 productImageIds: [], // Thêm trường productImageIds
 inventoryIds: [], // Thêm trường inventoryIds
});

const categories = ref<CategoryResponse[]>([]);
const suppliers = ref<SupplierResponse[]>([]);

onMounted(async () => {
    const page = 0;
    const size = 5;
    try {
        const categoriesList = await CategoryService.getAllCategories(page,size);
         categories.value = categoriesList.content;
        console.log('Categories:', categories.value); 
        const supplierList = await SupplierService.getAllSupplier(page,size);
        suppliers.value = supplierList.content;
        console.log('Suppliers:', suppliers.value); // Kiểm tra dữ liệu suppliers
    } catch (error) {
        console.error("Error fetching categories or suppliers:", error);
    }
});

const handleAdd = async () => {
    try {
       // Ensure product is of type ProductRequest
       const newProduct: ProductRequest = {
           ...product // Spread the existing product object
       };
       
        // Gọi API để thêm sản phẩm mới
       await ProductService.addProduct(newProduct);
       console.log('Product added successfully:', newProduct);
       
       // Reset form sau khi thêm thành công
       Object.assign(product, {
           name: '',
           description: '',
           price: 0,
           stockQuantity: 0,
           sportType: '',
           material: '',
           size: '',
           color: '',
           sku: '',
           supplierId: 0,
           categoryId: 0,
           sportTypeId: [],
           tagId: [],
           productSpecificationOptions: [],
           productImageIds: [],
           inventoryIds: [],
       });
        // Có thể thêm thông báo thành công hoặc điều hướng đến trang khác
   } catch (error) {
       console.error("Error adding product:", error);
   }
};



</script>

<style scoped>
.form-control {
    margin-top: 10px;
}
</style>