import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards';
import { auth, db } from "../../Firebase/Firebase"
import {Grid} from '@material-ui/core'
export default function CreditCards(props) {
    
    function convertMonth(monthNumber) {
        if(monthNumber.length < 2){
            const nm = "0"+monthNumber
            return nm
        }
        return monthNumber
    }

    return (     
        <Grid
            spacing={3}
			xs={12}
			sm={6}
			md={4}
			style={{ marginBottom: 15 }}
			key={props.index}
			>
                <Cards
                    key={props.index}
                    number={"000000000000"+props.card["last4"]}
                    name={auth().currentUser.displayName}
                    expiry={convertMonth(props.card["exp_month"].toString())+"/"+props.card["exp_year"].toString().substr(2)}
                    cvc="000"
               />
        </Grid>
)}