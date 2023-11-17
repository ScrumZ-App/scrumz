<template>
  <ul>
    <li v-for="todo in todos">
      <span>{{ todo.text }}</span>
    </li>
    <input v-model="newTodoText" />
    <button v-on:click="addTodo">Add</button>
  </ul>
</template>

<script>
import { useDatabaseList, useDatabase } from 'vuefire'
import { ref as dbRef, push } from 'firebase/database'

export default {
  data() {
    return {
      todos: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue' },
        { text: 'Build something awesome' }
      ],
      newTodoText: ''
    }
  },

  mounted() {
    const todos = useDatabaseList(dbRef(useDatabase(), 'todos'))
    // const someTodo = useDatabaseObject(dbRef(db, 'todos', 'someId'))
    this.todos = todos
  },
  methods: {
    addTodo() {
      // send to firebase
      const todosRef = dbRef(useDatabase(), 'todos')
      push(todosRef, { text: this.newTodoText })
      this.newTodoText = ''
    }
  }
}
</script>
