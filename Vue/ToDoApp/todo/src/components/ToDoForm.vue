<template>
    <form @submit.prevent="onSubmit">
        <h2 class="label-wrapper">
            <label for="">Add To-Do:</label>
        </h2>
        <input 
            style="width: 100%; padding: 10px; margin-bottom: 10px;"
            type="text" 
            name="new-todo" 
            id="new-todo-input" 
            autocomplete="off"
            v-model.lazy.trim="label">
        <button type="submit" class="btn btn__primary btn__lg">Add</button>

    </form>
</template>

<script>
  export default {
      methods: {
          onSubmit() {
              if(this.label === "") { return; }
              this.$emit("todo-added", this.label);
              this.label = "";
          }
      },
      data() {
          return {
              label: ""
          };
      }
  };
</script>
