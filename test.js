import Redux from "redux";
const { createStore } = Redux;

console.clear();

//People dropping off a form (action generator)

const createPolicy = (name, amount) => {
  return {
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amount: amount,
    },
  };
};

const deletePolicy = (name) => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name,
    },
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect,
    },
  };
};

//Reducers

const departmentReducer = (
  state = { oldListOfClaims: [], bagOfMoney: 100, listOfPolicies: [] },
  action
) => {
  if (action.type === "CREATE_POLICY") {
    return {
      ...state,
      listOfPolicies: [...state.listOfPolicies, action.payload.name],
      bagOfMoney: state.bagOfMoney + action.payload.amount,
    };
  } else if (action.type === "DELETE_POLICY") {
    return {
      ...state,
      listOfPolicies: Object.values(state.listOfPolicies).filter(
        (name) => name !== action.payload.name
      ),
    };
  } else if (action.type === "CREATE_CLAIM") {
    return {
      ...state,
      oldListOfClaims: action.payload,
      bagOfMoney: state.bagOfMoney - action.payload.amountOfMoneyToCollect,
    };
  }
  return state;
};

const store = createStore(departmentReducer);

console.log(store.getState());

store.dispatch(createPolicy("Jim", 30));
store.dispatch(createPolicy("Bob", 20));
store.dispatch(createPolicy("Mary", 40));
store.dispatch(deletePolicy("Jim"));
store.dispatch(createClaim("Bob", 120));

console.log(store.getState());
