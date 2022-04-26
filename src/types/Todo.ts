export class Todo {
    id: string;
    todo: string;
    checked: boolean;

    constructor(todo: string){
        this.id = '';
        this.todo = todo;
        this.checked = false;
    }

    toggleChecked(){
        this.checked = !this.checked;
    }
}