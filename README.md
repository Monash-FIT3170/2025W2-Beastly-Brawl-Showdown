# 2025W2-Beastly-Brawl-Showdown

### Instructions To Run Application

1. For MVP, the application is locally hosted from one computer but external devices can join IF both devices are under the same network.
2. To get your local ipv4 address, open up a command prompt and enter `ipconfig` and scroll to the bottom and see the IPv4 Address under\
   the `Wireless LAN adapter Wi-Fi` heading.
3. Replace the address in `client\IPtest.ts` and with your address and leave the port as 3000. E.g. `const local_ipv4 = "http://192.168.x.x";`
4. Now when you host a lobby, the QR code should take the player through the local ip, instead of localhost.
5. Open up a new terminal in your VSCode, making sure you're in the `2025W2-Beastly-Brawl-Showdown` directory.
6. Run `npm i`
7. Run `meteor run`

## System Architects:

- Devan (dfed0003@student.monash.edu)
- Danniel (dyou0009@student.monash.edu)
- Daniel Loh (dloh0003@student.monash.edu)

## Product Managers:

- Mubashar Ali Doostizadah (mdoo0013@student.monash.edu - mubashardoostizadah@gmail.com)
- Naveen (nsel0009@student.monash.edu)
- Meng (hsia0003@student.monash.edu)
- Tinesia (tyuu0023@student.monash.edu)
- Derek (dcao0008@student.monash.edu)
- Omar (osal0004@student.monash.edu)

## Release Train Engineers:

- Aden (atra0066@student.monash.edu)
- Will Richter (wric0006@student.monash.edu)
- Luna (pnag0009@student.monash.edu)
- Cameron (cameronhumphreys77@gmail.com)
- Anika (akam0020@student.monash.edu)
- Huu Nguyen (hngu0187@student.monash.edu)
