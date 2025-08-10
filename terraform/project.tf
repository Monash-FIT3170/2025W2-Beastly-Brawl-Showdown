resource "digitalocean_project_resources" "project_bbs_resources" {
  project = data.digitalocean_project.project_bbs.id
  resources = [
    digitalocean_droplet.droplet_bbs_game_server.urn,
    digitalocean_reserved_ip.droplet_bbs_game_server_ip.urn,
  ]
}