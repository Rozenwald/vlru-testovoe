function time() {
  const now = new Date().toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  return now;
}

const state = {
  time: new Date().toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }),
  tasks: [
    {
      title: 'Тестовая задача N1',
      time: time(),
      priority: 'High, Normal',
      marks: 'Design, Reserch',
      description: '...',
      visible: true,
      id: 1,
    },
    {
      title: 'Тестовая задача N2',
      time: time(),
      priority: 'Low, Normal',
      marks: 'Reserch, Development',
      description: '...',
      visible: true,
      id: 2,
    },
    {
      title: 'Тестовая задача N3',
      time: time(),
      priority: 'Low, High',
      marks: 'Design, Development',
      description: '...',
      visible: true,
      id: 3,
    },
    {
      title: 'Тестовая задача N4',
      time: time(),
      priority: 'Low, Normal',
      marks: 'Design, Development',
      description: '...',
      visible: true,
      id: 4,
    },
    {
      title: 'Тестовая задача N5',
      time: time(),
      priority: 'High, Normal',
      marks: 'Design, Reserch',
      description: '...',
      visible: true,
      id: 5,
    },
    {
      title: 'Тестовая задача N6',
      time: time(),
      priority: 'Low, High',
      marks: 'Design, Development',
      description: '...',
      visible: true,
      id: 6,
    },
    {
      title: 'Тестовая задача N7',
      time: time(),
      priority: 'High, Normal',
      marks: 'Reserch, Development',
      description: '...',
      visible: true,
      id: 7,
    },
    {
      title: 'Тестовая задача N8',
      time: time(),
      priority: 'Low, High',
      marks: 'Design, Development',
      description: '...',
      visible: true,
      id: 8,
    },
    {
      title: 'Тестовая задача N9',
      time: time(),
      priority: 'Low, Normal',
      marks: 'Reserch, Development',
      description: '...',
      visible: true,
      id: 9,
    },
    {
      title: 'Тестовая задача N10',
      time: time(),
      priority: 'Low, Normal',
      marks: 'Design, Development',
      description: '...',
      visible: true,
      id: 10,
    },
    {
      title: 'Тестовая задача N11',
      time: time(),
      priority: 'Low, Normal',
      marks: 'Design, Reserch',
      description: '...',
      visible: true,
      id: 11,
    },
    {
      title: 'Тестовая задача N12',
      time: time(),
      priority: 'Low, Normal',
      marks: 'Design, Development',
      description: '...',
      visible: true,
      id: 12,
    },
    {
      title: 'Тестовая задача N13',
      time: time(),
      priority: 'Low, Normal',
      marks: 'Design, Development',
      description: '...',
      visible: true,
      id: 13,
    },
    {
      title: 'Тестовая задача N14',
      time: time(),
      priority: 'Low, Normal',
      marks: 'Design, Development',
      description: '...',
      visible: true,
      id: 14,
    },
    {
      title: 'Тестовая задача N15',
      time: time(),
      priority: 'Low, Normal',
      marks: 'Design, Development',
      description: '...',
      visible: true,
      id: 15,
    },
  ],
  viewTask: {},
  menuPriority: [],
  menuMarks: [],
  selectPriority: [],
  selectMarks: [],
};

const getters = {
  getTasks: () => state.tasks,
  getTask: () => state.viewTask,
  getMenyPriority: () => state.menuPriority,
  getMenuMarks: () => state.menuMarks,
};

const mutations = {
  infinityLoad(_, data) {
    state.tasks.push(...data);
  },
  viewTask(_, data) {
    state.viewTask = data;
  },
  createTask(_, data) {
    let marks = '';
    let priority = '';
    state.selectPriority.forEach((el) => {
      priority += `${el}, `;
    });
    priority = priority.slice(0, (priority.length - 2));

    state.selectMarks.forEach((el) => {
      marks += `${el}, `;
    });
    marks = marks.slice(0, (marks.length - 2));
    state.task = {
      title: data.title,
      time: time(),
      priority,
      marks,
      description: data.description,
    };
    state.tasks.unshift(state.task);
  },
  deleteTask(_, data) {
    const index = state.tasks.findIndex((item) => item === data);
    state.tasks.splice(index, 1);
  },
  setPriority(_, data) {
    state.selectPriority = data;
  },
  setMarks(_, data) {
    state.selectMarks = data;
  },
  prioritySort(_, data) {
    const index = state.menuPriority.findIndex((item) => item === data);
    if (index === -1) {
      state.menuPriority.push(data);
    } else {
      state.menuPriority.splice(index, 1);
    }
  },
  marksSort(_, data) {
    const index = state.menuMarks.findIndex((item) => item === data);
    if (index === -1) {
      state.menuMarks.push(data);
    } else {
      state.menuMarks.splice(index, 1);
    }
  },
};
const actions = {
  reverse() {
    state.tasks.reverse();
  },
  infinityLoad({ commit }, data) {
    commit('infinityLoad', data);
  },

  prioritySort({ commit }, data) {
    commit('prioritySort', data);
  },
  marksSort({ commit }, data) {
    commit('marksSort', data);
  },
  setPriority({ commit }, selected) {
    commit('setPriority', selected);
  },
  setMarks({ commit }, selected) {
    commit('setMarks', selected);
  },

  viewTask({ commit }, data) {
    commit('viewTask', data);
  },
  createTask({ commit }, data) {
    commit('createTask', data);
  },
  deleteTask({ commit }, data) {
    commit('deleteTask', data);
  },
};
export default {
  state,
  mutations,
  getters,
  actions,
};
