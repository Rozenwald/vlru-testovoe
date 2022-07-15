<template>
  <div class="task-card" @click="route()" @keydown.enter="route()">
    <div class="task-card__title">{{item.title}}</div>
    <div class="task-card__text">Cоздано: {{item.time}}</div>
    <div class="task-card__text">Приоритет: {{item.priority}}</div>
    <div class="task-card__text">Отметки: {{item.marks}}</div>
  </div>
</template>
<script>
//  @click="route(view-task)"

export default {
  name: 'task-card',
  props: {
    item: Object,
  },
  methods: {
    route() {
      this.$store.dispatch('viewTask', this.item);
      this.$router.push({ name: 'view-task' });
    },
  },
};
</script>

<style lang="stylus">
  @import '../styles/colors'
  .task-card {
    margin-top 12px
    padding: 12px
    background-color: var(--white)
    border: 2px solid var(--grey)
    &__title {
      color var(--hard-grey)
      font-weight: 600
      padding: 12px
    }
    &__text {
      padding: 4px 12px
    }
  }
  .task-card:hover {
    .task-card__title  {
      color: var(--blue)
    }
  }
</style>
