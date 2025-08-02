
resource "digitalocean_reserved_ip" "droplet_bbs_game_server_ip" {
  region = var.region
}

resource "digitalocean_reserved_ip_assignment" "droplet_bbs_game_server_ip_assignment" {
  ip_address = digitalocean_reserved_ip.droplet_bbs_game_server_ip.ip_address
  droplet_id = digitalocean_droplet.droplet_bbs_game_server.id
}