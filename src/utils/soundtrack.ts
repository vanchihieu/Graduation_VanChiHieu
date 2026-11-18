import { INVITATION_CONFIG } from '../config/invitationConfig';

export interface MusicTrack {
  id: string;
  title: string;
  subtitle: string;
}

type VoiceType = 'piano' | 'noble_lead' | 'chime';

interface NoteEvent {
  midi: number;
  beat: number;
  duration: number;
  velocity?: number;
  voice?: VoiceType;
}

interface SynthScore {
  id: string;
  title: string;
  subtitle: string;
  bpm: number;
  totalBeats: number;
  notes: NoteEvent[];
  pads: Array<{ midis: number[]; beat: number; duration: number }>;
}

/**
 * TRACK 1 (MẶC ĐỊNH): SỐNG NHƯ NHỮNG ĐÓA HOA (TẠ QUANG THẮNG)
 * Phối âm Đại Dương Cầm + Dàn Dây Giao Hưởng dịu dàng, ấm áp & đầy nghị lực
 */
function buildSongNhuNhungDoaHoa(): SynthScore {
  const notes: NoteEvent[] = [];
  const pads: Array<{ midis: number[]; beat: number; duration: number }> = [];

  // Vòng hợp âm chuẩn giọng Đô Trưởng (C Major): 16 ô nhịp x 4 phách = 64 phách
  const barChords: Array<{ bass: number; arp: number[]; pad: number[] }> = [
    // Verse (Bars 1-8): C -> G/B -> Am7 -> Em7 -> F -> C/E -> Dm7 -> G
    { bass: 36, arp: [48, 55, 60, 64], pad: [48, 55, 64] },
    { bass: 35, arp: [47, 55, 59, 62], pad: [47, 55, 62] },
    { bass: 45, arp: [48, 52, 55, 60], pad: [45, 52, 60] },
    { bass: 40, arp: [47, 52, 55, 59], pad: [40, 52, 59] },
    { bass: 41, arp: [48, 53, 57, 60], pad: [41, 53, 60] },
    { bass: 40, arp: [48, 55, 60, 64], pad: [48, 55, 64] },
    { bass: 38, arp: [45, 50, 53, 60], pad: [38, 53, 60] },
    { bass: 43, arp: [47, 50, 55, 59], pad: [43, 55, 59] },
    // Chorus (Bars 9-16): Fmaj7 -> G6 -> Em7 -> Am7 -> Dm7 -> G7 -> C -> G
    { bass: 41, arp: [48, 53, 57, 64], pad: [41, 53, 60] },
    { bass: 43, arp: [47, 50, 55, 59], pad: [43, 55, 59] },
    { bass: 40, arp: [47, 52, 55, 59], pad: [40, 52, 59] },
    { bass: 45, arp: [48, 52, 55, 60], pad: [45, 52, 60] },
    { bass: 38, arp: [45, 50, 53, 60], pad: [38, 53, 60] },
    { bass: 43, arp: [47, 50, 55, 59], pad: [43, 55, 59] },
    { bass: 36, arp: [48, 55, 60, 64], pad: [48, 55, 64] },
    { bass: 43, arp: [47, 50, 55, 59], pad: [43, 55, 59] },
  ];

  barChords.forEach((bar, barIdx) => {
    const b = barIdx * 4;
    pads.push({ midis: bar.pad, beat: b, duration: 4 });
    notes.push({ midi: bar.bass, beat: b, duration: 2.5, velocity: 0.62, voice: 'piano' });

    // Rải hợp âm Piano 8 móc đơn mỗi ô nhịp nhẹ nhàng
    for (let step = 0; step < 8; step++) {
      const m = bar.arp[step % bar.arp.length];
      notes.push({
        midi: m,
        beat: b + step * 0.5,
        duration: 1.2,
        velocity: step % 2 === 0 ? 0.44 : 0.32,
        voice: 'piano',
      });
    }
  });

  // Giai điệu chính "Sống Như Những Đóa Hoa"
  const melodyLine: Array<{ midi: number; beat: number; duration: number; accent?: boolean }> = [
    // Verse (Bars 1-8): "Cuộc đời tôi là những nốt thăng trầm..."
    { midi: 72, beat: 0.5, duration: 0.5 },
    { midi: 74, beat: 1.0, duration: 0.5 },
    { midi: 76, beat: 1.5, duration: 1.0, accent: true },
    { midi: 74, beat: 2.5, duration: 0.5 },
    { midi: 72, beat: 3.0, duration: 1.0 },
    { midi: 71, beat: 4.5, duration: 0.5 },
    { midi: 72, beat: 5.0, duration: 0.5 },
    { midi: 74, beat: 5.5, duration: 1.5, accent: true },
    { midi: 72, beat: 7.0, duration: 1.0 },

    { midi: 69, beat: 8.5, duration: 0.5 },
    { midi: 72, beat: 9.0, duration: 0.5 },
    { midi: 76, beat: 9.5, duration: 1.0, accent: true },
    { midi: 74, beat: 10.5, duration: 0.5 },
    { midi: 72, beat: 11.0, duration: 1.0 },
    { midi: 71, beat: 12.5, duration: 0.5 },
    { midi: 69, beat: 13.0, duration: 0.5 },
    { midi: 67, beat: 13.5, duration: 2.0, accent: true },

    { midi: 69, beat: 16.5, duration: 0.5 },
    { midi: 72, beat: 17.0, duration: 0.5 },
    { midi: 74, beat: 17.5, duration: 1.0, accent: true },
    { midi: 72, beat: 18.5, duration: 0.5 },
    { midi: 69, beat: 19.0, duration: 1.0 },
    { midi: 67, beat: 20.5, duration: 0.5 },
    { midi: 72, beat: 21.0, duration: 0.5 },
    { midi: 76, beat: 21.5, duration: 1.5, accent: true },
    { midi: 74, beat: 23.0, duration: 1.0 },

    { midi: 72, beat: 24.5, duration: 0.5 },
    { midi: 74, beat: 25.0, duration: 0.5 },
    { midi: 77, beat: 25.5, duration: 1.0, accent: true },
    { midi: 76, beat: 26.5, duration: 0.5 },
    { midi: 74, beat: 27.0, duration: 1.0 },
    { midi: 74, beat: 28.5, duration: 1.5, accent: true },
    { midi: 79, beat: 30.5, duration: 1.5 },

    // Chorus (Bars 9-16): "Và tôi sống như đóa hoa này, tỏa ngát hương thơm cho đời..."
    { midi: 76, beat: 32.0, duration: 0.5 },
    { midi: 79, beat: 32.5, duration: 0.5 },
    { midi: 81, beat: 33.0, duration: 1.0, accent: true },
    { midi: 79, beat: 34.0, duration: 0.5 },
    { midi: 76, beat: 34.5, duration: 0.5 },
    { midi: 74, beat: 35.0, duration: 0.5 },
    { midi: 72, beat: 35.5, duration: 0.5 },

    { midi: 74, beat: 36.0, duration: 0.5 },
    { midi: 76, beat: 36.5, duration: 0.5 },
    { midi: 79, beat: 37.0, duration: 1.0, accent: true },
    { midi: 76, beat: 38.0, duration: 0.5 },
    { midi: 74, beat: 38.5, duration: 0.5 },
    { midi: 72, beat: 39.0, duration: 1.0 },

    // "Sống với nỗi khát khao rằng, được hiến dâng cho cuộc đời..."
    { midi: 76, beat: 40.0, duration: 0.5 },
    { midi: 79, beat: 40.5, duration: 0.5 },
    { midi: 81, beat: 41.0, duration: 0.5 },
    { midi: 84, beat: 41.5, duration: 1.0, accent: true },
    { midi: 83, beat: 42.5, duration: 0.5 },
    { midi: 81, beat: 43.0, duration: 0.5 },
    { midi: 79, beat: 43.5, duration: 0.5 },

    { midi: 76, beat: 44.0, duration: 0.5 },
    { midi: 79, beat: 44.5, duration: 0.5 },
    { midi: 81, beat: 45.0, duration: 1.0, accent: true },
    { midi: 79, beat: 46.0, duration: 0.5 },
    { midi: 76, beat: 46.5, duration: 0.5 },
    { midi: 74, beat: 47.0, duration: 1.0 },

    // "Hôm nay dẫu có gian nan, thì ngày mai là ngày tươi sáng hơn..."
    { midi: 77, beat: 48.0, duration: 0.5 },
    { midi: 76, beat: 48.5, duration: 0.5 },
    { midi: 74, beat: 49.0, duration: 0.5 },
    { midi: 72, beat: 49.5, duration: 0.5 },
    { midi: 74, beat: 50.0, duration: 0.5 },
    { midi: 76, beat: 50.5, duration: 1.5, accent: true },

    { midi: 74, beat: 52.0, duration: 0.5 },
    { midi: 72, beat: 52.5, duration: 0.5 },
    { midi: 74, beat: 53.0, duration: 0.5 },
    { midi: 76, beat: 53.5, duration: 0.5 },
    { midi: 79, beat: 54.0, duration: 1.0, accent: true },
    { midi: 76, beat: 55.0, duration: 0.5 },
    { midi: 74, beat: 55.5, duration: 0.5 },

    // "Tôi sẽ viết nên câu chuyện của cuộc đời riêng tôi..."
    { midi: 72, beat: 56.0, duration: 0.5 },
    { midi: 74, beat: 56.5, duration: 0.5 },
    { midi: 76, beat: 57.0, duration: 0.5 },
    { midi: 79, beat: 57.5, duration: 0.5 },
    { midi: 81, beat: 58.0, duration: 1.0, accent: true },
    { midi: 79, beat: 59.0, duration: 0.5 },
    { midi: 76, beat: 59.5, duration: 0.5 },
    { midi: 74, beat: 60.0, duration: 1.0 },
    { midi: 72, beat: 61.0, duration: 2.8, accent: true },
  ];

  melodyLine.forEach((m) => {
    notes.push({
      midi: m.midi,
      beat: m.beat,
      duration: m.duration,
      velocity: m.accent ? 0.9 : 0.78,
      voice: 'piano',
    });
    if (m.beat >= 32) {
      notes.push({
        midi: m.midi,
        beat: m.beat,
        duration: m.duration,
        velocity: m.accent ? 0.65 : 0.52,
        voice: 'noble_lead',
      });
    }
  });

  return {
    id: 'song-nhu-nhung-doa-hoa',
    title: 'Sống Như Những Đóa Hoa',
    subtitle: 'Tạ Quang Thắng — Phiên bản Piano & Giao hưởng',
    bpm: 74,
    totalBeats: 64,
    notes,
    pads,
  };
}

