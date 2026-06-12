export const STORAGE_KEY = "savedRoutes";

export function saveRoute(route: any) {
  const routes = getRoutes();
  routes.push({
    ...route,
    createTime: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(routes));
}

export function getRoutes() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function clearRoutes() {
  localStorage.removeItem(STORAGE_KEY);
}

export function deleteRoute(index: number) {
  const routes = getRoutes();
  routes.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(routes));
}