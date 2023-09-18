import { ConfigProvider } from "./providers/config_provider";
import { DataBroadcasterProvider } from "./providers/data_broadcaster_provider"
import { EventBusProvider } from "./providers/event_bus_provider";
import { LogProvider } from "./providers/log_provider"
import { ServiceProvider } from "./providers/service_provider"
import { SettingsServiceProvider } from "./providers/settings_provider"

export * from './event-bus'
export * from './providers'
export * from './settings_service'
export * from './ticket_throttler'


export interface Providers {
    serviceProvider: () =>  Promise<ServiceProvider>;
    dataBroadcasterProvider: DataBroadcasterProvider;
    logProvider: LogProvider;
    settingsServiceProvider: SettingsServiceProvider;
    eventBusProvider: EventBusProvider;
    configProvider: ConfigProvider<any>;

}