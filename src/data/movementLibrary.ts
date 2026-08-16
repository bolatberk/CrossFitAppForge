export type MovementCategory =
  | 'Snatch'
  | 'Clean'
  | 'Jerk'
  | 'Other';

export interface Movement {
  id: string;
  name: string;
  category: MovementCategory;
  source: string;
  videoUrl: string;
  description?: string;
  aliases?: string[];
}

export const movementLibrary: Movement[] = [
  // SNATCH
  { id: 'snatch', name: 'Snatch', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=Qw5l4o7Xh5Y', description: 'Barı yerden tek harekette overhead squat catch pozisyonuna taşıyan temel Olympic lift.', aliases: ['Squat Snatch', 'Full Snatch'] },
  { id: 'power-snatch', name: 'Power Snatch', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=Jlfm2PNiKFI', description: 'Snatch’in barı paralelin üzerinde yakalayarak tamamlanan power varyasyonu.' },
  { id: 'hang-snatch', name: 'Hang Snatch', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=M2biAlLGiwc', description: 'Snatch’in hang pozisyonundan başlatılan varyasyonu.' },
  { id: 'high-hang-snatch', name: 'High Hang Snatch', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=upCAWuhmXFc', description: 'High hang pozisyonundan direkt pull-under ve squat catch geliştiren Snatch varyasyonu.' },
  { id: 'low-hang-snatch', name: 'Low Hang Snatch', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=QM2GBCEMhio', description: 'Düşük hang pozisyonundan yapılan Snatch varyasyonu.' },
  { id: 'hang-power-snatch', name: 'Hang Power Snatch', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=2gxaBKlL1UY', description: 'Hang pozisyonundan başlayan ve power catch ile tamamlanan Snatch varyasyonu.' },
  { id: 'high-hang-power-snatch', name: 'High Hang Power Snatch', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=1_kiYwlJKnA', description: 'High hang pozisyonundan hızlı extension ve power catch geliştiren Snatch varyasyonu.' },
  { id: 'low-hang-power-snatch', name: 'Low Hang Power Snatch', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=FjQHOlxFEN4', description: 'Low hang pozisyonundan yapılan ve power catch ile tamamlanan Snatch varyasyonu.' },
  { id: 'muscle-snatch', name: 'Muscle Snatch', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=OjQaFU27yWA', description: 'Turnover mekaniği ve overhead çekiş kontrolünü geliştiren Snatch drill’i.' },
  { id: 'hang-muscle-snatch', name: 'Hang Muscle Snatch', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=J8u-hgAsuH0', description: 'Muscle Snatch’in hang pozisyonundan yapılan varyasyonu.' },
  { id: 'high-hang-muscle-snatch', name: 'High Hang Muscle Snatch', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=kV8ddJ9T1HE', description: 'High hang pozisyonundan turnover ve üst gövde kontrolü geliştiren varyasyon.' },
  { id: 'low-hang-muscle-snatch', name: 'Low Hang Muscle Snatch', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=ArQe9u4lXok', description: 'Low hang pozisyonundan yapılan Muscle Snatch varyasyonu.' },
  { id: 'snatch-pull', name: 'Snatch Pull', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=HkHI0-1xdlU', description: 'Snatch çekiş pozisyonlarını ve güçlü extension’ı geliştiren pull varyasyonu.' },
  { id: 'snatch-high-pull', name: 'Snatch High Pull', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=9vCZZOSOPYI', description: 'Snatch extension sonrasında yüksek çekiş mekaniğini geliştiren drill.' },
  { id: 'hang-snatch-high-pull', name: 'Hang Snatch High Pull', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=FNxS4mmeTXs', description: 'Hang pozisyonundan yapılan Snatch High Pull varyasyonu.' },
  { id: 'tall-snatch', name: 'Tall Snatch', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=7Lrl2O7ZUGo', description: 'Agresif pull-under ve hızlı squat catch geliştiren teknik drill.' },
  { id: 'split-snatch', name: 'Split Snatch', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=ETZkvQWNoBI', description: 'Barın split stance pozisyonunda yakalandığı Snatch varyasyonu.' },
  { id: 'snatch-balance', name: 'Snatch Balance', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=dbcPGSo1Qh8', description: 'Overhead güveni, ayak hızı ve bar altına agresif giriş geliştiren receiving drill.' },
  { id: 'snatch-push-press', name: 'Snatch Push Press', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=mC_yya4UTr0', description: 'Snatch grip ile yapılan push press; overhead pozisyon ve kilitleme kuvvetini geliştirir.' },
  { id: 'overhead-squat', name: 'Overhead Squat', category: 'Snatch', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=MXhJsxRI1q8', description: 'Overhead stabilite, mobilite ve squat kontrolünü geliştirir.', aliases: ['OHS'] },

  // CLEAN
  { id: 'squat-clean', name: 'Squat Clean', category: 'Clean', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=vpSawewP5KU', description: 'Clean’in direkt front squat catch pozisyonunda yakalandığı tam varyasyonu.', aliases: ['Clean', 'Full Clean'] },
  { id: 'hang-clean', name: 'Hang Clean', category: 'Clean', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=50bMAiuTm5s', description: 'Clean’in hang pozisyonundan başlatılan varyasyonu.' },
  { id: 'hang-power-clean', name: 'Hang Power Clean', category: 'Clean', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=CQgRkrtJaro', description: 'Hang pozisyonundan başlayan ve barın paralelin üzerinde yakalandığı Clean varyasyonu.' },
  { id: 'high-hang-clean', name: 'High Hang Clean', category: 'Clean', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=pQZLTS5ZkgQ', description: 'High hang pozisyonundan hızlı pull-under ve direkt squat catch geliştiren Clean varyasyonu.' },
  { id: 'low-hang-clean', name: 'Low Hang Clean', category: 'Clean', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=YIIUo6scHOY', description: 'Düşük hang pozisyonundan yapılan Clean varyasyonu.' },
  { id: 'muscle-clean', name: 'Muscle Clean', category: 'Clean', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=miRBi2otogE', description: 'Clean turnover ve hızlı dirsek geçişini geliştiren teknik varyasyon.' },
  { id: 'muscle-squat-clean', name: 'Muscle Squat Clean', category: 'Clean', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=CVcXvgWP5PU', description: 'Muscle Clean turnover’ını squat receiving ile birleştiren varyasyon.' },
  { id: 'muscle-power-clean', name: 'Muscle Power Clean', category: 'Clean', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=JYnBG2gE4WQ', description: 'Muscle Clean mekaniğini power receiving ile birleştiren varyasyon.' },
  { id: 'clean-pull', name: 'Clean Pull', category: 'Clean', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=o7FtHoEkFOo', description: 'Clean çekiş pozisyonları ve extension kuvvetini geliştiren pull varyasyonu.' },
  { id: 'clean-high-pull', name: 'Clean High Pull', category: 'Clean', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=voxR5GhIAAk', description: 'Clean extension sonrasında yüksek çekiş ve bar yakınlığını geliştiren drill.' },
  { id: 'hang-clean-pull', name: 'Hang Clean Pull', category: 'Clean', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=30ZEzgTXADo', description: 'Hang pozisyonundan yapılan Clean Pull varyasyonu.' },
  { id: 'hang-clean-high-pull', name: 'Hang Clean High Pull', category: 'Clean', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=tOevsgQ5Htk', description: 'Hang pozisyonundan yapılan Clean High Pull varyasyonu.' },
  { id: 'hang-clean-and-press', name: 'Hang Clean And Press', category: 'Clean', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=C2Aj8EVfhQA', description: 'Hang Clean ile overhead press hareketini birleştiren kompleks.' },

  // JERK
  { id: 'split-jerk', name: 'Split Jerk', category: 'Jerk', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=C4I6hj67a0w', description: 'Dip-drive sonrası barı split stance içinde overhead kilitleyerek tamamlanan temel jerk varyasyonu.' },
  { id: 'power-jerk', name: 'Power Jerk', category: 'Jerk', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=feRyLR3QYgM', description: 'Barın bilateral power receiving pozisyonunda yakalandığı jerk varyasyonu.' },
  { id: 'push-jerk', name: 'Push Jerk', category: 'Jerk', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=Ryo-_ksDvzc', description: 'Dip-drive ve yeniden dip ile barı overhead kilitleyen jerk varyasyonu.' },
  { id: 'squat-press', name: 'Squat Press', category: 'Jerk', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=4IQ4o4iew4M', description: 'Squat ve press mekaniğini birleştiren overhead kontrol ve koordinasyon hareketi.' },

  // OTHER / COMPOUND
  { id: 'clean-and-jerk', name: 'Clean And Jerk', category: 'Other', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=bCQ1wJuusaM', description: 'Clean ve jerk bölümlerini tek Olympic lift içinde birleştiren competition hareketi.', aliases: ['Clean & Jerk', 'C&J'] },
  { id: 'clean-and-press', name: 'Clean And Press', category: 'Other', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=fEqQBfnssRo', description: 'Clean ile overhead press hareketini birleştiren barbell kompleksi.' },
  { id: 'thruster', name: 'Thruster', category: 'Other', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=Ar2U7uNRGFw', description: 'Front squat çıkışını kesintisiz overhead press ile birleştiren full-body barbell hareketi.' },
  { id: 'cluster', name: 'Cluster', category: 'Other', source: 'Torokhtiy Olympic Weightlifting Library', videoUrl: 'https://www.youtube.com/watch?v=kEYKtaroXl8', description: 'Clean ve thruster paternini tek tekrarda birleştiren kompleks barbell hareketi.' },
];
