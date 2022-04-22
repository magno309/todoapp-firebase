export class Todo {
    todo: string;
    checked: boolean;

    constructor(todo: string){
        this.todo = todo;
        this.checked = false;
    }

    toggleChecked(){
        this.checked = !this.checked;
    }
}