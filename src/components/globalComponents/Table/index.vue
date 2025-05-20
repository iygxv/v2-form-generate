<template>
  <el-table
    :data="data"
    :cell-class-name="cellClassName"
    :header-cell-class-name="headerCellClassName"
    :header-cell-style="{ background: '#FAFAFA'}"
    :row-style="{ color: '#61677F',fontSize: '14px'}"
    v-bind="$attrs"
    v-on="$listeners">
    <template
      v-for="(col, index) in columns">
      <el-table-column
        v-if="col.type === 'index'"
        type="index"
        :width="col.width || 60"
        :key="index"
        :index="col.index"
        :label="col.label">
      </el-table-column>
      <el-table-column
        v-else-if="col.type === 'selection'"
        type="selection"
        :width="col.width || 60"
        :key="index"
        :selectable="col.selectable">
      </el-table-column>
      <el-table-column
        v-else-if="'slot' in col"
        :width="col.width"
        :key="index"
        :label="col.label"
        v-bind="col.attrs">
        <template #default="{ row, column, $index}">
          <slot :row="row" :column="column" :index="$index" :name="col.slot"></slot>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :width="col.width"
        :key="index"
        :prop="col.prop"
        :label="col.label"
        :formatter="col.formatter"
        v-bind="col.attrs">
        <template v-if="col.headerSlot" #header="{ column, $index}">
          <slot :column="column" :index="$index" :name="col.headerSlot"></slot>
        </template>
        <template v-if="col.columns">
          <el-table-column
            v-for="item in col.columns"
            :width="item.width"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :formatter="item.formatter"
            v-bind="item.attrs">
            <template v-if="item.headerSlot" #header="{ column, $index}">
              <slot :column="column" :index="$index" :name="item.headerSlot"></slot>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
export default {
  name: 'AppTable',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    cellClassName: {
      type: [String, Function],
      default: 'is-center'
    },
    headerCellClassName: {
      type: [String, Function],
      default: 'is-center'
    },
    stripe: {
      type: Boolean,
      default: true
    }
  }
}
</script>
