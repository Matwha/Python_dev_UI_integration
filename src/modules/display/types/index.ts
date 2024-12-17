export interface DisplayWidget {
  id: string;
  type: 'gauge' | 'chart' | 'value' | 'status';
  config: Record<string, any>;
  dataSource: string;
}

export interface DisplayLayout {
  id: string;
  name: string;
  widgets: DisplayWidget[];
  grid: {
    columns: number;
    rows: number;
  };
}