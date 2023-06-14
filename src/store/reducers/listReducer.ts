import { ADD_LIST, GET_LISTS, GET_LIST_BY_ID, SET_LISTID_TO_DELETE, SET_LIST_TO_EDIT, DELETE_LIST, UPDATE_LIST, SET_SELECTED_LIST, ADD_ITEM, SET_ITEM_TO_DELETE, UNSET_ITEM_TO_DELETE, DELETE_ITEM, SET_ITEM_TO_EDIT, UNSET_ITEM_TO_EDIT, UPDATE_ITEM } from './../types/app';
import { Lists, ListsAction, ListState } from "../types/app";

const initialState: ListState = {
  lists: {},
  listIdToDelete: "",
  listToEdit: null,
  listById: null,
  selectedList: null,
  itemToDelete: null,
  itemToEdit: null
}

// Helper FC
const getListsFromLS = (): Lists => {
  if(localStorage.getItem("item_list")) {
    return JSON.parse(localStorage.getItem("item_list") || "{}");
  }
  return {};
}

const saveListsToLS = (lists: Lists) => {
  localStorage.setItem("item_list", JSON.stringify(lists));
}

export default (state = initialState, action: ListsAction): ListState => {
	const listsFromLS = getListsFromLS();

	switch(action.type) {
		case ADD_LIST:
      const clonedListsFromLS = {...listsFromLS};
      clonedListsFromLS[action.payload.id] = action.payload;
      saveListsToLS(clonedListsFromLS);
      return {
        ...state,
        lists: clonedListsFromLS
      }

    case GET_LISTS:
      return {
        ...state,
        lists: listsFromLS
      }

    case GET_LIST_BY_ID:
      const list = listsFromLS[action.payload];
      return {
        ...state,
        listById: list
      }

    case SET_LISTID_TO_DELETE:
      return {
        ...state,
        listIdToDelete: action.payload
      }

    case SET_LIST_TO_EDIT:
      const listToEdit = listsFromLS[action.payload];
      return {
        ...state,
        listToEdit
      }

    case DELETE_LIST:
      const clonedListsFromLS2 = {...listsFromLS};
      const listId = clonedListsFromLS2[action.payload].id;
      delete clonedListsFromLS2[action.payload];
      saveListsToLS(clonedListsFromLS2);
      return {
        ...state,
        lists: clonedListsFromLS2,
        listIdToDelete: "",
        listById: null,
        selectedList: state.selectedList && listId === state.selectedList.id ? null : state.selectedList
      }

    case UPDATE_LIST:
      const clonedListsFromLS3 = {...listsFromLS};
      clonedListsFromLS3[action.payload.id].name = action.payload.name;
      saveListsToLS(clonedListsFromLS3);
      return {
        ...state,
        lists: clonedListsFromLS3,
        listToEdit: null
      }

		case SET_SELECTED_LIST:
			const selectedList = getListsFromLS()[action.payload];
			return {
				...state,
				selectedList: selectedList
			}

		case ADD_ITEM:
			const clonedListsFromLS4 = {...listsFromLS};
			clonedListsFromLS4[action.payload.list.id].items.push(action.payload.item);
			saveListsToLS(clonedListsFromLS4);
			return {
				...state,
				lists: clonedListsFromLS4,
				selectedList: clonedListsFromLS4[action.payload.list.id]
			}
		
		case SET_ITEM_TO_DELETE:
			return {
				...state,
				itemToDelete: {
					item: action.payload.item,
					list: action.payload.list
				}
			}
		
		case UNSET_ITEM_TO_DELETE:
			return {
				...state,
				itemToDelete: null
			}

		case DELETE_ITEM:
			const clonedListsFromLS5 = {...listsFromLS};
			const clonedItems = [...clonedListsFromLS5[state.itemToDelete!.list.id].items];
			const item = clonedItems.find(item => item.id === state.itemToDelete!.item.id);
			clonedItems.splice(clonedItems.indexOf(item!), 1);
			clonedListsFromLS5[state.itemToDelete!.list.id].items = clonedItems;
			saveListsToLS(clonedListsFromLS5);
			return {
				...state,
				lists: clonedListsFromLS5,
				selectedList: clonedListsFromLS5[state.itemToDelete!.list.id],
				itemToDelete: null
			}

		case SET_ITEM_TO_EDIT:
			return {
				...state,
				itemToEdit: {
					item: action.payload.item,
					list: action.payload.list
				}
			}

		case UNSET_ITEM_TO_EDIT:
			return {
				...state,
				itemToEdit: null
			}

		case UPDATE_ITEM:
			const clonedListsFromLS6 = {...listsFromLS};
			const clonedList = {...clonedListsFromLS6[action.payload.list.id]};
			const clonedItems2 = [...clonedList.items];
			const item2 = clonedItems2.find(item => item.id === action.payload.itemId);
			const clonedItem = {...item2!};
			clonedItem.name = action.payload.itemName;
			clonedItem.completed = action.payload.itemState;
			const updatedItems = clonedItems2.map(item => item.id === clonedItem.id ? clonedItem : item);
			clonedList.items = updatedItems;
      clonedListsFromLS6[clonedList.id] = clonedList;
      saveListsToLS(clonedListsFromLS6);
      return {
        ...state,
        lists: clonedListsFromLS6,
        selectedList: clonedList,
				itemToEdit: null
      }

		
		default:
			return state;
	}
}