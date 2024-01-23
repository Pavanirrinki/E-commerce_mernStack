import { createStore,applyMiddleware,combineReducers } from "redux";
import userReducer from "./Reducers/SignupReducers.js";
import CategoriesReducer from "./Reducers/CategoriesReducer.js";
import ProductsReducer from "./Reducers/ProductReducer.js";
import ParticularCategoryReducer from "./Reducers/ParticularCategoryReducer.js";
import UserDetailsReducer from "./Reducers/UserDetailsReducer.js";
import SingleProductReducer from "./Reducers/SingleProductReducer.js";
import thunk from 'redux-thunk';

const rootreducer = combineReducers({
    userReducer,
    CategoriesReducer,
    ProductsReducer,
    ParticularCategoryReducer,
    SingleProductReducer,
    UserDetailsReducer
})
const store = createStore(rootreducer,applyMiddleware(thunk))

export default store