import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(loanAmount, loanPurpose) {
        return {
          payload: {
            loanAmount,
            loanPurpose,
          },
        };
      },
      reducer(state, action) {
        state.loan = action.payload.loanAmount;
        state.loanPurpose = action.payload.loanPurpose;
        state.balance = state.balance + action.payload.loanAmount;
      },
    },
    payLoan(state) {
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

export const { withdraw, payLoan, requestLoan } = accountSlice.actions;
export default accountSlice.reducer;

export function deposit(amnt, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amnt };
  console.log(amnt, currency);
  // eslint-disable-next-line no-unused-vars
  return async function (dispatch, getState) {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amnt}&from=${currency}&to=USD`
    );
    const data = await res.json();

    console.log(data);
    const converted = data.rates.USD;
    console.log(converted);
    dispatch({ type: "account/deposit", payload: converted });
  };
}

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return { ...state, balance: state.balance + action.payload };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       //LATER
//       return {
//         ...state,
//         loan: action.payload.loan,
//         loanPurpose: action.payload.loanPurpose,
//         balance: state.balance + action.payload.loan,
//       };

//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     default:
//       return state;
//   }
// }

// export function deposit(amnt, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amnt };

//   return async function (dispatch, getState) {
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=10&from=${currency}&to=USD`
//     );
//     const data = await res.json();

//     const converted = data.rates.USD;
//     dispatch({ type: "account/deposit", payload: converted });
//   };
// }

// export function withdraw(amnt) {
//   return { type: "account/withdraw", payload: amnt };
// }

// export function requestLoan(amnt, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { loan: amnt, loanPurpose: purpose },
//   };
// }

// export function payLoan() {
//   return { type: "account/payLoan" };
// }
