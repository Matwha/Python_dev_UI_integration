export interface Device {
  id: string;
  name: string;
  type: 'scpi' | 'modbus' | 'canbus';
  status: 'connected' | 'disconnected' | 'error';
  configuration: Record<string, any>;
}

export interface State {
  id: string;
  name: string;
  conditions: Condition[];
  actions: Action[];
}

export interface Condition {
  id: string;
  deviceId: string;
  parameter: string;
  operator: 'eq' | 'gt' | 'lt' | 'gte' | 'lte';
  value: number | string | boolean;
}

export interface Action {
  id: string;
  deviceId: string;
  command: string;
  parameters: Record<string, any>;
}

export interface Transition {
  id: string;
  fromStateId: string;
  toStateId: string;
  conditions: Condition[];
}