/**
 * TRACK 2: POMP AND CIRCUMSTANCE — ELGAR ("LAND OF HOPE AND GLORY")
 */
function buildPompAndCircumstance(): SynthScore {
  const notes: NoteEvent[] = [];
  const pads: Array<{ midis: number[]; beat: number; duration: number }> = [];

  // 16 ô nhịp x 4 phách = 64 phách (Key of C Major — âm vực ấm, hào hùng của French Horn & Strings)
  const barChords: Array<{ bass: number; arp: number[]; pad: number[] }> = [
    // Bars 1-4: C -> F/C -> C/G -> G7
    { bass: 36, arp: [48, 55, 60, 64], pad: [48, 55, 64] },
    { bass: 41, arp: [48, 53, 57, 60], pad: [45, 53, 60] },
    { bass: 43, arp: [48, 52, 55, 60], pad: [48, 55, 64] },
    { bass: 43, arp: [47, 50, 55, 59], pad: [43, 50, 59] },
    // Bars 5-8: C -> F -> C/G - G7 -> C
    { bass: 36, arp: [48, 55, 60, 64], pad: [48, 55, 64] },
    { bass: 41, arp: [45, 53, 57, 60], pad: [45, 53, 60] },
    { bass: 43, arp: [48, 52, 55, 59], pad: [43, 50, 59] },
    { bass: 36, arp: [48, 52, 55, 60], pad: [48, 55, 60] },
    // Bars 9-12: Am -> F -> Dm7 -> G
    { bass: 45, arp: [45, 52, 57, 60], pad: [45, 52, 60] },
    { bass: 41, arp: [41, 48, 53, 57], pad: [41, 48, 57] },
    { bass: 38, arp: [45, 50, 53, 57], pad: [38, 50, 57] },
    { bass: 43, arp: [43, 50, 55, 59], pad: [43, 50, 59] },
    // Bars 13-16: C (Grandioso!) -> F -> C/G - G7 -> C
    { bass: 36, arp: [48, 55, 60, 64], pad: [48, 55, 64] },
    { bass: 41, arp: [45, 53, 57, 60], pad: [45, 53, 60] },
    { bass: 43, arp: [47, 50, 55, 62], pad: [43, 50, 59] },
    { bass: 36, arp: [48, 55, 60, 64], pad: [48, 55, 64] },
  ];

  barChords.forEach((bar, barIdx) => {
    const b = barIdx * 4;
    pads.push({ midis: bar.pad, beat: b, duration: 4 });

    // Trầm trang nghiêm ở phách 1 & phách 3
    notes.push({ midi: bar.bass, beat: b, duration: 2.2, velocity: 0.68, voice: 'piano' });
    notes.push({ midi: bar.bass + 12, beat: b, duration: 2.2, velocity: 0.55, voice: 'piano' });
    notes.push({ midi: bar.bass, beat: b + 2, duration: 2.0, velocity: 0.52, voice: 'piano' });

    // Hợp âm rải trang trọng đi kèm mỗi phách
    bar.arp.forEach((m, i) => {
      notes.push({
        midi: m,
        beat: b + i * 1.0,
        duration: 1.4,
        velocity: i === 0 ? 0.55 : 0.42,
        voice: 'piano',
      });
    });
  });

  // Giai điệu chính Pomp & Circumstance (Noble Horn + Strings + Piano Octave Sparkle)
  const melodyLine: Array<{ midi: number; beat: number; duration: number; accent?: boolean }> = [
    // Phrase 1 (Bars 1-4): "Land of Hope and Glo-ry, Mo-ther of the Free"
    { midi: 64, beat: 0.0, duration: 1.5, accent: true }, // E4/E5
    { midi: 62, beat: 1.5, duration: 0.5 },
    { midi: 64, beat: 2.0, duration: 1.0 },
    { midi: 65, beat: 3.0, duration: 1.0 },
    { midi: 60, beat: 4.0, duration: 2.0, accent: true },
    { midi: 57, beat: 6.0, duration: 2.0 },
    { midi: 55, beat: 8.0, duration: 1.5 },
    { midi: 54, beat: 9.5, duration: 0.5 },
    { midi: 55, beat: 10.0, duration: 1.0 },
    { midi: 52, beat: 11.0, duration: 1.0 },
    { midi: 50, beat: 12.0, duration: 3.8, accent: true },

    // Phrase 2 (Bars 5-8): "How shall we ex-tol thee, who are born of thee"
    { midi: 64, beat: 16.0, duration: 1.5, accent: true },
    { midi: 62, beat: 17.5, duration: 0.5 },
    { midi: 64, beat: 18.0, duration: 1.0 },
    { midi: 65, beat: 19.0, duration: 1.0 },
    { midi: 60, beat: 20.0, duration: 2.0, accent: true },
    { midi: 57, beat: 22.0, duration: 2.0 },
    { midi: 55, beat: 24.0, duration: 1.5 },
    { midi: 52, beat: 25.5, duration: 0.5 },
    { midi: 50, beat: 26.0, duration: 1.0 },
    { midi: 52, beat: 27.0, duration: 1.0 },
    { midi: 48, beat: 28.0, duration: 3.8, accent: true },

    // Phrase 3 (Bars 9-12): "Wi-der still and wi-der, shall thy bounds be set"
    { midi: 57, beat: 32.0, duration: 1.5, accent: true },
    { midi: 55, beat: 33.5, duration: 0.5 },
    { midi: 57, beat: 34.0, duration: 1.0 },
    { midi: 59, beat: 35.0, duration: 1.0 },
    { midi: 60, beat: 36.0, duration: 2.0, accent: true },
    { midi: 55, beat: 38.0, duration: 2.0 },
    { midi: 57, beat: 40.0, duration: 1.5 },
    { midi: 55, beat: 41.5, duration: 0.5 },
    { midi: 57, beat: 42.0, duration: 1.0 },
    { midi: 60, beat: 43.0, duration: 1.0 },
    { midi: 59, beat: 44.0, duration: 2.0, accent: true },
    { midi: 62, beat: 46.0, duration: 2.0 },

    // Phrase 4 (Bars 13-16 — Grandioso Climax!): "God, who made thee migh-ty, make thee migh-tier yet!"
    { midi: 64, beat: 48.0, duration: 1.5, accent: true },
    { midi: 62, beat: 49.5, duration: 0.5 },
    { midi: 64, beat: 50.0, duration: 1.0 },
    { midi: 65, beat: 51.0, duration: 1.0 },
    { midi: 60, beat: 52.0, duration: 2.0, accent: true },
    { midi: 57, beat: 54.0, duration: 2.0 },
    { midi: 55, beat: 56.0, duration: 2.0 },
    { midi: 62, beat: 58.0, duration: 1.0 },
    { midi: 59, beat: 59.0, duration: 1.0 },
    { midi: 60, beat: 60.0, duration: 3.8, accent: true },
  ];

  melodyLine.forEach((m) => {
    // Dàn kèn đồng ấm & dây giao hưởng ở quãng trung-cao (+12 = quãng 5 hát vang)
    notes.push({
      midi: m.midi + 12,
      beat: m.beat,
      duration: m.duration,
      velocity: m.accent ? 0.92 : 0.8,
      voice: 'noble_lead',
    });
    // Tiếng đại dương cầm đi cùng giai điệu tạo độ sang trọng
    notes.push({
      midi: m.midi + 12,
      beat: m.beat,
      duration: m.duration * 0.95,
      velocity: m.accent ? 0.82 : 0.7,
      voice: 'piano',
    });
    // Chuông nghi lễ ngân vang ở các phách vinh danh trọng điểm
    if (m.accent && (m.beat === 0 || m.beat === 16 || m.beat === 32 || m.beat === 48 || m.beat === 60)) {
      notes.push({
        midi: m.midi + 24,
        beat: m.beat,
        duration: 3.0,
        velocity: 0.55,
        voice: 'chime',
      });
    }
  });

  return {
    id: 'pomp-and-circumstance',
    title: 'Pomp & Circumstance — Nghi Thức Vinh Danh',
    subtitle: 'Nhạc lễ trao bằng tốt nghiệp đại học kinh điển',
    bpm: 74,
    totalBeats: 64,
    notes,
    pads,
  };
}

