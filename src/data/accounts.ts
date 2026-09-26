export interface Account {
  id: number;
  gameName: string;
  platform: string;
  supportLink?: string;
  imageUrl: string;
  pointsCost?: number; // 0 or omitted = 100% free; > 0 = points required to unlock
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
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBvNeGDsjHa2tGEXDIKKCKd7zvbbu-n9kF8JpWWMiJqRA8PGlayj4DgEM&s=10",
  },
  {
    id: 2,
    gameName: "10300k games",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRUu0ztxAojVtvkHDSCPIhmjLzU1RV-Huo_pn_Hoy9yXO158OMAedgXb0G&s=10",
  },
  {
    id: 3,
    gameName: "Red Dead Redemption 2",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7_O9ORjSOF8_LuT3VQ4guUQ1QHlQL4NSyl5kFVAnEng&s=10",
  },
  {
    id: 4,
    gameName: "Call of Duty: Black Ops III",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfvDd115AjUhKUkto8ROc0V1ZxMCsQJ0WuOn3uSlDqBg&s",
  },
  {
    id: 5,
    gameName: "Resident Evil 4",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202210/0706/EVWyZD63pahuh95eKloFaJuC.png",
  },
  {
    id: 6,
    gameName: "God Of War Ragnarok",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg",
  },
  {
    id: 7,
    gameName: "Grand Theft Auto V",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/d2/55/ac/d255ac78bb40edc96076bb4c22a32504.jpg",
  },
  {
    id: 8,
    gameName: "Mafia 1 , 2 , 3",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM-AFfRxKsrayW3YGKP0cSxDxfjU-7MktXu8WBeyqbMQ089KGJw67ZqdoR&s=10",
  },
  {
    id: 9,
    gameName: "Forza horizon 5",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/ba/97/ef/ba97ef693775f9a05b93da76c1ec9f16.jpg",
  },
  {
    id: 10,
    gameName: "EA Sports FC 26",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnNjd29qaHpqNjdraGd6eThmc2w1djNuMGVwMTB2d3JtZGIxOHc0NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/n8rTLLINBycMxi73lQ/giphy.gif",
  },
  {
    id: 11,
    gameName: "Among Us",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/3c/cb/f4/3ccbf44f2de4bd7d5d6d025567661102.jpg",
  },
  {
    id: 12,
    gameName: "ELDEN RING",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/42/e2/b0/42e2b09303502d5ef8454425d73ab98f.jpg",
  },
  {
    id: 13,
    gameName: "EA SPORTS FC 25",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/a9/5e/09/a95e092e7d561570d10280612fabfe01.jpg",
  },
  {
    id: 14,
    gameName: "The Witcher 3: Wild Hunt",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/c8/29/b5/c829b51b7bec75abba4bb5f47ad821ee.jpg",
  },
  {
    id: 15,
    gameName: "Batman: Arkham City",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/e5/c4/98/e5c4989f7b85913865adc0573018b1a9.jpg",
  },
  {
    id: 16,
    gameName: "Watch Dogs",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/c5/fb/f2/c5fbf2333e228a1fe4536a577a0fca4c.jpg",
  },
  {
    id: 17,
    gameName: "The Last of Us Part I and Part II",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn1.epicgames.com/offer/0c40923dd1174a768f732a3b013dcff2/EGS_TheLastofUsPartI_NaughtyDogLLC_S2_1200x1600-41d1b88814bea2ee8cb7986ec24713e0",
  },
  {
    id: 18,
    gameName: "Euro Truck Simulator 2",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/5e/2d/a0/5e2da0c309e30247e50e28830be225c9.jpg",
  },
  {
    id: 19,
    gameName: "PAYDAY 2",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/9f/6c/39/9f6c39993ee700c3bd556ca666509948.jpg",
  },
  {
    id: 20,
    gameName: "Far Cry 3",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/3e/b6/a4/3eb6a4f5b93754b38ce3c2869778e78e.jpg",
  },
  {
    id: 21,
    gameName: "Battlefield 3",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/cd/ec/1c/cdec1ce84444c342a211edcba2727097.jpg",
  },
  {
    id: 22,
    gameName: "NBA 2K25",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWVjemlocXN3cHYxaWMycjJyNzRncnBtMm5vbDNlaHJtdDV4a2I4ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/y7NmHw25VGwA0UuKRn/giphy.gif",
  },
  {
    id: 23,
    gameName: "Resident Evil Series",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/32/71/af/3271af2f5c99601dc1c9189adae48c94.jpg",
  },
  {
    id: 24,
    gameName: "Attack On Titan 2",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn.loaded.com/media/catalog/product/a/o/aot_final_battle.jpg",
  },
  {
    id: 25,
    gameName: "Wallpaper engine",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn2.steamgriddb.com/grid/6910c07743a1a1dbd134c8233fb822ea.png",
  },
  {
    id: 26,
    gameName: "Assetto Corso",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/c0/fa/52/c0fa52a3f90b6433827c0ca334241c77.jpg",
  },
  {
    id: 27,
    gameName: "Resident Evil Requiem",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://media1.tenor.com/m/_D2_OdnlyPsAAAAd/awsan-resident-evil-requiem.gif",
  },
  {
    id: 28,
    gameName: "Rust",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/4f/29/4d/4f294db80e37fdd0f52b07e7af18ed75.jpg",
  },
  {
    id: 29,
    gameName: "SnowRunner",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/62/d6/90/62d69084c78ea7789c551e292440bd2b.jpg",
  },
  {
    id: 30,
    gameName: "Satisfactory",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/71/c8/7a/71c87a795350e8eae9c2b3ffa5bb9777.jpg",
  },
  {
    id: 31,
    gameName: "MECCHA CHAMELEON",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/236x/3d/62/34/3d623487277413a3043d54de587a4ecd.jpg",
  },
  {
    id: 32,
    gameName: "Red Dead Redemption 2",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/d2/a4/5c/d2a45cc2083abc8bf1c21e47e0b29c3a.jpg",
  },
  {
    id: 33,
    gameName: "THE LAST OF US PART II REMASTERED",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/2e/13/75/2e13755a6b3fec2ee9dbcc231a1cf39c.jpg",
  },
  {
    id: 34,
    gameName: "RESIDENT EVIL 4 Remake",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/73/79/a8/7379a8598e87966329b09ff921b3bf99.jpg",
  },
  {
    id: 35,
    gameName: "Dispatch",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/67/0f/62/670f627b129f3edd05ff194effe8c049.jpg",
  },
  {
    id: 36,
    gameName: "R.E.P.O",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/236x/8a/d8/e8/8ad8e875a5d321c15e38b24ab29fd31a.jpg",
  },
  {
    id: 37,
    gameName: "TEKKEN 7",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/control1/736x/ae/9b/3a/ae9b3ad20fc06f1dfd447e658102a71d.jpg",
  },
  {
    id: 38,
    gameName: "BMX Streets",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQyHQAzCORTfLU73tGbn7QX7AGTSMtO_haa0xPa-TobCAGOCFWf",
  },
  {
    id: 39,
    gameName: "Choo-Choo Charles",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/2d/db/64/2ddb644d28a8617cbd7833e4b8382869.jpg",
  },
  {
    id: 40,
    gameName: "Watch Dogs 2",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/f2/57/ea/f257eaa23a2068f06994093a134fed7a.jpg",
  },
  {
    id: 41,
    gameName: "Friday the 13th: The Game",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/8f/05/d2/8f05d2c47cd7f1d09f8e1e72e1ee60e0.jpg",
  },
  {
    id: 42,
    gameName: "Grand Theft Auto V Enhanced",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://img.lootbar.com/file/698493b89748c0a5221cb5c3sMgLLMS603",
  },
  {
    id: 43,
    gameName: "Middle-earth™: Shadow of War™",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/a4/ee/05/a4ee05d7a442839d0b91b5b3a80f3834.jpg",
  },
  {
    id: 44,
    gameName: "Cyberpunk 2077",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/control1/736x/14/c8/96/14c896e0730044e222018d65a338eab5.jpg",
  },
  {
    id: 45,
    gameName: "Ready or Not",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/af/d4/1c/afd41c1dfc437dc1338976ef49c5311b.jpg",
  },
  {
    id: 46,
    gameName: "DayZ",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/5e/d3/1f/5ed31f512e3b9fa2ee32e5545e386382.jpg",
  },
  {
    id: 47,
    gameName: "Assetto Corsa",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/c0/fa/52/c0fa52a3f90b6433827c0ca334241c77.jpg",
  },
  {
    id: 48,
    gameName: "DARK SOULS™: REMASTERED",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/control1/736x/f7/8a/60/f78a60fb1da3ed1d47de89b6cd2cda47.jpg",
  },
  {
    id: 49,
    gameName: "DARK SOULS™ II: Scholar of the First Sin",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/0d/01/e2/0d01e2b6d4004d1d3fdec7031bc83d09.jpg",
  },
  {
    id: 50,
    gameName: "Palworld",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/39/c2/da/39c2dad1ac130d2789d4cb6055eb78e8.jpg",
  },
  {
    id: 51,
    gameName: "Gorilla Tag",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coau8c.jpg",
  },
  {
    id: 52,
    gameName: "Wallpaper Engine",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn2.steamgriddb.com/grid/6910c07743a1a1dbd134c8233fb822ea.png",
  },
  {
    id: 53,
    gameName: "Assassin's Creed Odyssey",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/control1/736x/63/af/18/63af18baa147e08f7c2cb78f0ce4176c.jpg",
  },
  {
    id: 54,
    gameName: "UNCHARTED™: Legacy of Thieves Collection",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://images.g2a.com/360x600/1x1x1/uncharted-legacy-of-thieves-collection-pc-steam-key-global-i10000279761002/c0cdc033dd8e419ca75a902c",
  },
  {
    id: 55,
    gameName: "It Takes Two",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrQaFXY5U6RhrYpA_fThSzPUylIES7RfsxcdDzI0iuq6Pf5AD5g7Y7sz0Q5m2H_FGct9hh&s=10",
  },
  {
    id: 56,
    gameName: "DELTARUNE",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKzITcNGuopSq3uNkfcezJJHDDqjsDj7Jvq4L2ipBFttMrah-Ao9FQs4I&s=10",
  },
  {
    id: 57,
    gameName: "Lies of P",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/de/Lies_of_p_cover_art.jpg/250px-Lies_of_p_cover_art.jpg",
  },
  {
    id: 58,
    gameName: "Palworld",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/39/c2/da/39c2dad1ac130d2789d4cb6055eb78e8.jpg",
  },
  {
    id: 59,
    gameName: "ELDEN RING",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/1200x/94/0c/bf/940cbfaaba3c4cac45a951a413371627.jpg",
  },
  {
    id: 60,
    gameName: "ARK: Survival Ascended",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Ark_Survival_Ascended.jpg/250px-Ark_Survival_Ascended.jpg",
  },
  {
    id: 61,
    gameName: "Stray",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/37/a8/23/37a823eaa1611bf2bb5913647f377617.jpg",
  },
  {
    id: 62,
    gameName: "Resident Evil 4 (2005)",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BZWY3ZjRiNTctYzU2My00NDIwLWI3NTAtNmUwZDBlZjlhYjI4XkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 63,
    gameName: "Wallpaper Engine",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn2.steamgriddb.com/grid/6910c07743a1a1dbd134c8233fb822ea.png",
  },
  {
    id: 64,
    gameName: "Forza Horizon 6",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Forza_Horizon_6_key_art.jpeg/250px-Forza_Horizon_6_key_art.jpeg",
  },
  {
    id: 65,
    gameName: "Grand Theft Auto V Legacy",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://store-images.s-microsoft.com/image/apps.32034.13531476541866969.9b83558e-4d72-4ee5-9214-3504337b32f8.172b1ccc-6da2-44b4-828d-7cda66b22f85",
  },
  {
    id: 66,
    gameName: "Tomb Raider: Underworld",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/56/Tomb_Raider_-_Underworld.png",
  },
  {
    id: 67,
    gameName: "Dead by Daylight",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr9wdOSGIJTKFz3SF56Ep3rTR5LtH9ptLP70ZESxWjcKEAGaAe922NKIdI&s=10",
  },
  {
    id: 68,
    gameName: "Terraria",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/Terraria_Steam_artwork.jpg/250px-Terraria_Steam_artwork.jpg",
  },
  {
    id: 69,
    gameName: "Monster Hunter: World",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/1b/Monster_Hunter_World_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
  },
  {
    id: 70,
    gameName: "PEAK",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BY2NkZTAxNTQtNDg0YS00ZDdhLTk4OTgtZWQyMzJmODJlYmVkXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 71,
    gameName: "PRAGMATA",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Pragmata_cover.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
  },
  {
    id: 72,
    gameName: "Five Nights at Freddy's: Secret of the Mimic",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn1.epicgames.com/spt-assets/a3843e0de6d545b3957ce2173972092c/five-nights-at-freddys-secret-of-the-mimic-gs7np.png",
  },
  {
    id: 73,
    gameName: "Sea of Thieves",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/7/77/Sea_of_thieves_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
  },
  {
    id: 74,
    gameName: "DRAGON BALL FighterZ",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://store-images.s-microsoft.com/image/apps.57875.14619494188082372.7ffd2f95-cab6-415c-b464-1e434cc8ccfc.c5b53fc1-8ce5-409f-b66c-ff596efc3f47",
  },
  {
    id: 75,
    gameName: "The Crew Motorfest",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://static.wikia.nocookie.net/thecrew/images/e/ee/TCMStandardEditionCover.png/revision/latest/scale-to-width/360?cb=20230612200639",
  },
  {
    id: 76,
    gameName: "Battlefield™ 1",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/fc/Battlefield_1_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
  },
  {
    id: 77,
    gameName: "MECCHA CHAMELEON",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn.displate.com/artwork/270x380/2026-06-21/01b9f4bf-354c-4a29-b08b-7eaeb7a694e6.jpg",
  },
  {
    id: 78,
    gameName: "Dying Light",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://static.wikia.nocookie.net/dyinglight/images/7/72/Dying_Light_ok%C5%82adka.jpg/revision/latest?cb=20150223131116&path-prefix=pl",
  },
  {
    id: 79,
    gameName: "Black Myth: Wukong",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://gfn.ru/media/images/box_art_image-black-myth-wukong-114f950a.original.jpg",
  },
  {
    id: 80,
    gameName: "MECCHA CHAMELEON",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coc7cr.jpg",
  },
  {
    id: 81,
    gameName: "Ready or Not",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://store-images.s-microsoft.com/image/apps.39640.13578379328545234.9a5c7815-319e-44dd-b243-b580c45874f3.35017ade-207d-4d87-811e-3e41624595ad",
  },
  {
    id: 82,
    gameName: "Resident Evil Requiem",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://media1.tenor.com/m/_D2_OdnlyPsAAAAd/awsan-resident-evil-requiem.gif",
  },
  {
    id: 83,
    gameName: "FC26",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyYXN5bnczN2kyMTNldzhxa2ptd2puYTdhazNjMmxidjBrOWUzN2I5MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/n8rTLLINBycMxi73lQ/giphy.gif",
  },
  {
    id: 84,
    gameName: "Assassin's Creed Rogue",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://media.tenor.com/LteVgDHkOOcAAAAM/acrogue-assassins-creed.gif",
  },
  {
    id: 85,
    gameName: "Metro Exodus",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://store-images.s-microsoft.com/image/apps.17469.65642028844779555.c518e652-fc85-4d6e-99a2-3e9ae1656a91.6cace333-df13-4178-a46d-5938de4654a2",
  },
  {
    id: 86,
    gameName: "Forza Horizon 6",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Forza_Horizon_6_key_art.jpeg/250px-Forza_Horizon_6_key_art.jpeg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
  },
  {
    id: 87,
    gameName: "Assassin's Creed Black Flag Resynced",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://ubisoftgearshop.com/cdn/shop/files/Assassin_s_Creed_Black_Flag_Resynced.jpg?v=1776964392&width=533",
  },
  {
    id: 88,
    gameName: "Marvel's Spider-Man Remastered",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn1.epicgames.com/offer/4bc43145bb8245a5b5cc9ea262ffbe0e/EGS_MarvelsSpiderManRemastered_InsomniacGamesNixxesSoftware_S2_1200x1600-76424286902489f4d9639ac9b735c2b2",
  },
  {
    id: 89,
    gameName: "Rust",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202103/1609/5xfXfcSQ71pczvAb6ANmrbxT.png",
  },
  {
    id: 90,
    gameName: "Watch Dogs 2",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://cdn1.epicgames.com/offer/angelonia/WDA_StorePortrait_1200x1600_1200x1600-75d21fb44d647ad69967ae1bb0ab0cbc",
  },
  {
    id: 91,
    gameName: "MECCHA CHAMELEON",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coc7cr.jpg",
  },
  {
    id: 92,
    gameName: "+100 premium games",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://www.productkeys.ae/wp-content/uploads/2021/01/Premium-random-cd-key-300x400.png",
  },
  {
    id: 93,
    gameName: "Shadow of the Tomb Raider Definitive Edition",
    platform: "Epic Games",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://static.wikia.nocookie.net/laracroft/images/1/16/Shadow_of_the_Tomb_Raider.jpg/revision/latest?cb=20241130153028",
    pointsCost: 15,
  },
  {
    id: 94,
    gameName: "Black Myth: Wukong",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://e.snmc.io/lk/g/x/e767173b47e2d0f8c3dda1f01cd06913/11578144",
  },
  {
    id: 95,
    gameName: "Bodycam",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic0.gamerantimages.com%2Fwordpress%2Fwp-content%2Fuploads%2F2025%2F02%2Fmixcollage-13-feb-2025-05-51-am-4114.jpg&f=1&nofb=1&ipt=2086b7ca6a4c5ff086279e5f3c70a4eccdb09eadca0495923a86ff9111d3711c",
    pointsCost: 20,
  },
  {
    id: 96,
    gameName: "Grand Theft Auto V",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F43%2Fbc%2Fbe%2F43bcbef7c091426d4759e4a04ee9b7f8.jpg&f=1&nofb=1&ipt=e3c6d70256fc235628b4dee760fbf0d75b900d37f36e40a29b8764a63f635350",
  },
  {
    id: 97,
    gameName: "All Assassin's Creed Account",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://i.pinimg.com/736x/b3/9a/a5/b39aa582e585d04cdc80305af3d3381c.jpg",
  },
  {
    id: 98,
    gameName: "Far Cry 5",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic0.gamerantimages.com%2Fwordpress%2Fwp-content%2Fuploads%2F2024%2F12%2Fmixcollage-25-dec-2024-06-53-am-6816.jpg%3Fq%3D49%26fit%3Dcontain%26w%3D480%26dpr%3D2&f=1&nofb=1&ipt=cff41834a2a81e2952d79d444fedf9183a725eeeac2777c7a4c29456c9ef9056",
  },
  {
    id: 99,
    gameName: "Stellar Blade",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2F21ec8781-b7d2-4f1e-bc0b-a4b0e1b7b84a%2Fdh541kp-6a2225d6-a85d-4c93-abcf-49ab5e51cfbd.png%2Fv1%2Ffill%2Fw_1024%2Ch_1843%2Cq_80%2Cstrp%2Feve___stellar_blade_by_deviantdiffusion_dh541kp-fullview.jpg%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTg0MyIsInBhdGgiOiJcL2ZcLzIxZWM4NzgxLWI3ZDItNGYxZS1iYzBiLWE0YjBlMWI3Yjg0YVwvZGg1NDFrcC02YTIyMjVkNi1hODVkLTRjOTMtYWJjZi00OWFiNWU1MWNmYmQucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.yddxOQCNQYShL-O1Fq6NrCjzrJOh1kYxsJ8aK9luk7U&f=1&nofb=1&ipt=b52cffc8a7fd5151a8ca7916e4e975e240d150240eb2864e0be5466c1fd90f1c",
  },
  {
    id: 100,
    gameName: "Garry's Mod",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic0.gamerantimages.com%2Fwordpress%2Fwp-content%2Fuploads%2F2024%2F12%2Fmixcollage-11-dec-2024-10-20-am-916.jpg&f=1&nofb=1&ipt=44cfa780d3b85a309a78744fb207ab67b765082d466ab1a383b4d4cc998c9306"
  },
  {
    id: 101,
    gameName: "007 First Light",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic0.srcdn.com%2Fwordpress%2Fwp-content%2Fuploads%2Fsharedimages%2F2025%2F06%2F007-first-light-tag-page-cover-art.jpg%3Fq%3D49%26fit%3Dcontain%26w%3D480%26dpr%3D2&f=1&nofb=1&ipt=29d4ef31cfc49c27297221c84f803dee0412375416d55d05c808fb034870c5e8"
  },
  {
    id: 102,
    gameName: "Black myth wukong",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic0.gamerantimages.com%2Fwordpress%2Fwp-content%2Fuploads%2F2024%2F08%2Fblack-myth-wukong-tag-page-cover-art.jpg%3Fq%3D49%26fit%3Dcontain%26w%3D480%26dpr%3D2&f=1&nofb=1&ipt=3e64f621a2435632ac75856f965afa0be406fb5e2e107acf08a1e708120de5e7"
  },
  {
    id: 103,
    gameName: "Shift At Midnight",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_cF5DsL0p-HENMU-GFN6T-QLgoG-QgCSm2e03d-JRl3NVAzt--Yz7qgg&s=10"
  },
  {
    id: 104,
    gameName: "FC 26",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMDZmMmQ1ODYtMDU3NS00MTBlLWIyZTctOWFiZjIwMmI1OTcyXkEyXkFqcGc@._V1_.jpg"
  },
  {
    id: 105,
    gameName: "UNCHARTED™: Legacy of Thieves Collection",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic0.gamerantimages.com%2Fwordpress%2Fwp-content%2Fuploads%2F2024%2F11%2Fmixcollage-28-nov-2024-09-21-am-9647.jpg&f=1&nofb=1&ipt=04c414c49e514f64753c42742068d36c7d0688999b826962fb1ade3670ad0e0e"
  },
  {
    id: 106,
    gameName: "Dead by Daylight",
    platform: "Epic Games",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://thumb.wikimedia.org/wikipedia/en/thumb/b/b7/Dead_by_Daylight_Steam_header.jpg/250px-Dead_by_Daylight_Steam_header.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail"
  },
  {
    id: 107,
    gameName: "Ride 5",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.7p_NTwdhzcAyj0DR-LdJfAHaLH%3Fr%3D0%26pid%3DApi&f=1&ipt=aad50c70f9b24333bf6d2179faa8113292b3aeb6ebe5eb909f624146bdb44603"
  },
  {
    id: 108,
    gameName: "Black Myth: Wukong",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpics.filmaffinity.com%2Fblack_myth_wukong-856105810-large.jpg&f=1&nofb=1&ipt=aa366c8619bce1723087810719f8bb2e816822c5b70272657ceb705063ae462d"
  },
  {
    id: 109,
    gameName: "Batman™: Arkham Knight",
    platform: "Steam",
    supportLink: "https://maad.qzz.io/",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic0.gamerantimages.com%2Fwordpress%2Fwp-content%2Fuploads%2F2024%2F12%2Fmixcollage-07-dec-2024-07-51-am-4123.jpg&f=1&nofb=1&ipt=2707bc19d3a6f8c5f9c33abe21fab0100f79b47cbdc0543fd1493e7381eafb10"
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

export const DEFAULT_SALES: Sale[] = [];

export function getAccountStats(accounts: Account[]) {
  const total = accounts.length;
  const byPlatform: Record<string, number> = {};
  for (const a of accounts) {
    byPlatform[a.platform] = (byPlatform[a.platform] || 0) + 1;
  }
  return { total, byPlatform };
}
