export interface Driver {
  id: string;
  name: string;
  type: 'plc' | 'modbus' | 'canbus' | 'scpi';
  config: Record<string, any>;
}

export interface DriverTemplate {
  name: string;
  code: string;
  defaultConfig: Record<string, any>;
}