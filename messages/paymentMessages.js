export function danaMessage(order, harga) {
    return `💙 *Pembayaran DANA*

Invoice : ${order.invoice}

Game : ${order.game}

Produk : ${order.product}

Total Pembayaran :
Rp${harga.toLocaleString("id-ID")}

Nomor : 083172927610
Nama : Rahmad Rizki

Silakan transfer sesuai total pembayaran.

Setelah transfer kirim bukti pembayaran ya Kak 😊`;
}

export function qrisMessage(order, harga, fee, total, appUrl) {
    return `📱 *Pembayaran QRIS*

Invoice : ${order.invoice}

Game : ${order.game}

Produk : ${order.product}

Harga Produk :
Rp${harga.toLocaleString("id-ID")}

Biaya QRIS (0,7%) :
Rp${fee.toLocaleString("id-ID")}

*Total Pembayaran :*
Rp${total.toLocaleString("id-ID")}

Silakan buka QRIS:

${appUrl}/payment/qris.jpg

Setelah pembayaran berhasil kirim bukti pembayaran ya Kak 😊`;
}

export function seabankMessage(order, harga) {
    return `🏦 *Pembayaran SeaBank*

Invoice : ${order.invoice}

Game : ${order.game}

Produk : ${order.product}

Total Pembayaran :
Rp${harga.toLocaleString("id-ID")}

Nomor Rekening : 901719133159
Nama : Nuraini

Silakan transfer sesuai total pembayaran.

Setelah transfer kirim bukti pembayaran ya Kak 😊`;
}
