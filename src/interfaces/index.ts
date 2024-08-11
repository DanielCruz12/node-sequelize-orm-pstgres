export interface DBConfig {
    db_username: string;
    db_name: string;
    db_password: string;
    db_host: string;
    db_port: number;
  }

  export interface ShareFormResponseParams {
    userId: string;
    formId: string;
    share_status: boolean;
  }