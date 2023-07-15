const loanAmount = document.getElementById("loan-amount");
const loanTenure = document.getElementById("loan-tenure");
const loanRate = document.getElementById("loan-interest");
const element = document.querySelectorAll(".emi-calculator-box");


function inputNumber(num) {
    var ASCIICode = (num.which) ? num.which : num.keyCode
    if (ASCIICode > 31 && (ASCIICode > 57)) {
        alert("Enter value in numbers only")
    };
};


const loanEmi = document.querySelector(".loan-emi");
const loanPrinciple = document.querySelector(".loan-Principle");
const loanInterest = document.querySelector(".loan-Interest-rate");
const loanTotal = document.querySelector(".loan-total");

const submitBtn = document.querySelector(".calculator-btn");

submitBtn.addEventListener("click", function () {

    amount = loanAmount.value;
    tenure = (loanTenure.value) * 12;
    rate = (loanRate.value) / 12 / 100;

    emi = ((amount * rate * (1 + rate) ** tenure) / (((1 + rate) ** tenure) - 1));
    // console.log(emi);
    total = emi * tenure; // total amount to be paid including interest
    interest = total - amount; //interest = total amount - principle amount

    // console.log(total);
    // console.log(interest);

    loanEmi.innerHTML = Math.floor(emi);
    loanPrinciple.innerHTML = Math.floor(amount);
    loanTotal.innerHTML = Math.floor(total);
    loanInterest.innerHTML = Math.floor(interest);

    //Loan Chart
    let xValues = ["Disbursal Amount", "interest"];
    let yValues = [amount, Math.floor(interest)];

    let barColors = ["#87e995", "000000"];

    new Chart("loanChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        Options: {
            title: {
                display: false,

            }
        }
    })

});









function first() {
    document.getElementById("main-id").src = "images/second.jpg"
}

function second() {
    document.getElementById("main-id").src = "images/third.jpg"
}

function third() {
    document.getElementById("main-id").src = "images/main.jpg"
}
setInterval(first, 2000);
setInterval(second, 4000);
setInterval(third, 6000);




$(document).ready(function () {
    var owl = $('.slider');
    owl.owlCarousel({
        loop: true,
        // items: 3,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            1200: {
                items: 3,
                nav: false
            },
        },
        autoplay: true,
        autoplayTimeout: 2000, //2000ms = 2s;
        autoplayHoverPause: true,
        nav: false,
    });

    // Custom Button
    $('.customNextBtn').click(function () {
        owl.trigger('next.owl.carousel');
    });
    $('.customPreviousBtn').click(function () {
        owl.trigger('prev.owl.carousel');
    });

});