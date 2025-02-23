export type Database = {
  public: {
    Tables: {
      levels: {
        Row: {
          id: number;
          label: string;
          is_enabled: boolean;
        };
      };
    };
  };
};
