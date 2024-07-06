import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import LandingPage from "./view/LandingPage"
import RiskReportController from "./controllers/RiskReportController"

function Router() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/report" element={<RiskReportController />}></Route>
            </>
        )
    )

    return (
        <RouterProvider router={router} />
    )
}

export default Router