import { RouterProvider } from "react-router"
import { IntroLoader } from "./ExperienceLayer"
import { router } from "./routes"

export default function App() {
  return (
    <>
      <IntroLoader />
      <RouterProvider router={router} />
    </>
  )
}
