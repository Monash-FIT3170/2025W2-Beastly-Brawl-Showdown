variable "ssh_key_name" {
  type        = string
}

variable "region" {
  type        = string
}

variable "droplet_name" {
  type        = string
}

variable "project_name" {
  type        = string
}

// This base image will only be used for the initial creation of the droplet (or if a snapshot was not found).
// After that, the image will be updated to the latest snapshot.
// The snapshot will be created by the shutdown workflow.
// The startup workflow will update the image variable to the latest snapshot.
variable "droplet_image" {
  type        = string
  default     = "ubuntu-22-04-x64" 
}

variable "droplet_size" {
  type        = string
}

// This is initialised throuh the workflow TF_VAR_do_token
variable "do_token" {}