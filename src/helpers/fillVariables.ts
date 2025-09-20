import { Variables } from '@types';

export const fillVariables = (email: string, incomingData: string): string => {
  if (!incomingData.includes('{{')) {
    return incomingData;
  }

  const store = localStorage.getItem(email);
  if (!store) return incomingData;

  try {
    const storedVariables: Variables = JSON.parse(store);

    if (!storedVariables || !Array.isArray(storedVariables.variables)) {
      return incomingData;
    }

    return incomingData.replace(/{{\s*([^}]+)\s*}}/g, (_, key) => {
      const found = storedVariables.variables.find((v) => v.key === key.trim());
      return found ? found.value : `{{${key}}}`;
    });
  } catch {
    return incomingData;
  }
};
