export const GET_LISTS = "GET_LISTS";
export const GET_LIST_BY_ID = "GET_LIST_BY_ID";
export const ADD_LIST = "ADD_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const UPDATE_LIST = "UPDATE_LIST";
export const SET_LISTID_TO_DELETE = "SET_LISTID_TO_DELETE";
export const SET_LIST_TO_EDIT = "SET_LIST_TO_EDIT";
export const SET_SELECTED_LIST = "SET_SELECTED_LIST";

export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const SET_ITEM_TO_DELETE = "SET_ITEM_TO_DELETE";
export const UNSET_ITEM_TO_DELETE = "UNSET_ITEM_TO_DELETE";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const SET_ITEM_TO_EDIT = "SET_ITEM_TO_EDIT";
export const UNSET_ITEM_TO_EDIT = "UNSET_ITEM_TO_EDIT";

export interface Item {
  name: string;
  id: string;
  completed: boolean;
}

export interface List {
  name: string;
  id: string;
  items: Item[];
}

export interface Lists {
  [id: string]: List
}

// Actions
interface AddListAction {
  type: typeof ADD_LIST;
  payload: List;
} 

interface GetListsAction {
  type: typeof GET_LISTS;
}

interface GetListByIdAction {
  type: typeof GET_LIST_BY_ID;
  payload: string;
}

interface SetListIdToDeleteAction {
  type: typeof SET_LISTID_TO_DELETE;
  payload: string;
}

interface SetListToEditAction {
  type: typeof SET_LIST_TO_EDIT;
  payload: string;
}

interface DeleteListAction {
  type: typeof DELETE_LIST;
  payload: string;
}

interface UpdateListAction {
  type: typeof UPDATE_LIST;
  payload: {
    id: string;
    name: string;
  }
}

interface SetSelectedListAction {
  type: typeof SET_SELECTED_LIST;
  payload: string;
}

interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: {
    item: Item;
    list: List;
  }
}

interface DeleteItemAction {
  type: typeof DELETE_ITEM;
  payload: {
    item: Item;
    list: List;
  }
}

interface SetItemToDeleteAction {
  type: typeof SET_ITEM_TO_DELETE;
  payload: {
    item: Item;
    list: List;
  }
}

interface UnsetItemToDeleteAction {
  type: typeof UNSET_ITEM_TO_DELETE;
}

interface EditItemAction {
  type: typeof UPDATE_ITEM;
  payload: {
    itemId: string;
    itemName: string;
    itemState: boolean;
    list: List;
  }
}

interface SetItemToEditAction {
  type: typeof SET_ITEM_TO_EDIT;
  payload: {
		item: Item;
    list: List;
  }
}

interface UnsetItemToEditAction {
  type: typeof UNSET_ITEM_TO_EDIT;
}

export type ListsAction = AddListAction | GetListsAction | GetListByIdAction | SetListIdToDeleteAction | SetListToEditAction | DeleteListAction | UpdateListAction | SetSelectedListAction | AddItemAction | DeleteItemAction | SetItemToDeleteAction | UnsetItemToDeleteAction | EditItemAction | SetItemToEditAction | UnsetItemToEditAction;

export interface ListState {
  lists: Lists;
  listIdToDelete: string;
  listToEdit: List | null;
  listById: List | null;
  selectedList: List | null;
  itemToDelete: {
    item: Item;
    list: List;
  } | null;
  itemToEdit: {
    item: Item;
    list: List;
  } | null;
}
