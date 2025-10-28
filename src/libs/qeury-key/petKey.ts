export const petKeys = {
  all: ['petData'] as const,
  detail: (petId: string) => [...petKeys.all, petId] as const,
}
