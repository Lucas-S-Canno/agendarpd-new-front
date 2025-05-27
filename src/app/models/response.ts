export interface ResponseModel<T> {
  statusCode: number,
  satusMessage: string,
  data: T,
}
