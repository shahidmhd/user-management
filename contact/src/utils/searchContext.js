import { createContext ,useState} from "react";


export const searchContext = createContext()

const Search =({children})=>{
    const [searchText,setSearchtext] = useState()
    return(
        <searchContext.Provider value={{searchText,setSearchtext}}>
           {children}
        </searchContext.Provider>

    )
}

export default Search