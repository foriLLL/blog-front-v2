export default interface ResData<T>{
  ifSuccessful: boolean
  data: T
  message?: string
}
