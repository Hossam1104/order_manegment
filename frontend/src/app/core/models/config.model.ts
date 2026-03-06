export interface AppConfig {
    serverName: string;
    databaseName: string;
    dbUsername: string;
    dbPassword: string;
    updatedAt: string | null;
    seedDataEnabled: boolean;
    seedDataCount: number;
    seedDataCategory: string;
}

export interface UpdateConfigRequest {
    serverName: string;
    databaseName: string;
    dbUsername: string;
    dbPassword: string;
    seedDataEnabled: boolean;
    seedDataCount: number;
    seedDataCategory: string;
}

export interface TestConnectionRequest {
    serverName: string;
    databaseName: string;
    dbUsername: string;
    dbPassword: string;
}
