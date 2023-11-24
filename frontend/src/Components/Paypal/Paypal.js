import React ,{useRef, useState, useEffect} from 'react'

export default function Paypal({amount, onApproveFunction, handleOnError}){
    const paypal = useRef()
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data,actions, err) => {
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [{
                        description: 'Flight Ticket',
                        amount:{
                            currency_code: "USD",
                            value: amount
                        }
                    }]
                });
            },
            onApprove: async (data,actions) => {
                const order = await actions.order.capture();
                console.log('success')
                console.log(order);
                console.log(data);
                onApproveFunction(amount)
                // return actions.order.capture().then(function(details){
                //     alert('completed')
                // });
            },
            onError: (err) => {
                console.log('failed')
                console.log(err);
                handleOnError()
            }
        }).render(paypal.current);
    },[])
    return(
        <div>
            <div ref={paypal}></div>
        </div>
    )
}