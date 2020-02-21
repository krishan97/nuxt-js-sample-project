<template>
  <b-card>
    <h4>{{item.id}}. {{item.title}}</h4>
    <b-card-text>{{item.body}}</b-card-text>
  </b-card>
</template>
<script>
export default {
  name: "Post",
  props: {
    item: {
      type: Object,
      required: true
    }
  } 
};
</script>