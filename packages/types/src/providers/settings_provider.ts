import { SettingsServiceInterface } from '../settings/settings_service';

export type SettingsServiceProvider = () => Promise<SettingsServiceInterface>