/**
 * TRACK 2: ODE TO JOY — KHÚC KHẢI HOÀN TÂN KỸ SƯ (BEETHOVEN SYMPHONY NO. 9)
 */
function buildOdeToJoySymphony(): SynthScore {
  const chords = [
    [43, 50, 55, 59], // G
    [38, 45, 50, 54], // D
    [40, 47, 52, 55], // Em
    [38, 45, 50, 54], // D
    [43, 50, 55, 59], // G
    [48, 52, 55, 60], // C
    [43, 50, 55, 59], // G
    [38, 45, 50, 55], // D -> G
  ];

  const notes: NoteEvent[] = [];
  const pads: Array<{ midis: number[]; beat: number; duration: number }> = [];

  chords.forEach((arp, cIdx) => {
    const base = cIdx * 4;
    pads.push({ midis: [arp[0], arp[2], arp[3]], beat: base, duration: 4 });
    notes.push({ midi: arp[0] - 12, beat: base, duration: 2.5, velocity: 0.62, voice: 'piano' });
    for (let repeat = 0; repeat < 2; repeat++) {
      arp.forEach((m, i) => {
        notes.push({
          midi: m,
          beat: base + repeat * 2 + i * 0.5,
          duration: 1.4,
          velocity: i === 0 ? 0.54 : 0.38,
          voice: 'piano',
        });
      });
    }
  });

  const melodyRaw = [
    { midi: 71, beat: 0, duration: 1, chime: true },
    { midi: 71, beat: 1, duration: 1 },
    { midi: 72, beat: 2, duration: 1 },
    { midi: 74, beat: 3, duration: 1 },
    { midi: 74, beat: 4, duration: 1 },
    { midi: 72, beat: 5, duration: 1 },
    { midi: 71, beat: 6, duration: 1 },
    { midi: 69, beat: 7, duration: 1 },
    { midi: 67, beat: 8, duration: 1, chime: true },
    { midi: 67, beat: 9, duration: 1 },
    { midi: 69, beat: 10, duration: 1 },
    { midi: 71, beat: 11, duration: 1 },
    { midi: 71, beat: 12, duration: 1.5 },
    { midi: 69, beat: 13.5, duration: 0.5 },
    { midi: 69, beat: 14, duration: 2 },

    { midi: 71, beat: 16, duration: 1, chime: true },
    { midi: 71, beat: 17, duration: 1 },
    { midi: 72, beat: 18, duration: 1 },
    { midi: 74, beat: 19, duration: 1 },
    { midi: 74, beat: 20, duration: 1 },
    { midi: 72, beat: 21, duration: 1 },
    { midi: 71, beat: 22, duration: 1 },
    { midi: 69, beat: 23, duration: 1 },
    { midi: 67, beat: 24, duration: 1 },
    { midi: 67, beat: 25, duration: 1 },
    { midi: 69, beat: 26, duration: 1 },
    { midi: 71, beat: 27, duration: 1 },
    { midi: 69, beat: 28, duration: 1.5 },
    { midi: 67, beat: 29.5, duration: 0.5 },
    { midi: 67, beat: 30, duration: 2, chime: true },
  ];

  melodyRaw.forEach((m) => {
    notes.push({ midi: m.midi, beat: m.beat, duration: m.duration, velocity: 0.85, voice: 'noble_lead' });
    notes.push({ midi: m.midi, beat: m.beat, duration: m.duration, velocity: 0.78, voice: 'piano' });
    if (m.chime) {
      notes.push({ midi: m.midi + 12, beat: m.beat, duration: 2.5, velocity: 0.5, voice: 'chime' });
    }
  });

  return {
    id: 'ode-to-joy',
    title: 'Khúc Khải Hoàn — Ode to Joy Symphony',
    subtitle: 'Hân hoan & tự hào mừng Tân Kỹ sư',
    bpm: 98,
    totalBeats: 32,
    notes,
    pads,
  };
}

