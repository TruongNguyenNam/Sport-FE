<template>
  <div class="d-flex">
    <nav class="navbar-vertical">
      <ul class="nav flex-column">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link active" aria-current="page">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/product" class="nav-link">Product</RouterLink>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
    </nav>
    <div class="content">
      <h1>Main Content Area</h1>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.d-flex {
  display: flex;
}

.navbar-vertical {
  width: 250px;
  height: 700px;
  background-color: #f8f9fa;
  padding: 1rem;
  border-right: 1px solid #ddd;
}

.navbar-vertical .nav-link {
  display: block;
  padding: 0.75rem 1rem;
  color: #000;
  text-decoration: none;
}

.navbar-vertical .nav-link.active {
  font-weight: bold;
  color: #007bff;
}

.navbar-vertical .nav-link:hover {
  background-color: #e9ecef;
  border-radius: 5px;
}

.content {
  flex: 1;
  padding: 1rem;
}
</style>
