import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../core/features/user";
import chatReducer from "../core/features/chat";

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { warnAfter: 128 },
    serializableCheck: { warnAfter: 128 },
  })
});
