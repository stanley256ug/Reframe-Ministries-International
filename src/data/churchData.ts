import {
  LiveBroadcast,
  ChatMessage,
  PrayerRequest,
  SocialMediaPost,
  SermonArchiveItem,
  DevotionalItem,
  ChurchEvent,
  MinistryDepartment,
  GivingOption
} from '../types/church';

export const CHURCH_INFO = {
  name: 'Reframe Ministries International',
  shortName: 'RMI Church',
  motto: '“The just shall live by faith”',
  scriptureMotto: 'Romans 1:17 • Habakkuk 2:4',
  logoUrl: '/logo.svg',
  leadPastor: {
    name: 'Pastor James Kabali',
    title: 'Lead Pastor & Founder',
    photo: '/pastor-james-kabali.jpg',
    bio: 'Pastor James Kabali is the visionary leader and founder of Reframe Ministries International in Najjanankumbi, Kampala. Called with an apostolic mandate to reframe mindsets and empower believers to walk in authentic faith, supernatural breakthrough, and kingdom authority.'
  },
  location: {
    address: 'Najjanankumbi, Entebbe Road',
    city: 'Kampala, Uganda',
    landmark: 'Between Stella Stage & Namasuba, Behind Shell Najjanankumbi (Opposite Freedom City Corridor)',
    googleMapsUrl: 'https://maps.google.com/?q=Najjanankumbi+Entebbe+Road+Kampala+Uganda',
    directions: 'Take any Entebbe Road taxi or bus from Kampala Old/New Taxi Park, alight at Najjanankumbi Stella Stage. The church signpost is 50 meters into the worship avenue.',
    bodaBodaNote: 'Ask any Boda rider for "Reframe Ministries International, Najjanankumbi".'
  },
  contacts: {
    phonePrimary: '+256 700 849 201',
    phoneSecondary: '+256 772 318 905',
    whatsapp: '+256 700 849 201',
    email: 'info@reframeministries.org',
    prayerLine: '+256 788 120 440'
  },
  socialMedia: {
    tiktok: {
      handle: '@reframeministriesinternational',
      url: 'https://www.tiktok.com/@reframeministriesinternational',
      followers: '32.4K',
      description: 'Daily prophetic declarations, 60s sermon deep-cuts, and praise moments with Pastor James Kabali in Najjanankumbi.'
    },
    instagram: {
      handle: '@reframeministriesinternational',
      url: 'https://www.instagram.com/reframeministriesinternational',
      followers: '19.8K',
      description: 'Sunday photo gallery, event announcements, Scripture visual reminders & leadership updates.'
    },
    youtube: {
      handle: '@reframeministriesinternational',
      channelName: 'Reframe Ministries International',
      url: 'https://www.youtube.com/@reframeministriesinternational',
      subscribers: '48.2K',
      description: 'Official sanctuary live streams, full Sunday Celebration services, worship nights & sermons by Pastor James Kabali.'
    }
  },
  serviceSchedule: [
    {
      name: 'Sunday 1st Celebration Service',
      day: 'Every Sunday',
      time: '8:00 AM – 10:00 AM (EAT)',
      description: 'Early morning communion, worship atmosphere, and revelational teaching of the Word by Pastor James Kabali.'
    },
    {
      name: 'Sunday 2nd Celebration Service',
      day: 'Every Sunday',
      time: '10:30 AM – 1:00 PM (EAT)',
      description: 'Full praise experience, miracle prayer lines, and main live broadcast across all platforms.'
    },
    {
      name: 'Midweek Breakthrough Fellowship',
      day: 'Every Wednesday',
      time: '5:30 PM – 7:30 PM (EAT)',
      description: 'Deep dive into Scripture, believer’s authority, and targeted intercession.'
    },
    {
      name: 'Holy Ghost Encounter Night',
      day: 'Every Last Friday of the Month',
      time: '9:00 PM – 5:00 AM (EAT)',
      description: 'All-night breakthrough prayer, deliverance, prophetic worship, and covenant communion.'
    }
  ],
  mobileMoneyDetails: {
    mtn: {
      merchantCode: '849201',
      merchantName: 'REFRAME MINISTRIES',
      ussdCode: '*165*3#',
      directPhone: '+256 772 318 905',
      accountHolder: 'Reframe Ministries Int'
    },
    airtel: {
      merchantCode: '1194022',
      merchantName: 'REFRAME CHURCH',
      ussdCode: '*185*9#',
      directPhone: '+256 700 849 201',
      accountHolder: 'Reframe Ministries'
    },
    bank: {
      bankName: 'Stanbic Bank Uganda',
      accountName: 'Reframe Ministries International',
      accountNumber: '9030018492011',
      branch: 'Entebbe Road Branch, Kampala',
      swift: 'SBICUGKX'
    }
  }
};

