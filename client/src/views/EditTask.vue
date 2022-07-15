<template>
  <div class="task">
    <div class="task-btns">
      <div class="task-btns">
        <button @click="$router.push('/')" class="task-btns__back">
          Назад
        </button>
      </div>
    </div>
    <div class="task__info">
      <div v-for="item in items"
        :key="item.id"
        class="info">
        <div class="info__title">
          {{item.title}}
        </div>
        <input v-if="item.type === 'text'"
          v-model="title"
          class="info__text"
          :aria-label="item.title"
          :type="item.type"/>
        <custom-select v-else-if="item.type === 'priority'"
          :aria-label="item.title"
          :items="item.content"
          :type="item.type">
        </custom-select>
        <custom-select v-else-if="item.type === 'marks'"
          :aria-label="item.title"
          :items="item.content"
          :type="item.type">
        </custom-select>
        <textarea v-else
          v-model="description"
          class="info__textarea"
          rows=7
          :aria-label="item.title"/>
      </div>
      <button @click="save()" class="task-btns__save"> Сохранить </button>
    </div>
  </div>
</template>

<script>
import customSelect from '../components/Select.vue';

export default {
  name: 'edit-task',
  data() {
    return {
      title: null,
      description: null,
      items: [
        {
          title: 'Название задачи',
          type: 'text',
          content: 'Lorem ipsum....',
        },
        {
          title: 'Приоритет',
          type: 'priority',
          content: ['Low', 'Medium', 'High'],
        },
        {
          title: 'Отметки',
          type: 'marks',
          content: ['Research', 'Development', 'Design'],
        },
        {
          title: 'Описание',
          type: 'textarea',
          content: 'Lorem ipsum....',
        },
      ],
    };
  },
  components: {
    customSelect,
  },
  methods: {
    save() {
      const data = {
        title: this.title,
        description: this.description,
      };
      this.$store.dispatch('createTask', data);
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
      &__back, &__edit, &__save {
        border 2px solid var(--grey)
        border-radius: 5px
        padding 16px
        margin 8px
      }
      &__back{
        background-color: var(--white)
      }
      &__save{
        color: var(--white)
        background-color: var(--blue)
        margin 16px
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
        &__text{
          width: calc(100% - 36px)
          height: 24px
          border solid 2px var(--grey)
          border-radius 5px
          margin 8px
          padding: 8px
        }
        &__textarea {
          resize: none
          width: calc(100% - 36px)
          border solid 2px var(--grey)
          border-radius 5px
          margin 8px
          padding: 8px
        }
        &__option {
          background-color: red
        }
        &__textarea:focus-visible, &__text:focus-visible{
          border solid 2px var(--blue)
          outline: none
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
      .info {
        &__select {
        }
      }
    }
  }
</style>
