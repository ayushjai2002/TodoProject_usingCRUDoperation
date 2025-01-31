import { useEffect, useState } from "react"
import { postData, updateData } from "../api/PostApi";

export const Form = ({data, setData, updateDataApi, setUpdateDataApi}) =>{
    const [addData, setAddData] = new useState({
        title: "",
        body: "",
    })

    let isEmpty = Object.keys(updateDataApi).length === 0;

    //get the updated data and into input field
    useEffect(() =>{
        updateDataApi && setAddData({
            title: updateDataApi.title || "",
            body: updateDataApi.body || "",
        })
    },[updateDataApi])
    const handleInputChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setAddData((prev) =>{
            return{
                ...prev,
                [name]: value,
            }
        })
    }
    const addPostData = async () =>{
        try{
            const res = await postData(addData);
            if(res.status === 201){
                setData([...data, res.data]);
                setAddData({title: "", body: ""})
                
            }
        }catch(error){
            console.log(error);
        }
    }

    //updatePostData
    const updatePostData = async() =>{
        try{
            const res = await updateData(updateDataApi.id, addData) 
            console.log(res);
            if(res.status===200){
                setData((prev) => {
                    return prev.map((curElem) =>{
                        return curElem.id === res.data.id ? res.data : curElem;
                    });
                });
            }
            setAddData({title: "", body: ""});
            setUpdateDataApi({});
              
        }catch({error}){
            console.log(error);
        }
        
    }

    const handleFormSubmit = (e) =>{
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        // addPostData();
        if(action === "Add"){
            addPostData();
        }else if(action === "Edit"){
            updatePostData();
        }
    };
    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="title"></label>
                <input type="text" id="title" name="title" autoComplete="off" placeholder="Add title"
                value={addData.title} onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="body"></label>
                <input type="text" id="body" name="body" autoComplete="off" placeholder="Add post" 
                value={addData.body} onChange={handleInputChange}
                />
            </div>
            <button type="submit" value={isEmpty ? "Add" : "Edit"}> 
                {isEmpty ? "Add" : "Edit"}
            </button>
        </form>
    )
}