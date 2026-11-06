import { createBrowserRouter } from "react-router"
import { Home } from "./Home"
import { EducationDetail, ExperienceDetail, ProjectDetail } from "./DetailPages"

export const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/projects/:slug", Component: ProjectDetail },
  { path: "/education/:slug", Component: EducationDetail },
  { path: "/experience/:slug", Component: ExperienceDetail },
  { path: "*", Component: Home },
])
