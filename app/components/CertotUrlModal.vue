<script setup lang="ts">
defineProps<{ certotUrl: string }>();
const emit = defineEmits<{ close: [] }>();
</script>

<template>
  <UModal>
    <template #content>
      <UAlert
        color="neutral"
        variant="outline"
        title="Certot berjaya disiarkan!"
        description="Anda boleh melihat certot yang telah anda siarkan di pautan di bawah."
        icon="i-lucide-circle-check"
        :actions="[
          {
            label: 'Tolak',
            color: 'neutral',
            onClick: () => emit('close'),
          },
          {
            label: 'Lihat Certot',
            to: certotUrl,
            target: '_blank',
            icon: 'i-lucide-external-link',
          },
        ]"
      />
    </template>
  </UModal>
</template>
