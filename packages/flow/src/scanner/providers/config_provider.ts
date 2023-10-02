import { ConfigProvider } from 'types/src/providers/config_provider';

export interface FlowConfig {
    flowAccessNode: string;
}

export type FlowConfigProvider = ConfigProvider<FlowConfig>;