<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">Dapatkan statistik GitHub yang dihasilkan secara dinamis di readmes Anda!</p>
</p>
  <p align="center">
    <a href="https://github.com/anuraghazra/github-readme-stats/actions">
      <img alt="Tests Passing" src="https://github.com/anuraghazra/github-readme-stats/workflows/Test/badge.svg" />
    </a>
    <a href="https://codecov.io/gh/anuraghazra/github-readme-stats">
      <img src="https://codecov.io/gh/anuraghazra/github-readme-stats/branch/master/graph/badge.svg" />
    </a>
    <a href="https://github.com/anuraghazra/github-readme-stats/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/anuraghazra/github-readme-stats?color=0088ff" />
    </a>
    <a href="https://github.com/anuraghazra/github-readme-stats/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/anuraghazra/github-readme-stats?color=0088ff" />
    </a>
    <br />
    <br />
    <a href="https://a.paddle.com/v2/click/16413/119403?link=1227">
      <img src="https://img.shields.io/badge/Didukung%20oleh-VSCode%20Power%20User%20%E2%86%92-gray.svg?colorA=655BE1&colorB=4F44D6&style=for-the-badge"/>
    </a>
    <a href="https://a.paddle.com/v2/click/16413/119403?link=2345">
      <img src="https://img.shields.io/badge/Didukung%20Oleh-Node%20Cli.com%20%E2%86%92-gray.svg?colorA=61c265&colorB=4CAF50&style=for-the-badge"/>
    </a>
  </p>

  <p align="center">
    <a href="#démo">Lihat Demo</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Laporkan Kesalahan</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Fitur Permintaan</a>
  </p>
  <p align="center">
    <a href="/docs/readme_fr.md">Français</a>
    ·
    <a href="/docs/readme_cn.md">简体中文</a>
    ·
    <a href="/docs/readme_es.md">Español</a>
    ·
    <a href="/docs/readme_de.md">Deutsch</a>
    ·
    <a href="/docs/readme_ja.md">日本語</a>
    ·
    <a href="/docs/readme_pt-BR.md">Português Brasileiro</a>
    ·
    <a href="/docs/readme_it.md">Italiano</a>
    ·
    <a href="/docs/readme_kr.md">한국어</a>
    .
    <a href="/docs/readme_nl.md">Nederlands</a>
    .
    <a href="/docs/readme_np.md">नेपाली</a>
  </p>
</p>
<p align="center">Suka Project ini? Pertimbangkan <a href="https://www.paypal.me/anuraghazra">Donasi</a> untuk membantu pengembangan
# Features

