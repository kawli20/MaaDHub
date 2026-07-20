export interface Account {
  id: number;
  gameName: string;
  platform: string;
  username: string;
  password: string;
  supportLink?: string;
  imageUrl: string;
  createdAt: string;
}

export const PLATFORMS = [
  "Steam",
  "Epic Games",
  "Ubisoft",
  "EA",
  "Battle.net",
  "Riot Games",
  "Rockstar Games",
  "Xbox",
  "PlayStation",
  "Origin",
  "GOG",
  "Netflix",
  "Crunchyroll",
  "Amazon",
  "Spotify",
  "Discord",
  "Other",
] as const;

// ======================== YOUR ACCOUNTS ========================
// Edit this array with your own accounts.
// Images: Use any direct URL (imgur, postimg, discord CDN, etc.)
//         OR use local images: /games/steam.jpg, /games/epic.jpg, etc.
// ===============================================================
export const DEFAULT_ACCOUNTS: Account[] = [
  {
    id: 1,
    gameName: "Black Myth: Wukong",
    platform: "Steam",
    username: "SkizeGames42474BMW",
    password: "www.skizegames.store",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBvNeGDsjHa2tGEXDIKKCKd7zvbbu-n9kF8JpWWMiJqRA8PGlayj4DgEM&s=10",
    createdAt: "2024-01-15T10:30:00.000Z",
  },
  {
    id: 2,
    gameName: "10300k games",
    platform: "Steam",
    username: "deafcookie",
    password: "0852594338",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRUu0ztxAojVtvkHDSCPIhmjLzU1RV-Huo_pn_Hoy9yXO158OMAedgXb0G&s=10",
    createdAt: "2024-01-20T14:15:00.000Z",
  },
  {
    id: 3,
    gameName: "Red Dead Redemption 2",
    platform: "Steam",
    username: "presidentialbandicoot8056",
    password: "f-r-e-e-akk-tg:@hyznet",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7_O9ORjSOF8_LuT3VQ4guUQ1QHlQL4NSyl5kFVAnEng&s=10",
    createdAt: "2024-02-01T09:00:00.000Z",
  },
  {
    id: 4,
    gameName: "Call of Duty: Black Ops III",
    platform: "Steam",
    username: "dvtlv0nmkl",
    password: "YSDI0C0kgE",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfvDd115AjUhKUkto8ROc0V1ZxMCsQJ0WuOn3uSlDqBg&s",
    createdAt: "2024-02-10T16:30:00.000Z",
  },
  {
    id: 5,
    gameName: "Resident Evil 4",
    platform: "Steam",
    username: "jseyk61637",
    password: "bxdms13816",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202210/0706/EVWyZD63pahuh95eKloFaJuC.png",
    createdAt: "2024-02-15T11:00:00.000Z",
  },
  {
    id: 6,
    gameName: "God Of War Ragnarok",
    platform: "Steam",
    username: "krishurt9p",
    password: "wTrekfan66!vrz",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg",
    createdAt: "2024-03-01T08:45:00.000Z",
  },
  {
    id: 7,
    gameName: "Grand Theft Auto V",
    platform: "Steam",
    username: "Sanzi_YT",
    password: "friend.2417",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/d2/55/ac/d255ac78bb40edc96076bb4c22a32504.jpg",
    createdAt: "2024-03-10T13:20:00.000Z",
  },
  {
    id: 8,
    gameName: "Mafia 1 , 2 , 3",
    platform: "Steam",
    username: "enova36601",
    password: "aynhs76029",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM-AFfRxKsrayW3YGKP0cSxDxfjU-7MktXu8WBeyqbMQ089KGJw67ZqdoR&s=10",
    createdAt: "2024-03-15T15:00:00.000Z",
  },
  {
    id: 9,
    gameName: "Forza horizon 5",
    platform: "Steam",
    username: "5114599039",
    password: "0797484206",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/ba/97/ef/ba97ef693775f9a05b93da76c1ec9f16.jpg",
    createdAt: "2024-04-01T10:00:00.000Z",
  },
  {
    id: 10,
    gameName: "EA Sports FC 26",
    platform: "Steam",
    username: "I1jyGzTWW",
    password: "VrVIwhgeG",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnNjd29qaHpqNjdraGd6eThmc2w1djNuMGVwMTB2d3JtZGIxOHc0NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/n8rTLLINBycMxi73lQ/giphy.gif",
    createdAt: "2024-04-10T09:30:00.000Z",
  },
  {
    id: 11,
    gameName: "Among Us",
    platform: "Steam",
    username: "wbtq1083464",
    password: "steamok45785112",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/3c/cb/f4/3ccbf44f2de4bd7d5d6d025567661102.jpg",
    createdAt: "2024-04-20T14:00:00.000Z",
  },
  {
    id: 12,
    gameName: "ELDEN RING",
    platform: "Steam",
    username: "ma5vj3da6mm2",
    password: "dsajhdsfjks3289325ds@",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/42/e2/b0/42e2b09303502d5ef8454425d73ab98f.jpg",
    createdAt: "2024-05-01T11:30:00.000Z",
  },
  {
    id: 13,
    gameName: "EA SPORTS FC 25",
    platform: "Steam",
    username: "dbukm85343",
    password: "sghzg61360",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/a9/5e/09/a95e092e7d561570d10280612fabfe01.jpg",
    createdAt: "2024-05-01T11:30:00.000Z",
  },
  {
    id: 14,
    gameName: "The Witcher 3: Wild Hunt",
    platform: "Steam",
    username: "asahiaki1",
    password: "marpanov_free19",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/c8/29/b5/c829b51b7bec75abba4bb5f47ad821ee.jpg",
    createdAt: "2024-05-01T11:30:00.000Z",
  },
  {
    id: 15,
    gameName: "Batman: Arkham City",
    platform: "Steam",
    username: "ksfxo878",
    password: "steamok773366",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/e5/c4/98/e5c4989f7b85913865adc0573018b1a9.jpg",
    createdAt: "2024-05-01T11:30:00.000Z",
  },
  {
    id: 16,
    gameName: "Watch Dogs",
    platform: "Steam",
    username: "jp30ekXr",
    password: "wa72ITSA",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/c5/fb/f2/c5fbf2333e228a1fe4536a577a0fca4c.jpg",
    createdAt: "2024-05-01T11:30:00.000Z",
  },
  {
    id: 17,
    gameName: "The Last of Us Part I and Part II",
    platform: "Steam",
    username: "thelast1q",
    password: "playerok.com/profile/QAVIX",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn1.epicgames.com/offer/0c40923dd1174a768f732a3b013dcff2/EGS_TheLastofUsPartI_NaughtyDogLLC_S2_1200x1600-41d1b88814bea2ee8cb7986ec24713e0",
    createdAt: "2024-05-01T11:30:00.000Z",
  },
  {
    id: 18,
    gameName: "Euro Truck Simulator 2",
    platform: "Steam",
    username: "gmsuk92770",
    password: "brpnk01133",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/5e/2d/a0/5e2da0c309e30247e50e28830be225c9.jpg",
    createdAt: "2024-05-01T11:30:00.000Z",
  },
  {
    id: 19,
    gameName: "PAYDAY 2",
    platform: "Steam",
    username: "mafia_phasmavpn",
    password: "qWERTY33!",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/9f/6c/39/9f6c39993ee700c3bd556ca666509948.jpg",
    createdAt: "2024-05-01T11:30:00.000Z",
  },
  {
    id: 20,
    gameName: "Far Cry 3",
    platform: "Steam",
    username: "youallsuck_911",
    password: "Adje2003a.1",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/3e/b6/a4/3eb6a4f5b93754b38ce3c2869778e78e.jpg",
    createdAt: "2024-07-20T18:00:00.000Z",
  },
  {
    id: 21,
    gameName: "Battlefield 3",
    platform: "Steam",
    username: "KidDeath143",
    password: "momdad2001",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/cd/ec/1c/cdec1ce84444c342a211edcba2727097.jpg",
    createdAt: "2024-05-01T11:30:00.000Z",
  },
  {
    id: 22,
    gameName: "NBA 2K25",
    platform: "Steam",
    username: "kk80401",
    password: "kk223344kkwdw",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHR4bXEzZTN2eXR3b2ExaW93aXZwZTRndWRsbjdnM2JmZWJhZ2hkZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/y7NmHw25VGwA0UuKRn/giphy.gif",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 23,
    gameName: "Resident Evil Series",
    platform: "Steam",
    username: "yczhw46123",
    password: "CookieStore1122",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/32/71/af/3271af2f5c99601dc1c9189adae48c94.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 24,
    gameName: "Attack On Titan 2",
    platform: "Steam",
    username: "aot2_kg2",
    password: "eren1145@#",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn.loaded.com/media/catalog/product/a/o/aot_final_battle.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 25,
    gameName: "Wallpaper engine",
    platform: "Steam",
    username: "dy5no5ss2ap2",
    password: "P_Block@0975",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn2.steamgriddb.com/grid/6910c07743a1a1dbd134c8233fb822ea.png",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 26,
    gameName: "Assetto Corso",
    platform: "Steam",
    username: "Ok1Rm6Kp7Ol0",
    password: "Lq5Ok3My1Wh5",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/c0/fa/52/c0fa52a3f90b6433827c0ca334241c77.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 27,
    gameName: "Resident Evil Requiem",
    platform: "Steam",
    username: "egoros3p41",
    password: "siski33BFa9lCBU7O67483",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://media1.tenor.com/m/_D2_OdnlyPsAAAAd/awsan-resident-evil-requiem.gif",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 28,
    gameName: "Rust",
    platform: "Steam",
    username: "lsoiy210",
    password: "lwl67033R",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/4f/29/4d/4f294db80e37fdd0f52b07e7af18ed75.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 29,
    gameName: "SnowRunner",
    platform: "Steam",
    username: "lsoiy210",
    password: "lwl67033R",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/62/d6/90/62d69084c78ea7789c551e292440bd2b.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 30,
    gameName: "Satisfactory",
    platform: "Steam",
    username: "lsoiy210",
    password: "lwl67033R",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/71/c8/7a/71c87a795350e8eae9c2b3ffa5bb9777.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 31,
    gameName: "MECCHA CHAMELEON",
    platform: "Steam",
    username: "honoredthatch41",
    password: "Jelszavacska2315",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/236x/3d/62/34/3d623487277413a3043d54de587a4ecd.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
];

// ======================== YOUR ADS ========================
// enabled: true = shows on the site
// enabled: false = hidden
// Ads appear between rows of account cards automatically
// ==========================================================
export interface Advertisement {
  id: number;
  name: string;
  bio: string;
  link: string;
  imageUrl?: string;  // optional — add a URL to show a photo in the ad banner
  enabled: boolean;
  createdAt: string;
}

export const DEFAULT_ADVERTISEMENTS: Advertisement[] = [
  {
    id: 1,
    name: "NO SPONSORED ADS YET, SO JOIN OUR DISCORD SERVER",
    bio: "click here to join",
    link: "https://discord.gg/QHJdhTbYnF",
    imageUrl: "https://i.pinimg.com/originals/a1/1d/41/a11d416a30a7a0d4c75a51bdba5d6670.gif",
    enabled: true,
    createdAt: "2024-06-01T10:00:00.000Z",
  },
  {
    id: 2,
    name: "NO SPONSORED ADS YET, SO JOIN OUR DISCORD SERVER",
    bio: "click here to join",
    link: "https://discord.gg/QHJdhTbYnF",
    imageUrl: "https://i.pinimg.com/originals/18/30/3d/18303ddb424b4be3dc1ee46bdfc052ae.gif",
    enabled: true,
    createdAt: "2024-06-15T14:00:00.000Z",
  },
  {
    id: 3,
    name: "NO SPONSORED ADS YET, SO JOIN OUR DISCORD SERVER",
    bio: "click here to join",
    link: "https://discord.gg/QHJdhTbYnF",
    imageUrl: "https://i.pinimg.com/originals/b8/b3/dd/b8b3ddeb4cd4ff7c0586ae99361e16a2.gif",
    enabled: true,
    createdAt: "2024-06-15T14:00:00.000Z",
  },
  {
    id: 4,
    name: "NO SPONSORED ADS YET, SO JOIN OUR DISCORD SERVER",
    bio: "click here to join",
    link: "https://discord.gg/QHJdhTbYnF",
    imageUrl: "https://i.pinimg.com/originals/90/5f/c9/905fc914bbc0cfa71d8f09caa9bf4082.gif",
    enabled: true,
    createdAt: "2024-06-15T14:00:00.000Z",
  },
];

// Always use code defaults directly — no localStorage
export function loadAccounts(): Account[] {
  return [...DEFAULT_ACCOUNTS];
}

export function loadAds(): Advertisement[] {
  return [...DEFAULT_ADVERTISEMENTS];
}

export function getAccountStats(accounts: Account[]) {
  const total = accounts.length;
  const byPlatform: Record<string, number> = {};
  for (const a of accounts) {
    byPlatform[a.platform] = (byPlatform[a.platform] || 0) + 1;
  }
  return { total, byPlatform };
}