export const INITIAL_LIVE_BROADCAST: LiveBroadcast = {
  id: 'live-sunday-broadcast',
  isLive: true,
  title: '🔴 LIVE: LOVE VS SACRIFICE PART IV — Pastor James Kabali',
  theme: '“The just shall live by faith” • Living in Total Victory',
  speaker: 'Pastor James Kabali',
  speakerRole: 'Lead Pastor & Founder',
  serviceType: 'Sunday Celebration Service (Live from Najjanankumbi)',
  dateTime: 'Sunday Broadcast • Live Now from Najjanankumbi Sanctuary',
  viewerCount: 2480,
  // Real YouTube video embed from @reframeministriesinternational
  videoUrl: 'https://www.youtube-nocookie.com/embed/DYwRCEPP_CY?autoplay=0&rel=0&modestbranding=1',
  audioStreamUrl: 'https://stream.zeno.fm/reframe-ministries-live',
  scriptureAnchor: 'Romans 1:17 & 1 John 3:16-18',
  keyPoints: [
    '1. The just shall live by faith — walking in the supernatural reality of God’s covenant.',
    '2. Sacrificial love aligns our lives with God’s ultimate purpose and power.',
    '3. Reframing your mindset aligns your perception with Heaven’s eternal blueprint.',
    '4. Living beyond limits: faith in Jesus breaks every generational barrier in Najjanankumbi.'
  ],
  bannerUrl: '/pastor-james-kabali.jpg'
};

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'c1',
    user: 'Elder Joseph Mukasa',
    location: 'Najjanankumbi Sanctuary',
    message: 'Welcome everyone! Pastor James Kabali is taking us deep into the Word today!',
    timestamp: '10:32 AM',
    isHost: true,
    avatarColor: 'from-amber-500 to-amber-700'
  },
  {
    id: 'c2',
    user: 'Sarah Nalubega',
    location: 'Entebbe, Uganda',
    message: 'Tuned in from Entebbe! Ready for Pastor James Kabali’s message! Amen! 🔥🙏',
    timestamp: '10:34 AM',
    avatarColor: 'from-purple-500 to-pink-600'
  },
  {
    id: 'c3',
    user: 'David Ochieng',
    location: 'Nairobi, Kenya',
    message: 'Greetings from Nairobi. Reframe Ministries International is our online family!',
    timestamp: '10:35 AM',
    avatarColor: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'c4',
    user: 'Deaconess Grace K.',
    location: 'Media Team Najjanankumbi',
    message: 'For those needing prayer, please tap the Prayer Request tab above. Our intercessors are praying live with Pastor James!',
    timestamp: '10:37 AM',
    isHost: true,
    avatarColor: 'from-amber-600 to-yellow-600'
  },
  {
    id: 'c5',
    user: 'Brian Katende',
    location: 'London, UK Diaspora',
    message: 'Watching live with the family in London. “The just shall live by faith!” 🕊️',
    timestamp: '10:38 AM',
    avatarColor: 'from-emerald-500 to-teal-700'
  },
  {
    id: 'c6',
    user: 'Mama Florence N.',
    location: 'Makindye, Kampala',
    message: 'Mukama yeebazibwe! Blessings upon Pastor James Kabali and the whole ministry!',
    timestamp: '10:40 AM',
    avatarColor: 'from-rose-500 to-red-600'
  }
];

