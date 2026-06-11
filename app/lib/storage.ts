export interface SavedRoute {
  id: string
  title: string
  destination: string
  createdAt: string
  data: any
}

export function saveRoute(route: SavedRoute) {
  const routes = getRoutes()

  routes.unshift(route)

  localStorage.setItem(
    "zhixing_routes",
    JSON.stringify(routes)
  )
}

export function getRoutes() {
  const routes = localStorage.getItem(
    "zhixing_routes"
  )

  return routes ? JSON.parse(routes) : []
}

export function deleteRoute(id: string) {
  const routes = getRoutes().filter(
    (r: SavedRoute) => r.id !== id
  )

  localStorage.setItem(
    "zhixing_routes",
    JSON.stringify(routes)
  )
}