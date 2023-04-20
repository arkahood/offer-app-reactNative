import { createSlice } from "@reduxjs/toolkit"

const initialState: any = {
    data: []
}

const offerSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {
        addOffer: (state, action) => {

            return action.payload;
        },
        deleteOffer: (state, action) => {
            let temp: any = [];
            state.data.map((item: any) => {
                if (item.name !== action.payload) temp.push(item);
            })

            return {
                data: temp
            }
        }
    }
})


export const { addOffer, deleteOffer } = offerSlice.actions;
export default offerSlice.reducer;