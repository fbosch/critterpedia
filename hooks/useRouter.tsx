import React, { createContext, useContext } from "react"

import { withRouter } from "next/router"

const Context = createContext(undefined)

const Provider = ({ router, children }) => <Context.Provider value={router}>{children}</Context.Provider>

export const useRouter = () => useContext(Context)
export const RouterContextProvider = withRouter(Provider)
