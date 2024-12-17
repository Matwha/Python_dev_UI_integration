export interface Control {
  id: string;
  name: string;
  type: 'button' | 'switch' | 'slider';
  config: Record<string, any>;
  action: () => void;
}

export interface ControlGroup {
  id: string;
  name: string;
  controls: Control[];
}