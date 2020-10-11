<template>
  <div id="app" class="Site container-fluid">
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
  @import "~highlight.js/scss/solarized-light";
  @import "~bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css";
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

.show-more {
  margin-bottom: 20px;
  margin-top: 20px;
}

  .notification {
    background-color: #D2D2D2;
  }

  .danger {
    color: #e74a3b;
  }
  .success {
    color: #1cc88a;
  }

  .borderTextarea {
    border: solid #7f7f7f 2px;
  }

  .videoCard {
    border: #7f7f7f solid 2px;
    padding: 10px;
    margin-bottom: 10px;
  }

  @media (prefers-color-scheme: dark) {

    html {
      filter: invert(1) hue-rotate(.5turn);
    }

    img {
      filter: invert(1) hue-rotate(.5turn);
    }

    img:not(:hover) {
      opacity: .7;
      transition: opacity .25s ease-in-out;
    }
  }

</style>