/**
 * TRACK 3: CANON IN D — KHÚC TRI ÂN NGÀY RA TRƯỜNG (PACHELBEL)
 */
function buildCanonInDCeremonial(): SynthScore {
  const chords = [
    [50, 57, 62, 66],
    [45, 52, 57, 61],
    [47, 54, 59, 62],
    [42, 49, 54, 57],
    [43, 50, 55, 59],
    [38, 45, 50, 54],
    [43, 50, 55, 59],
    [45, 52, 57, 61],
  ];

  const notes: NoteEvent[] = [];
  const pads: Array<{ midis: number[]; beat: number; duration: number }> = [];

  for (let cycle = 0; cycle < 2; cycle++) {
    const offset = cycle * 16;
    chords.forEach((arp, cIdx) => {
      const baseBeat = offset + cIdx * 2;
      pads.push({ midis: [arp[0], arp[2], arp[3]], beat: baseBeat, duration: 2 });
      arp.forEach((m, i) => {
        notes.push({
          midi: m,
          beat: baseBeat + i * 0.5,
          duration: 1.6,
          velocity: i === 0 ? 0.52 : 0.36,
          voice: 'piano',
        });
      });
    });
  }

  const cycle1Notes = [74, 78, 81, 79, 78, 74, 78, 76, 74, 71, 74, 81, 79, 83, 81, 79];
  cycle1Notes.forEach((m, idx) => {
    notes.push({ midi: m, beat: idx * 1.0, duration: 1.0, velocity: 0.78, voice: 'noble_lead' });
    notes.push({ midi: m, beat: idx * 1.0, duration: 1.0, velocity: 0.72, voice: 'piano' });
  });

  const cycle2Melody: Array<{ midi: number; beat: number; duration: number }> = [
    { midi: 78, beat: 16.0, duration: 1.0 },
    { midi: 74, beat: 17.0, duration: 0.5 },
    { midi: 76, beat: 17.5, duration: 0.5 },
    { midi: 76, beat: 18.0, duration: 1.0 },
    { midi: 73, beat: 19.0, duration: 0.5 },
    { midi: 81, beat: 19.5, duration: 0.5 },
    { midi: 78, beat: 20.0, duration: 0.5 },
    { midi: 74, beat: 20.5, duration: 0.5 },
    { midi: 71, beat: 21.0, duration: 0.5 },
    { midi: 74, beat: 21.5, duration: 0.5 },
    { midi: 73, beat: 22.0, duration: 1.0 },
    { midi: 69, beat: 23.0, duration: 0.5 },
    { midi: 73, beat: 23.5, duration: 0.5 },
    { midi: 71, beat: 24.0, duration: 0.5 },
    { midi: 74, beat: 24.5, duration: 0.5 },
    { midi: 79, beat: 25.0, duration: 0.5 },
    { midi: 78, beat: 25.5, duration: 0.5 },
    { midi: 78, beat: 26.0, duration: 0.5 },
    { midi: 74, beat: 26.5, duration: 0.5 },
    { midi: 69, beat: 27.0, duration: 0.5 },
    { midi: 74, beat: 27.5, duration: 0.5 },
    { midi: 71, beat: 28.0, duration: 0.5 },
    { midi: 79, beat: 28.5, duration: 0.5 },
    { midi: 78, beat: 29.0, duration: 0.5 },
    { midi: 79, beat: 29.5, duration: 0.5 },
    { midi: 76, beat: 30.0, duration: 1.0 },
    { midi: 81, beat: 31.0, duration: 0.5 },
    { midi: 79, beat: 31.5, duration: 0.5 },
  ];

  cycle2Melody.forEach((m) => {
    notes.push({ midi: m.midi, beat: m.beat, duration: m.duration, velocity: 0.82, voice: 'piano' });
    notes.push({
      midi: m.midi - 12,
      beat: m.beat,
      duration: m.duration,
      velocity: 0.65,
      voice: 'noble_lead',
    });
  });

  return {
    id: 'canon-in-d',
    title: 'Canon in D — Khúc Tri Ân Thanh Xuân',
    subtitle: 'Dàn dây & Đại dương cầm sâu lắng',
    bpm: 76,
    totalBeats: 32,
    notes,
    pads,
  };
}

