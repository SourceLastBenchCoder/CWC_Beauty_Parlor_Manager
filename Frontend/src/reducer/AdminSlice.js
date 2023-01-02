import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice({
    name: 'admin',
    initialState: {
        id: '',
        fullname: '',
        email: '',
        phone: '',
        banner: '',
    },
    reducers: {
        login: (state, action) => {
            state.id = action.payload.id
            state.fullname = action.payload.fullname
            state.email = action.payload.email
            state.phone = action.payload.phone
            state.banner = action.payload.banner
        },
        logout: (state) => {
            state.id = ''
            state.fullname = ''
            state.email = ''
            state.phone = ''
            state.banner = ''
        }
    }
})

export const { login, logout } = AdminSlice.actions

export default AdminSlice.reducer