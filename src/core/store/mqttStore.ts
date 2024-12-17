import { create } from 'zustand';
import * as mqtt from 'mqtt';

interface MQTTStore {
  client: mqtt.MqttClient | null;
  connected: boolean;
  messages: Record<string, any>;
  connect: (url: string) => void;
  disconnect: () => void;
  subscribe: (topic: string) => void;
  publish: (topic: string, message: any) => void;
}

export const useMQTTStore = create<MQTTStore>((set, get) => ({
  client: null,
  connected: false,
  messages: {},

  connect: (url) => {
    const client = mqtt.connect(url);
    
    client.on('connect', () => {
      set({ client, connected: true });
    });

    client.on('message', (topic, message) => {
      set((state) => ({
        messages: {
          ...state.messages,
          [topic]: JSON.parse(message.toString())
        }
      }));
    });
  },

  disconnect: () => {
    const { client } = get();
    if (client) {
      client.end();
      set({ client: null, connected: false });
    }
  },

  subscribe: (topic) => {
    const { client } = get();
    if (client) {
      client.subscribe(topic);
    }
  },

  publish: (topic, message) => {
    const { client } = get();
    if (client) {
      client.publish(topic, JSON.stringify(message));
    }
  }
}));