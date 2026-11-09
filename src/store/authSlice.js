import { createSlice } from "@reduxjs/toolkit";
const slice=createSlice({
    name:'auth',
    initialState:{
        login:false,
        userData:null,
    },
    reducers:{
        login:(state,action)=>{
state.login=true;
state.userData=action.payload;
        },
        Logout:(state)=>{
            state.login=false
             state.userData=null;
        },

    }
})
export const {login,Logout}=slice.actions
export default slice.reducer;