export const INITIAL_PRAYER_REQUESTS: PrayerRequest[] = [
  {
    id: 'pr-1',
    name: 'Sister Harriet N.',
    location: 'Najjanankumbi, Kampala',
    category: 'Healing',
    request: 'Praying for complete restoration of my mother’s health and freedom from long-term hypertension.',
    isConfidential: false,
    submittedAt: 'Today at 09:15 AM',
    prayCount: 54,
    hasPrayed: false,
    pastorNoted: true
  },
  {
    id: 'pr-2',
    name: 'Brother Samuel T.',
    location: 'Kajjansi, Entebbe Road',
    category: 'Breakthrough',
    request: 'Trusting God for divine open doors in my civil engineering consulting tender this month.',
    isConfidential: false,
    submittedAt: 'Today at 09:48 AM',
    prayCount: 38,
    hasPrayed: false,
    pastorNoted: true
  },
  {
    id: 'pr-3',
    name: 'Ruth & Emmanuel M.',
    location: 'Kampala',
    category: 'Family',
    request: 'Standing on the covenant for peace, unity, and divine fruitfulness in our marriage.',
    isConfidential: false,
    submittedAt: 'Yesterday at 06:20 PM',
    prayCount: 71,
    hasPrayed: true,
    pastorNoted: true
  },
  {
    id: 'pr-4',
    name: 'Diaspora Partner',
    location: 'Dallas, USA',
    category: 'Finances',
    request: 'Believing God for kingdom provision to sponsor the Najjanankumbi sanctuary expansion project.',
    isConfidential: false,
    submittedAt: '2 days ago',
    prayCount: 49,
    hasPrayed: false,
    pastorNoted: true
  }
];

export const INITIAL_SOCIAL_POSTS: SocialMediaPost[] = [
  {
    id: 'soc-yt-1',
    platform: 'youtube',
    title: '🔴 LOVE VS SACRIFICE PART IV | Pastor James Kabali',
    handle: '@reframeministriesinternational',
    url: 'https://www.youtube.com/watch?v=DYwRCEPP_CY',
    thumbnail: '/pastor-james-kabali.jpg',
    likes: '3.1K',
    views: '21.4K',
    comments: '290',
    date: 'Flagship Sermon',
    caption: 'Full Sunday live broadcast from our Najjanankumbi sanctuary with Pastor James Kabali. Discover deep spiritual truths on covenant sacrifice and supernatural dominion.',
    category: 'Full Sermon'
  },
  {
    id: 'soc-yt-2',
    platform: 'youtube',
    title: '🔴 LOVE VS SACRIFICE PART III | Pastor James Kabali',
    handle: '@reframeministriesinternational',
    url: 'https://www.youtube.com/watch?v=65O6mdliEI4',
    thumbnail: '/pastor-james-kabali.jpg',
    likes: '2.6K',
    views: '18.2K',
    comments: '220',
    date: 'Sunday Service',
    caption: 'Pastor James Kabali expounds on the profound mystery of agape love and covenant sacrifice at Reframe Ministries International.',
    category: 'Sermon Series'
  },
  {
    id: 'soc-tt-1',
    platform: 'tiktok',
    title: 'When God reframes your mindset! 🔥 “The just shall live by faith” #PastorJamesKabali #Najjanankumbi',
    handle: '@reframeministriesinternational',
    url: 'https://www.tiktok.com/@reframeministriesinternational',
    thumbnail: '/pastor-james-kabali.jpg',
    likes: '34.6K',
    views: '240K',
    comments: '1,120',
    date: '1 day ago',
    caption: 'Pastor James Kabali: Stop looking at your limitations through human eyes. Receive God’s rhema word today! Type AMEN in agreement!',
    category: 'Viral Clip'
  },
  {
    id: 'soc-yt-3',
    platform: 'youtube',
    title: 'Praise And Worship Youth Service (4th Edition) | Reframe Ministries',
    handle: '@reframeministriesinternational',
    url: 'https://www.youtube.com/watch?v=tuu3fnan_QM',
    thumbnail: '/pastor-james-kabali.jpg',
    likes: '2.2K',
    views: '15.8K',
    comments: '175',
    date: 'Youth Edition',
    caption: 'Atmosphere of authentic praise and surrender at Reframe Ministries International, Najjanankumbi.',
    category: 'Worship Encounter'
  },
  {
    id: 'soc-yt-4',
    platform: 'youtube',
    title: 'Yesu Olina Ekitiibwa | Reframe Youth Service',
    handle: '@reframeministriesinternational',
    url: 'https://www.youtube.com/watch?v=XNOTJ3W6TFk',
    thumbnail: '/pastor-james-kabali.jpg',
    likes: '1.8K',
    views: '12.4K',
    comments: '130',
    date: 'Worship Service',
    caption: 'Exalting King Jesus at Reframe Ministries Sanctuary on Entebbe Road.',
    category: 'Gospel Music'
  },
  {
    id: 'soc-yt-5',
    platform: 'youtube',
    title: 'Under the Blood Of Jesus | Reframe Ministries Youth Service',
    handle: '@reframeministriesinternational',
    url: 'https://www.youtube.com/watch?v=2LSs5KgZv-E',
    thumbnail: '/pastor-james-kabali.jpg',
    likes: '1.5K',
    views: '10.9K',
    comments: '94',
    date: 'Youth Encounter',
    caption: 'Powerful message on the protective, redeeming power of the Blood of Jesus.',
    category: 'Youth Ministry'
  },
  {
    id: 'soc-ig-1',
    platform: 'instagram',
    title: 'Moments from Sunday Worship with Pastor James Kabali',
    handle: '@reframeministriesinternational',
    url: 'https://www.instagram.com/reframeministriesinternational',
    thumbnail: '/pastor-james-kabali.jpg',
    likes: '3.4K',
    comments: '142',
    date: '2 days ago',
    caption: '“The just shall live by faith.” What an unforgettable atmosphere of glory led by Pastor James Kabali at Najjanankumbi!',
    category: 'Sanctuary Photos'
  }
];

