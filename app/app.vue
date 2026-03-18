<script setup lang="ts">
import { experimental_useObject as useObject } from "@ai-sdk/vue";
import type { AccordionItem } from "@nuxt/ui";
import * as z from "zod";

z.config(z.locales.ms());
const { loggedIn } = useUserSession();

const accuracyLevel = ref<keyof typeof accuracyEnum>("Rendah");

const selectedAccuracy = computed(() =>
  accuracyItems.find((item) => item.label === accuracyLevel.value),
);

const input = ref("");
const errorMessage = ref<string>();
watch(input, () => (errorMessage.value = ""));

const toast = useToast();
const { prompts, certot } = await useCertot();

const promptItems = computed<AccordionItem[]>(() => [
  { label: `${prompts.value.length} gesaan digunakan` },
]);

const {
  stop,
  clear,
  error,
  isLoading,
  submit: generateCertot,
} = useObject({
  api: "/api/certot/generate",
  schema: certotSchema,
  onFinish(result) {
    certot.value = result.object;
  },
  onError(error) {
    console.error(error);
    toast.add({
      title: error.name,
      description: error.message,
      color: "error",
    });
  },
});

const upperFirst = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

function onSubmit() {
  try {
    const { context } = inputSchema.pick({ context: true }).parse({ context: input.value.trim() });

    prompts.value.push(upperFirst(context));
    input.value = "";

    generateCertot({
      context,
      limit: selectedAccuracy.value!.value as AccuracyValues,
    } satisfies CertotInput);
  } catch (error) {
    if (error instanceof z.ZodError) {
      errorMessage.value = error.issues[0]?.message;
    }
  }
}
</script>

<template>
  <UApp :tooltip="{ delayDuration: 250 }">
    <UContainer class="space-y-6">
      <UHeader title="" :toggle="false" :ui="{ root: 'border-0 mb-0' }">
        <template #right>
          <LogInButton />
        </template>
      </UHeader>

      <UPageHero
        title="CertotJe"
        description="Hasilkan certot anda sendiri dengan mudah."
        :ui="{
          container: prompts.length ? 'py-4!' : 'py-12 sm:py-16 lg:py-20',
          headline:
            'flex flex-col items-center justify-center gap-1 font-semibold text-primary sm:flex-row',
        }"
      >
        <template #headline>
          <span class="flex items-center gap-1">
            Dikuasakan oleh
            <NuxtImg src="/daun-logo.jpg" alt="Daun Logo" width="20" class="inline" />
            <ULink to="https://daun.me/api/v2/docs" target="_blank" class="text-neutral-50"
              >API Daun</ULink
            >
          </span>
          <span class="flex items-center gap-1">
            dan
            <UIcon name="i-logos-google-icon" />
            <span class="text-neutral-50">Gemini 3.1 Flash Lite</span>
          </span>
        </template>
      </UPageHero>

      <section class="space-y-3'">
        <UChatPrompt
          v-model="input"
          :error
          variant="subtle"
          :disabled="isLoading || !loggedIn"
          placeholder="Taipkan gesaan cerita anda di sini..."
          @submit.prevent="onSubmit"
        >
          <UChatPromptSubmit :disabled="!input" @stop="stop" />

          <template #footer>
            <div class="flex items-center gap-2">
              <span class="hidden sm:inline">Ketepatan:</span>
              <USelect
                v-model="accuracyLevel"
                value-key="label"
                :items="accuracyItems"
                :icon="selectedAccuracy?.icon"
                class="w-40"
                :disabled="!loggedIn"
              />
            </div>
            <UButton
              v-if="loggedIn"
              variant="subtle"
              icon="i-lucide-plus"
              label="Certot Baru"
              @click="
                async () => {
                  await navigateTo('/');
                  clear();
                }
              "
            />
          </template>
        </UChatPrompt>

        <p v-if="errorMessage" class="ml-4 text-error">{{ errorMessage }}</p>
      </section>

      <section class="ml-4">
        <p v-if="isLoading" class="mb-3 flex items-center gap-1.5">
          <UIcon name="i-lucide-loader" class="animate-spin" />
          Menjana cerita...
        </p>

        <template v-else-if="prompts.length">
          <UAccordion v-if="prompts.length >= 3" :items="promptItems">
            <template #body>
              <ul v-for="(prompt, index) in prompts" :key="index" class="list-inside list-disc">
                <li>{{ prompt }}</li>
              </ul>
            </template>
          </UAccordion>

          <template v-else>
            <strong>Gesaan:</strong>
            <ul v-for="(prompt, index) in prompts" :key="index" class="list-inside list-disc">
              <li>{{ prompt }}</li>
            </ul>
          </template>
        </template>
      </section>

      <CertotOutput :prompts :certot />

      <UFooter
        :ui="{
          // TODO: fix footer position
          // https://css-tricks.com/couple-takes-sticky-footer/#aa-there-is-flexbox
          left: 'font-semibold gap-1 flex-col sm:flex-row',
          center: 'hidden',
        }"
      >
        <template #left>
          <span class="flex items-center gap-1">
            Dibuat dengan <UIcon name="i-lucide-heart" class="text-error" />
            oleh
            <ULink to="https://linkedin.com/in/ezlan-zulfiqree" target="_blank"
              >Ezlan Zulfiqree</ULink
            >
          </span>
          <span>
            untuk
            <ULink to="https://sahur.dev/" target="_blank">GodamSahur</ULink>
          </span>
        </template>

        <template #right>
          <UTooltip text="Repositori GitHub">
            <UButton
              icon="i-simple-icons-github"
              color="neutral"
              variant="ghost"
              to="https://github.com/ezzylan/cereka-certot-generator"
              target="_blank"
              aria-label="GitHub"
            />
          </UTooltip>
          <UTooltip text="Profil Daun">
            <UButton
              icon="i-lucide-leaf"
              color="neutral"
              variant="ghost"
              to="https://daun.me/ezzylan"
              target="_blank"
              aria-label="Daun"
            />
          </UTooltip>
        </template>
      </UFooter>
    </UContainer>
  </UApp>
</template>