- [Kartu Statistik Github](#kartu-statis-github)
- [Github Ekstra Pin](#github-ekstra-pin)
- [Bahasa Teratas pada kartu](#bahasa-teratas-pada-kartu)
- [Tema](#tema)
- [Kustomisasi](#kustomisasi)
- [Deploy ke Vercel anda](#terapkan-pada-instance-vercel-anda-sendiri)

# Kartu Statistik Github

Salin dan tempelkan ini ke konten markdown anda, hanya itu saja. Sederhana !

Ganti isi `?username=` ke nama pengguna Github anda 

```md
[![Les Stats GitHub de Anurag](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_Note: Ranking yang tersedia adalah S+ (top 1%), S (top 25%), A++ (top 45%), A+ (top 60%), dan B+ (semuanya). Nilai dihitung dengan menggunakan fungsi distribusi kumulatif menggunakan komitmen, kontribusi, permasalahan, bintang, pull request, pengikut, dan repositori yang dimiliki., implementasi dapat dilihat di [src/calculateRank.js](../src/calculateRank.js)_

### Menyembunyikan statistik individu

Untuk menyembunyikan statistik spesifik, anda dapat menambahkan query parameter `?hide=` dengan isi nilai yang dipisahkan dengan tanda koma.

> Options: `&hide=stars,commits,prs,issues,contribs`

```md
![Les Stats GitHub de Anurag](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### Menambahkan hitungan kontribusi pribadi untuk menjumlah hitungan perubahan

Anda dapat menambahkan hitungan dari semua kontribusi pribadi anda untuk menjumlahkan total hitungan perubahan menggunakan query parameter `?count_private=true`.

_Note: Jika Anda menerapkan ini ke proyek anda sendiri, kontribusi akan dihitung semula. Jika tidak, Anda harus memilih untuk membagikan jumlah kontribusi pribadi anda anda._

> Options: `&count_private=true`

```md
![Les Stats GitHub de Anurag](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### Menampilkan Ikon

untuk menampilkan ikon, kamu dapat menambahkan `show_icons=true` pada query parameter, seperti :

```md
![Les Stats GitHub de Anurag](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### Tema

Dengan tema bawaan, Anda dapat menyesuaikan tampilan kartu statistik tanpa melakukan apa pun [Kustomisasi](#kustomisasi).

gunakan `?theme=THEME_NAME` pada query parameter seperti :-

```md
![Les Stats GitHub de Anurag](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### Semua tema bawaan :-

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

Anda dapat melihat pada pratinjau untuk [Semua tema yang tersedia](../themes/README.md) atau dapat memeriksa [file konfig tema](../themes/index.js) & **anda juga dapat melakukan kontribusi untuk pembuatan tema baru** jika anda mau :D

### Kustomisasi

Anda dapat melakukan kustomisasi tampilan dari `kartu statistik anda` atau `kartu repo` namun dengan parameter URL yang dinamis.

#### Opsi Umum:

- `title_color` - Warna Judul Kartu _(hex color)_
- `text_color` - Warna isi teks _(hex color)_
- `icon_color` - Warna ikon jika tersedia _(hex color)_
- `border_color` - Warna pada garis tepi kartu _(hex color)_.Tidak berlaku saat `hide_border` diaktifkan
- `bg_color` - Warna Latar belakang kartu _(hex color)_ **atau** gradasi pada form _angle,start,end_
- `hide_border` - Menyembunyikan garis tepi pada kartu _(boolean)_
- `theme` - nama dari tema, pilih dari [semua tema yang tersedia](../themes/README.md)
- `cache_seconds` - atur header cache secara  manual _(min: 1800, max: 86400)_
- `locale` - atur bahasa pada kartu _(contoh. cn, de, es, etc.)_

##### Gradasi pada warna latar belakang

Anda dapat memberikan beberapa nilai yang dipisahkan ddengan tanda koma dalam opsi `bg_color` untuk menampilkan gradasi warna, format gradasi :-

```
&bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10
```

> Catatan tentang cache: Kartu Repo memiliki cache bawaan 4 jam (14400 detik) jika jumlah fork & jumlah bintang kurang dari 1k, jika tidak, 2 jam (7200 detik). Juga, perhatikan bahwa cache antara minimal 2 jam dan maksimal 24 jam.

#### Opsi Statistik Kartu Ekslusif:

-   `hide` - Menyembunyikan spesifik item dari statistik _(nilai dipisahkan tanda koma)_
-   `hide_title` - menyembuyikan judul _(boolean)_
-   `hide_rank` - menyembunyikan peringkat secara otomatis _(boolean)_
-   `show_icons` - menampilkan ikon _(boolean)_
-   `include_all_commits` - menghitung total jumlah perubahan pada tahun saat ini _(boolean)_
-   `count_private` - menghitung total perubahan pada repo pribadi _(boolean)_
-   `line_height` - mengatur tinggi garis antara teks _(number)_
- `custom_title` - mengatur kustomisasi pada judul kartu
- `disable_animations` - menonaktifkan semua animasi pada kartu _(boolean)_

#### Opsi Repo pada Kartu Ekslusif:

-   `show_owner` - Menampilkan nama pemiliki repo _(boolean)_

#### Opsi Bahasa pada Kartu Eklusif:

-   `hide` - menyembunyikan spesifik bahasa dari kartu _(dipisahkan dengan tanda koma)_
-   `hide_title` - Menyembunyikan judul _(boolean)_
-   `layout` - mengatur jarak antara dua tata letak yang tersedia `default` & `compact`
-   `card_width` - mengatur panjang kartu secara manual _(number)_
-   `langs_count` - menampilkan lebih banyak bahasa pada kartu, antara 1 - 10, secara bawaan adalah 5 _(number)_

> :warning: **Penting:**
> Bahasa harus sesuai uri-escape, seperti [Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding)
> (seperti: `c++` harus menjadi `c%2B%2B`, `jupyter notebook` harus menjadi `jupyter%20notebook`, dll.)

---

# Github Ekstra Pin

Github Ekstra Pin mengijinkan anda untuk melakukan pin lebih dari 6 repository pada profil andda menggunakan Github Readme Profile.

Yay! Anda tidak lagi terbatas pada 6 repositori yang disematkan.

### Penggunaan

Copy-Paste atau salin-tempelkan kode ini pada readme annda dan ubah linknya.

Endpoint: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Carte ReadMe](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

gunakan [show_owner](#customization) variabel untuk memasukan username atau nama pengguna pemilik repo.

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# Bahasa Teratas pada Kartu

Bahasa Teratas pada kartu menampilkan bahasa yang sering digunakan pengguna Github .

_Catatan: Bahasa Teratas tidak menunjukan tingkat keahlian atau semacamnya, ini adalah matrik Github dari bahasa mana yang sering digunakan pada kode Github anda, Ini adalah fitur baru dari github-readme-stats_

### Penggunaan

Copy-Paste atau Salin-tempelkan kode ini ke reade anda dan ubah linknya.

Endpoint: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Menyembunyikan Repository Individu

Anda dapat menggunakan `?exclude_repo=repo1,repo2` parameter untuk menyembunyian repository individu.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&exclude_repo=github-readme-stats,anuraghazra.github.io)](https://github.com/anuraghazra/github-readme-stats)
```

### Menyembunyikan Bahasa Individu

Anda dapat menggunakan `?hide=language1,language2` parameter untuk menyembunyian bahasa individu.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### Menampilkan lebih banyak Bahasa

Anda dapat menggunakan opsi `&layout=compact` untuk menaikan atau menurunkan nilai dari bahasa yang ditampilkan pada kartu. nilai yang valid adalah integer antara 1 sampai 10 (inklusif), dan bawaan adalah 5

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Ringkas Tata Letak Bahasa pada kartu
Anda dapat menggunakan opsi `&layout=compact` untuk merubah desain kartu
```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Penggunaan

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

### Rignkas Kartu

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### Wakatime statistik mingguan
Ubah nilai nama pengguna atau username `?username=` ke wakatime nama pengguna atau username anda.

```md
[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)
```

#### Penggunaan
[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)

- Tata Letak Ringkas

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

#### Seluruh Penggunaan


- Bawaan

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Menyembunyikan Statistik spesifik

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- Menampilkan Ikon

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- Kustomisasi Warna pada batas kartu

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&border_color=2e4058)

- Memasukan Seluruh Perubahan

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- Tema

Pilih Semua Tema dari [Tema Bawaan](#tema)

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- Gradasi

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- Kustomisasi Statistik pada kartu

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- mengatur bahasa kartu

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&locale=id)

- Kustomisasi Kartu Repo

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- Bahasa Teratas

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Kartu Wakatime

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

---

### Tips Singkat (Menjajarkan kartu Repo)

Anda biasanya tidak akan dapat mengatur tata letak gambar secara berdampingan. Untuk melakukan itu, Anda dapat menggunakan cara ini :

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## Terapkan Pada instance Vercel anda sendiri

#### [lihat video tutorial langkah-langkah oleh @codeSTACKr](https://youtu.be/n6d4KHSKqGk?t=107)

Karena API Github hanya dapat diakses 5 Ribu permintaan per jam `https://github-readme-stats.vercel.app/api` mungkin dapat mencapai batas yang lebih. Jika Anda menaruh pada instance Vercel anda sendiri, maka Anda tidak perlu khawatir apa pun. Klik tombol deploy untuk memulai

Catatan: Sejak [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) kami seharusnya dapat menangani lebih dari 5k permintaan dan tidak memiliki masalah dengan waktu henti :D

[![Deploy ke Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary><b>Panduan untuk mengatur Vercel 🔨 </b></summary>

1. Pergi ke Vercel [vercel.com](https://vercel.com/)
2. Klik `Log in`
   ![](https://files.catbox.moe/tct1wg.png)
3. Sign in dengan Github dengan menekan `Continue with GitHub`
   ![](https://files.catbox.moe/btd78j.jpeg)
4. masuk dengan Github dan ijinkan ke semua repository, if ditanyakan
5. Fork repository ini
6. kembali ke Vercel Dashboard [dashboard Vercel](https://vercel.com/dashboard)
7. Pilih `Import Project`
   ![](https://files.catbox.moe/qckos0.png)
8. Pilih `Import Git Repository`
   ![](https://files.catbox.moe/pqub9q.png)
9. Pilih root adn biarkan semuanya apa adanya, hanya tambahkan ke environment variabel anda dinamai PAT_1 (seperti yang ditunjukan), yang akan berisi token akses pribadi anda atau Personal Acess Token (PAT), anda dapat mudah membuat [disini](https://github.com/settings/tokens/new) (tinggalkan semua seperti semula, namai sesuatu dan itu dapat diisi sesuai dengan yang anda inginkan)
   ![](https://files.catbox.moe/0ez4g7.png)
10. Klik, Deploy dan anda dapat pergi mengakses domain anda untuk menggunakan API !

</details>

## :sparkling_heart: Bantu Proyek ini

Saya membuka sumber hampir semua yang saya bisa, dan saya mencoba membalas semua orang yang membutuhkan bantuan menggunakan proyek ini. Jelas ini akan membutuhkan waktum, Anda dapat menggunakan layanan ini secara gratis.

Namun, jika Anda menggunaka proyek ini dan senang dengan ini atau hanya ingin membantu saya untuk terus membuat sesuatu ada beberapa cara yang dapat anda lakukan :-

- Memberikan kredit yang tepat ketika Anda menggunakan github-readme-stats di readme Anda, menautkan kembali ke sana: D
- Sukai dan bagikan proyek ini :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - Anda dapat melakukan donasi sekali menggunakan paypal. mungkin saya akan membeli ~~kopi~~ teh :tea:

Terima Kasih! :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](../powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)


Kontribusi dipersilahkan ! <3

dibuat dari :heart: dan JavaScript.
