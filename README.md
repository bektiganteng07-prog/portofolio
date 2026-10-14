# Bekti Ibrafirmansyah | SMKN 1 Pasuruan

## Laporan Mingguan — 14 Oktober 2026

**Project:** Portofolio — Modul 3

### Tugas

- [x] Mempelajari materi integrasi Supabase dengan Next.js dan mempraktikkannya.
- [x] Membuat rangkuman materi dalam bentuk tulisan tangan.
- [x] Memperbaiki project portofolio sesuai materi modul.
- [x] Mendokumentasikan tabel dan kolom Supabase di README.

### Link Project

- **Portofolio:** [portofolio-nu-sandy.vercel.app](https://portofolio-nu-sandy.vercel.app/)
- **GitHub:** [bektiganteng07-prog/portofolio](https://github.com/bektiganteng07-prog/portofolio)
- **YouTube:** Ganti teks ini dengan link video presentasimu setelah diunggah.

## Dokumentasi Supabase

Website mengambil data proyek dari tabel `public.proyek` di Supabase. RLS aktif dengan policy `SELECT` untuk pengunjung (`anon`), sehingga data dapat dibaca oleh website.

| Kolom         | Tipe data        | Keterangan                            |
| ------------- | ---------------- | ------------------------------------- |
| `id`          | `bigint`         | Primary key, identitas unik proyek.   |
| `title`       | `text`           | Nama proyek.                          |
| `description` | `text`           | Deskripsi proyek.                     |
| `stack`       | `text[]`         | Daftar teknologi yang digunakan.      |
| `href`        | `text`           | Link atau route detail proyek.        |
| `image_url`   | `text`, nullable | URL gambar proyek; boleh kosong.      |
| `image_alt`   | `text`, nullable | Teks alternatif gambar; boleh kosong. |

Script untuk membuat tabel, policy, dan data contoh tersedia di [`supabase/setup.sql`](supabase/setup.sql). Website membaca data melalui Supabase client di [`lib/supabase.ts`](lib/supabase.ts) dan menampilkannya pada bagian Projects di halaman utama.

### Environment Variables

Project memerlukan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Nilai lokal disimpan di `.env.local`, yang diabaikan oleh Git. Jangan menaruh secret key atau isi `.env.local` di repository.

## Menjalankan Project

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat website secara lokal.
