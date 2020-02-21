<template>
  <div>
    <h1>Posts</h1>
    <b-row>
       <Post v-for="item in displayedItems" :key="item.id" :item="item" />
    </b-row>
  <b-row class="page">
  <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      @input="toPage($event)"
    ></b-pagination>
  </b-row>
  </div>
</template>
<script>
 import Post from '~/components/Post.vue';
export default {
  components: {
      Post
  },
  layout: "custom",
  head() {
    return {
      title: "Posts"
    };
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      items: this.$store.state.posts
    };
  },
  fetch({ store }) {
    return store.dispatch("getPosts");
  },
  computed: {
    rows() {
      return this.items.length;
    },
    displayedItems() {
     return this.items.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    }
  },
  methods: {
    toPage(number) {
      this.currentPage = number;
    }
  }
};
</script>
<style>
.card {
    width: 100%;
    margin: 10px 0;
}
.page {
     float: right;
     padding: 30px 0;
}
.pagination {
    justify-content: flex-end;
}
</style>
