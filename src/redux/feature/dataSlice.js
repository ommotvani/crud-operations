import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";


//

export const getposts = createAsyncThunk("getdata", async() => {
    return fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
        response.json()
    );
})


//  fetchData()
const dataSlice = createSlice({
    name: "userdata",
    initialState: {
        posts: [],
    },
    reducers:{
        deleteData: (state,action) =>{
          state.posts = state.posts.filter((item) => item.id !== action.payload)
        },
        likeButton:(state,action) =>{ 
       const result=state.posts.find((item) => item.id == action.payload)
       if(result.like){
        result["like"]=false
       }  
       else{
        result["like"]=true
       }
       console.log(current(state.posts))
  
        },
        updateData:(state,action) =>{
            const response =state.posts.find(element => element.id==action.payload.id)
            console.log(response)
            response["name"]=action.payload.name
            response["email"]=action.payload.email
            response["phone"]=action.payload.phoneno
            response["website"]=action.payload.website
        }

    },
    extraReducers: {
        [getposts.fulfilled]: (state, action) => {
            state.posts = action.payload;
        },
        
    },
});

export default dataSlice.reducer
export const {deleteData,likeButton, updateData}=dataSlice.actions