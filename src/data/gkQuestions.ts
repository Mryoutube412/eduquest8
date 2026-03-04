// Genel Kültür Soruları - Kim Milyoner Olmak İster Tarzı
// 5 Test × 20 Soru = 100 Soru
// İlk 7: Kolay (10 GKP), 8-15: Orta (20 GKP), 16-20: Zor (30 GKP)

export interface GKQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface GKTest {
  id: string;
  name: string;
  questions: GKQuestion[];
}

const GK_QUESTIONS_RAW: Record<string, GKQuestion[]> = {
  test1: [
    // Kolay (1-7)
    { id: 'gk1_1', question: 'Türkiye\'nin başkenti hangi ildir?', options: ['İstanbul', 'Ankara', 'İzmir', 'Bursa'], correctIndex: 1, explanation: 'Türkiye\'nin başkenti 1923\'ten beri Ankara\'dır.' },
    { id: 'gk1_2', question: 'Dünyanın en büyük okyanusunun adı nedir?', options: ['Atlas Okyanusu', 'Hint Okyanusu', 'Büyük (Pasifik) Okyanus', 'Arktik Okyanus'], correctIndex: 2, explanation: 'Büyük Okyanus (Pasifik) dünyanın en büyük okyanusudur.' },
    { id: 'gk1_3', question: 'İnsan vücudunda kaç adet kemik bulunur?', options: ['106 kemik', '206 kemik', '306 kemik', '156 kemik'], correctIndex: 1, explanation: 'Yetişkin insan vücudunda toplam 206 kemik vardır.' },
    { id: 'gk1_4', question: 'Hangi gezegen Güneş\'e en yakın gezegendir?', options: ['Venüs', 'Mars', 'Merkür', 'Jüpiter'], correctIndex: 2, explanation: 'Merkür, Güneş\'e en yakın konumdaki gezegendir.' },
    { id: 'gk1_5', question: 'Bir yılda kaç gün bulunur?', options: ['360 gün', '365 gün', '366 gün', '355 gün'], correctIndex: 1, explanation: 'Normal bir yılda 365 gün vardır (artık yılda 366).' },
    { id: 'gk1_6', question: '"Çanakkale Savaşı" hangi yıl gerçekleşmiştir?', options: ['1914 yılında', '1915 yılında', '1916 yılında', '1918 yılında'], correctIndex: 1, explanation: 'Çanakkale Savaşı 1915 yılında yapılmıştır.' },
    { id: 'gk1_7', question: 'Suyun kimyasal formülü aşağıdakilerden hangisidir?', options: ['CO2 formülüdür', 'H2O formülüdür', 'NaCl formülüdür', 'O2 formülüdür'], correctIndex: 1, explanation: 'Suyun kimyasal formülü H2O\'dur.' },
    // Orta (8-15)
    { id: 'gk1_8', question: 'Hangi ülke yüzölçümü bakımından dünyanın en büyük devletidir?', options: ['ABD en büyük devlettir', 'Çin en büyük devlettir', 'Kanada en büyük devlettir', 'Rusya en büyük devlettir'], correctIndex: 3, explanation: 'Rusya yaklaşık 17,1 milyon km² ile dünyanın en büyük ülkesidir.' },
    { id: 'gk1_9', question: '"Mona Lisa" tablosunun ressamı kimdir?', options: ['Michelangelo', 'Leonardo da Vinci', 'Raffaello Sanzio', 'Pablo Picasso'], correctIndex: 1, explanation: 'Mona Lisa, Leonardo da Vinci tarafından yapılmıştır.' },
    { id: 'gk1_10', question: 'İnsan vücudundaki en büyük organ hangisidir?', options: ['Karaciğer en büyüktür', 'Beyin en büyüktür', 'Akciğer en büyüktür', 'Deri en büyüktür'], correctIndex: 3, explanation: 'Deri, insan vücudundaki en büyük organdır.' },
    { id: 'gk1_11', question: 'Ay\'ın Dünya\'nın etrafındaki dönüşü yaklaşık kaç gün sürmektedir?', options: ['Yaklaşık 27 gün sürer', 'Yaklaşık 30 gün sürer', 'Yaklaşık 15 gün sürer', 'Yaklaşık 45 gün sürer'], correctIndex: 0, explanation: 'Ay, Dünya etrafındaki dönüşünü yaklaşık 27,3 günde tamamlar.' },
    { id: 'gk1_12', question: 'Osmanlı İmparatorluğu\'nu kuran padişah kimdir?', options: ['Fatih Sultan Mehmet', 'Kanuni Sultan Süleyman', 'Osman Gazi', 'Yavuz Sultan Selim'], correctIndex: 2, explanation: 'Osmanlı Devleti\'ni 1299\'da Osman Gazi kurmuştur.' },
    { id: 'gk1_13', question: 'DNA açılımı aşağıdakilerden hangisidir?', options: ['Deoksiribo Nükleik Asit', 'Dinitro Azot Asidi', 'Doğal Nötron Açısı', 'Düzenli Nükleotid Ağı'], correctIndex: 0, explanation: 'DNA, Deoksiribonükleik Asit anlamına gelir.' },
    { id: 'gk1_14', question: 'Dünya üzerinde en uzun nehir hangisidir?', options: ['Amazon Nehri en uzundur', 'Mississippi Nehri en uzundur', 'Nil Nehri en uzundur', 'Yangtze Nehri en uzundur'], correctIndex: 2, explanation: 'Nil Nehri yaklaşık 6.650 km ile dünyanın en uzun nehridir.' },
    { id: 'gk1_15', question: 'Periyodik tabloda "Fe" simgesi hangi elemana aittir?', options: ['Flor elementine aittir', 'Demir elementine aittir', 'Fosfor elementine aittir', 'Fermiyum elementine aittir'], correctIndex: 1, explanation: 'Fe, Demir\'in (Ferrum) kimyasal simgesidir.' },
    // Zor (16-20)
    { id: 'gk1_16', question: 'Hangi antlaşma ile Osmanlı Devleti resmen sona ermiştir?', options: ['Mondros Ateşkes Antlaşması', 'Sevr Antlaşması', 'Lozan Barış Antlaşması', 'Mudanya Ateşkes Antlaşması'], correctIndex: 2, explanation: 'Lozan Antlaşması (1923) ile Osmanlı devleti resmen sona ermiş, yeni Türkiye tanınmıştır.' },
    { id: 'gk1_17', question: 'Işık hızı saniyede yaklaşık kaç kilometre yol kat etmektedir?', options: ['Saniyede yaklaşık 150.000 km', 'Saniyede yaklaşık 300.000 km', 'Saniyede yaklaşık 450.000 km', 'Saniyede yaklaşık 200.000 km'], correctIndex: 1, explanation: 'Işık hızı yaklaşık 300.000 km/s\'dir.' },
    { id: 'gk1_18', question: '"Sapiens: İnsan Türünün Kısa Tarihi" kitabının yazarı kimdir?', options: ['Richard Dawkins yazmıştır', 'Charles Darwin yazmıştır', 'Yuval Noah Harari yazmıştır', 'Stephen Hawking yazmıştır'], correctIndex: 2, explanation: 'Sapiens, Yuval Noah Harari tarafından yazılmıştır.' },
    { id: 'gk1_19', question: 'Hangi element periyodik tabloda 79. sırada bulunmaktadır?', options: ['Gümüş (Ag) bulunur', 'Altın (Au) bulunur', 'Platin (Pt) bulunur', 'Bakır (Cu) bulunur'], correctIndex: 1, explanation: 'Altın (Au) periyodik tabloda 79 numaralı elementtir.' },
    { id: 'gk1_20', question: 'Kuantum fiziğinde "belirsizlik ilkesi"ni ortaya atan bilim insanı kimdir?', options: ['Albert Einstein ortaya atmıştır', 'Niels Bohr ortaya atmıştır', 'Werner Heisenberg ortaya atmıştır', 'Max Planck ortaya atmıştır'], correctIndex: 2, explanation: 'Belirsizlik ilkesi Werner Heisenberg tarafından 1927\'de formüle edilmiştir.' },
  ],
  test2: [
    { id: 'gk2_1', question: 'Gökkuşağında kaç renk bulunur?', options: ['5 renk bulunur', '6 renk bulunur', '7 renk bulunur', '8 renk bulunur'], correctIndex: 2, explanation: 'Gökkuşağında 7 renk vardır.' },
    { id: 'gk2_2', question: 'Hangisi bir kıta değildir?', options: ['Avrupa bir kıtadır', 'Antarktika bir kıtadır', 'Arktik kıta değildir', 'Afrika bir kıtadır'], correctIndex: 2, explanation: 'Arktik bir kıta değil, donmuş bir okyanus bölgesidir.' },
    { id: 'gk2_3', question: 'Türk bayrağındaki ay ve yıldız hangi renktedir?', options: ['Kırmızı renktedir', 'Beyaz renktedir', 'Yeşil renktedir', 'Sarı renktedir'], correctIndex: 1, explanation: 'Türk bayrağında ay ve yıldız beyaz renktedir.' },
    { id: 'gk2_4', question: 'Bir üçgenin iç açıları toplamı kaç derecedir?', options: ['90 derecedir', '180 derecedir', '270 derecedir', '360 derecedir'], correctIndex: 1, explanation: 'Bir üçgenin iç açıları toplamı 180 derecedir.' },
    { id: 'gk2_5', question: 'Güneş sistemimizdeki en büyük gezegen hangisidir?', options: ['Satürn en büyüktür', 'Jüpiter en büyüktür', 'Uranüs en büyüktür', 'Neptün en büyüktür'], correctIndex: 1, explanation: 'Jüpiter Güneş sisteminin en büyük gezegenidir.' },
    { id: 'gk2_6', question: 'İstanbul hangi iki kıtayı birbirine bağlar?', options: ['Avrupa ve Afrika', 'Asya ve Afrika', 'Avrupa ve Asya', 'Asya ve Avustralya'], correctIndex: 2, explanation: 'İstanbul, Avrupa ve Asya kıtalarını birbirine bağlar.' },
    { id: 'gk2_7', question: 'Arıların ürettiği doğal besin maddesinin adı nedir?', options: ['Polen üretirler', 'Bal üretirler', 'Balmumu üretirler', 'Propolis üretirler'], correctIndex: 1, explanation: 'Arılar doğal besin maddesi olarak bal üretir.' },
    // Orta
    { id: 'gk2_8', question: 'Hangi vitamin güneş ışığı sayesinde vücutta üretilmektedir?', options: ['A vitamini üretilir', 'B12 vitamini üretilir', 'C vitamini üretilir', 'D vitamini üretilir'], correctIndex: 3, explanation: 'D vitamini güneş ışığı etkisiyle deride sentezlenir.' },
    { id: 'gk2_9', question: 'Matbaayı icat eden kişi olarak bilinen isim kimdir?', options: ['Thomas Edison icat etti', 'Johannes Gutenberg icat etti', 'Nikola Tesla icat etti', 'Alexander Bell icat etti'], correctIndex: 1, explanation: 'Modern matbaayı Johannes Gutenberg 1440 civarında icat etmiştir.' },
    { id: 'gk2_10', question: 'Hangi organ insan vücudunda kanı temizleme görevini üstlenir?', options: ['Kalp temizler', 'Akciğer temizler', 'Böbrek temizler', 'Mide temizler'], correctIndex: 2, explanation: 'Böbrekler kanı süzerek temizleme görevini üstlenir.' },
    { id: 'gk2_11', question: '"E=mc²" formülünü ortaya koyan fizikçi kimdir?', options: ['Isaac Newton koymuştur', 'Albert Einstein koymuştur', 'Nikola Tesla koymuştur', 'Stephen Hawking koymuştur'], correctIndex: 1, explanation: 'E=mc² formülü Albert Einstein\'ın özel görelilik teorisinden gelir.' },
    { id: 'gk2_12', question: 'Dünyanın en yüksek dağının adı ve yüksekliği nedir?', options: ['K2 - 8.611 metre', 'Everest - 8.849 metre', 'Kangchenjunga - 8.586 m', 'Ağrı Dağı - 5.137 metre'], correctIndex: 1, explanation: 'Everest Dağı 8.849 metre ile dünyanın en yüksek dağıdır.' },
    { id: 'gk2_13', question: 'Hangi ülke "Güneşin batmadığı imparatorluk" olarak bilinmekteydi?', options: ['Fransa olarak bilinirdi', 'İspanya olarak bilinirdi', 'Britanya olarak bilinirdi', 'Portekiz olarak bilinirdi'], correctIndex: 2, explanation: 'Büyük Britanya İmparatorluğu bu unvanla bilinirdi.' },
    { id: 'gk2_14', question: 'İnsan beyninde yaklaşık kaç nöron hücresi bulunmaktadır?', options: ['Yaklaşık 8 milyar nöron', 'Yaklaşık 86 milyar nöron', 'Yaklaşık 860 milyon nöron', 'Yaklaşık 8 trilyon nöron'], correctIndex: 1, explanation: 'İnsan beyninde yaklaşık 86 milyar nöron bulunur.' },
    { id: 'gk2_15', question: 'İlk Türk alfabesi olarak kabul edilen yazı sistemi hangisidir?', options: ['Arap alfabesidir', 'Latin alfabesidir', 'Göktürk alfabesidir', 'Uygur alfabesidir'], correctIndex: 2, explanation: 'Göktürk (Orhun) alfabesi bilinen ilk Türk alfabesidir.' },
    // Zor
    { id: 'gk2_16', question: 'Hangi uluslararası antlaşma ozon tabakasının korunmasını hedeflemiştir?', options: ['Kyoto Protokolü hedeftir', 'Paris Anlaşması hedeftir', 'Montreal Protokolü hedeftir', 'Rio Sözleşmesi hedeftir'], correctIndex: 2, explanation: 'Montreal Protokolü (1987) ozon tabakasını koruyan antlaşmadır.' },
    { id: 'gk2_17', question: 'Fibonacci dizisinde 8. terimin değeri kaçtır?', options: ['13 değerindedir', '21 değerindedir', '34 değerindedir', '55 değerindedir'], correctIndex: 1, explanation: 'Fibonacci: 1,1,2,3,5,8,13,21 → 8. terim 21\'dir.' },
    { id: 'gk2_18', question: 'Dünya\'nın çekirdeği ağırlıklı olarak hangi metallerden oluşmaktadır?', options: ['Bakır ve çinko oluşturur', 'Demir ve nikel oluşturur', 'Altın ve gümüş oluşturur', 'Alüminyum ve titanyum oluşturur'], correctIndex: 1, explanation: 'Dünya\'nın çekirdeği ağırlıklı olarak demir ve nikelden oluşur.' },
    { id: 'gk2_19', question: 'Hangi medeniyetin yazı sistemi "çivi yazısı" olarak adlandırılmaktadır?', options: ['Mısır medeniyetinindir', 'Sümer medeniyetinindir', 'Çin medeniyetinindir', 'Roma medeniyetinindir'], correctIndex: 1, explanation: 'Çivi yazısı Sümerler tarafından geliştirilmiştir.' },
    { id: 'gk2_20', question: '"Schrödinger\'in kedisi" hangi bilim dalına ait düşünce deneyidir?', options: ['Biyoloji dalına aittir', 'Kimya dalına aittir', 'Kuantum fiziği dalına aittir', 'Felsefe dalına aittir'], correctIndex: 2, explanation: 'Schrödinger\'in kedisi kuantum fiziğindeki süperpozisyon ilkesini anlatır.' },
  ],
  test3: [
    { id: 'gk3_1', question: 'Dünya\'da en çok konuşulan dil hangisidir?', options: ['İngilizce en çok konuşulur', 'İspanyolca en çok konuşulur', 'Mandarin Çincesi en çok konuşulur', 'Hintçe en çok konuşulur'], correctIndex: 2, explanation: 'Ana dili olarak Mandarin Çincesi en çok konuşulan dildir.' },
    { id: 'gk3_2', question: 'Türkiye\'nin en uzun nehri hangisidir?', options: ['Fırat Nehri en uzundur', 'Kızılırmak en uzundur', 'Sakarya en uzundur', 'Dicle Nehri en uzundur'], correctIndex: 1, explanation: 'Kızılırmak 1.355 km ile Türkiye\'nin en uzun nehridir.' },
    { id: 'gk3_3', question: 'Cumhuriyet kaç yılında ilan edilmiştir?', options: ['1920 yılında ilan edildi', '1921 yılında ilan edildi', '1922 yılında ilan edildi', '1923 yılında ilan edildi'], correctIndex: 3, explanation: 'Cumhuriyet 29 Ekim 1923\'te ilan edilmiştir.' },
    { id: 'gk3_4', question: 'Hangi element havadaki en yüksek orana sahiptir?', options: ['Oksijen en yüksek orandadır', 'Azot en yüksek orandadır', 'Karbondioksit en yüksektedir', 'Hidrojen en yüksek orandadır'], correctIndex: 1, explanation: 'Atmosferin %78\'i azottan oluşmaktadır.' },
    { id: 'gk3_5', question: 'Mars gezegeninin diğer adı nedir?', options: ['Mavi gezegen denir', 'Kırmızı gezegen denir', 'Yeşil gezegen denir', 'Sarı gezegen denir'], correctIndex: 1, explanation: 'Mars, yüzeyindeki demir oksit nedeniyle "Kırmızı Gezegen" denir.' },
    { id: 'gk3_6', question: 'Nobel ödülleri hangi ülkede verilmektedir?', options: ['Norveç\'te verilir', 'İsveç\'te verilir', 'Danimarka\'da verilir', 'Finlandiya\'da verilir'], correctIndex: 1, explanation: 'Nobel ödülleri İsveç\'te verilir (Barış Ödülü hariç, o Norveç\'te).' },
    { id: 'gk3_7', question: 'Karadeniz hangi boğaz ile Marmara Denizi\'ne bağlanmaktadır?', options: ['Çanakkale Boğazı ile bağlanır', 'İstanbul Boğazı ile bağlanır', 'Cebelitarık Boğazı ile bağlanır', 'Hürmüz Boğazı ile bağlanır'], correctIndex: 1, explanation: 'Karadeniz, İstanbul Boğazı ile Marmara Denizi\'ne bağlanır.' },
    // Orta
    { id: 'gk3_8', question: 'Hangi bilim insanı yerçekimi kanununu keşfetmiştir?', options: ['Galileo Galilei keşfetmiştir', 'Isaac Newton keşfetmiştir', 'Albert Einstein keşfetmiştir', 'Nikola Tesla keşfetmiştir'], correctIndex: 1, explanation: 'Isaac Newton yerçekimi kanununu ortaya koymuştur.' },
    { id: 'gk3_9', question: 'Dünyanın en kalabalık ülkesi hangisidir (2024)?', options: ['ABD en kalabalıktır', 'Hindistan en kalabalıktır', 'Çin en kalabalıktır', 'Endonezya en kalabalıktır'], correctIndex: 1, explanation: 'Hindistan 2023\'te Çin\'i geçerek dünyanın en kalabalık ülkesi olmuştur.' },
    { id: 'gk3_10', question: 'Hangi savaş sonucunda I. Dünya Savaşı sona ermiştir?', options: ['Verdun Muharebesi ile sona erdi', 'Çanakkale Savaşı ile sona erdi', '11 Kasım 1918 Ateşkesi ile sona erdi', 'Versay Antlaşması ile sona erdi'], correctIndex: 2, explanation: 'I. Dünya Savaşı 11 Kasım 1918 ateşkesiyle sona ermiştir.' },
    { id: 'gk3_11', question: 'Amazonlar yağmur ormanları dünyanın oksijeninin yüzde kaçını üretir?', options: ['Yaklaşık yüzde 6 üretir', 'Yaklaşık yüzde 10 üretir', 'Yaklaşık yüzde 20 üretir', 'Yaklaşık yüzde 40 üretir'], correctIndex: 0, explanation: 'Amazon ormanları dünyanın oksijeninin yaklaşık %6\'sını üretir.' },
    { id: 'gk3_12', question: 'Hangi Türk padişahı İstanbul\'u fethetmiştir?', options: ['Yıldırım Bayezid fethetmiştir', 'Fatih Sultan Mehmet fethetmiştir', 'Kanuni Sultan Süleyman fethetmiştir', 'II. Murad fethetmiştir'], correctIndex: 1, explanation: 'İstanbul 1453\'te Fatih Sultan Mehmet tarafından fethedilmiştir.' },
    { id: 'gk3_13', question: 'İnsan kanının pH değeri yaklaşık kaçtır?', options: ['Yaklaşık 6.5 değerindedir', 'Yaklaşık 7.0 değerindedir', 'Yaklaşık 7.4 değerindedir', 'Yaklaşık 8.0 değerindedir'], correctIndex: 2, explanation: 'İnsan kanının pH\'ı yaklaşık 7.35-7.45 arasındadır.' },
    { id: 'gk3_14', question: 'Hangi gezegen kendi ekseni etrafında ters yönde dönmektedir?', options: ['Mars ters döner', 'Venüs ters döner', 'Satürn ters döner', 'Neptün ters döner'], correctIndex: 1, explanation: 'Venüs, diğer gezegenlerden farklı olarak ters yönde döner.' },
    { id: 'gk3_15', question: 'DNA\'nın çift sarmal yapısını keşfeden bilim insanları kimlerdir?', options: ['Watson ve Crick keşfetmiştir', 'Darwin ve Wallace keşfetmiştir', 'Mendel ve Morgan keşfetmiştir', 'Pasteur ve Koch keşfetmiştir'], correctIndex: 0, explanation: 'Watson ve Crick 1953\'te DNA\'nın çift sarmal yapısını keşfetmiştir.' },
    // Zor
    { id: 'gk3_16', question: 'Osmanlı\'da "Divan-ı Hümayun" hangi görevi yerine getirmekteydi?', options: ['Ordu yönetimi yapardı', 'Bakanlar kurulu gibi çalışırdı', 'Adalet işlerine bakardı', 'Hazine yönetirdi'], correctIndex: 1, explanation: 'Divan-ı Hümayun bugünkü bakanlar kurulu gibi devlet işlerini yürütürdü.' },
    { id: 'gk3_17', question: 'Hangi fizik sabiti "6.626 × 10⁻³⁴ J·s" değerine sahip olarak bilinir?', options: ['Boltzmann sabiti bu değerdedir', 'Planck sabiti bu değerdedir', 'Avogadro sabiti bu değerdedir', 'Coulomb sabiti bu değerdedir'], correctIndex: 1, explanation: 'Planck sabiti (h) = 6.626 × 10⁻³⁴ J·s\'dir.' },
    { id: 'gk3_18', question: '"Rönesans" hareketi ilk olarak hangi ülkede ortaya çıkmıştır?', options: ['Fransa\'da çıkmıştır', 'İtalya\'da çıkmıştır', 'İngiltere\'de çıkmıştır', 'Almanya\'da çıkmıştır'], correctIndex: 1, explanation: 'Rönesans 14. yüzyılda İtalya\'da başlamıştır.' },
    { id: 'gk3_19', question: 'Hangi madde oda sıcaklığında sıvı halde bulunan tek metaldir?', options: ['Galyum bu metaldir', 'Cıva bu metaldir', 'Sezyum bu metaldir', 'Bizmut bu metaldir'], correctIndex: 1, explanation: 'Cıva (Hg) oda sıcaklığında sıvı halde bulunan tek metaldir.' },
    { id: 'gk3_20', question: 'Türkiye\'de kadınlara seçme ve seçilme hakkı hangi yıl tanınmıştır?', options: ['1930 yılında tanınmıştır', '1934 yılında tanınmıştır', '1938 yılında tanınmıştır', '1926 yılında tanınmıştır'], correctIndex: 1, explanation: '1934\'te kadınlara milletvekili seçme ve seçilme hakkı verilmiştir.' },
  ],
  test4: [
    { id: 'gk4_1', question: 'Hangi hayvan "çöl gemisi" olarak adlandırılmaktadır?', options: ['At çöl gemisidir', 'Deve çöl gemisidir', 'Eşek çöl gemisidir', 'Koyun çöl gemisidir'], correctIndex: 1, explanation: 'Deve, çöl koşullarına uyumu nedeniyle "çöl gemisi" olarak bilinir.' },
    { id: 'gk4_2', question: 'Bir futbol takımında sahada kaç oyuncu bulunmaktadır?', options: ['9 oyuncu bulunur', '10 oyuncu bulunur', '11 oyuncu bulunur', '12 oyuncu bulunur'], correctIndex: 2, explanation: 'Bir futbol takımı sahada 11 oyuncu ile mücadele eder.' },
    { id: 'gk4_3', question: 'Hangi vitamin eksikliğinde "skorbüt" hastalığı ortaya çıkar?', options: ['A vitamini eksikliğinde', 'B vitamini eksikliğinde', 'C vitamini eksikliğinde', 'D vitamini eksikliğinde'], correctIndex: 2, explanation: 'C vitamini eksikliğinde skorbüt hastalığı görülür.' },
    { id: 'gk4_4', question: 'Türk Lirası\'nın üzerinde resmi bulunan tarihî kişi kimdir?', options: ['İsmet İnönü bulunur', 'Mustafa Kemal Atatürk bulunur', 'Fevzi Çakmak bulunur', 'Kazım Karabekir bulunur'], correctIndex: 1, explanation: 'Tüm Türk banknotlarında Atatürk\'ün portresi bulunur.' },
    { id: 'gk4_5', question: 'Dünyanın en küçük kıtası hangisidir?', options: ['Avrupa en küçüktür', 'Antarktika en küçüktür', 'Avustralya en küçüktür', 'Güney Amerika en küçüktür'], correctIndex: 2, explanation: 'Avustralya (Okyanusya) dünyanın en küçük kıtasıdır.' },
    { id: 'gk4_6', question: 'İlk Olimpiyat Oyunları hangi ülkede düzenlenmiştir?', options: ['Roma\'da düzenlenmiştir', 'Mısır\'da düzenlenmiştir', 'Yunanistan\'da düzenlenmiştir', 'Türkiye\'de düzenlenmiştir'], correctIndex: 2, explanation: 'İlk Olimpiyat Oyunları MÖ 776\'da Antik Yunanistan\'da düzenlenmiştir.' },
    { id: 'gk4_7', question: 'Bitkilerin fotosentez yapmak için ihtiyaç duyduğu gaz hangisidir?', options: ['Oksijen gazına ihtiyaç duyar', 'Karbondioksit gazına ihtiyaç duyar', 'Azot gazına ihtiyaç duyar', 'Hidrojen gazına ihtiyaç duyar'], correctIndex: 1, explanation: 'Bitkiler fotosentez için karbondioksit (CO₂) kullanır.' },
    // Orta
    { id: 'gk4_8', question: 'Hangi ülke hem Avrupa hem Asya kıtasında toprak parçasına sahiptir?', options: ['Yunanistan her iki kıtada', 'Mısır her iki kıtada', 'Türkiye her iki kıtada', 'İran her iki kıtada'], correctIndex: 2, explanation: 'Türkiye hem Avrupa hem Asya kıtasında toprak parçasına sahiptir.' },
    { id: 'gk4_9', question: 'Albert Einstein hangi bilim dalında Nobel ödülü almıştır?', options: ['Görelilik teorisi alanında', 'Fotoelektrik etki alanında', 'Kuantum mekaniği alanında', 'Termodinamik alanında'], correctIndex: 1, explanation: 'Einstein Nobel ödülünü fotoelektrik etki açıklaması için almıştır.' },
    { id: 'gk4_10', question: 'Bir atomun çekirdeğinde hangi parçacıklar bulunmaktadır?', options: ['Elektron ve nötron bulunur', 'Proton ve elektron bulunur', 'Proton ve nötron bulunur', 'Nötron ve foton bulunur'], correctIndex: 2, explanation: 'Atom çekirdeğinde proton ve nötron bulunur.' },
    { id: 'gk4_11', question: 'Hangi medeniyet piramitleri inşa etmesiyle ünlüdür?', options: ['Sümer medeniyeti ünlüdür', 'Maya medeniyeti ünlüdür', 'Mısır medeniyeti ünlüdür', 'Roma medeniyeti ünlüdür'], correctIndex: 2, explanation: 'Antik Mısır medeniyeti piramitleriyle ünlüdür.' },
    { id: 'gk4_12', question: 'İnsan vücudunda en hızlı çalışan kas hangisidir?', options: ['Kalp kası en hızlıdır', 'Göz kapağı kası en hızlıdır', 'Baldır kası en hızlıdır', 'Çene kası en hızlıdır'], correctIndex: 1, explanation: 'Göz kapağını açıp kapatan kas vücuttaki en hızlı kastır.' },
    { id: 'gk4_13', question: 'Hangi element periyodik tabloda "O" simgesiyle gösterilmektedir?', options: ['Osmiyum gösterilir', 'Oksijen gösterilir', 'Oganeson gösterilir', 'Altın gösterilir'], correctIndex: 1, explanation: 'O simgesi Oksijen elementini temsil eder.' },
    { id: 'gk4_14', question: 'Dünyanın en derin noktası nerededir?', options: ['Bermuda Üçgeni\'ndedir', 'Mariana Çukuru\'ndadır', 'Kızıldeniz\'dedir', 'Atlantik Okyanusu\'ndadır'], correctIndex: 1, explanation: 'Mariana Çukuru yaklaşık 11.034 m ile dünyanın en derin noktasıdır.' },
    { id: 'gk4_15', question: 'İlk bilgisayarın (ENIAC) yapıldığı ülke hangisidir?', options: ['İngiltere\'de yapılmıştır', 'ABD\'de yapılmıştır', 'Almanya\'da yapılmıştır', 'Japonya\'da yapılmıştır'], correctIndex: 1, explanation: 'ENIAC 1945\'te ABD\'de geliştirilmiştir.' },
    // Zor
    { id: 'gk4_16', question: 'Hangi antik yapı "Dünyanın Yedi Harikası" arasında olup günümüze ulaşmıştır?', options: ['İskenderiye Feneri ulaşmıştır', 'Keops Piramidi ulaşmıştır', 'Babil\'in Asma Bahçeleri ulaşmıştır', 'Rodos Heykeli ulaşmıştır'], correctIndex: 1, explanation: 'Keops Piramidi antik yedi harikadan günümüze ulaşan tek yapıdır.' },
    { id: 'gk4_17', question: 'Hangi bilim insanı radyoaktiviteyi keşfetmiştir?', options: ['Marie Curie keşfetmiştir', 'Henri Becquerel keşfetmiştir', 'Ernest Rutherford keşfetmiştir', 'Niels Bohr keşfetmiştir'], correctIndex: 1, explanation: 'Henri Becquerel 1896\'da radyoaktiviteyi keşfetmiştir.' },
    { id: 'gk4_18', question: '"Magna Carta" hangi ülkede ve hangi yüzyılda imzalanmıştır?', options: ['Fransa\'da 14. yüzyılda', 'İngiltere\'de 13. yüzyılda', 'Almanya\'da 15. yüzyılda', 'İspanya\'da 12. yüzyılda'], correctIndex: 1, explanation: 'Magna Carta 1215\'te İngiltere\'de (13. yüzyıl) imzalanmıştır.' },
    { id: 'gk4_19', question: 'Işığın bir yılda kat ettiği mesafeye ne ad verilmektedir?', options: ['Astronomik birim denir', 'Işık yılı denir', 'Parsek denir', 'Kiloparsek denir'], correctIndex: 1, explanation: 'Işık yılı, ışığın bir yılda kat ettiği mesafedir (~9.46 trilyon km).' },
    { id: 'gk4_20', question: 'Türkiye\'de anayasa mahkemesi ilk kez hangi yıl kurulmuştur?', options: ['1950 yılında kurulmuştur', '1961 yılında kurulmuştur', '1971 yılında kurulmuştur', '1982 yılında kurulmuştur'], correctIndex: 1, explanation: '1961 Anayasası ile Türkiye\'de Anayasa Mahkemesi kurulmuştur.' },
  ],
  test5: [
    { id: 'gk5_1', question: 'Dünya\'nın uydusu olan Ay\'ın yüzeyinde ne bulunmaz?', options: ['Krater bulunmaz', 'Atmosfer bulunmaz', 'Toz bulunmaz', 'Kaya bulunmaz'], correctIndex: 1, explanation: 'Ay\'da atmosfer yoktur.' },
    { id: 'gk5_2', question: 'Dört mevsimden hangisinde gündüzler en uzun sürmektedir?', options: ['İlkbahar\'da en uzundur', 'Yaz\'da en uzundur', 'Sonbahar\'da en uzundur', 'Kış\'ta en uzundur'], correctIndex: 1, explanation: 'Yaz mevsiminde gündüzler en uzun sürer.' },
    { id: 'gk5_3', question: 'İstiklal Marşı\'nın yazarı kimdir?', options: ['Namık Kemal yazmıştır', 'Mehmet Akif Ersoy yazmıştır', 'Tevfik Fikret yazmıştır', 'Ziya Gökalp yazmıştır'], correctIndex: 1, explanation: 'İstiklal Marşı\'nı Mehmet Akif Ersoy yazmıştır.' },
    { id: 'gk5_4', question: 'İnsan vücudundaki en küçük kemik nerededir?', options: ['El parmağında bulunur', 'Kulakta bulunur', 'Ayak parmağında bulunur', 'Burunda bulunur'], correctIndex: 1, explanation: 'İnsan vücudundaki en küçük kemik kulaktaki üzengi kemiğidir.' },
    { id: 'gk5_5', question: 'Hangi renk ışığın en kısa dalga boyuna sahip olduğu bilinmektedir?', options: ['Kırmızı en kısa dalga boyuna sahip', 'Yeşil en kısa dalga boyuna sahip', 'Mavi en kısa dalga boyuna sahip', 'Mor en kısa dalga boyuna sahip'], correctIndex: 3, explanation: 'Mor ışık görünür ışıkta en kısa dalga boyuna sahiptir.' },
    { id: 'gk5_6', question: 'Atatürk\'ün soyadı kanunuyla aldığı soyadı nedir?', options: ['Atatürk soyadını aldı', 'Türkoğlu soyadını aldı', 'Başbuğ soyadını aldı', 'Cumhur soyadını aldı'], correctIndex: 0, explanation: 'Mustafa Kemal\'e 1934\'te TBMM tarafından Atatürk soyadı verilmiştir.' },
    { id: 'gk5_7', question: 'Bir kilometre kaç metre yapmaktadır?', options: ['100 metre yapar', '500 metre yapar', '1000 metre yapar', '1500 metre yapar'], correctIndex: 2, explanation: '1 kilometre = 1000 metredir.' },
    // Orta
    { id: 'gk5_8', question: 'Hangi organ karbonhidratları sindirmek için öncelikle görev almaktadır?', options: ['Mide öncelikle görev alır', 'Karaciğer öncelikle görev alır', 'Ağız (tükürük) öncelikle görev alır', 'İnce bağırsak öncelikle görev alır'], correctIndex: 2, explanation: 'Karbonhidrat sindirimi tükürükteki amilaz enzimi ile ağızda başlar.' },
    { id: 'gk5_9', question: 'Türkiye\'nin en büyük gölü hangisidir?', options: ['Tuz Gölü en büyüktür', 'Van Gölü en büyüktür', 'Burdur Gölü en büyüktür', 'Beyşehir Gölü en büyüktür'], correctIndex: 1, explanation: 'Van Gölü Türkiye\'nin en büyük gölüdür.' },
    { id: 'gk5_10', question: 'Hangi ülkede "samuray" savaşçıları bulunmaktaydı?', options: ['Çin\'de bulunmaktaydı', 'Kore\'de bulunmaktaydı', 'Japonya\'da bulunmaktaydı', 'Vietnam\'da bulunmaktaydı'], correctIndex: 2, explanation: 'Samuraylar Japonya\'nın savaşçı sınıfıydı.' },
    { id: 'gk5_11', question: 'Elektriğin birimi aşağıdakilerden hangisidir?', options: ['Watt birimi elektrik', 'Amper birimi elektrik', 'Volt birimi elektrik', 'Joule birimi elektrik'], correctIndex: 1, explanation: 'Elektrik akımının birimi amperdir (A).' },
    { id: 'gk5_12', question: '"İlahi Komedya" adlı eserin yazarı olan ünlü şair kimdir?', options: ['Shakespeare yazmıştır', 'Dante Alighieri yazmıştır', 'Homer yazmıştır', 'Vergilius yazmıştır'], correctIndex: 1, explanation: 'İlahi Komedya, İtalyan şair Dante Alighieri tarafından yazılmıştır.' },
    { id: 'gk5_13', question: 'Hangi gazın atmosferdeki oranı yaklaşık %21\'dir?', options: ['Azot %21 oranındadır', 'Oksijen %21 oranındadır', 'Karbondioksit %21 oranındadır', 'Argon %21 oranındadır'], correctIndex: 1, explanation: 'Atmosferde oksijen yaklaşık %21 oranında bulunur.' },
    { id: 'gk5_14', question: 'Hangisi bir programlama dilidir?', options: ['HTML programlama dilidir', 'CSS programlama dilidir', 'Python programlama dilidir', 'SQL programlama dilidir'], correctIndex: 2, explanation: 'Python genel amaçlı bir programlama dilidir.' },
    { id: 'gk5_15', question: 'İnsan DNA\'sında yaklaşık kaç gen bulunmaktadır?', options: ['Yaklaşık 2.000 gen bulunur', 'Yaklaşık 20.000 gen bulunur', 'Yaklaşık 200.000 gen bulunur', 'Yaklaşık 2 milyon gen bulunur'], correctIndex: 1, explanation: 'İnsan genomunda yaklaşık 20.000-25.000 gen vardır.' },
    // Zor
    { id: 'gk5_16', question: 'Hangi antik medeniyet "sıfır" kavramını ilk kez matematik sisteminde kullanmıştır?', options: ['Mısır medeniyeti kullanmıştır', 'Yunan medeniyeti kullanmıştır', 'Hint (Babil) medeniyeti kullanmıştır', 'Çin medeniyeti kullanmıştır'], correctIndex: 2, explanation: 'Sıfır kavramı ilk olarak Hint-Babil matematikçileri tarafından kullanılmıştır.' },
    { id: 'gk5_17', question: '"Göbeklitepe" hangi ilde bulunmaktadır ve yaklaşık kaç yıl öncesine aittir?', options: ['Diyarbakır\'da, 8.000 yıl önce', 'Şanlıurfa\'da, 12.000 yıl önce', 'Mardin\'de, 6.000 yıl önce', 'Gaziantep\'te, 10.000 yıl önce'], correctIndex: 1, explanation: 'Göbeklitepe Şanlıurfa\'da bulunur ve yaklaşık 12.000 yıl öncesine aittir.' },
    { id: 'gk5_18', question: 'Kara delik kavramını ilk matematiksel olarak öngören bilim insanı kimdir?', options: ['Albert Einstein öngörmüştür', 'Karl Schwarzschild öngörmüştür', 'Stephen Hawking öngörmüştür', 'Roger Penrose öngörmüştür'], correctIndex: 1, explanation: 'Karl Schwarzschild 1916\'da Einstein denklemlerinden kara delik çözümünü bulmuştur.' },
    { id: 'gk5_19', question: 'Türkiye\'de ilk nüfus sayımı hangi yıl yapılmıştır?', options: ['1923 yılında yapılmıştır', '1927 yılında yapılmıştır', '1930 yılında yapılmıştır', '1935 yılında yapılmıştır'], correctIndex: 1, explanation: 'Türkiye\'de ilk genel nüfus sayımı 1927\'de yapılmıştır.' },
    { id: 'gk5_20', question: 'Evrendeki en bol bulunan elementin adı nedir?', options: ['Helyum en bol bulunur', 'Hidrojen en bol bulunur', 'Oksijen en bol bulunur', 'Karbon en bol bulunur'], correctIndex: 1, explanation: 'Hidrojen evrendeki en bol bulunan elementtir.' },
  ],
};

