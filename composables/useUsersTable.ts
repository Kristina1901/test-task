import { refDebounced } from "@vueuse/core";
export function useUsersTable(users) {
  // filters
  const search = ref("");
  const debouncedSearch = refDebounced(search, 300);
  const role = ref(null);

  // sorting
  const sortBy = ref(null); // 'age' | 'createdAt'
  const sortDirection = ref("asc");

  // pagination
  const page = ref(1);
  const perPage = ref(10);

  const filteredUsers = computed(() => {
    const searchValue = search.value.trim().toLowerCase();
    return users.filter((user) => {
      const filteredUsersBySearch =
        !searchValue ||
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue);
      const filteredUsersByRole = !role.value || user.role === role.value;
      return filteredUsersBySearch && filteredUsersByRole;
    });
  });
  const sortedUsers = computed(() => {
    if (!sortBy.value) return filteredUsers.value;
    return [...filteredUsers.value].sort((a, b) => {
      const direction = sortDirection.value === "asc" ? 1 : -1;
      if (sortBy.value === "createdAt") {
        return (Date.parse(a.createdAt) - Date.parse(b.createdAt)) * direction;
      }
      return (a.age - b.age) * direction;
    });
  });
  const paginatedUsers = computed(() => {
    if (!perPage.value || perPage.value <= 0) {
      return sortedUsers.value;
    }
    const start = (page.value - 1) * perPage.value;
    return sortedUsers.value.slice(start, start + perPage.value);
  });
  const totalPages = computed(() => {
    if (!perPage.value || perPage.value <= 0) return 1;
    return Math.max(1, Math.ceil(sortedUsers.value.length / perPage.value));
  });
  watch([debouncedSearch, role, perPage], () => {
    page.value = 1;
  });
  watch(totalPages, () => {
    if (page.value > totalPages.value) page.value = totalPages.value;
  });

  return {
    search,
    role,
    sortBy,
    sortDirection,
    page,
    perPage,
    paginatedUsers,
    totalPages,
    debouncedSearch,
  };
}