export const SERMON_ARCHIVE: SermonArchiveItem[] = [
  {
    id: 'sermon-1',
    title: '🔴 LOVE VS SACRIFICE PART IV: Covenant Victory & Dominion',
    series: 'Covenant Foundations',
    speaker: 'Pastor James Kabali',
    speakerTitle: 'Lead Pastor & Founder',
    date: 'Latest Flagship Broadcast',
    duration: '3h 12m',
    scripture: '1 John 3:16-18 & Romans 1:17',
    category: 'Faith & Mindset',
    videoUrl: 'https://www.youtube.com/embed/DYwRCEPP_CY',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    thumbnail: '/pastor-james-kabali.jpg',
    summary: 'Pastor James Kabali delivers the profound fourth chapter of Love vs Sacrifice at Reframe Ministries International in Najjanankumbi. Learn how sacrificial love aligns believers with unstoppable kingdom authority.',
    keyTakeaways: [
      '“The just shall live by faith” — authentic faith is demonstrated through selfless surrender',
      'Covenant love breaks generational resistance and unlocks divine favor in your lineage',
      'Pastor James Kabali reveals the divine mechanics of living above earthly limitations'
    ],
    views: 21400
  },
  {
    id: 'sermon-2',
    title: '🔴 LOVE VS SACRIFICE PART III: The Altar of Total Surrender',
    series: 'Covenant Foundations',
    speaker: 'Pastor James Kabali',
    speakerTitle: 'Lead Pastor & Founder',
    date: 'Sunday Service',
    duration: '2h 45m',
    scripture: '1 John 3:16-18 & Romans 12:1',
    category: 'Faith & Mindset',
    videoUrl: 'https://www.youtube.com/embed/65O6mdliEI4',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    thumbnail: '/pastor-james-kabali.jpg',
    summary: 'A life-altering teaching by Pastor James Kabali examining true biblical love that costs something. How sacrifice speaks and opens generational favor in your life.',
    keyTakeaways: [
      'Love without sacrificial obedience is superficial sentiment',
      'Covenant sacrifices establish enduring generational blessings',
      'Reframing your heart from self-preservation to kingdom surrender'
    ],
    views: 18200
  },
  {
    id: 'sermon-3',
    title: 'Praise And Worship Youth Service (4th Edition)',
    series: 'Worship Atmospheres',
    speaker: 'Reframe Worship & Pastor James Kabali',
    speakerTitle: 'Reframe Ministries International',
    date: 'Youth Celebration',
    duration: '48m',
    scripture: 'Psalm 100:1-5 & John 4:23-24',
    category: 'Prophetic Impartation',
    videoUrl: 'https://www.youtube.com/embed/tuu3fnan_QM',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    thumbnail: '/pastor-james-kabali.jpg',
    summary: 'Anointed praise and worship ministration from the sanctuary at Najjanankumbi, lifting high the name of Jesus with deep reverence and joy.',
    keyTakeaways: [
      'Worship is warfare and divine alignment with Heaven',
      'True praise brings down the manifest glory of God',
      'Honoring King Jesus with our voices and hearts'
    ],
    views: 15800
  },
  {
    id: 'sermon-4',
    title: 'Yesu Olina Ekitiibwa: Youth Service Encounter',
    series: 'Worship Atmospheres',
    speaker: 'Reframe Ministries International',
    speakerTitle: 'Sanctuary Worship Team',
    date: 'Sunday Worship',
    duration: '35m',
    scripture: 'Revelation 5:12 & Psalm 150',
    category: 'Prophetic Impartation',
    videoUrl: 'https://www.youtube.com/embed/XNOTJ3W6TFk',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    thumbnail: '/pastor-james-kabali.jpg',
    summary: 'Heartfelt Luganda and English praise celebrating the majesty, honor, and supreme majesty of Christ Jesus.',
    keyTakeaways: [
      'Giving all glory to Jesus in every circumstance',
      'Experiencing the transforming power of the Holy Spirit in worship',
      'Najjanankumbi sanctuary united in praise'
    ],
    views: 12400
  },
  {
    id: 'sermon-5',
    title: 'Under the Blood Of Jesus: Reframe Ministries Youth Service',
    series: 'Kingdom Warfare & Deliverance',
    speaker: 'Pastor James Kabali & NextGen Ministry',
    speakerTitle: 'Reframe Ministries International',
    date: 'Jul 26, 2026',
    duration: '1h 18m',
    scripture: 'Exodus 12:13 & Hebrews 9:14',
    category: 'Deliverance & Warfare',
    videoUrl: 'https://www.youtube.com/embed/2LSs5KgZv-E',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    thumbnail: '/pastor-james-kabali.jpg',
    summary: 'Powerful service at Reframe Ministries Najjanankumbi declaring the protective, delivering, and cleansing power of the Blood of Jesus.',
    keyTakeaways: [
      'The Blood of Jesus never loses its power against every enemy scheme',
      'Believers standing bold, redeemed, and unbroken',
      'Generational victory secured at the Cross'
    ],
    views: 10900
  },
  {
    id: 'sermon-6',
    title: 'Inspiring Faith and Transforming Lives: Youth Service Encounter',
    series: 'Faith & Mindset',
    speaker: 'Pastor James Kabali',
    speakerTitle: 'Lead Pastor & Founder',
    date: 'Jul 26, 2026',
    duration: '1h 25m',
    scripture: 'Romans 1:17 & Romans 12:2',
    category: 'Faith & Mindset',
    videoUrl: 'https://www.youtube.com/embed/g_wsUhE1Znc',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    thumbnail: '/pastor-james-kabali.jpg',
    summary: 'Pastor James Kabali teaches the practical spiritual roadmap for mindset transformation and unwavering faith in God’s promises.',
    keyTakeaways: [
      'Transformation starts by reframing how you think according to scripture',
      'The just walk by faith, not by sensory feelings or limitations',
      'Activating God’s favor in business, family, and spiritual walk'
    ],
    views: 13500
  },
  {
    id: 'sermon-7',
    title: 'Dance Presentation Youth Service (4th Edition)',
    series: 'Creative Arts & Praise',
    speaker: 'Reframe Creative Arts',
    speakerTitle: 'Youth Ministry Najjanankumbi',
    date: '4th Edition Youth',
    duration: '22m',
    scripture: 'Psalm 149:3 & 2 Samuel 6:14',
    category: 'Prophetic Impartation',
    videoUrl: 'https://www.youtube.com/embed/6gqHtmJYnhE',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    thumbnail: '/pastor-james-kabali.jpg',
    summary: 'Dynamic choreographed creative praise dance presentation by the Reframe Youth Ministry honoring God.',
    keyTakeaways: [
      'Praising the Lord with creative arts and wholehearted devotion',
      'Next generation ignited for God’s kingdom in Najjanankumbi'
    ],
    views: 9800
  }
];