class SoundtrackController {
  private audioEl: HTMLAudioElement | null = null;
  private hasMp3: boolean | null = null;

  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private dryBus: GainNode | null = null;
  private reverbBus: ConvolverNode | null = null;
  private pianoWave: PeriodicWave | null = null;
  private hornWave: PeriodicWave | null = null;

  private scores: SynthScore[] = [
    buildSongNhuNhungDoaHoa(),
    buildPompAndCircumstance(),
    buildOdeToJoySymphony(),
    buildCanonInDCeremonial(),
  ];
  private currentTrackIndex = 0;
  private playing = false;

  private schedulerId: number | null = null;
  private loopStartTime = 0;
  private scheduledKeys = new Set<string>();

  private async checkMp3Available(): Promise<boolean> {
    if (this.hasMp3 !== null) return this.hasMp3;
    try {
      const res = await fetch(INVITATION_CONFIG.music.mp3Url, { method: 'HEAD' });
      const contentType = res.headers.get('content-type') || '';
      this.hasMp3 =
        res.ok && (contentType.includes('audio') || contentType.includes('octet-stream'));
    } catch {
      this.hasMp3 = false;
    }
    return this.hasMp3;
  }

  public getTracks(): MusicTrack[] {
    const synthTracks = this.scores.map((s) => ({
      id: s.id,
      title: s.title,
      subtitle: s.subtitle,
    }));
    if (this.hasMp3) {
      return [
        {
          id: 'custom-mp3',
          title: INVITATION_CONFIG.music.trackTitle,
          subtitle: 'Bản nhạc MP3 riêng',
        },
        ...synthTracks,
      ];
    }
    return synthTracks;
  }

