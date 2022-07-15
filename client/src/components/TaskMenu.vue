<template>
    <div class="menu">
      <div v-show="!screenSize" class="menu-btns">
        <button @click="$router.push({ name: 'view-task' })" class="menu-btns__btn">
          Добавить задачу
        </button>
      </div>
      <div class="menu-sort">
        <div class="sort">
          <div class="sort__title">
            Сортировка
          </div>
          <ul>
            <li class="radio-container"
              v-for="item in sortData"
              :key="item.id"
              checked>
              <input
                @click="sortHandler(item)"
                class="radio-container__input"
                name="sort"
                v-model="sort"
                :value="item.value"
                :id="item.id"
                type="radio">
              <label class="radio-container__text" :for="item.id">{{item.text}}</label>
            </li>
          </ul>
        </div>
        <div v-show="screenSize" class="sort"></div>
      </div>
      <div class="menu-marks ">
        <div class="sort">
          <div class="sort__title">
            Приоритет
          </div>
          <ul>
            <li
              class="radio-container"
              v-for="item in priorityData"
              :key="item.id">
              <input
                @click="priorityHandler(item)"
                class="radio-container__input"
                v-model="priority"
                :value="item.value"
                :id="item.id"
                type="checkbox">
              <label class="radio-container__text" :for="item.id">{{item.value}}</label>
            </li>
          </ul>
        </div>
        <div class="sort">
          <div class="sort__title">
            Отметка
          </div>
          <ul>
            <li
              class="radio-container"
              v-for="item in marksData"
              :key="item.id">
              <input
                @click="marksHandler(item)"
                class="radio-container__input"
                v-model="marks"
                :value="item.value"
                :id="item.id"
                type="checkbox">
              <label class="radio-container__text" :for="item.id" >{{item.value}}</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'task-card',
  props: {
    screenSize: Boolean,
  },
  data() {
    return {
      sort: 'new',
      priority: [],
      marks: [],
      sortData: [
        { text: 'Новые', value: 'new', id: '01' },
        { text: 'Старые', value: 'old', id: '02' },
      ],
      priorityData: [
        { value: 'Low', id: '11' },
        { value: 'Normal', id: '12' },
        { value: 'High', id: '13' },
      ],
      marksData: [
        { value: 'Reserch', id: '21' },
        { value: 'Design', id: '22' },
        { value: 'Development', id: '23' },
      ],
    };
  },
  methods: {
    sortHandler(item) {
      if (this.sort !== item.value) {
        this.$store.dispatch('reverse');
      }
    },
    priorityHandler(item) {
      this.$store.dispatch('prioritySort', item);
    },
    marksHandler(item) {
      this.$store.dispatch('marksSort', item);
    },
  },
};
</script>

<style lang="stylus">
  @import '../styles/colors'

  .menu {
    flex 1 0 auto
    margin 0 0 12px 0
    .menu-btns {
      margin 12px 0
      &__btn {
        background-color: var(--blue)
        color: var(--white)
        border 2px solid var(--grey)
        border-radius: 5px
        padding 16px
      }
    }
    .menu-sort, .menu-marks {
      display grid
      grid-template-columns: repeat(2, 1fr)
      margin-bottom: 12px
      border: 2px solid var(--grey)
      padding: 12px
      background-color: var(--white)
      .sort{
        min-width 0
        width 100%
        &__title {
          margin 12px
          font-weight: 600
          font-size: 12px;
          color: var(--hard-grey)
          text-transform: uppercase;
        }
        .radio-container {
          display flex
          margin 8px 12px
          text-align: center
          &__text {
            display: flex;
            border-radius: 100%
            transition: 0.25s ease;
            line-height: 20px
            margin-top: auto
            margin-bottom: auto
          }
        }
      }
    }
    .menu-marks{
      grid-template-columns: 1fr
    }
  }
  ul {
    padding: 0
    list-style: none
  }
  li {
    text-decoration: none
  }
  input[type='checkbox'], input[type='radio'] {
    -webkit-appearance: none
    -moz-appearance: none
    position: relative;
    left: 0px;
    top: 0px;
    height: 20px;
    min-width : 20px;
    margin: 0;
    cursor: pointer;
    border: 2px solid var(--grey);
    background: var(--white);
    transition: background .3s, border-color .3s, box-shadow .2s;
    &:after {
      display: block;
      content: '';
      opacity: 0;
      position: relative;
      transition: transform var(--d-t, .3s) var(--d-t-e, ease), opacity var(--d-o, .2s);
    }
    &:checked {
      border-color: var(--blue);
      box-shadow: 0 0 0 var(--blue);
    }
    &:not(.switch) {
      &:after {
        opacity: var(--o, 0);
      }
      &:checked {
        --o: 1;
      }
    }
    & + label {
      font-size: 14px;
      line-height: 20px;
      display: inline-block;
      vertical-align: top;
      cursor: pointer;
      margin-left: 8px;
    }
  }
  input[type='radio'] {
    border-radius: 100%
    &:after{
      border-radius: 100%;
      background: var(--blue);
      width: 8px
      height: 8px;
      left: 4px;
      top: 4px;
    }
    &:hover {
      &:not(:checked) {
        border-color: var(--blue);
      }
    }
  }
  input[type='checkbox'] {
    border-radius: 3px;
    &:after {
      width: 4px;
      height: 10px;
      border: 2px solid var(--blue);
      left: 5px;
      top: 1px;
      border-top: none;
      border-left: none;
      transform: rotate(var(--r, 20deg));
    }
    &:hover {
      &:not(:checked) {
        border-color: var(--blue);
      }
    }
    &:checked {
      --r: 43deg;
    }
  }

  @media screen and (max-width: 480px) {
    .menu {
      margin 0
      .menu-sort {
        grid-template-columns: 1fr
      }
      .menu-marks {
        grid-template-columns: 1fr 1fr
      }
    }
  }
</style>
