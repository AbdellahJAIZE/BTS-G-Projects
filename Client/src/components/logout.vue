<template>
<div>
  <h1>Log Out</h1>
</div>
</template>
<script>
export default {
  data: function() {
    return {

    }
  },
  methods: {

  },
  beforeMount: function() {
    this.$session.has("user") ? this.$session.remove("user") : this.$router.push('/login');

    console.log("session destroyed");
    console.log(this.$session);
    this.$router.push('/login');
  },
  beforeCreate: function() {
    this.$session.start();

  }
}
</script>
