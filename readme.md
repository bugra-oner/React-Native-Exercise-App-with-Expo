<p align="center">
  <img width="250" height="250" src="https://www.yazilimturkiye.com/wp-content/uploads/2021/06/yenilogo.jpg">
</p>

<p align="center">
  <img width="255" height="500" src="/images/Homepage.png">
  <img width="250" height="500" src="/images/HomePageMiddle.png">
  <img width="250" height="500" src="/images/HomepageBottom.png">
  
  <img width="250" height="500" src="/images/Screenshot_1717704860.png">
  <img width="250" height="500" src="/images/Screenshot_1717704860.png">


</p>


# React Native Exercise App with Expo

Bu proje, kullanıcıların egzersiz planlarını oluşturup takip edebileceği bir React Native uygulamasıdır. Expo kullanılarak geliştirilmiştir.

## Özellikler

- **Egzersiz Planları**: KEgzersiz Planı Detayı: Seçilen bir egzersiz planının detaylarının görüntülendiği ekran
- **Aktivite Geçmişi**: Zorluğa göre artan seviye egzersizleri ve seçilebilen zorluğa göre antremanlar.
- **Farklı Egzersiz Türleri**: Çeşitli egzersiz türleri ekleyip yönetebilirsiniz.
- **Kişisel Hedefler**: Kullanıcılar, kişisel egzersiz hedeflerini belirleyip takip edebilirler.
- **Koç ekranı**: Koç ekranı ile birlikte egzersiz gifi ile yapacağınız egzersizi görebilirsiniz.


## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

1. Bu depoyu klonlayın:
    ```bash
    git clone https://github.com/bugra-oner/React-Native-Exercise-App-with-Expo.git
    cd React-Native-Exercise-App-with-Expo
    ```

2. Gerekli bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

3. Uygulamayı çalıştırın:
    ```bash
    expo start
    ```

4. **Expo Go Kullanımı**: Uygulamayı Expo Go kullanarak çalıştırabilirsiniz. Expo Go uygulamasını mobil cihazınıza yükleyin ve QR kodunu tarayın.

## Kullanım

- **Ana Ekran**: Mevcut egzersiz planlarınızı görüntüleyin.
- **Yeni Egzersiz Planı Ekleme**: `Yeni Plan Ekle` butonuna tıklayarak yeni egzersiz planları oluşturun.
- **Geçmiş**: Aktivite geçmişinizi görüntüleyin.
- **Hedefler**: Kişisel hedeflerinizi belirleyin ve takip edin.

## Dil Ayarları ve i18n Desteği

Bu uygulama, i18n (uluslararasılaştırma) desteği sağlar ve üç dilde kullanılabilir:

- İngilizce (varsayılan dil)
- İspanyolca
- Türkçe

## Proje Yapısı


```plaintext
src/
├── assets/         # Uygulama varlıkları (resimler, ikonlar)
├── components/     # Yeniden kullanılabilir bileşenler
├── navigation/     # Navigasyon ayarları ve dosyaları
├── screens/        # Uygulama ekranları
├── services/       # API servisleri ve veri işlemleri
└── utils/          # Yardımcı fonksiyonlar ve sabitler