export const DAILY_DEVOTIONAL: DevotionalItem = {
  id: 'devotional-today',
  date: 'October 12, 2026',
  title: '“The Just Shall Live by Faith” — Reframe Your Stance',
  theme: 'Walking in Unwavering Faith amid Modern Storms',
  scriptureReference: 'Romans 1:17 & Habakkuk 2:4',
  scriptureText: '“For in it the righteousness of God is revealed from faith to faith; as it is written, ‘The just shall live by faith.’”',
  reflection: [
    'At Reframe Ministries International, our founding anchor is this eternal truth: the just shall live by faith. Faith is not an occasional emergency switch you flip when trouble strikes; it is the perpetual oxygen of the kingdom citizen.',
    'Pastor James Kabali reminds us that when you live by faith, you refuse to allow physical circumstances, medical reports, or economic challenges in Kampala to dictate your posture. You reframe your narrative through the lens of God’s infallible covenant.',
    'Whatever obstacle stands before you today in Najjanankumbi or in your family, know that faith in Jesus Christ overrides every natural impossibility. Speak what God says, reframe your mindset, and watch mountains move!'
  ],
  faithConfession: 'I declare that I live by faith and not by sight. I am righteous in Christ Jesus, and no weapon formed against my destiny shall prosper. God is reframing my story for victory!',
  prayer: 'Father in heaven, I thank You that the just shall live by faith. Increase my faith today. Teach me to reframe every hardship into a stepping stone of glory. Protect Pastor James Kabali, his household, and the congregation of Reframe Ministries International. In Jesus’ Mighty Name, Amen.',
  author: 'Pastor James Kabali • Reframe Ministries International'
};

