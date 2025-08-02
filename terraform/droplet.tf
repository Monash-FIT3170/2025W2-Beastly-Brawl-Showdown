resource "digitalocean_droplet" "droplet_bbs_game_server" {
  image   = var.droplet_image
  name    = var.droplet_name
  region  = var.region
  size    = var.droplet_size
  ssh_keys = [data.digitalocean_ssh_key.selected.id]

  graceful_shutdown = true
}