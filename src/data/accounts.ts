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
    username: "pablo79911",
    password: "F552YFK7K5B9",
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
    username: "funnymassivepony08",
    password: "Roundkick991XME342",
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
    imageUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWVjemlocXN3cHYxaWMycjJyNzRncnBtMm5vbDNlaHJtdDV4a2I4ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/y7NmHw25VGwA0UuKRn/giphy.gif",
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
    gameName: "BMX Streets",
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
  },
  {
    id: 45,
    gameName: "Ready or Not",
    platform: "Steam",
    username: "08520014",
    password: "yanzheng1125",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/af/d4/1c/afd41c1dfc437dc1338976ef49c5311b.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 46,
    gameName: "DayZ",
    platform: "Steam",
    username: "vcixy40970",
    password: "irxxhonmcc",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/5e/d3/1f/5ed31f512e3b9fa2ee32e5545e386382.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 47,
    gameName: "Assetto Corsa",
    platform: "Steam",
    username: "xmallmannx",
    password: "32914703",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/c0/fa/52/c0fa52a3f90b6433827c0ca334241c77.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 48,
    gameName: "DARK SOULS™: REMASTERED",
    platform: "Steam",
    username: "bot22_2",
    password: "bot222RT",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/control1/736x/f7/8a/60/f78a60fb1da3ed1d47de89b6cd2cda47.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 49,
    gameName: "DARK SOULS™ II: Scholar of the First Sin",
    platform: "Steam",
    username: "deizfreeacc",
    password: "deizdiscord09870",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/0d/01/e2/0d01e2b6d4004d1d3fdec7031bc83d09.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 50,
    gameName: "Palworld",
    platform: "Steam",
    username: "frqjg73396",
    password: "weszh392562",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/39/c2/da/39c2dad1ac130d2789d4cb6055eb78e8.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 51,
    gameName: "Gorilla Tag",
    platform: "Steam",
    username: "66fallenangel66",
    password: "LoveC2008",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coau8c.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 52,
    gameName: "Wallpaper Engine",
    platform: "Steam",
    username: "djw1040456792",
    password: "NCDRxrBoin",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn2.steamgriddb.com/grid/6910c07743a1a1dbd134c8233fb822ea.png",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 53,
    gameName: "Assassin's Creed Odyssey",
    platform: "Steam",
    username: "zhangchao_1818",
    password: "xupangzi1",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/control1/736x/63/af/18/63af18baa147e08f7c2cb78f0ce4176c.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 54,
    gameName: "UNCHARTED™: Legacy of Thieves Collection",
    platform: "Steam",
    username: "valdra911",
    password: "9FAXRzBUhB68Qdmd",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://images.g2a.com/360x600/1x1x1/uncharted-legacy-of-thieves-collection-pc-steam-key-global-i10000279761002/c0cdc033dd8e419ca75a902c",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 55,
    gameName: "It Takes Two",
    platform: "Steam",
    username: "flcq11056",
    password: "Aspire223222.",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrQaFXY5U6RhrYpA_fThSzPUylIES7RfsxcdDzI0iuq6Pf5AD5g7Y7sz0Q5m2H_FGct9hh&s=10",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 56,
    gameName: "DELTARUNE",
    platform: "Steam",
    username: "bybu22421",
    password: "4https://funpay.com/users/3957452/",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKzITcNGuopSq3uNkfcezJJHDDqjsDj7Jvq4L2ipBFttMrah-Ao9FQs4I&s=10",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 57,
    gameName: "Lies of P",
    platform: "Steam",
    username: "fv4kg6iz7cy1",
    password: "funpay-fr1zzq",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/de/Lies_of_p_cover_art.jpg/250px-Lies_of_p_cover_art.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 58,
    gameName: "Palworld",
    platform: "Steam",
    username: "fv4kg6iz7cy1",
    password: "funpay-fr1zzq",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/39/c2/da/39c2dad1ac130d2789d4cb6055eb78e8.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 59,
    gameName: "ELDEN RING",
    platform: "Steam",
    username: "fv4kg6iz7cy1",
    password: "funpay-fr1zzq",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/94/0c/bf/940cbfaaba3c4cac45a951a413371627.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 60,
    gameName: "ARK: Survival Ascended",
    platform: "Steam",
    username: "qd1rb0cg3is9",
    password: "marpanov_free17",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Ark_Survival_Ascended.jpg/250px-Ark_Survival_Ascended.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 61,
    gameName: "Stray",
    platform: "Steam",
    username: "ordinaryrhinoceros6358",
    password: "a8ef32a3b76effb41!aZ",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/37/a8/23/37a823eaa1611bf2bb5913647f377617.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 62,
    gameName: "Resident Evil 4 (2005)",
    platform: "Steam",
    username: "fabricbr555",
    password: "ffffff22",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BZWY3ZjRiNTctYzU2My00NDIwLWI3NTAtNmUwZDBlZjlhYjI4XkEyXkFqcGc@._V1_.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 63,
    gameName: "Wallpaper Engine",
    platform: "Steam",
    username: "fabricbr555",
    password: "ffffff22",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn2.steamgriddb.com/grid/6910c07743a1a1dbd134c8233fb822ea.png",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 64,
    gameName: "Forza Horizon 6",
    platform: "Steam",
    username: "duhl15773",
    password: "Muhammadknio12!",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Forza_Horizon_6_key_art.jpeg/250px-Forza_Horizon_6_key_art.jpeg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 65,
    gameName: "Grand Theft Auto V Legacy",
    platform: "Steam",
    username: "beamkin1",
    password: "jbcwywavH)Xsud+T",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://store-images.s-microsoft.com/image/apps.32034.13531476541866969.9b83558e-4d72-4ee5-9214-3504337b32f8.172b1ccc-6da2-44b4-828d-7cda66b22f85",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 66,
    gameName: "Tomb Raider: Underworld",
    platform: "Steam",
    username: "starwars07658",
    password: "Playstarwarsnow",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/56/Tomb_Raider_-_Underworld.png",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 67,
    gameName: "Dead by Daylight",
    platform: "Steam",
    username: "tprtmzldengus",
    password: "khc52329090",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr9wdOSGIJTKFz3SF56Ep3rTR5LtH9ptLP70ZESxWjcKEAGaAe922NKIdI&s=10",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 68,
    gameName: "Terraria",
    platform: "Steam",
    username: "goding_goood",
    password: "nasj1107",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/Terraria_Steam_artwork.jpg/250px-Terraria_Steam_artwork.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 69,
    gameName: "Monster Hunter: World",
    platform: "Steam",
    username: "tarasanischenko",
    password: "yCad4rlfCfKeLjiQAKDb",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/1b/Monster_Hunter_World_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 70,
    gameName: "PEAK",
    platform: "Steam",
    username: "ikks59318",
    password: "NDM1zoe2QhOw",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BY2NkZTAxNTQtNDg0YS00ZDdhLTk4OTgtZWQyMzJmODJlYmVkXkEyXkFqcGc@._V1_.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 71,
    gameName: "PRAGMATA",
    platform: "Steam",
    username: "arenda9126",
    password: "Ytrnj275",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Pragmata_cover.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 72,
    gameName: "Five Nights at Freddy's: Secret of the Mimic",
    platform: "Steam",
    username: "fredglover1960",
    password: "nqszzger9229$!1v0",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn1.epicgames.com/spt-assets/a3843e0de6d545b3957ce2173972092c/five-nights-at-freddys-secret-of-the-mimic-gs7np.png",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 73,
    gameName: "Sea of Thieves",
    platform: "Steam",
    username: "PERSECGamer",
    password: "FAR_CRY_NEW_DAWN",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/7/77/Sea_of_thieves_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 74,
    gameName: "DRAGON BALL FighterZ",
    platform: "Steam",
    username: "f303008",
    password: "q4hWsVks",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://store-images.s-microsoft.com/image/apps.57875.14619494188082372.7ffd2f95-cab6-415c-b464-1e434cc8ccfc.c5b53fc1-8ce5-409f-b66c-ff596efc3f47",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 75,
    gameName: "The Crew Motorfest",
    platform: "Steam",
    username: "zyfsd75307",
    password: "KyHuBs0jwyrORb",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://static.wikia.nocookie.net/thecrew/images/e/ee/TCMStandardEditionCover.png/revision/latest/scale-to-width/360?cb=20230612200639",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 76,
    gameName: "Battlefield™ 1",
    platform: "Steam",
    username: "13702743389",
    password: "ygpPkxwbco",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/fc/Battlefield_1_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 77,
    gameName: "MECCHA CHAMELEON",
    platform: "Steam",
    username: "ghostroleplaygta5",
    password: "00#ContaGhost",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn.displate.com/artwork/270x380/2026-06-21/01b9f4bf-354c-4a29-b08b-7eaeb7a694e6.jpg",
    createdAt: "2024-07-20T18:00:00.000Z"
  },
  {
    id: 78,
    gameName: "Dying Light",
    platform: "Steam",
    username: "patrykpatryk41",
    password: "Patryk12345+",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://static.wikia.nocookie.net/dyinglight/images/7/72/Dying_Light_ok%C5%82adka.jpg/revision/latest?cb=20150223131116&path-prefix=pl",
    createdAt: "2024-08-17T09:40:00.000Z"
  },
  {
    id: 79,
    gameName: "Black Myth: Wukong",
    platform: "Steam",
    username: "steamkk250801",
    password: "steamkk.com",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://gfn.ru/media/images/box_art_image-black-myth-wukong-114f950a.original.jpg",
    createdAt: "2026-08-19T15:30:00.000Z"
  },
  {
    id: 80,
    gameName: "MECCHA CHAMELEON",
    platform: "Steam",
    username: "ydtdo32097",
    password: "PzIf3P1GXw2dEJ",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coc7cr.jpg",
    createdAt: "2026-08-21T10:00:00.000Z"
  },
  {
    id: 81,
    gameName: "Ready or Not",
    platform: "Steam",
    username: "ujrt34337",
    password: "Fv6Mv8Py5Ps06t",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://store-images.s-microsoft.com/image/apps.39640.13578379328545234.9a5c7815-319e-44dd-b243-b580c45874f3.35017ade-207d-4d87-811e-3e41624595ad",
    createdAt: "2026-08-21T15:00:00.000Z"
  },
  {
    id: 82,
    gameName: "Resident Evil Requiem",
    platform: "Steam",
    username: "sethgardner8r",
    password: "nEtdGnEW4s1982",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://media1.tenor.com/m/_D2_OdnlyPsAAAAd/awsan-resident-evil-requiem.gif",
    createdAt: "2026-08-22T07:00:00.000Z"
  },
  {
    id: 83,
    gameName: "FC26",
    platform: "Steam",
    username: "mrdiogoboss",
    password: "YZ2GBDMZ833Z",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyYXN5bnczN2kyMTNldzhxa2ptd2puYTdhazNjMmxidjBrOWUzN2I5MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/n8rTLLINBycMxi73lQ/giphy.gif",
    createdAt: "2026-08-22T07:00:00.000Z"
  },
  {
    id: 84,
    gameName: "Assassin's Creed Rogue",
    platform: "Steam",
    username: "xxSoyMankoxx",
    password: "sBpOAB0q83m4dH8",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://media.tenor.com/LteVgDHkOOcAAAAM/acrogue-assassins-creed.gif",
    createdAt: "2026-08-22T07:00:00.000Z"
  },
  {
    id: 85,
    gameName: "Metro Exodus",
    platform: "Steam",
    username: "pulseukr1",
    password: "https://funpay.com/users/5405632/",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://store-images.s-microsoft.com/image/apps.17469.65642028844779555.c518e652-fc85-4d6e-99a2-3e9ae1656a91.6cace333-df13-4178-a46d-5938de4654a2",
    createdAt: "2026-08-22T07:00:00.000Z"
  },
  {
    id: 86,
    gameName: "Forza Horizon 6",
    platform: "Steam",
    username: "arenda9126",
    password: "Ytrnj275",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Forza_Horizon_6_key_art.jpeg/250px-Forza_Horizon_6_key_art.jpeg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
    createdAt: "2026-08-23T15:30:00.000Z"
  },
  {
    id: 87,
    gameName: "Assassin's Creed Black Flag Resynced",
    platform: "Steam",
    username: "nzrgx90291",
    password: "3ZXV418sgvTuWIG",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://ubisoftgearshop.com/cdn/shop/files/Assassin_s_Creed_Black_Flag_Resynced.jpg?v=1776964392&width=533",
    createdAt: "2026-08-22T07:00:00.000Z"
  },
  {
    id: 88,
    gameName: "Marvel's Spider-Man Remastered",
    platform: "Steam",
    username: "tioclubposneilistala",
    password: "73N6FXT3BNB7",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn1.epicgames.com/offer/4bc43145bb8245a5b5cc9ea262ffbe0e/EGS_MarvelsSpiderManRemastered_InsomniacGamesNixxesSoftware_S2_1200x1600-76424286902489f4d9639ac9b735c2b2",
    createdAt: "2026-08-23T07:00:00.000Z"
  },
  {
    id: 89,
    gameName: "Rust",
    platform: "Steam",
    username: "tprtmzldengus",
    password: "khc52329090",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202103/1609/5xfXfcSQ71pczvAb6ANmrbxT.png",
    createdAt: "2026-08-23T07:00:00.000Z"
  },
  {
    id: 90,
    gameName: "Watch Dogs 2",
    platform: "Steam",
    username: "sasuke31053",
    password: "lYipMaspH1ra",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn1.epicgames.com/offer/angelonia/WDA_StorePortrait_1200x1600_1200x1600-75d21fb44d647ad69967ae1bb0ab0cbc",
    createdAt: "2026-08-30T07:00:00.000Z"
  },
  {
    id: 91,
    gameName: "MECCHA CHAMELEON",
    platform: "Steam",
    username: "edgk365818",
    password: "gyd362224667",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coc7cr.jpg",
    createdAt: "2026-08-31T07:00:00.000Z"
  },
  {
    id: 92,
    gameName: "+100 premium games",
    platform: "Steam",
    username: "sfsefawd",
    password: "sef435$%#",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://www.productkeys.ae/wp-content/uploads/2021/01/Premium-random-cd-key-300x400.png",
    createdAt: "2026-09-03T13:10:00.000Z"
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
    name: "NO SPONSORED ADS YET, SO JOIN OUR TELEGRAM CHANNEL",
    bio: "click here to join",
    link: "https://t.me/maadhub",
    imageUrl: "https://i.pinimg.com/originals/90/5f/c9/905fc914bbc0cfa71d8f09caa9bf4082.gif",
    enabled: true,
    createdAt: "2024-06-01T10:00:00.000Z",
  },
  {
    id: 2,
    name: "NO SPONSORED ADS YET, SO JOIN OUR TELEGRAM CHANNEL",
    bio: "click here to join",
    link: "https://t.me/maadhub",
    imageUrl: "https://i.pinimg.com/originals/b8/b3/dd/b8b3ddeb4cd4ff7c0586ae99361e16a2.gif",
    enabled: true,
    createdAt: "2024-06-15T14:00:00.000Z",
  },
  {
    id: 3,
    name: "NO SPONSORED ADS YET, SO JOIN OUR TELEGRAM CHANNEL",
    bio: "click here to join",
    link: "https://t.me/maadhub",
    imageUrl: "https://i.pinimg.com/originals/18/30/3d/18303ddb424b4be3dc1ee46bdfc052ae.gif",
    enabled: true,
    createdAt: "2024-06-15T14:00:00.000Z",
  },
  {
    id: 4,
    name: "NO SPONSORED ADS YET, SO JOIN OUR TELEGRAM CHANNEL",
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
  // {
  //  id: 1,
  //   title: "Instagram Followers",
  //   platform: "Instagram",
  //   description: "Buy Instagram followers from this seller. Contact the seller directly on Telegram for prices, packages, and more information.",
  //   contact: "https://guns.lol/zeeerooo",
  //   imageUrl: "https://i.pinimg.com/736x/98/ae/9e/98ae9e53991d8d0c56564ba38d8dbec0.jpg",
  //   supportLink: "https://guns.lol/zeeerooo",
  //   category: "serves",
  //   createdAt: "2024-01-01T00:00:00.000Z",
  // }
];

export function getAccountStats(accounts: Account[]) {
  const total = accounts.length;
  const byPlatform: Record<string, number> = {};
  for (const a of accounts) {
    byPlatform[a.platform] = (byPlatform[a.platform] || 0) + 1;
  }
  return { total, byPlatform };
}
