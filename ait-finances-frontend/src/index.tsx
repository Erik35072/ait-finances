import { ReactNode } from "react";
import ReactDOM from "react-dom/client";
// components
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import ProtectedRoute from "./components/permission/protected-route";
// styles
import "./index.css";
import { store } from "./providers/redux";
// redux
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
// source
import routes from "./routes";
import { SnackbarProvider } from "notistack";

const ProtectedRouteWithLayout = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

const router = createBrowserRouter(
  routes.map(({ path, Component, permission }) => ({
    path,
    loader: () => <div>Loading</div>,
    Component: () => {
      switch (permission) {
        case "protected":
          return (
            <ProtectedRouteWithLayout>
              <Component />
            </ProtectedRouteWithLayout>
          );
        case "unprotected":
          return <Component />;
        default:
          return <Component />;
      }
    }
  }))
);

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        style={{ maxWidth: "40vw" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <RouterProvider router={router} />
      </SnackbarProvider>
    </Provider>
  </PersistGate>
);
