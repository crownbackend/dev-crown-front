<template>
  <div id="app" class="Site">
    <Header :key="$route.fullPath" />
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
  @import "~bootstrap/dist/css/bootstrap-grid.min.css";
  @import "~buefy/dist/buefy.css";
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

.cursor {
  pointer-events: none;
  cursor: not-allowed;
}

.error {
  padding: 0.8rem;
  margin-top: 0.8rem;
  display: block;
  background: #ef2e55;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  color: #fff;
}

</style>
