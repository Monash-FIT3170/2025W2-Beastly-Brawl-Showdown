data "digitalocean_ssh_key" "selected" {
  name = var.ssh_key_name
}

data "digitalocean_project" "project_bbs" {
  name = var.project_name
}