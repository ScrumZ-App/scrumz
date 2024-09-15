export {}

declare global {
  export interface Room {
    createdBy: string
    version: number
    isOpened: boolean
    options: { position: number; value: string }[]
    users: { [key: string]: { name: string; role: string } }
    voteVersions: { [key: number]: { user: string; option: number }[] }
  }

  export interface User {
    uid: string
    name: string
    role: string
  }

  interface Option {
    position: number
    value: string
    isEmpty?: boolean
  }
}
