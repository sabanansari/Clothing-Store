import { createSelector } from "reselect";
import { CategoryMap } from "./category.types";
import { CategoryState } from "./category.reducer";
import { RootState } from "../store";


const selectCategoryReducer = (state:RootState):CategoryState => state.categories;



export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice)=> categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories
    .reduce((acc,category)=>{
          const {title,items} = category;
          acc[title.toLowerCase()] = items;
          return acc;
        },{} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading,
);