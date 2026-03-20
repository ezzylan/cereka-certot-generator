<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";

const emit = defineEmits<{ close: [] }>();

const fields: AuthFormField[] = [
  {
    name: "username",
    type: "text",
    label: "Username Daun",
    placeholder: "Masukkan username anda",
    required: true,
  },
];

const toast = useToast();
const isLoading = ref(false);
const { fetch } = useUserSession();

async function onSubmit(payload: FormSubmitEvent<Auth>) {
  isLoading.value = true;

  try {
    await $fetch("/api/login", {
      method: "POST",
      body: payload.data,
    });

    fetch();
    emit("close");
  } catch {
    isLoading.value = false;

    toast.add({
      title: "Anda tidak pernah log masuk sebelum ini!",
      description: "Anda akan dialihkan ke halaman OAuth.",
      icon: "i-lucide-external-link",
      duration: 2000,
      close: false,
      "onUpdate:open": async () => {
        await navigateTo("/auth/oidc", { external: true });
      },
    });
  }
}
</script>

<template>
  <UModal :close="{ onClick: () => emit('close') }" :ui="{ content: 'w-fit' }">
    <template #content>
      <UPageCard class="w-full max-w-md">
        <UAuthForm
          :schema="authSchema"
          title="Log Masuk"
          description="Masukkan credentials anda untuk mengakses akaun anda."
          icon="i-lucide-user"
          :fields
          :submit="{
            label: isLoading ? 'Menghantar...' : 'Hantar',
            loading: isLoading,
          }"
          @submit="onSubmit"
        />
      </UPageCard>
    </template>
  </UModal>
</template>
