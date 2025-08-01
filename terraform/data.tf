data "digitalocean_ssh_key" "selected" {
  name = var.ssh_key_name
}