<script setup lang="ts">
import { UPageCard } from "#components";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const emit = defineEmits<{ close: [] }>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isDesktop = breakpoints.greaterOrEqual("md");

const { data: certots } = await useFetch("/api/certots");
</script>

<template>
  <USlideover
    :side="isDesktop ? 'right' : 'bottom'"
    :close="{ onClick: () => emit('close') }"
    title="Certot-certot yang Disimpan"
  >
    <template #body>
      <UPageList divide>
        <UPageCard
          v-for="certot in certots"
          :key="certot.id"
          :title="certot.title"
          :description="certot.story"
          variant="solid"
          :ui="{
            root: 'cursor-pointer',
            container: 'p-4! min-w-0 w-full',
            body: 'min-w-0 w-full',
            description: 'truncate',
          }"
          @click="
            async () => {
              await navigateTo({
                query: { certotId: certot.id },
              });
              emit('close');
            }
          "
        />
      </UPageList>
    </template>
  </USlideover>
</template>
