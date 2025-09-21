export function formatDateToLong(dateInput) {
  if (!dateInput) return "-";
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "-";
  }
}

export function getPageTitle(pathname) {
  const routeTitles = {
    "/dashboard": "Dashboard",
    "/organisation": "Organisation Users",
    "/users": "Users Management",
    "/analytics": "Analytics & Reports",
    "/templates": "Templates",
    "/settings": "Settings"
  };
  
  return routeTitles[pathname] || "BloomVision Admin";
}
