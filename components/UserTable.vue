<template>
  <div class="table-wrapper">
    <table class="min-w-full border-collapse">
      <thead class="bg-gray-50 sticky top-0 z-10">
        <tr>
          <th class="th">Name</th>
          <th class="th">Email</th>
          <th
            class="th sortable"
            :class="activeClass('age')"
            @click="$emit('sort', 'age')"
          >
            Age
            <span class="arrow">{{ arrow("age") }}</span>
          </th>
          <th class="th">Role</th>
          <th
            class="th sortable"
            :class="activeClass('createdAt')"
            @click="$emit('sort', 'createdAt')"
          >
            Created
            <span class="arrow">{{ arrow("createdAt") }}</span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="user in users"
          :key="user.id"
          class="hover:bg-gray-50 transition"
        >
          <td class="td">{{ user.name }}</td>
          <td class="td">{{ user.email }}</td>
          <td class="td">{{ user.age }}</td>
          <td class="td">
            <span class="badge">{{ user.role }}</span>
          </td>
          <td class="td">
            {{ new Date(user.createdAt).toLocaleDateString() }}
          </td>
        </tr>
        <tr v-if="!users.length">
          <td colspan="5" class="empty">No users</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
  sortBy: { type: String, default: null },
  sortDirection: { type: String, default: "asc" },
});

defineEmits(["sort"]);

const arrow = (field) => {
  if (props.sortBy !== field) return "↕";
  return props.sortDirection === "asc" ? "↑" : "↓";
};

const activeClass = (field) => (props.sortBy === field ? "active" : "");
</script>

<style scoped>
.table-wrapper {
  max-height: 400px;
  overflow: auto;
}
thead th {
  position: sticky;
  top: 0;
  background: #fff;
  cursor: pointer;
}
.th {
  padding: 0.875rem 1rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(55 65 81);
  white-space: nowrap;
}
.td {
  padding: 1rem;
  font-size: 0.875rem;
  color: rgb(75 85 99);
  white-space: nowrap;
}
.sortable {
  cursor: pointer;
  user-select: none;
}
.sortable:hover {
  background-color: rgb(243 244 246);
}
.active {
  background-color: rgb(229 231 235);
}
.arrow {
  margin-left: 6px;
  font-size: 0.75rem;
  opacity: 0.7;
}
.badge {
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  border: 1px solid rgb(229 231 235);
  text-transform: capitalize;
}
.empty {
  padding: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: rgb(107 114 128);
}
</style>
