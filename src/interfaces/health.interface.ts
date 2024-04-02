export interface HealthDB {
  status: string
  message: string
  lastChecked: Date
}

export type IHealthResponse = HealthDB & {
  database: HealthDB
  redis: HealthDB
}