  public getCurrentTrack(): MusicTrack {
    const list = this.getTracks();
    return list[this.currentTrackIndex % list.length];
  }

  private initAudioEngine(): void {
    if (this.audioCtx) return;

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    this.audioCtx = ctx;

    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -15;
    compressor.knee.value = 24;
    compressor.ratio.value = 3.8;
    compressor.attack.value = 0.01;
    compressor.release.value = 0.28;

    const master = ctx.createGain();
    master.gain.value = 0.88;
    compressor.connect(master);
    master.connect(ctx.destination);
    this.masterGain = master;

    const dry = ctx.createGain();
    dry.gain.value = 0.68;
    dry.connect(compressor);
    this.dryBus = dry;

    // Grand Auditorium Stereo Convolution Reverb (2.6s warm ceremonial hall)
    const convolver = ctx.createConvolver();
    const rate = ctx.sampleRate;
    const length = Math.floor(rate * 2.6);
    const impulse = ctx.createBuffer(2, length, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        const t = i / length;
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 2.5) * 0.52;
      }
    }
    convolver.buffer = impulse;

    const reverbFilter = ctx.createBiquadFilter();
    reverbFilter.type = 'lowpass';
    reverbFilter.frequency.value = 3200;

    const wetGain = ctx.createGain();
    wetGain.gain.value = 0.44;

    convolver.connect(reverbFilter);
    reverbFilter.connect(wetGain);
    wetGain.connect(compressor);
    this.reverbBus = convolver;

    // Grand Piano Harmonics
    const pReal = new Float32Array(9);
    const pImag = new Float32Array([0, 1.0, 0.44, 0.21, 0.11, 0.06, 0.03, 0.015, 0.008]);
    this.pianoWave = ctx.createPeriodicWave(pReal, pImag, { disableNormalization: false });

    // Noble French Horn + Cello/Violin Warm Harmonics
    const hReal = new Float32Array(9);
    const hImag = new Float32Array([0, 1.0, 0.78, 0.55, 0.34, 0.2, 0.11, 0.05, 0.02]);
    this.hornWave = ctx.createPeriodicWave(hReal, hImag, { disableNormalization: false });
  }

  private midiToFreq(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  private triggerPiano(midi: number, startTime: number, durationSec: number, velocity = 0.75) {
    if (!this.audioCtx || !this.dryBus || !this.reverbBus || !this.pianoWave) return;
    const ctx = this.audioCtx;
    const freq = this.midiToFreq(midi);

    const osc1 = ctx.createOscillator();
    osc1.setPeriodicWave(this.pianoWave);
    osc1.frequency.setValueAtTime(freq, startTime);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq, startTime);
    osc2.detune.setValueAtTime(3.0, startTime);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(5000, freq * 6), startTime);
    filter.frequency.exponentialRampToValueAtTime(Math.max(380, freq * 2), startTime + 0.8);

    const env = ctx.createGain();
    const peak = 0.095 * velocity;
    const releaseEnd = startTime + durationSec + 0.85;

    env.gain.setValueAtTime(0.0001, startTime);
    env.gain.linearRampToValueAtTime(peak, startTime + 0.012);
    env.gain.exponentialRampToValueAtTime(peak * 0.45, startTime + 0.35);
    env.gain.exponentialRampToValueAtTime(0.0001, releaseEnd);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(env);
    env.connect(this.dryBus);
    env.connect(this.reverbBus);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(releaseEnd + 0.04);
    osc2.stop(releaseEnd + 0.04);
  }

  // Tiếng Kèn Đồng Pháp (French Horn) hòa quyện Dàn Dây Giao Hưởng ấm áp, hào hùng
  private triggerNobleLead(midi: number, startTime: number, durationSec: number, velocity = 0.8) {
    if (!this.audioCtx || !this.dryBus || !this.reverbBus || !this.hornWave) return;
    const ctx = this.audioCtx;
    const freq = this.midiToFreq(midi);

    const osc1 = ctx.createOscillator();
    osc1.setPeriodicWave(this.hornWave);
    osc1.frequency.setValueAtTime(freq, startTime);
    osc1.detune.setValueAtTime(-4.5, startTime);

    const osc2 = ctx.createOscillator();
    osc2.setPeriodicWave(this.hornWave);
    osc2.frequency.setValueAtTime(freq, startTime);
    osc2.detune.setValueAtTime(4.5, startTime);

    // Subtle expressive vibrato on sustained ceremonial notes
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(5.0, startTime);
    lfoGain.gain.setValueAtTime(2.2, startTime);
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfoGain.connect(osc2.frequency);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, startTime);
    filter.frequency.linearRampToValueAtTime(1650 * velocity + 400, startTime + 0.14);
    filter.frequency.linearRampToValueAtTime(1150, startTime + durationSec);

    const env = ctx.createGain();
    const peak = 0.072 * velocity;
    const attack = Math.min(0.09, durationSec * 0.25);
    const end = startTime + durationSec + 0.32;

    env.gain.setValueAtTime(0.0001, startTime);
    env.gain.linearRampToValueAtTime(peak, startTime + attack);
    env.gain.linearRampToValueAtTime(peak * 0.82, startTime + durationSec * 0.88);
    env.gain.exponentialRampToValueAtTime(0.0001, end);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(env);
    env.connect(this.dryBus);
    env.connect(this.reverbBus);

    osc1.start(startTime);
    osc2.start(startTime);
    lfo.start(startTime + 0.15);
    osc1.stop(end + 0.04);
    osc2.stop(end + 0.04);
    lfo.stop(end + 0.04);
  }

  // Chuông nghi lễ vàng kim (Tubular Ceremony Chime)
  private triggerCeremonialChime(midi: number, startTime: number, durationSec: number, velocity = 0.5) {
    if (!this.audioCtx || !this.reverbBus || !this.dryBus) return;
    const ctx = this.audioCtx;
    const freq = this.midiToFreq(midi);

    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    const oscOvertone = ctx.createOscillator();
    oscOvertone.type = 'sine';
    oscOvertone.frequency.setValueAtTime(freq * 2.0, startTime);

    const env = ctx.createGain();
    const end = startTime + durationSec + 1.2;
    env.gain.setValueAtTime(0.0001, startTime);
    env.gain.linearRampToValueAtTime(0.045 * velocity, startTime + 0.008);
    env.gain.exponentialRampToValueAtTime(0.0001, end);

    osc1.connect(env);
    oscOvertone.connect(env);
    env.connect(this.reverbBus);
    env.connect(this.dryBus);

    osc1.start(startTime);
    oscOvertone.start(startTime);
    osc1.stop(end + 0.04);
    oscOvertone.stop(end + 0.04);
  }

  // Dàn dây nền giao hưởng (Symphony Strings Pad)
  private triggerWarmStrings(midis: number[], startTime: number, durationSec: number) {
    if (!this.audioCtx || !this.reverbBus || !this.hornWave) return;
    const ctx = this.audioCtx;

    midis.forEach((midi, idx) => {
      const freq = this.midiToFreq(midi);
      const osc = ctx.createOscillator();
      osc.setPeriodicWave(this.hornWave!);
      osc.frequency.setValueAtTime(freq, startTime);
      osc.detune.setValueAtTime(idx % 2 === 0 ? -5 : 5, startTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(880, startTime);

      const env = ctx.createGain();
      const end = startTime + durationSec + 0.55;
      env.gain.setValueAtTime(0.0001, startTime);
      env.gain.linearRampToValueAtTime(0.024, startTime + 0.5);
      env.gain.linearRampToValueAtTime(0.02, startTime + durationSec * 0.85);
      env.gain.exponentialRampToValueAtTime(0.0001, end);

      osc.connect(filter);
      filter.connect(env);
      env.connect(this.reverbBus!);

      osc.start(startTime);
      osc.stop(end + 0.04);
    });
  }

  private startSynthLoop(score: SynthScore): boolean {
    try {
      this.initAudioEngine();
      if (!this.audioCtx || !this.masterGain) return false;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.stopSchedulerOnly();
      this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
      this.masterGain.gain.setValueAtTime(0.88, this.audioCtx.currentTime);

      const secPerBeat = 60 / score.bpm;
      const loopDurationSec = score.totalBeats * secPerBeat;
      this.loopStartTime = this.audioCtx.currentTime + 0.08;
      this.scheduledKeys.clear();

      const lookAheadSec = 0.38;

      const tick = () => {
        if (!this.playing || !this.audioCtx) return;
        const now = this.audioCtx.currentTime;
        const elapsed = Math.max(0, now - this.loopStartTime);
        const currentLoopIdx = Math.floor(elapsed / loopDurationSec);

        for (let loopIdx = currentLoopIdx; loopIdx <= currentLoopIdx + 1; loopIdx++) {
          const baseLoopTime = this.loopStartTime + loopIdx * loopDurationSec;

          score.pads.forEach((p, pIdx) => {
            const key = `pad-${loopIdx}-${pIdx}`;
            if (this.scheduledKeys.has(key)) return;
            const t = baseLoopTime + p.beat * secPerBeat;
            if (t >= now - 0.05 && t <= now + lookAheadSec) {
              this.scheduledKeys.add(key);
              this.triggerWarmStrings(p.midis, t, p.duration * secPerBeat);
            }
          });

          score.notes.forEach((n, nIdx) => {
            const key = `note-${loopIdx}-${nIdx}`;
            if (this.scheduledKeys.has(key)) return;
            const t = baseLoopTime + n.beat * secPerBeat;
            if (t >= now - 0.05 && t <= now + lookAheadSec) {
              this.scheduledKeys.add(key);
              const dur = n.duration * secPerBeat;
              const vel = n.velocity ?? 0.75;
              if (n.voice === 'noble_lead') {
                this.triggerNobleLead(n.midi, t, dur, vel);
              } else if (n.voice === 'chime') {
                this.triggerCeremonialChime(n.midi, t, dur, vel);
              } else {
                this.triggerPiano(n.midi, t, dur, vel);
              }
            }
          });
        }

        if (this.scheduledKeys.size > 800) {
          const keepA = `-${currentLoopIdx}-`;
          const keepB = `-${currentLoopIdx + 1}-`;
          for (const k of this.scheduledKeys) {
            if (!k.includes(keepA) && !k.includes(keepB)) {
              this.scheduledKeys.delete(k);
            }
          }
        }
      };

      this.playing = true;
      tick();
      this.schedulerId = window.setInterval(tick, 120);
      return true;
    } catch {
      this.playing = false;
      return false;
    }
  }

  private stopSchedulerOnly(): void {
    if (this.schedulerId !== null) {
      clearInterval(this.schedulerId);
      this.schedulerId = null;
    }
    this.scheduledKeys.clear();
  }

  public async play(): Promise<boolean> {
    await this.checkMp3Available();
    const tracks = this.getTracks();
    const current = tracks[this.currentTrackIndex % tracks.length];

    if (current.id === 'custom-mp3') {
      this.stopSchedulerOnly();
      try {
        if (!this.audioEl) {
          this.audioEl = new Audio(INVITATION_CONFIG.music.mp3Url);
          this.audioEl.loop = true;
          this.audioEl.volume = 0.7;
        }
        await this.audioEl.play();
        this.playing = true;
        return true;
      } catch {
        this.currentTrackIndex = 1;
      }
    }

    if (this.audioEl) {
      this.audioEl.pause();
    }

    const scoreIndex = this.hasMp3
      ? Math.max(0, (this.currentTrackIndex % tracks.length) - 1)
      : this.currentTrackIndex % this.scores.length;

    return this.startSynthLoop(this.scores[scoreIndex]);
  }

  public async nextTrack(): Promise<MusicTrack> {
    await this.checkMp3Available();
    const tracks = this.getTracks();
    this.currentTrackIndex = (this.currentTrackIndex + 1) % tracks.length;
    if (this.playing) {
      this.pause();
      await this.play();
    }
    return this.getCurrentTrack();
  }

  public pause(): void {
    this.playing = false;
    if (this.audioEl) {
      this.audioEl.pause();
    }
    this.stopSchedulerOnly();
    if (this.audioCtx && this.masterGain) {
      const now = this.audioCtx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.18);
    }
  }

  public isPlaying(): boolean {
    return this.playing;
  }
}

export const soundtrack = new SoundtrackController();
