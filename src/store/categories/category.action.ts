import { createAction,Action,ActionWithPayload,withMatcher } from "../../utils/reducer/reducer.util";
import { CATEGORIES_ACTION_TYPES,Category } from "./category.types";
// import { getCategoriesAndDOcuments } from "../../utils/firebase/firebase.utils";


export type fetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type fetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type setCategories = ActionWithPayload<CATEGORIES_ACTION_TYPES.SET_CATEGORIES, Category[]>;

export type fetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,Error>;

export const setCategories  = withMatcher((categoriesArray:Category[]):setCategories => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray));

export const fetchCategoriesStart = withMatcher(() : fetchCategoriesStart=> createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess  = withMatcher((categoriesArray:Category[]) : fetchCategoriesSuccess => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray));

export const fetchCategoriesFailed = withMatcher((error:Error):fetchCategoriesFailed => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));

// export const fetchCategoriesAsync = () => async (dispatch) => {

//     dispatch(fetchCategoriesStart());

//     try{
//         const categoriesArray = await getCategoriesAndDOcuments('categories');
//         dispatch(fetchCategoriesSuccess(categoriesArray));
//     }catch(error){
//        dispatch(fetchCategoriesFailed(error));
//     }
   

// }