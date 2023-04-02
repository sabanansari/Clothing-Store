import { getActiveElement } from "@testing-library/user-event/dist/utils/index.js";
import { createContext, useState ,useEffect} from "react";
import { getCategoriesAndDOcuments } from "../utils/firebase/firebase.utils.jsx";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children})=>{

    const [categoriesMap,setCategoriesMap]  = useState({});

    useEffect(()=>{
        const getCategoriesMap = async()=>{
            const categoryMap = await getCategoriesAndDOcuments();
            setCategoriesMap(categoryMap);
        }
        
        getCategoriesMap();
    },[]);

    const value = {categoriesMap};

    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}