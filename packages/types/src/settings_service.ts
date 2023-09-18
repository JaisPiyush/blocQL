export interface SettingsServiceInterface {
    getProcessedBlockHeight (): Promise<number>
  
    setProcessedBlockHeight (blockHeight: number): Promise<void>
  
    destroy?: () => Promise<void>
}