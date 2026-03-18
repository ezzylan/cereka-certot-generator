export const useCertot = async () => {
  const prompts = useState<string[]>("prompts", () => []);
  const certot = useState<Certot | undefined>("certot", () => undefined);

  const route = useRoute();
  const certotId = computed(() => route.query.certotId);

  const { data } = await useFetch<{
    prompts: string[] | undefined;
    certot: Certot | undefined;
  }>("/api/certot", { query: { id: certotId } });

  watchEffect(() => {
    prompts.value = data.value?.prompts || [];
    certot.value = data.value?.certot;
  });

  return { prompts, certot };
};
