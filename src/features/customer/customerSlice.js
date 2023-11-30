import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  aadharId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createUser: {
      prepare(fullName, aadharId) {
        return {
          payload: {
            fullName,
            aadharId,
            createdAt: new Date(),
          },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.aadharId = action.payload.aadharId;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateUserName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createUser, updateUserName } = customerSlice.actions;

export default customerSlice.reducer;

// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createUser":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         aadharId: action.payload.aadharId,
//         createdAt: action.payload.createdAt,
//       };

//     case "customer/updateUser":
//       return { ...state, fullName: action.payload };

//     default:
//       return state;
//   }
// }
// export function createUser(fullName, aadharId) {
//   return {
//     type: "customer/createUser",
//     payload: {
//       fullName,
//       aadharId,
//       createdAt: new Date(),
//     },
//   };
// }

// export function updateUserName(newName) {
//   return { type: "customer/updateUser", payload: newName };
// }
