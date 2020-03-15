<template>
  <div id="app" class="Site">
    <Header/>
    <main class="Site-content">
      <router-view></router-view>
    </main>
    <Footer/>
  </div>
</template>


<script>
  import Header from "./views/Header"
  import Footer from "./views/Footer"
  export default {
    name: "app",
    components: {
      Header,
      Footer
    }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.Site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.Site-content {
  flex: 1;
}

</style>
