# Bekti Ibrafirmansyah | SMKN 1 Pasuruan

## Laporan Mingguan — Modul 4

**Project:** Portofolio — Server Actions, CRUD, dan Admin Panel

### Tugas

- [x] Mengintegrasikan Supabase Auth dengan cookie session.
- [x] Menambahkan admin panel untuk create, read, update, dan delete proyek.
- [x] Melindungi route admin dengan Proxy dan policy Row Level Security.
- [ ] Merekam dan menguji alur penuh admin.
- [ ] Membuat video penjelasan bahasa Inggris 3-5 menit.

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

Script untuk membuat tabel, policy, dan data contoh tersedia di [`supabase/setup.sql`](supabase/setup.sql). Website membaca data publik melalui Supabase client di [`lib/supabase.ts`](lib/supabase.ts). Halaman admin menggunakan helper cookie-aware [`lib/supabase-server.ts`](lib/supabase-server.ts) dan [`lib/supabase-browser.ts`](lib/supabase-browser.ts).

### Setup Admin

1. Jalankan `supabase/setup.sql` di Supabase SQL Editor. Script mengaktifkan empat policy: SELECT untuk `anon` dan `authenticated`, serta INSERT, UPDATE, dan DELETE untuk `authenticated`.
2. Di Supabase Dashboard, buka **Authentication → Users → Add user** lalu buat satu akun admin. Jangan aktifkan pendaftaran publik.
3. Salin `.env.example` menjadi `.env.local`, kemudian isi URL project dan publishable key Supabase. Jangan gunakan `service_role` key di browser atau commit file `.env.local`.
4. Jalankan `npm install`, kemudian `npm run dev` dan buka `/admin/login`.
5. Login akan diarahkan ke `/admin/proyek`. Form tambah, tombol edit, dan halaman konfirmasi hapus memakai Server Actions.

Di Next.js 16, konvensi `middleware.ts` sudah deprecated dan diganti `src/proxy.ts`. Proxy memperbarui cookie session dan mengarahkan pengguna tanpa sesi ke halaman login. Server Actions tetap memeriksa session dengan `auth.getUser()`; policy RLS menjadi lapisan otorisasi untuk operasi database.

### Tugas Pengumpulan

- Push repository tanpa `.env.local`.
- Lampirkan screenshot atau rekaman alur login, tambah, lihat proyek publik, edit, hapus, dan logout.
- Lampirkan screenshot empat policy aktif di Supabase.
- Personalisasi saat ini: dashboard menampilkan jumlah total proyek.
- Isi tautan YouTube setelah video penjelasan bahasa Inggris diunggah.

### Environment Variables

Project memerlukan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Nilai lokal disimpan di `.env.local`, yang diabaikan oleh Git. Jangan menaruh secret key atau isi `.env.local` di repository.

## Menjalankan Project

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat website secara lokal.
