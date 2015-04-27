# CloudVMfront-end
CloudVM front end

CloudVM-v1.0 
- CSS & Bootstrap only
- AngularJS masih dalam pengembangan

7-4-2015
- Penambahan smoothscrolling pada button index.html

8-4-2015
- Penambahan hlmn aboutus.html serta perubahan kecil pada index.html dan login.html

8-4-2015
- Edit konten
- Manage.html 
- AngularJS masih dalam pengembangan

27-4-2015 **(CloudVM-AngularJS-v1.0)**
- Frontend sebelum digabung dengan AngularJS ada pada *CloudVM-HTML*
- Frontend setelah digabung dengan AngularJS ada pada *CloudVM-AngularJS-v1.0*
- Untuk development setelahnya lebih baik buat folder baru (v1.x, dst), dan lebih baik push project ketika sudah dilakukan banyak perubahan
- AngularJS sudah diimplementasikan sebagian untuk global view
- AngularJS untuk user view dalam pengembangan
- Berikut gambaran struktur sementara
  * script.js
  * index.html
  * js **(layouting)**
  * images **(layouting)**
  * fonts **(layouting)**
  * css **(layouting)**
  * views_global **(berisi partial view yang digunakan untuk non-user view)**
  * views_user **(berisi partial view yang digunakan untuk user view)**
  * views **(berisi view yang digunakan untuk menggabungkan partial view dan diload ke index.html)**
- Beberapa catatan tambahan untuk dikerjakan mengenai navbar active link
  1. Ketika di halaman home, seharusnya waktu halaman discroll dari header ke bawah, ketika di bagian features dan pricing, link yang menjadi active (indikasi warna link menjadi hijau) pada navbar akan secara dinamis berubah mengikuti posisi, saat ini active link masih pada home (bandingkan dengan versi HTML)
  2. Ketika features dan pricing pada navbar dipilih, dan membuka views sesuai dengan route /features dan /pricing seharusnya active link pada navbar juga beruba mengikuti halaman yang sedang aktif
    * NB: untuk kedua problem diatas kalau bisa dibetulkan dengan tetap menggunakan satu navbar, yaitu navbar_global, jalan terakhir ya dibuatkan dua navbar khusus halaman features dan pricing, tapi sementara coba pakai satu navbar
- Untuk development AngularJS harus pada **http://localhost**, pakai XAMPP dulu saja kalau belum butuh menggunakan service pada server.js
