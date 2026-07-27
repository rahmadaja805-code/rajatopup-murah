// =========================
// SIDEBAR MOBILE
// =========================

const menu = document.getElementById("menuAdmin");
const sidebar = document.querySelector(".admin-sidebar");

if (menu && sidebar) {
    menu.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });
}

// =========================
// GRAFIK ORDER
// =========================

const chart = document.getElementById("orderChart");

if (chart) {

    new Chart(chart, {

        type: "line",

        data: {

            labels: [
                "Sen",
                "Sel",
                "Rab",
                "Kam",
                "Jum",
                "Sab",
                "Min"
            ],

            datasets: [{

                label: "Order",

                data: [
                    12,
                    19,
                    9,
                    15,
                    24,
                    18,
                    30
                ],

                borderColor: "#7c3aed",

                backgroundColor: "rgba(124,58,237,.2)",

                fill: true,

                tension: 0.4

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    });

}
