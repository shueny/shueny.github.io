/**
 * 人生旅程時間軸資料(PLACEHOLDER 佔位資料)
 *
 * 注意:以下內容為示意用的佔位資料,請站長(Shueny Wang)依照
 * 真實經歷自行編輯:年份、地點、經緯度、描述與亮點皆可調整。
 * lat / lng 為該地點的真實座標,altitude 控制鏡頭靠近程度
 * (數值越小越近,預設 0.8)。
 */

export interface LifeEvent {
  year: number;
  phase: 'student' | 'work' | 'travel' | 'life';
  title: string; // zh-TW
  location: string; // e.g. "Tokyo, Japan"
  lat: number;
  lng: number;
  altitude?: number; // zoom level, default ~0.8
  description: string; // zh-TW paragraph
  highlights?: string[]; // bullet points zh-TW
  emoji?: string;
  color?: string; // accent color for marker
}

export const lifeTimeline: LifeEvent[] = [
  {
    year: 2011,
    phase: 'student',
    title: '大學時光的起點',
    location: 'Taipei, Taiwan',
    lat: 25.033,
    lng: 121.5654,
    altitude: 0.7,
    description:
      '進入台北的大學就讀資訊相關科系,第一次接觸程式設計,從 C 語言與網頁基礎開始,慢慢發現自己對「把想法變成畫面」的熱情。',
    highlights: ['考上台北的大學,展開資訊之路', '第一次寫出自己的網頁', '加入程式設計社團'],
    emoji: '🎓',
    color: '#60a5fa',
  },
  {
    year: 2012,
    phase: 'travel',
    title: '第一次出國 · 東京自由行',
    location: 'Tokyo, Japan',
    lat: 35.6762,
    lng: 139.6503,
    altitude: 0.8,
    description:
      '人生第一次自己規劃的出國旅行。在東京的街頭迷路、在秋葉原逛電器街、在澀谷十字路口被人潮震撼,從此愛上自助旅行。',
    highlights: ['第一次自助旅行', '秋葉原朝聖', '澀谷十字路口初體驗'],
    emoji: '🗼',
    color: '#f472b6',
  },
  {
    year: 2013,
    phase: 'travel',
    title: '古都漫步 · 京都',
    location: 'Kyoto, Japan',
    lat: 35.0116,
    lng: 135.7681,
    altitude: 0.8,
    description:
      '暑假與朋友造訪京都,走過清水寺、伏見稻荷大社的千本鳥居,在鴨川旁散步,感受古都的寧靜與歷史的厚度。',
    highlights: ['伏見稻荷千本鳥居', '清水寺賞景', '鴨川畔的傍晚散步'],
    emoji: '⛩️',
    color: '#fb923c',
  },
  {
    year: 2014,
    phase: 'travel',
    title: '首爾 · 韓流與烤肉之旅',
    location: 'Seoul, South Korea',
    lat: 37.5665,
    lng: 126.978,
    altitude: 0.8,
    description:
      '大三的寒假與同學一起飛往首爾,在明洞掃街購物、在弘大感受年輕人的活力,當然也少不了道地的韓式烤肉與雪濃湯。',
    highlights: ['明洞逛街美食', '景福宮韓服體驗', '弘大街頭表演'],
    emoji: '🇰🇷',
    color: '#a78bfa',
  },
  {
    year: 2015,
    phase: 'student',
    title: '畢業 · 畢業專題與啟程',
    location: 'Taipei, Taiwan',
    lat: 25.0173,
    lng: 121.5398,
    altitude: 0.7,
    description:
      '完成以網頁應用為主題的畢業專題,正式從大學畢業。確定了想走前端工程的方向,開始準備作品集與求職。',
    highlights: ['完成畢業專題', '取得學士學位', '決定走前端開發之路'],
    emoji: '🎉',
    color: '#34d399',
  },
  {
    year: 2016,
    phase: 'work',
    title: '第一份工作 · 初級前端工程師',
    location: 'Taipei, Taiwan',
    lat: 25.0418,
    lng: 121.5654,
    altitude: 0.7,
    description:
      '進入台北的新創公司擔任前端工程師,第一次參與正式產品開發,從 jQuery 一路寫到 React,在實戰中快速成長。',
    highlights: ['踏入職場成為前端工程師', 'first commit 上 production', '開始深入學習 React'],
    emoji: '💼',
    color: '#38bdf8',
  },
  {
    year: 2017,
    phase: 'travel',
    title: '曼谷 · 熱帶城市的活力',
    location: 'Bangkok, Thailand',
    lat: 13.7563,
    lng: 100.5018,
    altitude: 0.8,
    description:
      '工作後的第一次長假,選擇了曼谷。在恰圖恰市集尋寶、搭船遊昭披耶河、品嚐街頭泰式料理,被這座城市的熱情與混亂深深吸引。',
    highlights: ['恰圖恰週末市集', '昭披耶河遊船', '街頭泰式美食巡禮'],
    emoji: '🛺',
    color: '#fbbf24',
  },
  {
    year: 2018,
    phase: 'travel',
    title: '新加坡 · 花園城市',
    location: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    altitude: 0.8,
    description:
      '造訪新加坡,在濱海灣花園仰望超級樹、夜訪金沙酒店的天際線。同時也觀察這座城市的科技業生態,埋下未來想挑戰海外工作的種子。',
    highlights: ['濱海灣花園超級樹', '金沙天際線夜景', '參觀當地科技公司'],
    emoji: '🌿',
    color: '#4ade80',
  },
  {
    year: 2019,
    phase: 'work',
    title: '轉職 · 邁向資深前端',
    location: 'Taipei, Taiwan',
    lat: 25.0339,
    lng: 121.5645,
    altitude: 0.7,
    description:
      '轉職到規模更大的產品公司,負責核心功能的前端架構,開始帶領小型團隊、導入 TypeScript 與設計系統,朝資深工程師邁進。',
    highlights: ['加入新團隊負責核心產品', '導入 TypeScript 與設計系統', '開始 mentor 新人'],
    emoji: '🚀',
    color: '#22d3ee',
  },
  {
    year: 2020,
    phase: 'life',
    title: '在家的一年 · 遠端與沉澱',
    location: 'Taipei, Taiwan',
    lat: 25.0478,
    lng: 121.5319,
    altitude: 0.7,
    description:
      '疫情改變了世界,也改變了工作型態。開始遠端工作,重新整理生活步調,利用多出來的時間深入研究前端效能與開源專案。',
    highlights: ['適應遠端工作', '投入開源與技術寫作', '培養下廚與健身習慣'],
    emoji: '🏠',
    color: '#94a3b8',
  },
  {
    year: 2021,
    phase: 'travel',
    title: '環島 · 重新認識台灣',
    location: 'Taitung, Taiwan',
    lat: 22.7583,
    lng: 121.1444,
    altitude: 0.7,
    description:
      '無法出國的日子,決定好好認識自己的土地。完成人生第一次機車環島,在台東看太平洋的日出、在花蓮走進山谷,發現台灣的美。',
    highlights: ['機車環島完成', '台東太平洋日出', '花蓮山線秘境'],
    emoji: '🛵',
    color: '#2dd4bf',
  },
  {
    year: 2022,
    phase: 'travel',
    title: '峇里島 · Workation 初體驗',
    location: 'Bali, Indonesia',
    lat: -8.4095,
    lng: 115.1889,
    altitude: 0.8,
    description:
      '邊境開放後的第一站選擇峇里島,嘗試一邊遠端工作一邊旅行的 workation 模式。在烏布的稻田旁寫程式,下班後去海邊看夕陽。',
    highlights: ['第一次 workation', '烏布梯田與咖啡廳辦公', '金巴蘭海灘夕陽'],
    emoji: '🏝️',
    color: '#f97316',
  },
  {
    year: 2023,
    phase: 'travel',
    title: '歐洲初登陸 · 巴黎與倫敦',
    location: 'Paris, France',
    lat: 48.8566,
    lng: 2.3522,
    altitude: 0.9,
    description:
      '第一次踏上歐洲,從巴黎玩到倫敦。在羅浮宮待了一整天、在塞納河畔野餐,接著搭歐洲之星到倫敦看音樂劇,圓了多年的歐洲夢。',
    highlights: ['羅浮宮與奧塞美術館', '塞納河畔野餐', '搭歐洲之星前往倫敦看音樂劇'],
    emoji: '🗼',
    color: '#e879f9',
  },
  {
    year: 2024,
    phase: 'travel',
    title: '冰島 · 追逐極光',
    location: 'Reykjavik, Iceland',
    lat: 64.1466,
    lng: -21.9426,
    altitude: 0.9,
    description:
      '自駕環冰島一號公路,看冰川、黑沙灘與瀑布,最難忘的是在深夜的曠野中等到滿天舞動的極光,那一刻覺得一切都值得了。',
    highlights: ['一號公路自駕環島', '傑古沙龍冰河湖', '親眼看見極光'],
    emoji: '🌌',
    color: '#818cf8',
  },
  {
    year: 2025,
    phase: 'work',
    title: '現在 · 資深前端工程師',
    location: 'Taipei, Taiwan',
    lat: 25.033,
    lng: 121.5654,
    altitude: 0.7,
    description:
      '目前在台北擔任資深前端工程師,專注於產品架構、效能優化與開發者體驗,同時持續經營個人網站與技術分享。旅程仍在繼續,下一站未完待續。',
    highlights: ['資深前端工程師', '打造個人網站與 3D 地球儀頁面', '持續探索世界的下一站'],
    emoji: '✨',
    color: '#facc15',
  },
];
