<script setup lang="ts">
import { LazyCertotUrlModal } from "#components";
import type { FormSubmitEvent } from "@nuxt/ui";

const { certot } = defineProps<{ certot: Certot }>();
const emit = defineEmits<{ close: [] }>();

const isPosting = ref(false);
const state = reactive(certot);
const form = useTemplateRef("form");

const overlay = useOverlay();
const certotUrlModal = overlay.create(LazyCertotUrlModal);

async function onSubmit(event: FormSubmitEvent<Certot>) {
  isPosting.value = true;

  const { certotUrl } = await $fetch("/api/certot/submit", {
    method: "POST",
    body: event.data,
  });

  emit("close");
  certotUrlModal.open({ certotUrl });
}
</script>

<template>
  <UModal
    :close="{ onClick: () => emit('close') }"
    title="Semak certot anda sebelum menyiarkan ke Daun"
    :ui="{ footer: 'justify-end' }"
  >
    <template #body>
      <UForm ref="form" :schema="certotSchema" :state class="space-y-4" @submit="onSubmit">
        <UFormField label="Tajuk" name="title" required>
          <UInput v-model="state.title" class="w-full" />
        </UFormField>

        <UFormField label="Cerita" name="story" required>
          <UTextarea v-model="state.story" autoresize class="w-full" />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton label="Batal" color="neutral" variant="outline" @click="emit('close')" />
      <UButton
        :label="isPosting ? 'Menyiarkan...' : 'Sahkan'"
        color="neutral"
        :loading="isPosting"
        @click="form?.submit()"
      />
    </template>
  </UModal>
</template>
