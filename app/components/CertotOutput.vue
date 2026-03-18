<script setup lang="ts">
import { LazyCertotPreviewModal } from "#components";

const { prompts, certot } = defineProps<{
  prompts: string[];
  certot: Certot | undefined;
}>();

const toast = useToast();
const isSaving = ref(false);
const { copy, copied } = useClipboard({ source: certot?.story });

async function saveToDatabase() {
  isSaving.value = true;

  await $fetch("/api/certot/save", {
    method: "POST",
    body: { prompts, certot },
  });

  toast.add({
    title: "Certot berjaya disimpan!",
    icon: "i-lucide-circle-check",
    color: "success",
  });

  isSaving.value = false;
}

const overlay = useOverlay();
const certotPreviewModal = overlay.create(LazyCertotPreviewModal);
</script>

<template>
  <UPageCard
    v-if="certot"
    :title="certot.title"
    :description="certot.story"
    :ui="{
      // TODO: fix footer button position
      footer: 'flex justify-end gap-1.5',
    }"
  >
    <template #footer>
      <UButton
        :label="copied ? 'Sudah salin!' : 'Salin'"
        color="neutral"
        variant="subtle"
        :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
        @click="copy()"
      />
      <UButton
        :label="isSaving ? 'Menyimpan...' : 'Simpan'"
        color="neutral"
        variant="subtle"
        icon="i-lucide-save"
        :loading="isSaving"
        @click="saveToDatabase"
      />
      <UButton
        :avatar="{ src: '/daun-logo.jpg' }"
        label="Siarkan ke Daun"
        @click="certotPreviewModal.open({ certot })"
      />
    </template>
  </UPageCard>
</template>