export const CHURCH_EVENTS: ChurchEvent[] = [
  {
    id: 'evt-1',
    title: 'The Great Overflow Conference 2026',
    date: 'Nov 20 – Nov 24, 2026',
    time: '5:00 PM Daily',
    venue: 'RMI Main Sanctuary, Najjanankumbi (Entebbe Rd)',
    speaker: 'Pastor James Kabali & Guest Ministers',
    category: 'Annual Conference',
    description: 'Five nights of supernatural encounters, prophetic impartation, leadership Master Class seminars, and worship that will alter the trajectory of your next 5 years.',
    isFeatured: true,
    bannerImage: '/pastor-james-kabali.jpg'
  },
  {
    id: 'evt-2',
    title: 'Overnight Miracle & Deliverance Encounter',
    date: 'Last Friday of October',
    time: '9:00 PM – 5:30 AM',
    venue: 'Sanctuary Grounds, Najjanankumbi',
    speaker: 'Pastor James Kabali & Pastoral Council',
    category: 'Overnight Prayer',
    description: 'An apostolic night of tearing down demonic altars, breaking stubborn generational bondages, and receiving prophetic keys for total victory.',
    isFeatured: false,
    bannerImage: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'evt-3',
    title: 'NextGen Youth & Campus Worship Night',
    date: 'Saturday, Nov 07, 2026',
    time: '3:00 PM – 7:00 PM',
    venue: 'Reframe Youth Pavilion',
    speaker: 'Pastor James Kabali & Youth Pastors',
    category: 'Youth & Young Adults',
    description: 'Music, spoken word, real talk on career, relationships, and standing uncompromised in contemporary culture.',
    isFeatured: false,
    bannerImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80'
  }
];

