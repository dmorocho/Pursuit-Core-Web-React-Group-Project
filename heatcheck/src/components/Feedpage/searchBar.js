import React, { useState, useEffect } from 'react'

import axios from "axios";

const SearchBar =()=> {
    const [list, setList] = useState([])
    const [suggestion, setSuggest] = useState([])
    const [text, setText]=useState("")
    

 
   const handleChange=(e)=>{
        const value =e.target.value
        let suggestion=[];
        if(value.length>0){
            const regex = new RegExp(`${value}`,`i`);
            suggestion=list.sort().filter(v=>regex.test(v));
        }
        setSuggest(suggestion);
        setText(value)
    }

    const handleSelected=(value)=>{
        setText(value);
        setSuggest([])
    }

    const renderSuggestion =()=>{
        if(suggestion.length===0){
            return null
        }else{
            return (
                <ul>
                    {suggestion.map((item)=><li key={item} onClick={()=>handleSelected(item)}>{item}</li>)}
                </ul>
            )
        }
    }


    const fetchData= async(url,setData)=>{
        let res= await axios.get(url)
        if(res.data.payload[0].user_name){
            res.data.payload.map((el)=>{
                setData(prevState=>[...prevState,el.user_name.toLowerCase()])
            })
        }else if (res.data.payload[0].array_agg){
                res.data.payload.map((el)=>{
                    setData(prevState=>[...prevState,...el.array_agg])
                })
        }
    }

    useEffect(()=>{
        fetchData("http://localhost:3000/users/",setList)
        fetchData("http://localhost:3000/tags/",setList)
    }, [])

        console.log(text)
        return (
            <div>
            <input value={text} type="text" onChange={handleChange}/>
              {renderSuggestion()}
            </div>
        )
    }

export default SearchBar