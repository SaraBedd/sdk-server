import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { Prompts, SystemPrompt } from "../constants/prompts";

const chat = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo",
});

/**
 *
 * @returns A new langchain conversational chain with history
 */
export const initializeOpenAi = (prompt: SystemPrompt): ConversationChain => {
  // Conversational chain allows us to start a conversation with history
  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(Prompts.SYSTEM(prompt)),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);

  return new ConversationChain({
    memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
    prompt: chatPrompt,
    llm: chat,
  });
};

/**
 *
 * @param chain Conversational chain to send the prompt to
 * @param input Prompt to send to the conversational chain provided
 * @returns Response from the LLM
 */
export const callOpenAi = async (
  chain: ConversationChain,
  input: string
): Promise<string> => {
  const completion = await chain.call({
    input,
  });

  return completion.response as string;
};
