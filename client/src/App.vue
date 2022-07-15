<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// const TaskList = () => import('./views/TaskList.vue');
// const ViewTask = () => import('./views/ViewTask.vue');
// const EditTask = () => import('./views/EditTask.vue');

export default {
  name: 'App',
  data() {
    return {
    };
  },
  components: {
    // TaskList,
    // ViewTask,
    // EditTask,
  },
};
</script>
<style lang="stylus">
@import './styles/colors';

html, body {
    height: 100%;
}
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  height: 100%;
  width 100%
  background-color: var(--soft-grey);
body {
  transition: background 0.25s ease-in-out;
  min-height: 100%;
  height: 100%
  margin 0
}
</style>
