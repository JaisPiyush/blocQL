import { SettingsServiceInterface } from '../settings_service';

export type SettingsServiceProvider = () => Promise<SettingsServiceInterface>;
