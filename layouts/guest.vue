<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/" class="font-bold">Home</NuxtLink>
        <ul class="flex gap-4">
          <li>
            <NuxtLink to="/login" class="btn mr-3">Login</NuxtLink>
            <NuxtLink to="/login" class="btn">Register</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <div class="container mx-auto p-4">
      <slot />
    </div>
  </div>
</template>
