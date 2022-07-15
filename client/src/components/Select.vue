<template>

  <div class="select">
    <div
      @click="isActive()"
      @keydown.enter="isActive()"
      :value="selected"
      :class="{ isActive: active }"
      class="select__header">
      <input v-model="selected" disabled class="select__current"/>
      <div class="select__icon">&#62;</div>
    </div>

    <div
      class="select__body"
      :class="{ isActive: active }">
      <div
        class="select__item"
        :class="{ isActive: active }"
        @click="chooseSelected(item)"
        @keydown.enter="chooseSelected(item)"
        v-for="(item, index) in items"
        :key="index">{{item}}</div>
    </div>
</div>
</template>
<script>

export default {
  name: 'task-card',
  data() {
    return {
      active: false,
      selected: [],
    };
  },
  props: {
    type: String,
    items: Array,
  },
  methods: {
    isActive() {
      this.active = !this.active;
    },
    chooseSelected(item) {
      const index = this.selected.indexOf(item);
      if (index === -1) {
        this.selected.push(item);
        switch (this.type) {
          case 'priority':
            this.$store.dispatch('setPriority', this.selected);
            break;
          case 'marks':
            this.$store.dispatch('setMarks', this.selected);
            break;
          default:
            break;
        }
      } else {
        this.selected.splice(index, 1);
      }
    },
  },
};
</script>

<style lang="stylus">
  @import '../styles/colors'
  .select {
    width: 25%
    border-radius 5px 5px 0 0
    margin 8px
    &__header {
      border-radius 5px 5px 0 0
      border solid 2px var(--grey)
      cursor: pointer;
      display: flex;
      z-index 999
    }
    &__body {
      transition: all 0.5s ease 0s
      top: -2px
      border solid 0px var(--grey)
      position relative
      justify-content: center
      display: flex
      flex-direction: column
      background-color: var(--white)
      z-index 888
    }
    &__body.isActive  {
      border solid 2px var(--grey)
      border-top 0
      border-radius 0 0 5px 5px
      top: 0px
    }
    &__item {
      transition: all 0.5s ease 0s
      line-height:0;
      height: 0
      overflow: hidden;
      cursor: pointer;
    }
    &__item.isActive {
      transition: all 1s ease 0s
      line-height: 32px;
      height: 32px
      padding 8px 16px
      overflow: visible;
      cursor: pointer;
    }
    &__icon {
      transform: rotate(90deg)
      align-items: center;
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      height: 32px;
      margin-left: auto;
      text-align: center;
      width: 32px;
    }
    &__current {
      width: 100%
      background-color: var(--white);
      border: none
      line-height: 16px;
      padding: 8px;
    }
  }
  .select:focus-visible {
    border solid 2px var(--blue)
    outline: none
  }
  .select__item:hover {
    background-color: var(--grey);
  }
</style>
