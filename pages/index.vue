<template>
  <UserFilters
    :search="search"
    :role="role"
    :perPage="perPage"
    @update:search="search = $event"
    @update:role="role = $event"
    @update:perPage="perPage = $event"
  />

  <UserTable
    :users="paginatedUsers"
    :sortBy="sortBy"
    :sortDirection="sortDirection"
    @sort="onSort"
  />

  <div class="pagination">
    <button @click="page--" :disabled="page === 1">Prev</button>

    <span>{{ page }} / {{ totalPages }}</span>

    <button @click="page++" :disabled="page === totalPages">Next</button>
  </div>
</template>

<script setup>
import { users } from "~/data/users";
import { useUsersTable } from "~/composables/useUsersTable";

const {
  search,
  role,
  sortBy,
  sortDirection,
  page,
  perPage,
  paginatedUsers,
  totalPages,
  debouncedSearch,
} = useUsersTable(users);

function onSort(field) {
  if (sortBy.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = field;
    sortDirection.value = "asc";
  }
}
const router = useRouter();
const route = useRoute();

const getQuery = (key, fallback) =>
  route.query[key] != null ? route.query[key] : fallback;
search.value = String(getQuery("search", ""));
role.value = getQuery("role", null);
page.value = getQuery("page", 1);
perPage.value = getQuery("perPage", 10);
sortBy.value = getQuery("sortBy", null);
sortDirection.value = getQuery("sortDir", "asc");

watch([debouncedSearch, role, page, perPage, sortBy, sortDirection], () => {
  router.replace({
    query: {
      search: debouncedSearch.value,
      role: role.value,
      page: page.value,
      perPage: perPage.value,
      sortBy: sortBy.value,
      sortDir: sortDirection.value,
    },
  });
});
</script>

<style scoped>
.pagination {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
