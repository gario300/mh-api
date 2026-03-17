import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'rankings.index': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'rankings.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'rankings.index': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}