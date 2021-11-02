export interface Download {
  status: "Created" | "Running" | "Finished" | "Error",
  uuid: string,
  url: string,
  path: string,
  current_size: number,
  size: number,
}
