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
        <b-button variant="primary" @click="agregarTodo()">Agregar</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-list-group>
      <b-list-group-item
        v-for="(todo, index) in todoList"
        :key="index"
        class="d-flex justify-content-between align-items-center mt-3"
        :variant="listItemStyle(todo.checked)"
        @click="marcarTodo(todo)"
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
import { Component, Vue } from "vue-property-decorator";
import { Todo } from "@/types/Todo";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { initializeApp } from "firebase/app";
import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import firebaseConfig from "@/firebaseConfig";

library.add(faTrash);
Vue.component("font-awesome-icon", FontAwesomeIcon);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Component
export default class TodoList extends Vue {
  todoInput: string = "";
  todoList: Todo[] = [];

  listItemStyle(isChecked: boolean) {
    return isChecked ? "success" : "";
  }

  agregarTodo() {
    let todo = new Todo(this.todoInput);
    this.todoList.push(todo);

    async function addTodo(db: Firestore) {
      const todoCol = collection(db, "todolist");
      await addDoc(todoCol, { todo: todo.todo, checked: todo.checked });
    }

    addTodo(db).then(() => {
      console.log("Agregado");
    });
  }

  marcarTodo(todo: Todo) {
    todo.toggleChecked();
    async function markTodo(db: Firestore) {
      await setDoc(doc(db, "todolist/" + todo.id), {
        todo: todo.todo,
        checked: todo.checked,
      });
    }

    markTodo(db).then(() => {
      console.log("Modificado");
    });
  }

  eliminarTodo(todo: Todo) {
    this.todoList = this.todoList.filter((todoItem) => {
      return todoItem !== todo;
    });

    async function delTodo(db: Firestore) {
      await deleteDoc(doc(db, "todolist/" + todo.id));
    }

    delTodo(db).then(() => {
      console.log("Eliminado");
    });
  }

  mounted() {
    async function getTodo(db: Firestore) {
      const todoCol = collection(db, "todolist");
      const todoSnapshot = await getDocs(todoCol);
      const todoList = todoSnapshot.docs.map((doc) => {
        let docTodo = new Todo(doc.data()["todo"]);
        docTodo.id = doc.id;
        docTodo.checked = doc.data()["checked"];
        return docTodo;
      });
      return todoList as Todo[];
    }

    getTodo(db).then((data) => {
      this.todoList = data;
    });
  }
}
</script>

<style scoped>
.list-group-item-success {
  text-decoration: line-through;
}
</style>
