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
    gameName: "Resident Evil Requiem",
    platform: "Steam",
    username: "MW3FUNPAY",
    password: "Funpaymorden1995",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/29/b4/67/29b4673c52a4b74432b4535056d2f4e8.jpg",
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
    name: "NO SPONSORED ADS YET",
    bio: "contact us to advertise here",
    link: "https://maad.qzz.io",
    imageUrl: "https://i.pinimg.com/1200x/e0/48/43/e04843ba7c9caf803ae3c118157d4231.jpg",
    enabled: true,
    createdAt: "2024-06-01T10:00:00.000Z",
  },
  {
    id: 2,
    name: "NO SPONSORED ADS YET",
    bio: "contact us to advertise here",
    link: "https://maad.qzz.io",
    imageUrl: "https://i.pinimg.com/1200x/9a/af/0d/9aaf0de0df94b712c0c6808fdc989e4d.jpg",
    enabled: true,
    createdAt: "2024-06-15T14:00:00.000Z",
  },
  {
    id: 3,
    name: "NO SPONSORED ADS YET",
    bio: "contact us to advertise here",
    link: "https://maad.qzz.io",
    imageUrl: "https://i.pinimg.com/1200x/c8/0a/dd/c80add14f6de78715120b4e2cef8ce58.jpg",
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
