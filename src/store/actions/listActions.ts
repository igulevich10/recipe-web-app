import { List, ListsAction, ADD_LIST, GET_LISTS, GET_LIST_BY_ID, SET_LISTID_TO_DELETE, SET_LIST_TO_EDIT, SET_SELECTED_LIST, DELETE_LIST, UPDATE_LIST, Item, ADD_ITEM, SET_ITEM_TO_DELETE, UNSET_ITEM_TO_DELETE, DELETE_ITEM, SET_ITEM_TO_EDIT, UNSET_ITEM_TO_EDIT, UPDATE_ITEM } from "./../types/app";

export const addList = (list: List): ListsAction => {
	return {
		type: ADD_LIST,
		payload: list
	}
}

export const getLists = (): ListsAction => {
	return {
		type: GET_LISTS,
	}
}

export const getListById = (id: string): ListsAction => {
  return {
    type: GET_LIST_BY_ID,
    payload: id
  }
}

export const setListIdToDelete = (id: string): ListsAction => {
  return {
    type: SET_LISTID_TO_DELETE,
    payload: id
  }
}

export const setListToEdit = (id: string): ListsAction => {
  return {
    type: SET_LIST_TO_EDIT,
    payload: id
  }
}

export const setSelectedList = (id: string): ListsAction => {
  return {
    type: SET_SELECTED_LIST,
    payload: id
  }
}

export const deleteList = (id: string): ListsAction => {
  return {
    type: DELETE_LIST,
    payload: id
  }
}

export const updateList = (id: string, name: string): ListsAction => {
  return {
    type: UPDATE_LIST,
    payload: {
      id,
      name
    }
  }
}

export const addItem = (item: Item, list: List): ListsAction => {
  return {
    type: ADD_ITEM,
    payload: {
      item,
      list
    }
  }
}

export const setItemToDelete = (item: Item, list: List): ListsAction => {
  return {
    type: SET_ITEM_TO_DELETE,
    payload: {
      item,
      list
    }
  }
}

export const unsetItemToDelete = (): ListsAction => {
  return {
    type: UNSET_ITEM_TO_DELETE
  }
}

export const deleteItem = (item: Item, list: List): ListsAction => {
  return {
    type: DELETE_ITEM,
    payload: {
      item,
      list
    }
  }
}

export const setItemToEdit = (item: Item, list: List): ListsAction => {
  return {
    type: SET_ITEM_TO_EDIT,
    payload: {
      item,
      list
    }
  }
}

export const unsetItemToEdit = (): ListsAction => {
  return {
    type: UNSET_ITEM_TO_EDIT
  }
}

export const updateItem = (itemId: string, itemName: string, itemState: boolean, list: List): ListsAction => {
  return {
    type: UPDATE_ITEM,
    payload: {
      itemId,
      itemName,
      itemState,
      list
    }
  }
}