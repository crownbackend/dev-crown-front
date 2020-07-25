<template>
    <div>
        <div class="container" style="padding-top: 30px">
            <div class="row">
                <div class="col-md-4">
                    Les videos
                    <img class="img-search" src="../../assets/images/videos.jpg" alt="video youtube">
                </div>
                <div class="col-md-4">
                    Le blog
                    <img class="img-search" src="../../assets/images/blog.jpg" alt="Blog dev-crown">
                </div>
                <div class="col-md-4">
                    Le forum
                    <img class="img-search" src="../../assets/images/forum.jpeg" alt="">
                </div>
            </div>
            <h1 class="subtitle is-4 has-text-centered" v-if="searchBar">
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" placeholder="placeholderSearch">
                        <span class="icon is-small is-left">
                         <i class="fas fa-search"></i>
                        </span>
                    </p>
                </div>
            </h1>
        </div>
        <div class="padding"></div>
        <div class="container">

        </div>
    </div>
</template>

<script>
    export default {
        name: "search",
        data() {
            return {
                searchBar: false,
                placeholderSearch: null
            }
        }
    }
</script>

<style>
    .padding {
        padding-top: 50px;
    }
    .img-search {
        width: 600px !important;
        height: 300px !important;
    }
</style>