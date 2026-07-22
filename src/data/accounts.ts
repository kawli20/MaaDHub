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
  "Instagram",
  "Other",
] as const;

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
  {
    id: 32,
    gameName: "Red Dead Redemption 2",
    platform: "Steam",
    username: "curioustarsier8885",
    password: "059944Aa!",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/d2/a4/5c/d2a45cc2083abc8bf1c21e47e0b29c3a.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 33,
    gameName: "THE LAST OF US PART II REMASTERED",
    platform: "Steam",
    username: "thelast2zara",
    password: "Thelast2zara55",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/2e/13/75/2e13755a6b3fec2ee9dbcc231a1cf39c.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 34,
    gameName: "RESIDENT EVIL 4 Remake",
    platform: "Steam",
    username: "residentevil4rdepqmcx06",
    password: "OQRODETHw06",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/73/79/a8/7379a8598e87966329b09ff921b3bf99.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 35,
    gameName: "Dispatch",
    platform: "Steam",
    username: "goodbower",
    password: "marpanov_free18",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/67/0f/62/670f627b129f3edd05ff194effe8c049.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 36,
    gameName: "R.E.P.O",
    platform: "Steam",
    username: "venkw47790",
    password: "7LENBK@1325",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/236x/8a/d8/e8/8ad8e875a5d321c15e38b24ab29fd31a.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 37,
    gameName: "TEKKEN 7",
    platform: "Steam",
    username: "qqsyg86927",
    password: "zpsue65791",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/control1/736x/ae/9b/3a/ae9b3ad20fc06f1dfd447e658102a71d.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 38,
    gameName: "TEKKEN 7",
    platform: "Steam",
    username: "bpzmu39160",
    password: "HaLLODasIstMeinSteamACC2!!!",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQyHQAzCORTfLU73tGbn7QX7AGTSMtO_haa0xPa-TobCAGOCFWf",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 39,
    gameName: "Choo-Choo Charles",
    platform: "Steam",
    username: "steamok1090115",
    password: "steamok36464652",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/2d/db/64/2ddb644d28a8617cbd7833e4b8382869.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 40,
    gameName: "Watch Dogs 2",
    platform: "Steam",
    username: "zMartins2",
    password: "viniciussilvadelima12072008",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/f2/57/ea/f257eaa23a2068f06994093a134fed7a.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 41,
    gameName: "Friday the 13th: The Game",
    platform: "Steam",
    username: "zMartins2",
    password: "viniciussilvadelima12072008",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/8f/05/d2/8f05d2c47cd7f1d09f8e1e72e1ee60e0.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 42,
    gameName: "Grand Theft Auto V Enhanced",
    platform: "Steam",
    username: "zMartins2",
    password: "viniciussilvadelima12072008",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://img.lootbar.com/file/698493b89748c0a5221cb5c3sMgLLMS603",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 43,
    gameName: "Middle-earth™: Shadow of War™",
    platform: "Steam",
    username: "zMartins2",
    password: "viniciussilvadelima12072008",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/a4/ee/05/a4ee05d7a442839d0b91b5b3a80f3834.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 44,
    gameName: "Cyberpunk 2077",
    platform: "Steam",
    username: "rusdepj",
    password: "Vthbksvs",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/control1/736x/14/c8/96/14c896e0730044e222018d65a338eab5.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  }
];

export interface Advertisement {
  id: number;
  name: string;
  bio: string;
  link: string;
  imageUrl?: string;
  enabled: boolean;
  createdAt: string;
}

export const DEFAULT_ADVERTISEMENTS: Advertisement[] = [
  {
    id: 1,
    name: "NO SPONSORED ADS YET, SO JOIN OUR DISCORD SERVER",
    bio: "click here to join",
    link: "https://discord.gg/QHJdhTbYnF",
    imageUrl: "https://i.pinimg.com/originals/90/5f/c9/905fc914bbc0cfa71d8f09caa9bf4082.gif",
    enabled: true,
    createdAt: "2024-06-01T10:00:00.000Z",
  },
  {
    id: 2,
    name: "NO SPONSORED ADS YET, SO JOIN OUR TELEGRAM SERVER",
    bio: "click here to join",
    link: "https://t.me/maadhub",
    imageUrl: "https://i.pinimg.com/originals/b8/b3/dd/b8b3ddeb4cd4ff7c0586ae99361e16a2.gif",
    enabled: true,
    createdAt: "2024-06-15T14:00:00.000Z",
  },
  {
    id: 3,
    name: "NO SPONSORED ADS YET, SO JOIN OUR DISCORD SERVER",
    bio: "click here to join",
    link: "https://discord.gg/QHJdhTbYnF",
    imageUrl: "https://i.pinimg.com/originals/18/30/3d/18303ddb424b4be3dc1ee46bdfc052ae.gif",
    enabled: true,
    createdAt: "2024-06-15T14:00:00.000Z",
  },
  {
    id: 4,
    name: "NO SPONSORED ADS YET, SO JOIN OUR TELEGRAM SERVER",
    bio: "click here to join",
    link: "https://t.me/maadhub",
    imageUrl: "https://i.pinimg.com/originals/a1/1d/41/a11d416a30a7a0d4c75a51bdba5d6670.gif",
    enabled: true,
    createdAt: "2024-06-15T14:00:00.000Z",
  },
];

export function loadAccounts(): Account[] {
  return [...DEFAULT_ACCOUNTS];
}

export function loadAds(): Advertisement[] {
  return [...DEFAULT_ADVERTISEMENTS];
}

export interface Sale {
  id: number;
  title: string;
  platform: string;
  description: string;
  contact: string;
  imageUrl?: string;
  supportLink?: string;
  price?: string;
  category: "keys" | "accounts" | "subscription" | "serves";
  createdAt: string;
}

export const DEFAULT_SALES: Sale[] = [
  {
    id: 1,
    title: "Instagram Followers",
    platform: "Instagram",
    description: "Buy Instagram followers from this seller. Contact the seller directly on Telegram for prices, packages, and more information.",
    contact: "https://guns.lol/zeeerooo",
    imageUrl: "https://i.pinimg.com/736x/98/ae/9e/98ae9e53991d8d0c56564ba38d8dbec0.jpg",
    supportLink: "https://guns.lol/zeeerooo",
    category: "serves",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "Random ELITE 5 Keys GLOBAL",
    platform: "steam",
    description: "Buy Random ELITE 5 Keys GLOBAL from this seller. Contact the seller directly for prices, packages, and more information.",
    contact: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/92/99/26/9299264acdb984c9ed16224b375c0247.jpg",
    supportLink: "https://maad.qzz.io/",
    price: "6.99$",
    category: "keys",
    createdAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    title: "Grand Random 5 Keys",
    platform: "steam",
    description: "Buy Random ELITE 5 Keys GLOBAL from this seller. Contact the seller directly for prices, packages, and more information.",
    contact: "https://maad.qzz.io/",
    imageUrl: "https://comicbook.com/wp-content/uploads/sites/4/2022/11/7b2e90ad-d178-4bdb-9d2d-9a51b1831df7.png",
    supportLink: "https://maad.qzz.io/",
    price: "19.99$",
    category: "keys",
    createdAt: "2024-01-03T00:00:00.000Z",
  }

];

export function getAccountStats(accounts: Account[]) {
  const total = accounts.length;
  const byPlatform: Record<string, number> = {};
  for (const a of accounts) {
    byPlatform[a.platform] = (byPlatform[a.platform] || 0) + 1;
  }
  return { total, byPlatform };
}
