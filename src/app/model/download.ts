export interface Downloads {
  queue: Download[],
  active_downloads: Download[],
}

export interface Download {
  status: "Created" | "Running" | "Cancelled" | "Error",
  uuid: string,
  url: string,
  path: string,
  current_size: number,
  size: number,
}
