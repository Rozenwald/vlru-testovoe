<template>
    <div class="task">
      <div  class="task-btns">
        <div class="task-btns">
          <button @click="$router.back()" class="task-btns__back">
            Назад
          </button>
          <button @click="$router.push({ name: 'edit-task' })" class="task-btns__edit">
            Редактировать
          </button>
        </div>
          <button @click="deleteTask()" class="task-btns__delete">
            Удалить
          </button>
      </div>
      <div class="task__info">
        <div v-for="item in items" :key="item.id" class="info">
          <div class="info__title">
            {{item.title}}
          </div>
          <div class="info__content">
            {{item.content}}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'view-task',
  data() {
    return {
    };
  },
  computed: {
    task() {
      return this.$store.getters.getTask;
    },
    items() {
      const elements = [
        { title: 'Название задачи', content: this.task.title },
        { title: 'Дата создания', content: this.task.time },
        { title: 'Приоритет', content: this.task.priority },
        { title: 'Отметки', content: this.task.marks },
        { title: 'Описание', content: this.task.description },
      ];
      return elements;
    },
  },
  methods: {
    deleteTask() {
      this.$store.dispatch('deleteTask', this.task);
      this.$router.push('/');
    },
  },
};
</script>

<style lang="stylus">
  .task {
    height calc(100% - 64px)
    background-color: var(--soft-grey)
    padding: 64px 64px 0 64px
    .task-btns {
      display: flex !important
      justify-content: space-between
      &__back, &__edit, &__delete {
        border 2px solid var(--grey)
        border-radius: 5px
        padding 16px
        margin 8px
      }
      &__back{
        background-color: var(--white)
      }
      &__edit{
        color: var(--white)
        background-color: var(--blue)
      }
      &__delete{
        color: var(--white)
        background-color: var(--red)
      }
    }
    &__info {
      background-color: var(--white)
      border 2px solid var(--grey)
      margin 8px
      .info{
        padding 8px
        &__title{
          color var(--hard-grey)
          font-weight: 600
          font-size: 12px
          text-transform: uppercase
          margin 8px
        }
        &__content{
          margin 8px
        }
      }
    }
  }
  .btn-container {
    width 100%
  }
  @media screen and (max-width: 480px) {
    .task {
      padding: 16px 16px 0 16px
      .task-btns {
        flex-direction: column
        &__back, &__edit, &__delete {
          margin: 2px 8px
        }
        &__back, &__edit, &__delete {
          display: block
        }
      }
    }
  }
</style>
