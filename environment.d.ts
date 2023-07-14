declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENAI_API_KEY: string;
      AZURE_COGNITIVE_SERVICES_SPEECH_KEY: string;
      AZURE_LANGUAGE_QME_KEY: string;
    }
  }
}

export {};
