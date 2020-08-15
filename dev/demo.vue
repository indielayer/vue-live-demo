<template>
  <div>
    <h2>Preview - Groceries List</h2>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ['Apples', 'Fish', 'Oranges', 'Spaceships']
    }
  }
}
</script>