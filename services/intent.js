export function getIntent(text) {

    text = (text || "")
        .toLowerCase()
        .trim();

    // Salam
    if (
        ["halo","hai","hi","assalamualaikum","menu","help"].includes(text)
    ) {
        return "MENU";
    }

    // Cara order
    if (
        text.includes("top up") ||
        text.includes("topup") ||
        text.includes("beli")
    ) {
        return "TOPUP";
    }

    // Status
    if (
        text.includes("status")
    ) {
        return "STATUS";
    }

    // Pembayaran
    if (
        text === "1" ||
        text.includes("dana")
    ) {
        return "DANA";
    }

    if (
        text === "2" ||
        text.includes("qris")
    ) {
        return "QRIS";
    }

    if (
        text === "3" ||
        text.includes("seabank")
    ) {
        return "SEABANK";
    }

    return "UNKNOWN";

}
