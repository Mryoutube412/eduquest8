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
  test6: [
    { id: 'gk6_1', question: 'Hangisi bir iç denizdir?', options: ['Karadeniz iç denizdir', 'Atlas Okyanusu iç denizdir', 'Hint Okyanusu iç denizdir', 'Pasifik Okyanusu iç denizdir'], correctIndex: 0, explanation: 'Karadeniz bir iç denizdir.' },
    { id: 'gk6_2', question: 'Hangi organ oksijeni kana karıştırır?', options: ['Kalp karıştırır', 'Akciğer karıştırır', 'Böbrek karıştırır', 'Karaciğer karıştırır'], correctIndex: 1, explanation: 'Akciğerler oksijeni kana karıştırır.' },
    { id: 'gk6_3', question: 'Türkiye\'nin en yüksek dağı hangisidir?', options: ['Uludağ en yüksektir', 'Erciyes en yüksektir', 'Ağrı Dağı en yüksektir', 'Kaçkar en yüksektir'], correctIndex: 2, explanation: 'Ağrı Dağı 5.137 m ile Türkiye\'nin en yüksek dağıdır.' },
    { id: 'gk6_4', question: 'Bir hafta kaç gün sürer?', options: ['5 gün sürer', '6 gün sürer', '7 gün sürer', '8 gün sürer'], correctIndex: 2, explanation: 'Bir hafta 7 gün sürer.' },
    { id: 'gk6_5', question: 'İnsan vücudundaki en büyük kemik hangisidir?', options: ['Kol kemiği en büyüktür', 'Uyluk kemiği en büyüktür', 'Kaburga en büyüktür', 'Omurga en büyüktür'], correctIndex: 1, explanation: 'Uyluk kemiği (femur) vücuttaki en büyük kemiktir.' },
    { id: 'gk6_6', question: 'Hangi gezegenin halkası vardır?', options: ['Mars\'ın halkası var', 'Venüs\'ün halkası var', 'Satürn\'ün halkası var', 'Merkür\'ün halkası var'], correctIndex: 2, explanation: 'Satürn buzdan oluşan halkaları ile ünlüdür.' },
    { id: 'gk6_7', question: 'Anadolu\'nun eski adı nedir?', options: ['Trakya eski adıdır', 'Asya Minor eski adıdır', 'Mezopotamya eski adıdır', 'Levant eski adıdır'], correctIndex: 1, explanation: 'Anadolu\'nun eski adı "Asia Minor" (Küçük Asya) dır.' },
    { id: 'gk6_8', question: 'Dünyadaki en büyük çöl hangisidir?', options: ['Gobi Çölü en büyüktür', 'Kalahari Çölü en büyüktür', 'Büyük Sahra en büyüktür', 'Atacama Çölü en büyüktür'], correctIndex: 2, explanation: 'Büyük Sahra yaklaşık 9,2 milyon km² ile en büyük sıcak çöldür.' },
    { id: 'gk6_9', question: 'İlk kağıdı hangi medeniyet icat etmiştir?', options: ['Mısırlılar icat etmiştir', 'Çinliler icat etmiştir', 'Romalılar icat etmiştir', 'Hintliler icat etmiştir'], correctIndex: 1, explanation: 'Kağıt MÖ 2. yüzyılda Çin\'de icat edilmiştir.' },
    { id: 'gk6_10', question: 'Hangi vitamin göz sağlığı için önemlidir?', options: ['A vitamini önemlidir', 'B vitamini önemlidir', 'C vitamini önemlidir', 'D vitamini önemlidir'], correctIndex: 0, explanation: 'A vitamini göz sağlığı için önemlidir.' },
    { id: 'gk6_11', question: 'Türkiye\'nin yedi coğrafi bölgesinden hangisi en küçüktür?', options: ['Güneydoğu Anadolu en küçüktür', 'Marmara en küçüktür', 'Ege en küçüktür', 'Akdeniz en küçüktür'], correctIndex: 0, explanation: 'Güneydoğu Anadolu Bölgesi en küçük coğrafi bölgedir.' },
    { id: 'gk6_12', question: 'Soğuk kanlı hayvan hangisidir?', options: ['Kedi soğuk kanlıdır', 'Kertenkele soğuk kanlıdır', 'Kartal soğuk kanlıdır', 'İnsan soğuk kanlıdır'], correctIndex: 1, explanation: 'Sürüngenler (kertenkele) soğuk kanlı hayvanlardır.' },
    { id: 'gk6_13', question: 'Ses boşlukta yayılabilir mi?', options: ['Evet yayılır', 'Hayır yayılamaz', 'Sadece yüksek frekansta', 'Sadece düşük frekansta'], correctIndex: 1, explanation: 'Ses bir ortam gerektirir, boşlukta yayılamaz.' },
    { id: 'gk6_14', question: 'Hangi bilim insanı evrim teorisini ortaya koymuştur?', options: ['Newton ortaya koymuştur', 'Darwin ortaya koymuştur', 'Einstein ortaya koymuştur', 'Mendel ortaya koymuştur'], correctIndex: 1, explanation: 'Charles Darwin evrim teorisini ortaya koymuştur.' },
    { id: 'gk6_15', question: 'İnsan beyninin ağırlığı yaklaşık kaç gramdır?', options: ['Yaklaşık 500 gramdır', 'Yaklaşık 1000 gramdır', 'Yaklaşık 1400 gramdır', 'Yaklaşık 2000 gramdır'], correctIndex: 2, explanation: 'İnsan beyninin ağırlığı yaklaşık 1.400 gramdır.' },
    { id: 'gk6_16', question: 'Hangi antlaşma ile Misak-ı Milli ilan edilmiştir?', options: ['Sivas Kongresi ile ilan', 'Son Osmanlı Meclisi ile ilan', 'Erzurum Kongresi ile ilan', 'Amasya Genelgesi ile ilan'], correctIndex: 1, explanation: 'Misak-ı Milli 28 Ocak 1920\'de Son Osmanlı Mebusan Meclisi\'nde kabul edilmiştir.' },
    { id: 'gk6_17', question: 'Pi sayısının ilk 4 basamağı nedir?', options: ['3.141 değerindedir', '3.142 değerindedir', '3.151 değerindedir', '3.125 değerindedir'], correctIndex: 0, explanation: 'Pi sayısı 3.14159... olarak başlar.' },
    { id: 'gk6_18', question: 'Hangi element periyodik tabloda en hafif olandır?', options: ['Helyum en hafiftir', 'Hidrojen en hafiftir', 'Lityum en hafiftir', 'Karbon en hafiftir'], correctIndex: 1, explanation: 'Hidrojen periyodik tablodaki en hafif elementtir.' },
    { id: 'gk6_19', question: 'İlk Türk devleti hangisidir?', options: ['Selçuklu ilk Türk devletidir', 'Büyük Hun ilk Türk devletidir', 'Göktürk ilk Türk devletidir', 'Uygur ilk Türk devletidir'], correctIndex: 1, explanation: 'Büyük Hun İmparatorluğu bilinen ilk Türk devletidir.' },
    { id: 'gk6_20', question: 'Karbon-14 yöntemi ne için kullanılır?', options: ['İlaç üretimi için', 'Yaş tayini için', 'Enerji üretimi için', 'Metal eritme için'], correctIndex: 1, explanation: 'Karbon-14 yöntemi organik maddelerin yaş tayini için kullanılır.' },
  ],
  test7: [
    { id: 'gk7_1', question: 'Türkiye\'nin denize kıyısı olmayan bölgesi hangisidir?', options: ['Akdeniz Bölgesi kıyısızdır', 'İç Anadolu kıyısızdır', 'Marmara kıyısızdır', 'Karadeniz kıyısızdır'], correctIndex: 1, explanation: 'İç Anadolu Bölgesi\'nin denize kıyısı yoktur.' },
    { id: 'gk7_2', question: 'Buz hangi sıcaklıkta erir?', options: ['0°C\'de erir', '-5°C\'de erir', '5°C\'de erir', '10°C\'de erir'], correctIndex: 0, explanation: 'Buz 0°C\'de erir.' },
    { id: 'gk7_3', question: 'Hangi hayvan memeliler sınıfına aittir?', options: ['Yılan memelilerdendir', 'Kartal memelilerdendir', 'Yunus memelilerdendir', 'Kurbağa memelilerdendir'], correctIndex: 2, explanation: 'Yunus bir memelidir.' },
    { id: 'gk7_4', question: 'Atatürk\'ün doğduğu şehir hangisidir?', options: ['İstanbul\'da doğmuştur', 'Ankara\'da doğmuştur', 'Selanik\'te doğmuştur', 'İzmir\'de doğmuştur'], correctIndex: 2, explanation: 'Atatürk 1881\'de Selanik\'te doğmuştur.' },
    { id: 'gk7_5', question: 'Dünyanın en uzun duvarı hangisidir?', options: ['Berlin Duvarı en uzundur', 'Çin Seddi en uzundur', 'Atlantik Duvarı en uzundur', 'Hadrianus Duvarı en uzundur'], correctIndex: 1, explanation: 'Çin Seddi yaklaşık 21.196 km ile dünyanın en uzun duvarıdır.' },
    { id: 'gk7_6', question: 'Bir üçgenin kaç kenarı vardır?', options: ['2 kenarı vardır', '3 kenarı vardır', '4 kenarı vardır', '5 kenarı vardır'], correctIndex: 1, explanation: 'Üçgenin 3 kenarı vardır.' },
    { id: 'gk7_7', question: 'Hangi ülke "Gün Batımı Ülkesi" olarak bilinir?', options: ['Japonya bu isimle bilinir', 'Fas bu isimle bilinir', 'Mısır bu isimle bilinir', 'İspanya bu isimle bilinir'], correctIndex: 1, explanation: 'Fas (Mağrib) "Gün Batımı Ülkesi" olarak bilinir.' },
    { id: 'gk7_8', question: 'Dünyanın en hızlı kara hayvanı hangisidir?', options: ['Aslan en hızlıdır', 'Çita en hızlıdır', 'Ceylan en hızlıdır', 'At en hızlıdır'], correctIndex: 1, explanation: 'Çita saatte 120 km hıza ulaşabilir.' },
    { id: 'gk7_9', question: 'Türkiye\'de ilk demiryolu nerede inşa edilmiştir?', options: ['İstanbul\'da inşa edildi', 'İzmir-Aydın hattı olarak inşa edildi', 'Ankara\'da inşa edildi', 'Adana\'da inşa edildi'], correctIndex: 1, explanation: 'Türkiye\'deki ilk demiryolu 1856\'da İzmir-Aydın hattıdır.' },
    { id: 'gk7_10', question: 'Hangi gezegenin günü Dünya\'dan uzundur?', options: ['Mars\'ın günü daha uzundur', 'Venüs\'ün günü daha uzundur', 'Jüpiter\'in günü daha uzundur', 'Merkür\'ün günü daha uzundur'], correctIndex: 1, explanation: 'Venüs\'ün bir günü 243 Dünya gününe eşittir.' },
    { id: 'gk7_11', question: 'İnsan vücudunda kaç litre kan bulunur?', options: ['Yaklaşık 3 litre bulunur', 'Yaklaşık 5 litre bulunur', 'Yaklaşık 8 litre bulunur', 'Yaklaşık 10 litre bulunur'], correctIndex: 1, explanation: 'Yetişkin bir insanda yaklaşık 5 litre kan bulunur.' },
    { id: 'gk7_12', question: 'Barut hangi uygarlık tarafından bulunmuştur?', options: ['Romalılar bulmuştur', 'Çinliler bulmuştur', 'Araplar bulmuştur', 'Hintliler bulmuştur'], correctIndex: 1, explanation: 'Barut 9. yüzyılda Çin\'de bulunmuştur.' },
    { id: 'gk7_13', question: 'Ses hangi ortamda en hızlı yayılır?', options: ['Havada en hızlı yayılır', 'Suda en hızlı yayılır', 'Katı maddede en hızlı yayılır', 'Boşlukta en hızlı yayılır'], correctIndex: 2, explanation: 'Ses katı ortamda en hızlı yayılır.' },
    { id: 'gk7_14', question: 'Türkiye\'nin en büyük adası hangisidir?', options: ['Bozcaada en büyüktür', 'Gökçeada en büyüktür', 'Kekova en büyüktür', 'Akdamar en büyüktür'], correctIndex: 1, explanation: 'Gökçeada Türkiye\'nin en büyük adasıdır.' },
    { id: 'gk7_15', question: 'Ay\'da yerçekimi Dünya\'nın kaçta kaçıdır?', options: ['1/2\'sidir', '1/4\'üdür', '1/6\'sıdır', '1/8\'idir'], correctIndex: 2, explanation: 'Ay\'da yerçekimi Dünya\'nın yaklaşık 1/6\'sıdır.' },
    { id: 'gk7_16', question: 'Hangi savaşta Türk ordusunun "Başkomutanlık Meydan Muharebesi" kazanılmıştır?', options: ['Sakarya Savaşı\'nda kazanıldı', 'Büyük Taarruz\'da kazanıldı', 'İnönü Savaşları\'nda kazanıldı', 'Çanakkale\'de kazanıldı'], correctIndex: 1, explanation: 'Başkomutanlık Meydan Muharebesi Büyük Taarruz sırasında kazanılmıştır.' },
    { id: 'gk7_17', question: 'Hangi gazın formülü CO₂\'dir?', options: ['Oksijen\'in formülüdür', 'Karbonmonoksit\'in formülüdür', 'Karbondioksit\'in formülüdür', 'Ozon\'un formülüdür'], correctIndex: 2, explanation: 'CO₂ karbondioksitin kimyasal formülüdür.' },
    { id: 'gk7_18', question: 'İlk antibiyotiği (penisilin) keşfeden bilim insanı kimdir?', options: ['Louis Pasteur keşfetmiştir', 'Alexander Fleming keşfetmiştir', 'Robert Koch keşfetmiştir', 'Edward Jenner keşfetmiştir'], correctIndex: 1, explanation: 'Alexander Fleming 1928\'de penisilin\'i keşfetmiştir.' },
    { id: 'gk7_19', question: 'Osmanlı\'nın son başkenti neresidir?', options: ['Bursa son başkenttir', 'Edirne son başkenttir', 'İstanbul son başkenttir', 'Ankara son başkenttir'], correctIndex: 2, explanation: 'Osmanlı İmparatorluğu\'nun son başkenti İstanbul\'dur.' },
    { id: 'gk7_20', question: 'Hangi protein DNA replikasyonunda görev alır?', options: ['RNA polimeraz görev alır', 'DNA polimeraz görev alır', 'Lipaz görev alır', 'Amilaz görev alır'], correctIndex: 1, explanation: 'DNA polimeraz DNA replikasyonunda görev alır.' },
  ],
  test8: [
    { id: 'gk8_1', question: 'Hangisi bir kış sporudur?', options: ['Tenis kış sporudur', 'Buz hokeyi kış sporudur', 'Basketbol kış sporudur', 'Yüzme kış sporudur'], correctIndex: 1, explanation: 'Buz hokeyi bir kış sporudur.' },
    { id: 'gk8_2', question: 'Türkiye\'nin başkenti ne zaman Ankara olmuştur?', options: ['1920\'de olmuştur', '1921\'de olmuştur', '1923\'te olmuştur', '1925\'te olmuştur'], correctIndex: 2, explanation: 'Ankara 1923\'te Cumhuriyet\'in ilanıyla başkent olmuştur.' },
    { id: 'gk8_3', question: 'Hangi element altının simgesidir?', options: ['Ag altının simgesidir', 'Au altının simgesidir', 'Al altının simgesidir', 'At altının simgesidir'], correctIndex: 1, explanation: 'Au (Aurum) altının kimyasal simgesidir.' },
    { id: 'gk8_4', question: 'Bir dikdörtgenin kaç köşesi vardır?', options: ['3 köşesi vardır', '4 köşesi vardır', '5 köşesi vardır', '6 köşesi vardır'], correctIndex: 1, explanation: 'Dikdörtgenin 4 köşesi vardır.' },
    { id: 'gk8_5', question: 'Dünyanın en soğuk kıtası hangisidir?', options: ['Kuzey Amerika en soğuktur', 'Avrupa en soğuktur', 'Antarktika en soğuktur', 'Asya en soğuktur'], correctIndex: 2, explanation: 'Antarktika dünyanın en soğuk kıtasıdır.' },
    { id: 'gk8_6', question: 'İlk kadın astronot kimdir?', options: ['Sally Ride ilk kadın astronottur', 'Valentina Tereşkova ilk kadın astronottur', 'Mae Jemison ilk kadın astronottur', 'Peggy Whitson ilk kadın astronottur'], correctIndex: 1, explanation: 'Valentina Tereşkova 1963\'te uzaya çıkan ilk kadındır.' },
    { id: 'gk8_7', question: 'Hangi meyve C vitamini bakımından zengindir?', options: ['Elma zengindir', 'Portakal zengindir', 'Muz zengindir', 'Üzüm zengindir'], correctIndex: 1, explanation: 'Portakal C vitamini bakımından zengin bir meyvedir.' },
    { id: 'gk8_8', question: 'Dünyanın en kalabalık şehri hangisidir (nüfus)?', options: ['New York en kalabalıktır', 'Tokyo en kalabalıktır', 'İstanbul en kalabalıktır', 'Pekin en kalabalıktır'], correctIndex: 1, explanation: 'Tokyo metropol alanı en kalabalık şehirdir.' },
    { id: 'gk8_9', question: 'Fotosentez sırasında bitkiler hangi gazı salar?', options: ['Karbondioksit salar', 'Azot salar', 'Oksijen salar', 'Hidrojen salar'], correctIndex: 2, explanation: 'Bitkiler fotosentez sırasında oksijen salar.' },
    { id: 'gk8_10', question: 'Hangi ülke pizza\'nın anavatanı sayılır?', options: ['Fransa anavatanıdır', 'İtalya anavatanıdır', 'Yunanistan anavatanıdır', 'İspanya anavatanıdır'], correctIndex: 1, explanation: 'Pizza İtalya\'da ortaya çıkmıştır.' },
    { id: 'gk8_11', question: 'İnsan kalbi bir günde yaklaşık kaç kez atar?', options: ['Yaklaşık 50.000 kez atar', 'Yaklaşık 100.000 kez atar', 'Yaklaşık 150.000 kez atar', 'Yaklaşık 200.000 kez atar'], correctIndex: 1, explanation: 'İnsan kalbi günde yaklaşık 100.000 kez atar.' },
    { id: 'gk8_12', question: 'İlk televizyon yayını hangi ülkede yapılmıştır?', options: ['ABD\'de yapılmıştır', 'İngiltere\'de yapılmıştır', 'Almanya\'da yapılmıştır', 'Fransa\'da yapılmıştır'], correctIndex: 1, explanation: 'İlk düzenli TV yayını 1936\'da BBC tarafından yapılmıştır.' },
    { id: 'gk8_13', question: 'Bir çeyrek saat kaç dakikadır?', options: ['10 dakikadır', '15 dakikadır', '20 dakikadır', '25 dakikadır'], correctIndex: 1, explanation: 'Bir çeyrek saat 15 dakikadır.' },
    { id: 'gk8_14', question: 'Hangi ülke "Bin Göller Ülkesi" olarak bilinir?', options: ['İsveç bu isimle bilinir', 'Finlandiya bu isimle bilinir', 'Norveç bu isimle bilinir', 'Kanada bu isimle bilinir'], correctIndex: 1, explanation: 'Finlandiya yaklaşık 188.000 gölüyle "Bin Göller Ülkesi" olarak bilinir.' },
    { id: 'gk8_15', question: 'Hangisi bir yenilenebilir enerji kaynağıdır?', options: ['Kömür yenilenebilirdir', 'Doğalgaz yenilenebilirdir', 'Güneş enerjisi yenilenebilirdir', 'Petrol yenilenebilirdir'], correctIndex: 2, explanation: 'Güneş enerjisi yenilenebilir enerji kaynağıdır.' },
    { id: 'gk8_16', question: 'Hangi savaş Osmanlı\'nın Balkanlardaki son büyük yenilgisidir?', options: ['Balkan Savaşları son yenilgidir', 'I. Dünya Savaşı son yenilgidir', 'Kırım Savaşı son yenilgidir', '93 Harbi son yenilgidir'], correctIndex: 0, explanation: 'Balkan Savaşları (1912-1913) Osmanlı\'nın Balkanlardaki son büyük yenilgisidir.' },
    { id: 'gk8_17', question: 'Mutlak sıfır kaç derece Celsius\'tur?', options: ['-100°C değerindedir', '-196°C değerindedir', '-273.15°C değerindedir', '-373°C değerindedir'], correctIndex: 2, explanation: 'Mutlak sıfır -273.15°C\'dir.' },
    { id: 'gk8_18', question: '"Savaş ve Barış" romanının yazarı kimdir?', options: ['Dostoyevski yazmıştır', 'Tolstoy yazmıştır', 'Çehov yazmıştır', 'Gorki yazmıştır'], correctIndex: 1, explanation: 'Savaş ve Barış, Lev Tolstoy tarafından yazılmıştır.' },
    { id: 'gk8_19', question: 'Türkiye\'de harf inkılabı hangi yıl yapılmıştır?', options: ['1926\'da yapılmıştır', '1928\'de yapılmıştır', '1930\'da yapılmıştır', '1932\'de yapılmıştır'], correctIndex: 1, explanation: 'Harf inkılabı 1 Kasım 1928\'de yapılmıştır.' },
    { id: 'gk8_20', question: 'Elektron hangi yükü taşır?', options: ['Pozitif yük taşır', 'Negatif yük taşır', 'Nötr yüktür', 'Hem pozitif hem negatif'], correctIndex: 1, explanation: 'Elektron negatif yük taşır.' },
  ],
  test9: [
    { id: 'gk9_1', question: 'Hangisi bir yarımadadır?', options: ['Kıbrıs yarımadadır', 'İtalya yarımadadır', 'İzlanda yarımadadır', 'Madagaskar yarımadadır'], correctIndex: 1, explanation: 'İtalya bir yarımadadır.' },
    { id: 'gk9_2', question: 'Kaç santimetre bir metreyi oluşturur?', options: ['10 santimetre', '50 santimetre', '100 santimetre', '1000 santimetre'], correctIndex: 2, explanation: '100 santimetre = 1 metre.' },
    { id: 'gk9_3', question: 'Dinozorlar hangi dönemde yaşamıştır?', options: ['Paleozoik dönemde yaşadı', 'Mezozoik dönemde yaşadı', 'Senozoik dönemde yaşadı', 'Prekambriyen dönemde yaşadı'], correctIndex: 1, explanation: 'Dinozorlar Mezozoik dönemde yaşamıştır.' },
    { id: 'gk9_4', question: 'Türk kahvesi hangi yüzyılda İstanbul\'a gelmiştir?', options: ['14. yüzyılda gelmiştir', '15. yüzyılda gelmiştir', '16. yüzyılda gelmiştir', '17. yüzyılda gelmiştir'], correctIndex: 2, explanation: 'Türk kahvesi 16. yüzyılda Osmanlı\'ya gelmiştir.' },
    { id: 'gk9_5', question: 'Göz rengi hangi madde tarafından belirlenir?', options: ['Keratin belirler', 'Melanin belirler', 'Hemoglobin belirler', 'Kolajen belirler'], correctIndex: 1, explanation: 'Göz rengi melanin pigmenti tarafından belirlenir.' },
    { id: 'gk9_6', question: 'Hangi ülke ikinci dünya savaşında tarafsız kalmıştır?', options: ['Fransa tarafsız kalmıştır', 'Polonya tarafsız kalmıştır', 'İsviçre tarafsız kalmıştır', 'Belçika tarafsız kalmıştır'], correctIndex: 2, explanation: 'İsviçre II. Dünya Savaşı\'nda tarafsız kalmıştır.' },
    { id: 'gk9_7', question: 'Bir yüzyıl kaç yıla eşittir?', options: ['50 yıla eşittir', '100 yıla eşittir', '500 yıla eşittir', '1000 yıla eşittir'], correctIndex: 1, explanation: 'Bir yüzyıl 100 yıla eşittir.' },
    { id: 'gk9_8', question: 'Hangi organ insülin hormonunu üretir?', options: ['Karaciğer üretir', 'Pankreas üretir', 'Böbrek üretir', 'Tiroid üretir'], correctIndex: 1, explanation: 'Pankreas insülin hormonunu üretir.' },
    { id: 'gk9_9', question: 'Dünyadaki en eski üniversite hangisidir?', options: ['Oxford en eskidir', 'Bologna en eskidir', 'El-Karaviyyin en eskidir', 'Cambridge en eskidir'], correctIndex: 2, explanation: 'El-Karaviyyin Üniversitesi (859) dünyanın en eski üniversitesidir.' },
    { id: 'gk9_10', question: 'Hangi madde mıknatısa yapışır?', options: ['Bakır yapışır', 'Alüminyum yapışır', 'Demir yapışır', 'Altın yapışır'], correctIndex: 2, explanation: 'Demir mıknatısa yapışan ferromanyetik bir metaldir.' },
    { id: 'gk9_11', question: 'İnsan vücudunda en çok bulunan element hangisidir?', options: ['Karbon en çok bulunur', 'Oksijen en çok bulunur', 'Hidrojen en çok bulunur', 'Azot en çok bulunur'], correctIndex: 1, explanation: 'Oksijen insan vücudunun %65\'ini oluşturur.' },
    { id: 'gk9_12', question: 'Hangi müzik aleti telli çalgılar grubundadır?', options: ['Flüt telli çalgıdır', 'Keman telli çalgıdır', 'Davul telli çalgıdır', 'Trompet telli çalgıdır'], correctIndex: 1, explanation: 'Keman telli çalgılar grubundadır.' },
    { id: 'gk9_13', question: 'Futbolda bir maç kaç dakika sürer?', options: ['60 dakika sürer', '80 dakika sürer', '90 dakika sürer', '120 dakika sürer'], correctIndex: 2, explanation: 'Bir futbol maçı 90 dakika sürer.' },
    { id: 'gk9_14', question: 'Hangi ülkede Machu Picchu bulunur?', options: ['Meksika\'da bulunur', 'Peru\'da bulunur', 'Kolombiya\'da bulunur', 'Brezilya\'da bulunur'], correctIndex: 1, explanation: 'Machu Picchu Peru\'da bulunan İnka kalıntısıdır.' },
    { id: 'gk9_15', question: 'Türkiye\'nin en büyük barajı hangisidir?', options: ['Keban Barajı en büyüktür', 'Atatürk Barajı en büyüktür', 'Ilısu Barajı en büyüktür', 'Karakaya Barajı en büyüktür'], correctIndex: 1, explanation: 'Atatürk Barajı Türkiye\'nin en büyük barajıdır.' },
    { id: 'gk9_16', question: 'Hangi bilim dalı yıldızları inceler?', options: ['Jeoloji inceler', 'Astronomi inceler', 'Biyoloji inceler', 'Meteoroloji inceler'], correctIndex: 1, explanation: 'Astronomi yıldızları ve gök cisimlerini inceleyen bilim dalıdır.' },
    { id: 'gk9_17', question: 'Altın oran (φ) yaklaşık kaçtır?', options: ['Yaklaşık 1.414\'tür', 'Yaklaşık 1.618\'dir', 'Yaklaşık 2.236\'dır', 'Yaklaşık 3.14\'tür'], correctIndex: 1, explanation: 'Altın oran yaklaşık 1.618\'dir.' },
    { id: 'gk9_18', question: 'Hangi gezegen Güneş\'ten en uzaktadır?', options: ['Uranüs en uzaktır', 'Neptün en uzaktır', 'Satürn en uzaktır', 'Plüton en uzaktır'], correctIndex: 1, explanation: 'Neptün Güneş sistemindeki en uzak gezegendir (Plüton cüce gezegen).' },
    { id: 'gk9_19', question: 'Osmanlı\'da Tanzimat Fermanı hangi yıl ilan edilmiştir?', options: ['1839\'da ilan edilmiştir', '1856\'da ilan edilmiştir', '1876\'da ilan edilmiştir', '1908\'de ilan edilmiştir'], correctIndex: 0, explanation: 'Tanzimat Fermanı 1839\'da ilan edilmiştir.' },
    { id: 'gk9_20', question: 'Hangi tür enerji hareket eden cisimlerde bulunur?', options: ['Potansiyel enerji bulunur', 'Kinetik enerji bulunur', 'Kimyasal enerji bulunur', 'Nükleer enerji bulunur'], correctIndex: 1, explanation: 'Hareket eden cisimlerde kinetik enerji bulunur.' },
  ],
  test10: [
    { id: 'gk10_1', question: 'Dünya\'nın kaç katmanı vardır?', options: ['2 katmanı vardır', '3 katmanı vardır', '4 katmanı vardır', '5 katmanı vardır'], correctIndex: 2, explanation: 'Dünya\'nın 4 ana katmanı vardır: kabuk, manto, dış çekirdek, iç çekirdek.' },
    { id: 'gk10_2', question: 'Hangi hayvan en uzun ömürlü olarak bilinir?', options: ['Fil en uzun ömürlüdür', 'Kaplumbağa en uzun ömürlüdür', 'Balina en uzun ömürlüdür', 'Papağan en uzun ömürlüdür'], correctIndex: 1, explanation: 'Dev kaplumbağalar 200 yılı aşkın yaşayabilir.' },
    { id: 'gk10_3', question: 'İstiklal Marşı kaç kıtadan oluşur?', options: ['7 kıtadan oluşur', '10 kıtadan oluşur', '12 kıtadan oluşur', '15 kıtadan oluşur'], correctIndex: 1, explanation: 'İstiklal Marşı 10 kıtadan oluşur, ilk 2 kıtası okunur.' },
    { id: 'gk10_4', question: 'Dünyanın en büyük okyanusu hangisidir?', options: ['Atlas Okyanusu en büyüktür', 'Hint Okyanusu en büyüktür', 'Pasifik Okyanusu en büyüktür', 'Arktik Okyanus en büyüktür'], correctIndex: 2, explanation: 'Pasifik (Büyük) Okyanus dünyanın en büyük okyanusudur.' },
    { id: 'gk10_5', question: 'İnsan vücudunda kaç çift kaburga kemiği bulunur?', options: ['10 çift bulunur', '12 çift bulunur', '14 çift bulunur', '16 çift bulunur'], correctIndex: 1, explanation: 'İnsan vücudunda 12 çift kaburga kemiği vardır.' },
    { id: 'gk10_6', question: 'Türkiye\'nin komşusu olmayan ülke hangisidir?', options: ['Suriye komşu değildir', 'Mısır komşu değildir', 'Gürcistan komşu değildir', 'Irak komşu değildir'], correctIndex: 1, explanation: 'Mısır Türkiye\'nin komşusu değildir.' },
    { id: 'gk10_7', question: 'Bir düzinede kaç adet bulunur?', options: ['6 adet bulunur', '10 adet bulunur', '12 adet bulunur', '24 adet bulunur'], correctIndex: 2, explanation: 'Bir düzinede 12 adet bulunur.' },
    { id: 'gk10_8', question: 'Hangi bilim insanı teleskopla gözlem yapan ilk kişidir?', options: ['Kopernik ilk gözlemcidir', 'Galileo ilk gözlemcidir', 'Kepler ilk gözlemcidir', 'Newton ilk gözlemcidir'], correctIndex: 1, explanation: 'Galileo Galilei 1609\'da teleskopla astronomik gözlem yapan ilk kişidir.' },
    { id: 'gk10_9', question: 'Türkiye\'nin en uzun nehri hangisidir?', options: ['Fırat en uzundur', 'Kızılırmak en uzundur', 'Sakarya en uzundur', 'Dicle en uzundur'], correctIndex: 1, explanation: 'Kızılırmak 1.355 km ile Türkiye sınırları içindeki en uzun nehirdir.' },
    { id: 'gk10_10', question: 'Hangi madde mıknatıslık özelliği göstermez?', options: ['Demir göstermez', 'Bakır göstermez', 'Nikel göstermez', 'Kobalt göstermez'], correctIndex: 1, explanation: 'Bakır mıknatıslık özelliği göstermeyen bir metaldir.' },
    { id: 'gk10_11', question: 'Dünyanın en yoğun nüfuslu kıtası hangisidir?', options: ['Afrika en yoğundur', 'Asya en yoğundur', 'Avrupa en yoğundur', 'Güney Amerika en yoğundur'], correctIndex: 1, explanation: 'Asya yaklaşık 4.7 milyar nüfusla en yoğun kıtadır.' },
    { id: 'gk10_12', question: 'İlk insanlı uzay uçuşu hangi yıl gerçekleşmiştir?', options: ['1957\'de gerçekleşti', '1961\'de gerçekleşti', '1969\'da gerçekleşti', '1971\'de gerçekleşti'], correctIndex: 1, explanation: 'Yuri Gagarin 1961\'de ilk insanlı uzay uçuşunu gerçekleştirdi.' },
    { id: 'gk10_13', question: 'Hangi ülkede Amazon ormanları bulunur?', options: ['Kolombiya\'da bulunur', 'Venezuela\'da bulunur', 'Brezilya\'da bulunur', 'Peru\'da bulunur'], correctIndex: 2, explanation: 'Amazon ormanlarının büyük kısmı Brezilya\'dadır.' },
    { id: 'gk10_14', question: 'Bir oktavda kaç nota vardır?', options: ['5 nota vardır', '7 nota vardır', '8 nota vardır', '12 nota vardır'], correctIndex: 1, explanation: 'Bir oktavda 7 temel nota vardır (Do, Re, Mi, Fa, Sol, La, Si).' },
    { id: 'gk10_15', question: 'Osmanlı\'da ilk anayasa (Kanun-i Esasi) ne zaman ilan edilmiştir?', options: ['1839\'da ilan edilmiştir', '1856\'da ilan edilmiştir', '1876\'da ilan edilmiştir', '1908\'de ilan edilmiştir'], correctIndex: 2, explanation: 'Kanun-i Esasi 1876\'da ilan edilmiştir.' },
    { id: 'gk10_16', question: 'Hangi atom modeli "üzümlü kek" modeli olarak bilinir?', options: ['Rutherford modeli bilinir', 'Thomson modeli bilinir', 'Bohr modeli bilinir', 'Dalton modeli bilinir'], correctIndex: 1, explanation: 'Thomson atom modeli "üzümlü kek" modeli olarak bilinir.' },
    { id: 'gk10_17', question: 'Dünyanın en büyük gölü hangisidir?', options: ['Victoria Gölü en büyüktür', 'Baykal Gölü en büyüktür', 'Hazar Denizi en büyüktür', 'Superior Gölü en büyüktür'], correctIndex: 2, explanation: 'Hazar Denizi (göl olarak) 371.000 km² ile dünyanın en büyük gölüdür.' },
    { id: 'gk10_18', question: 'Hangi keşif Coğrafi Keşifler döneminin başlangıcı sayılır?', options: ['Hindistan\'ın keşfi başlangıçtır', 'Amerika\'nın keşfi başlangıçtır', 'Ümit Burnu\'nun geçilmesi başlangıçtır', 'Avustralya\'nın keşfi başlangıçtır'], correctIndex: 1, explanation: 'Kristof Kolomb\'un 1492\'de Amerika\'yı keşfi dönüm noktasıdır.' },
    { id: 'gk10_19', question: 'Işık yılı bir zaman birimi midir?', options: ['Evet zaman birimidir', 'Hayır uzaklık birimidir', 'Hız birimidir', 'Kütle birimidir'], correctIndex: 1, explanation: 'Işık yılı bir uzaklık birimidir, ışığın bir yılda kat ettiği mesafedir.' },
    { id: 'gk10_20', question: 'Hangi Türk bilim insanı cebirin kurucusu kabul edilir?', options: ['İbn Sina kurucusudur', 'Harezmî kurucusudur', 'Biruni kurucusudur', 'El-Cezeri kurucusudur'], correctIndex: 1, explanation: 'Harezmî cebir biliminin kurucusu kabul edilir.' },
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
