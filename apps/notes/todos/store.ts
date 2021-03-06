import { makeAutoObservable, reaction } from "mobx";
import { useLazyStoreInstanceOrCreate } from "../core/lazyStoreRegistry";

export const todosStoreName = "todos";

export default class TodosStore implements ITodosStore {
  private _coreStore: ICoreStore;

  private _todosRecord: Record<string, ITodo> = {};

  constructor(coreStore: ICoreStore) {
    this._coreStore = coreStore;

    this._getTodosFromStorage();
    this._initTodosStorageAutoSave();
    makeAutoObservable(this);
  }

  private _getTodosFromStorage() {
    let storedTodos = this._coreStore.sessionStorage.get<Record<string, ITodo>>(
      {
        key: "todosRecord",
      }
    );

    if (storedTodos != null) {
      this._todosRecord = storedTodos;
    }
  }

  private _initTodosStorageAutoSave() {
    reaction(
      () => this.list,
      () => {
        this._coreStore.sessionStorage.set({
          key: "todosRecord",
          value: this._todosRecord,
        });
      }
    );
  }

  public get list() {
    return Object.keys(this._todosRecord).map(
      (todoId: string) => this._todosRecord[todoId]
    );
  }

  public addTodo(todo: ITodo) {
    this._todosRecord[todo.id] = todo;
  }

  public toggleDoneStatus(todo: ITodo) {
    this._todosRecord[todo.id].done = !this._todosRecord[todo.id].done;
  }
}

export function todosStoreGetter(coreStore: ICoreStore) {
  return new TodosStore(coreStore);
}

export const useTodosStore = () =>
  useLazyStoreInstanceOrCreate<ITodosStore>({
    storeName: todosStoreName,
    storeGetter: todosStoreGetter,
  });
