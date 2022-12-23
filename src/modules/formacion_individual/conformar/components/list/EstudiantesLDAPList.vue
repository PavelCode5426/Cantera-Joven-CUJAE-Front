<script setup lang="ts">
</script>

<template>
  <el-table :data="data">
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{ scope.row.name }} {{ scope.row.surname }} {{ scope.row.lastname }}
      </template>
    </el-table-column>
    <el-table-column label="Correo" prop="email" />
    <el-table-column align="right">
      <template #default="scope">
        <confirm-pop-button
          confirm-button-type="primary"
          button-title="Importar"
          button-type="btn-primary"
          button-icon=""
          title="¿Esta seguro que desea imporar el elemento?"
          @on-confirm="deleteItem(scope.row.id)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>
