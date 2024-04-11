import { PayloadAction, createSlice } from "@reduxjs/toolkit";



export interface LoginedUserType {
    _id:string;
    name:string;
    email:string;
    role:string;
    mobile:string;
    avatar:string;
    wishlistedProducts:string[];
    reviewedProducts:string[];
}

export interface InitialStateType {
    payload:LoginedUserType|null;
    isLoading:boolean;
    isFailed:boolean;
}

const initialState:InitialStateType = {
    payload:null,
    isLoading:true,
    isFailed:false
}

export const userReducer = createSlice({
    name:"userReducer",
    initialState,
    reducers:{
        userExist:(state, action:PayloadAction<LoginedUserType|null>) => {
            state.isLoading = false;
            state.payload = action.payload;
            state.isFailed = false;
        },
        userNotExist:(state) => {
            state.isLoading = true;
            state.payload = null;
            state.isFailed = false;
        },
        userReducerError:(state) => {
            state.isLoading = false,
            state.payload = null;
            state.isFailed = true;
        }
    }
});

export const {userExist, userNotExist} = userReducer.actions;