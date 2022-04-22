<template>
  <div class="todolist">
    <h3>TodoList</h3>
    <b-input-group class="mt-3">
      <b-form-input
        v-model="todoInput"
        placeholder="Agregar tarea"
        aria-describedby="Agregar tarea"
      ></b-form-input>
      <b-input-group-append>
        <b-button variant="primary" @click="agregarTodo">Agregar</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-list-group>
      <b-list-group-item
        v-for="(todo, index) in todoList"
        :key="index"
        class="d-flex justify-content-between align-items-center mt-3"
        :variant="listItemStyle(todo.checked)"
        @click="todo.toggleChecked()"
      >
        {{ todo.todo }}
        <b-button variant="outline-dark" @click.stop="eliminarTodo(todo)" pill
          ><font-awesome-icon icon="fa-solid fa-trash"
        /></b-button>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Todo } from "@/types/Todo";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTrash);
Vue.component("font-awesome-icon", FontAwesomeIcon);

@Component
export default class TodoList extends Vue {
  todoInput: string = "";
  todoList: Todo[] = [];

  listItemStyle(isChecked: boolean) {
    return isChecked ? "success" : "";
  }

  agregarTodo() {
    console.log("addTodo: " + this.todoInput);
    let todo = new Todo(this.todoInput);
    this.todoList.push(todo);
  }

  eliminarTodo(todo: Todo) {
    console.log("delTodo: " + todo);
    this.todoList = this.todoList.filter((todoItem) => {
      return todoItem !== todo;
    });
  }

  mounted() {
    this.todoList.push(new Todo("Terminar diseño"));
    this.todoList.push(new Todo("Agregar Firebase"));
  }
}
</script>

<style scoped>
.list-group-item-success {
  text-decoration: line-through;
}
</style>
