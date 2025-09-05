// --- LOGIKA TRANSISI HALAMAN ---
const handlePageTransition = () => {
    const transitionOverlay = document.getElementById('page-transition-overlay');
    if (!transitionOverlay) return;

    transitionOverlay.style.transition = 'opacity 0.5s ease-in-out';

    window.addEventListener('load', () => {
        transitionOverlay.style.opacity = '0';
        setTimeout(() => {
            transitionOverlay.style.zIndex = '-1';
        }, 500);
    });

    document.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) return;
            e.preventDefault();
            const destination = link.href;
            transitionOverlay.style.zIndex = '200';
            transitionOverlay.style.opacity = '1';
            setTimeout(() => {
                window.location.href = destination;
            }, 500);
        });
    });
};

handlePageTransition();

document.addEventListener('DOMContentLoaded', () => {
    // Data Produk Digital
    const produkData = [
        { id: 1, nama: 'Canva Pro', harga: 10000, gambar: 'https://placehold.co/400x300/A0847B/F5F5DC?text=Canva+Pro', deskripsi: 'Akses 6 bulan untuk desain profesional tanpa batas.' },
        { id: 2, nama: 'Spotify Premium', harga: 10000, gambar: 'https://placehold.co/400x300/A0847B/F5F5DC?text=Spotify', deskripsi: 'Langganan 1 bulan untuk jutaan lagu tanpa iklan.' },
        { id: 3, nama: 'Netflix Premium', harga: 15000, gambar: 'https://placehold.co/400x300/A0847B/F5F5DC?text=Netflix', deskripsi: 'Langganan 1 bulan untuk hiburan tanpa batas kualitas 4K UHD.' },
        { id: 4, nama: 'Capcut Pro', harga: 4000, gambar: 'https://placehold.co/400x300/A0847B/F5F5DC?text=Capcut+Pro', deskripsi: 'Langganan 1 bulan untuk editing video tanpa watermark.' }
    ];

    // Variabel elemen HTML
    const produkGrid = document.getElementById('produk-grid');
    const keranjangBtn = document.getElementById('keranjang-btn');
    const tutupKeranjangBtn = document.getElementById('tutup-keranjang-btn');
    const keranjangSidebar = document.getElementById('keranjang-sidebar');
    const keranjangHitung = document.getElementById('keranjang-hitung');
    const keranjangItemContainer = document.getElementById('keranjang-item');
    const keranjangTotalEl = document.getElementById('keranjang-total');

    let keranjang = [];

    // --- Tampilkan Produk Digital ---
    if (produkGrid) {
        produkData.forEach(produk => {
            const div = document.createElement('div');
            div.className = 'bg-[#FDFBF2] rounded-xl overflow-hidden shadow-lg group transform hover:-translate-y-3 transition-all duration-300 relative';
            div.innerHTML = `
                <img src="${produk.gambar}" alt="${produk.nama}" class="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-300">
                <div class="p-6">
                    <h3 class="text-2xl font-bold mb-2 text-[#A0847B]">${produk.nama}</h3>
                    <p class="text-gray-600 text-sm mb-4 h-10">${produk.deskripsi}</p>
                    <div class="flex justify-between items-center mt-4">
                        <p class="text-xl font-bold text-[#7C6A64]">Rp${produk.harga.toLocaleString('id-ID')}</p>
                        <button data-id="${produk.id}" class="tambah-ke-keranjang-btn bg-[#A0847B] text-white py-2 px-6 rounded-full text-sm font-semibold hover:bg-[#7C6A64] transition-all transform hover:scale-105 active:scale-95 shadow-md">
                            Tambah
                        </button>
                    </div>
                </div>
            `;
            produkGrid.appendChild(div);
        });
    }

    // Event listener untuk tombol "Tambah" di kartu produk
    if (produkGrid) {
        produkGrid.addEventListener('click', e => {
            if (e.target.classList.contains('tambah-ke-keranjang-btn')) {
                tambahKeKeranjang(parseInt(e.target.dataset.id));
            }
        });
    }

    function tambahKeKeranjang(id) {
        const itemDiKeranjang = keranjang.find(item => item.id === id);
        if (itemDiKeranjang) {
            itemDiKeranjang.jumlah++;
        } else {
            const produk = produkData.find(p => p.id === id);
            keranjang.push({ ...produk, jumlah: 1 });
        }
        perbaruiKeranjang();
    }

   function perbaruiKeranjang() {
    // Pastikan variabel ada sebelum digunakan
    if (!keranjangItemContainer || !keranjangTotalEl || !keranjangHitung) return;

    keranjangItemContainer.innerHTML = ''; // Tetap kosongkan isi sebelumnya
    let total = 0;
    let hitung = 0;

    // INI BAGIAN PERBAIKANNYA
    if (keranjang.length === 0) {
        // Jika keranjang kosong, tampilkan pesan ini
        keranjangItemContainer.innerHTML = '<p class="text-white/70 text-center italic mt-10">Keranjang masih kosong.</p>';
    } else {
        // Jika ada isinya, baru tampilkan daftar produk
        keranjang.forEach(item => {
            total += item.harga * item.jumlah;
            hitung += item.jumlah;

            const div = document.createElement('div');
            div.className = 'flex justify-between items-center mb-6 pb-4 border-b border-[#F5F5DC]/20 last:border-b-0';
            div.innerHTML = `
                <div class="flex items-center gap-4">
                    <img src="${item.gambar}" alt="${item.nama}" class="w-20 h-20 object-cover rounded-lg shadow-md">
                    <div>
                        <h4 class="font-bold text-white text-lg">${item.nama}</h4>
                        <p class="text-sm text-[#F5F5DC]/80">Rp${item.harga.toLocaleString('id-ID')}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-3 text-white font-semibold">
                    <span>x ${item.jumlah}</span>
                </div>
            `;
            keranjangItemContainer.appendChild(div);
        });
    }

    // Perbarui total dan hitungan seperti biasa
    keranjangTotalEl.textContent = `Rp${total.toLocaleString('id-ID')}`;
    keranjangHitung.textContent = hitung;
    keranjangHitung.classList.toggle('scale-0', hitung === 0);
    keranjangHitung.classList.toggle('scale-100', hitung > 0);
}

    // Event listener untuk tombol buka/tutup keranjang
    if (keranjangBtn) {
        keranjangBtn.addEventListener('click', () => keranjangSidebar && keranjangSidebar.classList.remove('translate-x-full'));
    }
    if (tutupKeranjangBtn) {
        tutupKeranjangBtn.addEventListener('click', () => keranjangSidebar && keranjangSidebar.classList.add('translate-x-full'));
    }
});