export const MINISTRIES_LIST: MinistryDepartment[] = [
  {
    id: 'min-1',
    name: 'Reframe Praise & Creative Arts',
    tagline: 'Leading the Congregation into Holy Spirit Atmospheres',
    leader: 'Pastor James Kabali & Levites Choir',
    description: 'An anointed community of vocalists, instrumentalists, sound engineers, and creative producers who steward the worship experience every week.',
    meetingDay: 'Saturdays 2:00 PM & Thursdays 5:30 PM',
    contact: '+256 700 849 201',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'min-2',
    name: 'Women of Destiny (Reframe Sisters)',
    tagline: 'Virtuous, Empowered, and Spirit-Filled Mothers & Daughters',
    leader: 'Pastoral Council Women Directorate',
    description: 'Nurturing women in spiritual depth, marriage stability, entrepreneurship, and intercessory prayer across Najjanankumbi and Uganda.',
    meetingDay: 'Every 2nd Saturday 10:00 AM',
    contact: '+256 772 318 905',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'min-3',
    name: 'Men of Valor Fellowship',
    tagline: 'Priesthood, Kingdom Business, and Family Leadership',
    leader: 'Pastor James Kabali & Elders',
    description: 'Challenging men to rise as spiritual priests of their homes, ethical business leaders, and pillars of community transformation.',
    meetingDay: 'Every 3rd Saturday 7:00 AM (Breakfast Fellowship)',
    contact: '+256 700 849 201',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'min-4',
    name: 'NextGen Youth & Campus Ministry',
    tagline: 'Bold, Unashamed, and Firebrand Young Believers',
    leader: 'Youth Leadership Team',
    description: 'Igniting students, young professionals, and creatives to influence universities, media, and corporate sectors with the gospel.',
    meetingDay: 'Sundays 2:00 PM & Friday Youth Jam',
    contact: '+256 700 849 201',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'min-5',
    name: 'Kingdom Kids (Sunday School)',
    tagline: 'Planting Seeds of Faith in Young Hearts',
    leader: 'Children’s Ministry Teachers',
    description: 'Safe, joyful, and curriculum-guided biblical education, creative crafts, and scripture memorization for children ages 1 to 12.',
    meetingDay: 'Every Sunday during both services',
    contact: '+256 788 120 440',
    image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'min-6',
    name: 'Intercession & Altar of Fire',
    tagline: 'Standing in the Gap for the Nations and the Church',
    leader: 'Pastor James Kabali & Intercessory Council',
    description: 'Maintaining a 24/7 prayer chain covering pastors, the flock, the sick, and territorial transformation over Najjanankumbi and Kampala.',
    meetingDay: 'Daily 6:00 AM & Wednesdays 4:00 PM',
    contact: '+256 788 120 440',
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=600&q=80'
  }
];

export const GIVING_OPTIONS: GivingOption[] = [
  {
    id: 'give-tithe',
    title: 'Tithe (Malachi 3:10)',
    description: 'The 10% first fruit belonging unto the Lord that rebukes the devourer and preserves your fruitfulness.',
    category: 'Tithe'
  },
  {
    id: 'give-offering',
    title: 'General Worship Offering',
    description: 'Your freewill love seed given in honour of God’s goodness during our weekly celebration services.',
    category: 'Offering'
  },
  {
    id: 'give-building',
    title: 'Najjanankumbi Sanctuary Expansion Project',
    description: 'Partnering with Pastor James Kabali to expand the sanctuary auditorium, high-definition broadcast media studio, and youth pavilion.',
    category: 'Building Project',
    targetGoalUgx: 250000000,
    currentRaisedUgx: 168450000
  },
  {
    id: 'give-missions',
    title: 'Missions, Outreach & Needy Widows Care',
    description: 'Feeding the underprivileged in Najjanankumbi slums, funding prison ministry, and regional crusades.',
    category: 'Missions & Charity'
  },
  {
    id: 'give-love',
    title: 'Pastoral Blessing / Prophet’s Reward',
    description: 'Honouring Pastor James Kabali and the ministerial team who watch over our souls in the Word and prayer.',
    category: 'Love Offering'
  }
];

export const SAMPLE_BIBLE_VERSES = [
  { ref: 'Romans 1:17', text: 'For in it the righteousness of God is revealed from faith to faith; as it is written, “The just shall live by faith.”' },
  { ref: 'Habakkuk 2:4', text: 'Behold the proud, his soul is not upright in him; but the just shall live by his faith.' },
  { ref: 'Romans 12:2', text: 'And do not be conformed to this world, but be transformed by the renewing of your mind, that you may prove what is that good and acceptable and perfect will of God.' },
  { ref: '2 Corinthians 5:17', text: 'Therefore, if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new.' },
  { ref: 'Ephesians 6:11', text: 'Put on the whole armor of God, that you may be able to stand against the wiles of the devil.' },
  { ref: 'Isaiah 43:18-19', text: 'Do not remember the former things, nor consider the things of old. Behold, I will do a new thing, now it shall spring forth; shall you not know it?' }
];
