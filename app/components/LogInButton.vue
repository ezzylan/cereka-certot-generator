<script setup lang="ts">
import { LazyCertotsSlideover } from "#components";
import type { DropdownMenuItem } from "@nuxt/ui";

const overlay = useOverlay();
const certotsSlideover = overlay.create(LazyCertotsSlideover);

const config = useRuntimeConfig();
const { user, session, clear } = useUserSession();
const { data: certots } = await useFetch("/api/certots");

const items = ref<DropdownMenuItem[]>([
  [
    {
      label: "Lihat Certot² yang Disimpan",
      icon: "i-lucide-eye",
      onSelect: () => certotsSlideover.open(),
      disabled: certots.value?.length === 0,
    },
    {
      label: "Buka Profil Daun",
      icon: "i-lucide-user",
      to: `${config.public.daunBaseURL}/${user.value?.username}`,
      target: "_blank",
    },
  ],
  [
    {
      label: "Log Keluar",
      icon: "i-lucide-log-out",
      onSelect: async () => {
        await clear();

        await $fetch(`${config.public.daunBaseURL}/api/v2/oauth/revoke`, {
          method: "POST",
          body: {
            client_id: config.oauth.oidc.clientId,
            client_secret: config.oauth.oidc.clientSecret,
            api_key: session.value?.secure?.apiKey,
          },
        });
      },
    },
  ],
]);
</script>

<template>
  <UDropdownMenu v-if="user" :items :content="{ align: 'end' }" :ui="{ item: 'cursor-pointer' }">
    <UButton
      :avatar="{ src: user.image }"
      :label="`Hai, ${user.name}`"
      color="neutral"
      variant="subtle"
    />
  </UDropdownMenu>

  <UPopover v-else open :content="{ align: 'end' }">
    <UButton :avatar="{ src: '/daun-logo.jpg' }" color="neutral" variant="subtle" to="/auth/oidc">
      Log Masuk dengan Daun
    </UButton>

    <template #content>
      <UAlert
        color="warning"
        title="Anda tidak log masuk!"
        description="Sila log masuk dahulu sebelum meneruskan."
        icon="i-lucide-triangle-alert"
      />
    </template>
  </UPopover>
</template>