// Shuffle options for a GK question
function shuffleGKOptions(q: GKQuestion): GKQuestion {
  const indices = [0, 1, 2, 3];
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const newOptions = indices.map(i => q.options[i]) as [string, string, string, string];
  const newCorrectIndex = indices.indexOf(q.correctIndex);
  return { ...q, options: newOptions, correctIndex: newCorrectIndex };
}

export function getGKTests(): GKTest[] {
  return Object.entries(GK_QUESTIONS_RAW).map(([key, questions], index) => ({
    id: `gk_${key}`,
    name: `Genel Kültür ${index + 1}`,
    questions: questions.map(shuffleGKOptions),
  }));
}

export function getGKTestById(testId: string): GKTest | null {
  const tests = getGKTests();
  return tests.find(t => t.id === testId) || null;
}

export function getGKPForQuestion(questionIndex: number): number {
  if (questionIndex < 7) return 10; // Kolay
  if (questionIndex < 15) return 20; // Orta
  return 30; // Zor
}

export function getDifficultyLabel(questionIndex: number): { label: string; color: string } {
  if (questionIndex < 7) return { label: '🟢 Kolay', color: 'text-green-500' };
  if (questionIndex < 15) return { label: '🟡 Orta', color: 'text-yellow-500' };
  return { label: '🔴 Zor', color: 'text-red-500' };
}
