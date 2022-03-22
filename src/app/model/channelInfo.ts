export class ChannelInfo {
  public preview: string | null = null;

  constructor(
    public name: string,
    public alternateNames: string[],
    public thumbnail: string,
    public info: string,
    public url: string,
    public hidden: boolean,
  ) { }
}

export const channelInfos: ChannelInfo[] = [
  // hd
  { name: "Das Erste", alternateNames: ["Das Erste HD"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/das-erste.png", info: "", url: "https://www.daserste.de/live", hidden: false, preview: null },
  { name: "ZDF", alternateNames: ["ZDF HD"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/zdf.png", info: "", url: "https://www.zdf.de/live-tv", hidden: false, preview: null },
  { name: "WDR", alternateNames: ["WDR HD Köln", "WDR Köln", "WDR Aachen", "WDR Bonn", "WDR Düsseldorf", "WDR Wuppertal"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/wdr.png", info: "", url: "", hidden: false, preview: null },
  { name: "3sat", alternateNames: ["3sat HD"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/3sat.png", info: "", url: "", hidden: false, preview: null },
  { name: "arte", alternateNames: ["arte HD"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/arte.png", info: "", url: "", hidden: false, preview: null },
  { name: "Servus TV", alternateNames: ["ServusTV HD"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/servustv.png", info: "", url: "", hidden: false, preview: null },
  { name: "zdf_neo", alternateNames: ["zdf_neo HD"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/zdfneo.png", info: "", url: "", hidden: false, preview: null },
  { name: "ONE", alternateNames: ["ONE HD"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/one.png", info: "", url: "", hidden: false, preview: null },
  { name: "phoenix", alternateNames: ["phoenix HD"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/phoenix.png", info: "", url: "", hidden: false, preview: null },
  { name: "ZDFinfo", alternateNames: ["ZDFinfo HD"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/zdfinfo.png", info: "", url: "", hidden: false, preview: null },
  { name: "tagesschau24", alternateNames: ["tagesschau24 HD"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/tagesschau24.png", info: "", url: "", hidden: false, preview: null },
  { name: "KiKA", alternateNames: ["KiKA HD"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/kika.png", info: "", url: "", hidden: false, preview: null },
  { name: "ARD alpha", alternateNames: ["ARD alpha HD"], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "NDR", alternateNames: ["NDR FS NDS HD", "NDR FS HH", "NDR FS MV", "NDR FS NDS", "NDR FS SH"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/ndr.png", info: "", url: "", hidden: false, preview: null },
  { name: "MDR", alternateNames: ["MDR Sachsen HD", "MDR Sachsen", "MDR S-Anhalt", "MDR Thüringen"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/mdr.png", info: "", url: "", hidden: false, preview: null },
  { name: "SWR", alternateNames: ["SWR RP HD", "SWR Fernsehen BW", "SWR Fernsehen RP"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/swr.png", info: "", url: "", hidden: false, preview: null },
  { name: "BR", alternateNames: ["BR Fernsehen Süd HD", "BR Fernsehen Nord", "BR Fernsehen Süd"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/br.png", info: "", url: "", hidden: false, preview: null },
  { name: "hr", alternateNames: ["hr-fernsehen HD", "hr-fernsehen"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/hr.png", info: "", url: "", hidden: false, preview: null },
  { name: "rbb", alternateNames: ["rbb Berlin HD", "rbb Berlin", "rbb Brandenburg"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/rbb.png", info: "", url: "", hidden: false, preview: null },
  { name: "CNBC", alternateNames: ["CNBC HD"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/cnbc.png", info: "", url: "", hidden: false, preview: null },
  // sd
  { name: "RTL", alternateNames: ["RTL Television"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/rtl.png", info: "", url: "", hidden: false, preview: null },
  { name: "SAT.1", alternateNames: ["SAT1 NRW"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/sat.1.png", info: "", url: "", hidden: false, preview: null },
  { name: "ProSieben", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/prosieben.png", info: "", url: "", hidden: false, preview: null },
  { name: "VOX", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/vox.png", info: "", url: "", hidden: false, preview: null },
  { name: "RTL Zwei", alternateNames: ["RTLZWEI"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/rtl2.png", info: "", url: "", hidden: false, preview: null },
  { name: "kabel eins", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/kabel-eins.png", info: "", url: "", hidden: false, preview: null },
  { name: "DMAX", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/dmax.png", info: "", url: "", hidden: false, preview: null },
  { name: "NITRO", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/rtl-nitro.png", info: "", url: "", hidden: false, preview: null },
  { name: "TELE 5", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/tele-5.png", info: "", url: "", hidden: false, preview: null },
  { name: "Disney Channel", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/disney-channel.png", info: "", url: "", hidden: false, preview: null },
  { name: "sixx", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/sixx.png", info: "", url: "", hidden: false, preview: null },
  { name: "SAT.1 Gold", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/sat.1-gold.png", info: "", url: "", hidden: false, preview: null },
  { name: "ProSieben MAXX", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/pro7-maxx.png", info: "", url: "", hidden: false, preview: null },
  { name: "HGTV", alternateNames: [], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "TLC", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/tlc.png", info: "", url: "", hidden: false, preview: null },
  { name: "ANIXE", alternateNames: ["ANIXE SD"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/anixe-sd.png", info: "", url: "", hidden: false, preview: null },
  { name: "MTV", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/mtv.png", info: "", url: "", hidden: false, preview: null },
  { name: "SPORT1", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/sport1.png", info: "", url: "", hidden: false, preview: null },
  { name: "Eurosport", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/eurosport.png", info: "", url: "", hidden: false, preview: null },
  { name: "n-tv", alternateNames: ["ntv"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/n-tv.png", info: "", url: "", hidden: false, preview: null },
  { name: "Welt", alternateNames: [], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "Euronews", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/euronews.png", info: "", url: "", hidden: false, preview: null },
  { name: "Super RTL", alternateNames: ["Super RTL"], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/super-rtl.png", info: "", url: "", hidden: false, preview: null },
  { name: "KiKA", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/kika.png", info: "", url: "", hidden: false, preview: null },
  { name: "Deluxe Music", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/deluxe-music.png", info: "", url: "", hidden: false, preview: null },
  { name: "Deutsches Musik Fernsehen", alternateNames: [], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "ORF2", alternateNames: ["ORF2 Europe"], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "N24 DOKU", alternateNames: [], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "kabel eins Doku", alternateNames: [], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "NRWision", alternateNames: [], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "AL JAZEERA", alternateNames: ["Al Jazeera international"], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "BBC World News", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/bbc.png", info: "", url: "", hidden: false, preview: null },
  { name: "Bloomberg Europe TV", alternateNames: [], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "CNN Int.", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/cnn.png", info: "", url: "", hidden: false, preview: null },
  { name: "Russia Today", alternateNames: [], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "FRANCE 2", alternateNames: [], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "FRANCE 3", alternateNames: [], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "FRANCE 5", alternateNames: [], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "TV5MONDE", alternateNames: ["TV5MONDE EUROPE"], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "TGRT", alternateNames: ["TGRT EU"], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "1+1", alternateNames: ["1+1 International"], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "Tunisia 1", alternateNames: [], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "KBS", alternateNames: ["KBS World HD"], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "TVR", alternateNames: ["TVR international"], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "Comedy Central", alternateNames: [], thumbnail: "https://raw.githubusercontent.com/cytec/tvlogos/master/comedy-central.png", info: "", url: "", hidden: false, preview: null },
  { name: "NHK", alternateNames: ["NHK World TV"], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "NPO 1", alternateNames: [], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  { name: "NPO 2 ", alternateNames: [], thumbnail: "", info: "", url: "", hidden: false, preview: null },
  // hidden
  { name: "QVC", alternateNames: ["QVC HD", "QVC Deutschland"], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "Sonnenklar TV", alternateNames: ["sonnenklar.TV HD"], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "1-2-3.tv", alternateNames: ["1-2-3.tv HD"], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "Juwelo TV", alternateNames: ["Juwelo HD"], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "Bibel TV", alternateNames: ["Bibel TV HD"], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "HSE24", alternateNames: [], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "QVC2", alternateNames: [], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "QVC STYLE", alternateNames: [], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "Sparhandy TV", alternateNames: [], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "Channel 21", alternateNames: [], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "NICK/CC+1", alternateNames: [], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "ARD-alpha bis 14.12.2021 zu HD wechseln", alternateNames: [], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "K-TV", alternateNames: [], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "AstroTV", alternateNames: [], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "EWTN katholisches TV", alternateNames: [], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "health.tv", alternateNames: [], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "GOD TV", alternateNames: [], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "Sonlife Broadcasting Network", alternateNames: [], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "Infokanal 2", alternateNames: [], thumbnail: "", info: "", url: "", hidden: true, preview: null },
  { name: "Shop LC", alternateNames: [], thumbnail: "", info: "", url: "", hidden: true, preview: null },
];

export const channelInfoMap: Map<string, ChannelInfo> = buildMap();

function buildMap(): Map<string, ChannelInfo> {
  const map: Map<string, ChannelInfo> = new Map();
  for (const info of channelInfos) {
    map.set(info.name, info);
    for (const altName of info.alternateNames) {
      map.set(altName, info);
    }
  }
  return map;
}
