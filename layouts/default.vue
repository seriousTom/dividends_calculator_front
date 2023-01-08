<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <ul>
          <li>
            <NuxtLink to="/login">Login</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>
