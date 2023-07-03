<template>
    <div class="container">
  <header>
    <slot name="header" text="Welcome" count="4"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer" mes="Message"></slot>
  </footer>
</div>
</template>