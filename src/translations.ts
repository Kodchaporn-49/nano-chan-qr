export type Language = 'en' | 'th' | 'ko' | 'ja';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  weddingBadgeSubtitle: string;
  kawaiiBadgeSubtitle: string;
  weddingModeTab: string;
  kawaiiModeTab: string;
  steps: {
    step1: string;
    step2: string;
    step3: string;
  };
  types: {
    websiteUrl: string;
    websiteUrlDesc: string;
    greetingCard: string;
    greetingCardDesc: string;
    photoCard: string;
    photoCardDesc: string;
    weddingSmartCard: string;
    weddingSmartCardDesc: string;
    weddingWishes: string;
    weddingWishesDesc: string;
  };
  form: {
    enterUrlTitle: string;
    enterUrlHint: string;
    pasteBtn: string;
    customPalette: string;
    presetThemes: string;
    centerSticker: string;
    qrFrameOptions: string;
    includeCuteFrame: string;
    frameLabelPlaceholder: string;
    qrSize: string;
    errorCorrection: string;
    highQualityPrint: string;
    previewCardBtn: string;
    downloadPngBtn: string;
    downloadSvgBtn: string;
    copyQrBtn: string;
    qrCopied: string;
    resetDefaults: string;
    // Greeting fields
    recipientName: string;
    senderName: string;
    cardTitle: string;
    greetingMessage: string;
    quickPresets: string;
    // Photo Card fields
    photoUrlLabel: string;
    photoPresets: string;
    toggleCenterEmoji: string;
    uploadPhotoBtn: string;
    photoPreview: string;
    changePhoto: string;
    removePhoto: string;
    // Wedding card fields
    groomName: string;
    brideName: string;
    weddingDate: string;
    weddingTime: string;
    venueName: string;
    locationMapsUrl: string;
    coverPhotoUrl: string;
    loveQuote: string;
    dressCode: string;
    giftPromptPay: string;
    // Wedding wishes fields
    coupleName: string;
    yourName: string;
    wishMessage: string;
  };
  history: {
    title: string;
    clearAll: string;
    emptyText: string;
    emptySubtext: string;
    restore: string;
    delete: string;
  };
  footer: {
    madeWith: string;
    byNanoChan: string;
    rights: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appTitle: "Nano-chan's Kawaii QR Magic ✨",
    appSubtitle: "Welcome to Nano-chan's official cute QR Code & Wedding Card generator!",
    weddingBadgeSubtitle: "Wedding Magic • Elegant Wedding Smart Cards & Wishes",
    kawaiiBadgeSubtitle: "Cute & Magic QR Code Generator by Nano-chan",
    weddingModeTab: "Wedding Card Mode 💍",
    kawaiiModeTab: "Kawaii Mode ✨",
    steps: {
      step1: "Step 1: Enter Text/URL",
      step2: "Step 2: Customize & Generate",
      step3: "Step 3: Download QR Code",
    },
    types: {
      websiteUrl: "Website URL",
      websiteUrlDesc: "Direct link to any website or social media",
      greetingCard: "Greeting Card",
      greetingCardDesc: "Cute interactive greeting message for loved ones",
      photoCard: "Photo Card",
      photoCardDesc: "Photo memory with heartfelt message",
      weddingSmartCard: "Wedding Invitation Smart Card 💒",
      weddingSmartCardDesc: "Interactive card with maps, timeline, photos & wishes",
      weddingWishes: "Wedding Wishes 💖",
      weddingWishesDesc: "Send warm blessings directly to bride & groom",
    },
    form: {
      enterUrlTitle: "Target Website or Link URL",
      enterUrlHint: "Enter website link, Instagram, Line, Facebook, etc.",
      pasteBtn: "Paste",
      customPalette: "Pastel Color Palette",
      presetThemes: "Theme Color Presets",
      centerSticker: "Center Cute Badge / Icon",
      qrFrameOptions: "Decorative QR Frame",
      includeCuteFrame: "Add decorative frame around QR",
      frameLabelPlaceholder: "e.g. SCAN ME ✨ or SAVE THE DATE 💍",
      qrSize: "QR Code Size",
      errorCorrection: "Error Correction Level",
      highQualityPrint: "High Quality (300 DPI ready for print)",
      previewCardBtn: "Live Interactive Card Preview",
      downloadPngBtn: "Download PNG",
      downloadSvgBtn: "Download SVG",
      copyQrBtn: "Copy Image",
      qrCopied: "Copied to Clipboard!",
      resetDefaults: "Reset to Default",
      recipientName: "Recipient's Name",
      senderName: "Your Name / Sender",
      cardTitle: "Card Heading / Title",
      greetingMessage: "Greeting Message",
      quickPresets: "Quick Message Suggestions",
      photoUrlLabel: "Photo Image URL",
      photoPresets: "Sample Photos",
      toggleCenterEmoji: "Show Center Emoji / Sticker",
      uploadPhotoBtn: "Upload Photo 📁",
      photoPreview: "Photo Preview",
      changePhoto: "Change",
      removePhoto: "Remove",
      groomName: "Groom's Name",
      brideName: "Bride's Name",
      weddingDate: "Wedding Date",
      weddingTime: "Ceremony Time",
      venueName: "Venue & Hall Name",
      locationMapsUrl: "Google Maps URL (Location)",
      coverPhotoUrl: "Couple Cover Photo URL",
      loveQuote: "Romantic Quote / Message",
      dressCode: "Theme & Dress Code",
      giftPromptPay: "Gift Registry / PromptPay / Bank Info",
      coupleName: "Bride & Groom's Name",
      yourName: "Your Name (Guest / Sender)",
      wishMessage: "Your Heartfelt Wedding Wish",
    },
    history: {
      title: "QR History & Saved Codes",
      clearAll: "Clear All",
      emptyText: "No QR codes created yet",
      emptySubtext: "Your generated QR codes will be saved here automatically!",
      restore: "Load",
      delete: "Delete",
    },
    footer: {
      madeWith: "Crafted with 💖 and pure magic",
      byNanoChan: "Made with 💖 by Nano-chan",
      rights: "Ad-free, High-Resolution QR Codes with Smart Interaction",
    },
  },
  th: {
    appTitle: "Nano-chan's Kawaii QR Magic ✨ (เครื่องสร้าง QR Code มุ้งมิ้ง)",
    appSubtitle: "ยินดีต้อนรับสู่โปรแกรมสร้าง QR Code และการ์ดแต่งงานอัจฉริยะสุดน่ารักโดย Nano-chan!",
    weddingBadgeSubtitle: "Wedding Magic • สมาร์ทการ์ดแต่งงานหรูหรา & ระบบอวยพรออนไลน์",
    kawaiiBadgeSubtitle: "เครื่องมือสร้าง QR Code น่ารักมุ้งมิ้งโดย Nano-chan",
    weddingModeTab: "โหมดการ์ดแต่งงาน 💍",
    kawaiiModeTab: "โหมดน่ารัก Kawaii ✨",
    steps: {
      step1: "ขั้นตอนที่ 1: กรอกข้อความ/ลิงก์",
      step2: "ขั้นตอนที่ 2: ตกแต่ง & ปรับสไตล์",
      step3: "ขั้นตอนที่ 3: ดาวน์โหลด QR Code",
    },
    types: {
      websiteUrl: "ลิงก์เว็บไซต์ (URL)",
      websiteUrlDesc: "ลิงก์ตรงไปยังเว็บไซต์ หรือโซเชียลมีเดีย",
      greetingCard: "การ์ดอวยพรน่ารัก",
      greetingCardDesc: "ข้อความการ์ดอวยพรอินเทอร์แอคทีฟสุดอบอุ่น",
      photoCard: "การ์ดรูปภาพ & ความทรงจำ",
      photoCardDesc: "ส่งรูปถ่ายสวยๆ พร้อมคำอวยพรสุดพิเศษ",
      weddingSmartCard: "สมาร์ทการ์ดแต่งงาน 💒",
      weddingSmartCardDesc: "การ์ดแต่งงานพร้อมแผนที่นำทาง กำหนดการ อัลบั้มรูป & กล่องอวยพร",
      weddingWishes: "เขียนอวยพรบ่าวสาว 💖",
      weddingWishesDesc: "ส่งคำอวยพรอันอบอุ่นตรงถึงคู่บ่าวสาว",
    },
    form: {
      enterUrlTitle: "ลิงก์เว็บไซต์หรือ URL ปลายทาง",
      enterUrlHint: "กรอกลิงก์เว็บไซต์, Instagram, Line, Facebook ฯลฯ",
      pasteBtn: "วางลิงก์",
      customPalette: "ชุดสีพาสเทล",
      presetThemes: "ธีมสีสำเร็จรูป",
      centerSticker: "สติกเกอร์ / ไอคอนตรงกลาง QR",
      qrFrameOptions: "กรอบข้อความตกแต่งรอบ QR",
      includeCuteFrame: "ใส่กรอบข้อความตกแต่ง",
      frameLabelPlaceholder: "เช่น สแกนเลย ✨ หรือ SAVE THE DATE 💍",
      qrSize: "ขนาด QR Code",
      errorCorrection: "ระดับการแก้ไขข้อผิดพลาด (Error Correction)",
      highQualityPrint: "ความคมชัดสูง (พร้อมสำหรับงานพิมพ์ 300 DPI)",
      previewCardBtn: "เปิดดูตัวอย่างการ์ดจริง (Live Preview)",
      downloadPngBtn: "ดาวน์โหลด PNG",
      downloadSvgBtn: "ดาวน์โหลด SVG",
      copyQrBtn: "คัดลอกรูปภาพ",
      qrCopied: "คัดลอกรูปภาพเรียบร้อยแล้ว!",
      resetDefaults: "รีเซ็ตค่าเริ่มต้น",
      recipientName: "ชื่อผู้รับ",
      senderName: "ชื่อของคุณ / ผู้ส่ง",
      cardTitle: "หัวข้อการ์ด",
      greetingMessage: "ข้อความอวยพร",
      quickPresets: "ข้อความสำเร็จรูป",
      photoUrlLabel: "ลิงก์รูปภาพ (URL)",
      photoPresets: "รูปตัวอย่าง",
      toggleCenterEmoji: "แสดง Emoji / สติกเกอร์ตรงกลาง QR Code",
      uploadPhotoBtn: "อัปโหลดรูปภาพ 📁",
      photoPreview: "ตัวอย่างรูปภาพ",
      changePhoto: "เปลี่ยนรูป",
      removePhoto: "ลบรูป",
      groomName: "ชื่อเจ้าบ่าว",
      brideName: "ชื่อเจ้าสาว",
      weddingDate: "วันจัดงานมงคลสมรส",
      weddingTime: "เวลาจัดงาน",
      venueName: "สถานที่จัดงาน & ห้องจัดเลี้ยง",
      locationMapsUrl: "ลิงก์แผนที่ Google Maps (นำทาง)",
      coverPhotoUrl: "ลิงก์รูปหน้าปกคู่บ่าวสาว",
      loveQuote: "คำคมความรัก / คำกล่าวต้อนรับ",
      dressCode: "ธีมการแต่งกาย (Dress Code)",
      giftPromptPay: "ข้อมูลร่วมแสดงความยินดี (พร้อมเพย์/บัญชี)",
      coupleName: "ชื่อคู่บ่าวสาว",
      yourName: "ชื่อของคุณ (แขกผู้ร่วมงาน)",
      wishMessage: "ข้อความอวยพรอันอบอุ่น",
    },
    history: {
      title: "ประวัติ QR Code ที่สร้างไว้",
      clearAll: "ล้างประวัติทั้งหมด",
      emptyText: "ยังไม่มีประวัติการสร้าง QR Code",
      emptySubtext: "QR Code ที่คุณสร้างจะถูกบันทึกไว้ที่นี่โดยอัตโนมัติ!",
      restore: "โหลดข้อมูล",
      delete: "ลบ",
    },
    footer: {
      madeWith: "สร้างสรรค์ด้วย 💖 และเวทมนตร์แห่งความน่ารัก",
      byNanoChan: "สร้างด้วย 💖 โดย Nano-chan",
      rights: "ไม่มีโฆษณากวนใจ ภาพคมชัดสูง รองรับฟีเจอร์การ์ดอัจฉริยะ",
    },
  },
  ko: {
    appTitle: "나노짱의 귀여운 QR 매직 ✨",
    appSubtitle: "나노짱의 공식 귀여운 QR 코드 & 웨딩 스마트 카드 생성기에 오신 것을 환영합니다!",
    weddingBadgeSubtitle: "웨딩 매직 • 우아한 웨딩 스마트 카드 & 축하 메시지",
    kawaiiBadgeSubtitle: "나노짱의 마법 같은 귀여운 QR 코드 생성기",
    weddingModeTab: "웨딩 카드 모드 💍",
    kawaiiModeTab: "카와이 모드 ✨",
    steps: {
      step1: "1단계: 텍스트/URL 입력",
      step2: "2단계: 스타일 꾸미기 & 생성",
      step3: "3단계: QR 코드 다운로드",
    },
    types: {
      websiteUrl: "웹사이트 URL",
      websiteUrlDesc: "웹사이트 또는 SNS 바로가기 링크",
      greetingCard: "축하 카드",
      greetingCardDesc: "사랑하는 사람을 위한 귀여운 인터랙티브 메시지",
      photoCard: "포토 카드",
      photoCardDesc: "소중한 사진과 따뜻한 축하 메시지",
      weddingSmartCard: "모바일 청첩장 스마트 카드 💒",
      weddingSmartCardDesc: "지도 길안내, 일정, 갤러리 & 축하 방명록 포함",
      weddingWishes: "신랑신부 축하 메시지 💖",
      weddingWishesDesc: "신랑신부에게 따뜻한 축복의 마음을 전하세요",
    },
    form: {
      enterUrlTitle: "웹사이트 또는 링크 URL",
      enterUrlHint: "웹사이트, 인스타그램, 카카오톡, 페이스북 등 링크 입력",
      pasteBtn: "붙여넣기",
      customPalette: "파스텔 컬러 팔레트",
      presetThemes: "추천 테마 컬러",
      centerSticker: "QR 중앙 귀여운 스티커/아이콘",
      qrFrameOptions: "장식용 QR 프레임",
      includeCuteFrame: "QR 코드 둘레에 장식 프레임 추가",
      frameLabelPlaceholder: "예: SCAN ME ✨ 또는 축하합니다 💍",
      qrSize: "QR 코드 크기",
      errorCorrection: "오류 복원 레벨 (Error Correction)",
      highQualityPrint: "고해상도 지원 (300 DPI 인쇄용)",
      previewCardBtn: "실시간 인터랙티브 카드 미리보기",
      downloadPngBtn: "PNG 다운로드",
      downloadSvgBtn: "SVG 다운로드",
      copyQrBtn: "이미지 복사",
      qrCopied: "클립보드에 복사되었습니다!",
      resetDefaults: "기본값으로 초기화",
      recipientName: "받는 분 이름",
      senderName: "보내는 분 이름",
      cardTitle: "카드 제목",
      greetingMessage: "축하 메시지",
      quickPresets: "추천 축하 문구",
      photoUrlLabel: "사진 이미지 URL",
      photoPresets: "샘플 사진",
      toggleCenterEmoji: "QR 코드 중앙 이모지/스티커 표시",
      uploadPhotoBtn: "사진 업로드 📁",
      photoPreview: "사진 미리보기",
      changePhoto: "변경",
      removePhoto: "삭제",
      groomName: "신랑 이름",
      brideName: "신부 이름",
      weddingDate: "예식 날짜",
      weddingTime: "예식 시간",
      venueName: "예식장 및 홀 이름",
      locationMapsUrl: "구글 지도 링크 (길안내)",
      coverPhotoUrl: "웨딩 메인 대표 사진 URL",
      loveQuote: "사랑의 문구 / 인사말",
      dressCode: "드레스 코드 & 테마",
      giftPromptPay: "마음 전하실 곳 (계좌/페이 정보)",
      coupleName: "신랑 & 신부 이름",
      yourName: "보내는 분 (하객 성함)",
      wishMessage: "마음을 담은 축하 메시지",
    },
    history: {
      title: "생성된 QR 코드 기록",
      clearAll: "기록 전체 삭제",
      emptyText: "아직 생성된 QR 코드가 없습니다",
      emptySubtext: "생성된 QR 코드는 여기에 자동으로 안전하게 저장됩니다!",
      restore: "불러오기",
      delete: "삭제",
    },
    footer: {
      madeWith: "사랑과 💖 마법으로 정성껏 만들었습니다",
      byNanoChan: "Made with 💖 by Nano-chan",
      rights: "광고 없는 고해상도 스마트 인터랙티브 QR 코드",
    },
  },
  ja: {
    appTitle: "ナノちゃんのカワイイ QR マジック ✨",
    appSubtitle: "ナノちゃん公式の可愛いQRコード＆ウェディングスマートカード生成へようこそ！",
    weddingBadgeSubtitle: "ウェディングマジック • 華やかな結婚式スマートカード＆祝福メッセージ",
    kawaiiBadgeSubtitle: "ナノちゃんが贈る魔法の可愛いQRコードジェネレーター",
    weddingModeTab: "ウェディングカードモード 💍",
    kawaiiModeTab: "カワイイモード ✨",
    steps: {
      step1: "ステップ1: テキスト/URL入力",
      step2: "ステップ2: カスタマイズ＆生成",
      step3: "ステップ3: QRコード保存",
    },
    types: {
      websiteUrl: "WebサイトURL",
      websiteUrlDesc: "WebサイトやSNSへのダイレクトリンク",
      greetingCard: "メッセージカード",
      greetingCardDesc: "大切な人へ届ける可愛いインタラクティブカード",
      photoCard: "フォトメッセージカード",
      photoCardDesc: "写真と思い出のメッセージを添えて",
      weddingSmartCard: "ウェディング招待スマートカード 💒",
      weddingSmartCardDesc: "Googleマップ案内、タイムライン、写真館、メッセージ機能付き",
      weddingWishes: "新郎新婦へのお祝いメッセージ 💖",
      weddingWishesDesc: "お二人へ心温まる祝福の言葉を届けます",
    },
    form: {
      enterUrlTitle: "WebサイトまたはリンクURL",
      enterUrlHint: "Webサイト、Instagram、LINE、Xなどのリンクを入力",
      pasteBtn: "貼り付け",
      customPalette: "パステルカラーパレット",
      presetThemes: "プリセットテーマカラー",
      centerSticker: "中央の可愛いステッカー・アイコン",
      qrFrameOptions: "デコレーションQRフレーム",
      includeCuteFrame: "QRコードの周囲にフレームを追加",
      frameLabelPlaceholder: "例: SCAN ME ✨ または SAVE THE DATE 💍",
      qrSize: "QRコードサイズ",
      errorCorrection: "誤り訂正レベル (Error Correction)",
      highQualityPrint: "高解像度 (300 DPI 印刷用対応)",
      previewCardBtn: "リアルタイムカードプレビュー",
      downloadPngBtn: "PNGダウンロード",
      downloadSvgBtn: "SVGダウンロード",
      copyQrBtn: "画像をコピー",
      qrCopied: "クリップボードにコピーしました！",
      resetDefaults: "初期設定に戻す",
      recipientName: "お届け先のお名前",
      senderName: "差出人のお名前",
      cardTitle: "カードのタイトル",
      greetingMessage: "メッセージ本文",
      quickPresets: "定型文から選ぶ",
      photoUrlLabel: "写真画像URL",
      photoPresets: "サンプル写真",
      toggleCenterEmoji: "QRコード中央の絵文字/ステッカー表示",
      uploadPhotoBtn: "写真をアップロード 📁",
      photoPreview: "写真プレビュー",
      changePhoto: "変更",
      removePhoto: "削除",
      groomName: "新郎のお名前",
      brideName: "新婦のお名前",
      weddingDate: "挙式・披露宴の日程",
      weddingTime: "開宴時間",
      venueName: "会場名・披露宴会場",
      locationMapsUrl: "Googleマップ案内リンク",
      coverPhotoUrl: "お二人のメイン写真URL",
      loveQuote: "心に響くメッセージ・愛の言葉",
      dressCode: "ドレスコード・テーマカラー",
      giftPromptPay: "お祝い・ギフト・口座情報",
      coupleName: "新郎＆新婦のお名前",
      yourName: "お名前（ゲスト様）",
      wishMessage: "心温まるお祝いメッセージ",
    },
    history: {
      title: "作成したQRコード履歴",
      clearAll: "履歴をすべて削除",
      emptyText: "作成したQRコードはまだありません",
      emptySubtext: "作成したQRコードはここに自動保存されます！",
      restore: "読み込む",
      delete: "削除",
    },
    footer: {
      madeWith: "💖 と魔法を込めてお届けします",
      byNanoChan: "Made with 💖 by Nano-chan",
      rights: "広告なし・高画質・インタラクティブスマートQRコード",
    },
  },
};
