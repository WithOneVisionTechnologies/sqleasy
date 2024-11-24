// deno-lint-ignore-file no-explicit-any
export interface IConnection {
    closeConnection(): Promise<void>;
    connectionString(): string;
    executeMultiQuery(
        query: string,
        ...args: any[]
    ): Promise<Array<Array<Record<string, any>>>>;
    executeQuery(
        query: string,
        ...args: any[]
    ): Promise<Array<Record<string, any>>>;
    isConnected(): boolean;
    openConnection(): Promise<void>;
    setConnectionString(connectionString: string): void;
    setIsConnected(connected: boolean): void;
}
