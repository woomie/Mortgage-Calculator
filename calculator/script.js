$(document).ready(function(){
    $("#calculate-button").on("click", (event)=>{
        event.preventDefault();
        let $paymentChoice = $(".form-check-input:checked").val();
        if ($paymentChoice === "repayment"){
            $(".display").hide();
            $(".result").show();
            $(".total-result h1, .total-result h4").remove();
            let $repayment = $(`<h1>$${ repaymentCalculator()}</h1>`);
            //$(".total-result").append();
            $repayment.css("color", "hsl(61, 70%, 52%)");
            $(".total-result p").after($repayment);
            $(".total-result h6").after(`<h4>$${leftToRepay()}</h4>`);

            
            

        }else{
            $(".display").hide();
            $(".result").show();
            let $interestRate = $(`<h2>$${interestOnlyCalculator()}</h2>`);
            $interestRate.css("color", "hsl(61, 70%, 52%)");
            $(".total-result p").after($interestRate);
        }

        $("form")[0].reset();    
        
    });
});

function repaymentCalculator(){
    let $mortgageAmount = $("#mortgage-amount").val();
    let $mortgageTerm = $("#morgage-term").val();
    let $interestRate = $("#interest-rate").val();
        //console.log($mortgageAmount);
        //calculate monthly interest rate 
    let $rate = $interestRate / (12*100);
    let $totalPayment = $mortgageTerm * 12
    let $monthly = $mortgageAmount * $rate * Math.pow(1+$rate, $totalPayment )/ (Math.pow(1+$rate,$totalPayment)-1);
    return $monthly.toFixed(2);
}

function interestOnlyCalculator(){
    let $mortgageAmount = $("#mortgage-amount").val();
    let $interestRate = $("#interest-rate").val();

    let $monthlyPayment = $mortgageAmount * $interestRate
    return $monthlyPayment;
}

function leftToRepay(){
    let $monthlyPayment = repaymentCalculator();
    let $paymentTerm = $("#morgage-term").val();
    let $totalToPay = $monthlyPayment *($paymentTerm*12);
    return $totalToPay;
}

