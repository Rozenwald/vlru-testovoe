<template>
  <div class="task-list">
    <task-menu :screenSize="screenSize">
    </task-menu>
    <div class="list">
      <div v-show="screenSize" class="btn-container">
        <button @click="$router.push({ name: 'edit-task' })" class="btn-container__btn">
          Добавить задачу
        </button>
      </div>
      <task-card
        v-for="item in tasks"
        :key="item.id"
        :item="item">
      </task-card>
      <div id="infinity-scroll"></div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue';
import axios from 'axios';

export default {
  name: 'task-list',
  data() {
    return {
      index: 16,
      width: 0,
    };
  },
  computed: {
    priority() {
      return this.$store.getters.getMenyPriority;
    },
    marks() {
      return this.$store.getters.getMenuMarks;
    },
    tasks() {
      let arr = this.$store.getters.getTasks;
      console.log(arr);
      if (this.priority) {
        this.priority.forEach((el) => {
          arr = arr.filter((item) => {
            if (item.priority.indexOf(el.value) === -1) {
              return false;
            }
            return true;
          });
        });
      }
      if (this.marks) {
        this.marks.forEach((el) => {
          arr = arr.filter((item) => {
            if (item.marks.indexOf(el.value) === -1) {
              return false;
            }
            return true;
          });
        });
      }
      return arr;
    },
    screenSize() {
      if (this.width <= 480) {
        return false;
      }
      return true;
    },
  },
  components: {
    taskMenu: () => import('../components/TaskMenu.vue'),
    taskCard: () => import('../components/TaskCard.vue'),
  },
  methods: {
    intersection() {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      };
      const callback = ([entry]) => {
        if (entry.isIntersecting && (entry.intersectionRatio >= options.threshold)) {
          console.log('Ждёмс...');
          setTimeout(() => {
            const arr = [];
            for (let i = 1; i <= 15; i += 1) {
              const now = new Date().toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              });
              const task = {
                title: `Тестовая задача N${this.index}`,
                time: now,
                priority: 'Low, Normal',
                marks: 'Design, Development',
                id: `${this.index}`,
              };
              this.index += 1;
              arr.push(task);
            }
            this.$store.dispatch('infinityLoad', arr);
          }, 500);
        }
      };
      const observer = new IntersectionObserver(callback, options);
      const el = document.querySelector('div#infinity-scroll');
      observer.observe(el);
    },
    resizeHandler() {
      this.width = window.screen.width;
    },
  },
  mounted() {
    nextTick(() => {
      setTimeout(() => {
        this.intersection();
      }, 1500);
    });
  },
  created() {
    window.addEventListener('resize', this.resizeHandler);
    this.resizeHandler();
    const url = 'http://127.0.0.1:8888/api/task/create';
    const body = {
      title: 'Low',
      description: 'Low',
      priority: ['Low'],
      marks: ['Low'],
      date: new Date(),
    };
    axios
      .post(url, body)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  },
};
</script>

<style lang="stylus">

  .task-list {
    min-height calc(100% - 128px)
    background-color: var(--soft-grey)
    display flex
    padding: 64px 64px 64px 64px
    .list {
      flex 4 1 auto
      margin 0 12px
      width: 100%
      height 100%

      .btn-container{
        margin-bottom 12px
        &__btn {
          background-color: var(--blue)
          border 2px solid var(--grey)
          color: var(--white)
          border-radius: 5px
          padding 16px
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    .task-list {
      display block
      padding: 24px 24px 0 24px
      .list {
        margin 0
        .btn-container {
          display: flex
          margin 12px 0
          &__btn {
            background-color: var(--blue)
            border 2px solid var(--grey)
            color: var(--white)
            border-radius: 5px
            padding 16px
          }
        }
      }
    }
  }
</style>
