export interface Pagination {
  total: number
  page: string
  limit: string
  prev: number
}
  
export interface IServerResponse<T>{
  data: T[] | T;
  pagination?: Pagination;
}
  